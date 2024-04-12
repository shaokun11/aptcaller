const fetch = require('node-fetch');
const _ = require('lodash');
const { execaCommand } = require('execa');
const { URL } = require('./const');
const { sleep } = require('./helper');
async function exe_cmd(cmd) {
    return new Promise(resolve => {
        let ret = '';
        const res = execaCommand(cmd, {
            stdio: ['inherit', 'pipe'],
        });
        res.stdout.on('data', data => {
            const str = data.toString();
            process.stdout.write(str);
            ret += str;
        });
        res.stdout.on('end', () => {
            resolve(ret);
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
            console.log('---request----res-----', url, res);
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

async function getResponse(url, max = 10) {
    let counter = 0;
    while (counter < max) {
        try {
            let res = await fetch(url).then(res => res.json());
            if (res.tx_response) {
                return res;
            }
            throw 'tx_response not found';
        } catch (error) {
            counter++;
        }
        await sleep(500);
    }
}
function saveToDataLayer (data) {
    const store = process.env.CELESTIA_DATA_STORE;
    const key = process.env.CELESTIA_AUTH_TOKEN;
    const space = "0x61707463616C6C6572"  // aptcaller
    const data_hex = Buffer.from(data).toString('hex');
    const cmd = `celestia blob submit ${space} ${data_hex} --token ${key} --node.store ${store}`;
    return exe_cmd(cmd);
}
exports.saveToDataLayer = saveToDataLayer

exports.sendSubmitTx = async function sendSubmitTx(body, header) {
    let header_ = JSON.parse(Buffer.from(header, "hex").toString('utf8'))
    header_.dataLayer = await saveToDataLayer(body)
    header_ = Buffer.from(JSON.stringify(header_)).toString('hex')
    const cmd = `aptcallerd tx aptcaller submit-transaction ${header_} ${body} --log_format json --from alice --chain-id aptcaller -y`;
    const res = await exe_cmd(cmd);
    const line = await res.split('\n').find(it => it.includes('txhash'));
    const hash = line.split(' ')[1].trim();
    const url = `${URL}/cosmos/tx/v1beta1/txs/${hash}`;
    await new Promise(resolve => setTimeout(resolve, 1000));
    const tx_result = await getResponse(url);
    const ret = tx_result.tx_response.events.find(it => it.type === 'SubmitTransactionEvent');
    return parseRet({
        aptRes: {
            body: ret.attributes.find(it => it.key === 'body').value,
            code: parseInt(ret.attributes.find(it => it.key === 'code').value),
            header: ret.attributes.find(it => it.key === 'header').value,
        },
    });
};
