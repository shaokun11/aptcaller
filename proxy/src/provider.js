const fetch = require('node-fetch');
const _ = require('lodash');
const { execaCommand } = require('execa');
const { URL } = require('./const');
const { sleep } = require('./helper');
const { db } = require('./db');
const AsyncLocker = require("async-lock");
const locker_submit_tx = new AsyncLocker({
    maxExecutionTime: 120 * 1000,
});
const locker_send_datalayer = new AsyncLocker();
async function exe_cmd(cmd) {
    return new Promise((resolve, reject) => {
        let ret = '';
        const res = execaCommand(cmd, {
            stdio: ['inherit', 'pipe'],
        });
        res.stdout.on('data', data => {
            const str = data.toString();
            // process.stdout.write(str);
            ret += str;
        });
        res.stdout.on('end', () => {
            resolve(ret);
        });
        res.stderr.on('data', data => {
            const str = data.toString();
            reject(str);
        });
    });
}

function parseRustString(rustString) {
    let result = JSON.parse(rustString);
    result['error_code'] = _.snakeCase(result['error_code']);
    result['vm_error_code'] = result['vm_error_code'] === 'None' ? null : result['vm_error_code'];
    return result;
}

function parseRet(res) {
    const result = res.aptRes;
    let data = result.body;
    let code = result.code;
    let error;
    if (code !== 200 && code !== 202) {
        error = parseRustString(data);
        error.code = code;
    }
    let ret = {
        data,
        header: JSON.parse(result.header),
        error: error,
    };
    return ret;
}

exports.call = function (url) {
    return fetch(url)
        .then(response => response.json())
        .then(res => {
            return parseRet(res);
        });
};

exports.post = async function (url, body, parse = true) {
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then(response => response.json());
    if (parse) {
        return parseRet(res);
    }
    return res;
};

async function getResponse(url, max = 20) {
    let counter = 0;
    while (counter < max) {
        try {
            let res = await fetch(url).then(res => res.json());
            if (res?.tx_response?.height) {
                return res;
            }
            throw 'tx_response not found';
        } catch (error) {
            counter++;
        }
        await sleep(500);
    }
}
function saveToDataLayer(data, hash) {
    const store = process.env.CELESTIA_DATA_STORE;
    const key = process.env.CELESTIA_AUTH_TOKEN;
    const space = '0x4d6f76655353'; // MovementSharedSequencer short form:MoveSS
    const data_hex = Buffer.from(data).toString('hex');
    const cmd = `celestia blob submit ${space} ${data_hex} --token ${key} --node.store ${store}`;
    locker_send_datalayer.acquire("locker:data", async function (done) {
        exe_cmd(cmd)
            .then(res => {
                done(null, res);
                console.log('%s save to celestia data layer success', hash, res);
            })
            .catch(err => {
                done(err);
                console.log('%s save to celestia data layer fail', hash, err);
            });
    })

}
exports.saveToDataLayer = saveToDataLayer;

exports.sendSubmitTx = async function sendSubmitTx(body, header) {
    const res = await locker_submit_tx.acquire("locker:tx", async function (done) {
        const cmd = `aptcallerd tx aptcaller submit-transaction ${header} ${body} --log_format json --from alice --chain-id aptcaller -y`;
        try {
            const res = await exe_cmd(cmd);
            done(null, res);
        } catch (error) {
            done(error);
        }
    })
    const line = await res.split('\n').find(it => it.includes('txhash'));
    const hash = line.split(' ')[1].trim();
    const url = `${URL}/cosmos/tx/v1beta1/txs/${hash}`;
    console.log("submit tx hash: ", hash);
    const tx_result = await getResponse(url);
    await saveToDataLayer(body, hash);
    await db.save(hash, tx_result.tx_response.height, tx_result.tx_response.timestamp);
    const ret = tx_result.tx_response.events.find(it => it.type === 'SubmitTransactionEvent');
    return parseRet({
        aptRes: {
            body: ret.attributes.find(it => it.key === 'body').value,
            code: parseInt(ret.attributes.find(it => it.key === 'code').value),
            header: ret.attributes.find(it => it.key === 'header').value,
        },
    });
};
