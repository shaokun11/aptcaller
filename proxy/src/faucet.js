const express = require('express');
const { APT_FAUCET_PRIVATE_KEY } = require('./const');
const router = express.Router();
const aptos = require('aptos');
const { toBeHex, ethers } = require('ethers');
const HexString = aptos.HexString;
const NODE_URLS = [
    'https://api.aptos.m1.movementlabs.xyz/apt1/v1',
    'https://api.aptos.m1.movementlabs.xyz/apt2/v1',
];

const account = aptos.AptosAccount.fromAptosAccountObject({
    privateKeyHex: APT_FAUCET_PRIVATE_KEY,
});

async function sendTx(chainIndex, payload) {
    const client = new aptos.AptosClient(NODE_URLS[chainIndex - 1]);
    const txnRequest = await client.generateTransaction(account.address().hexString, payload);
    const signedTxn = await client.signTransaction(account, txnRequest);
    const transactionRes = await client.submitTransaction(signedTxn);
    // await client.waitForTransaction(transactionRes.hash);
    return transactionRes.hash;
}

function toBuffer(hex) {
    return new HexString(hex).toUint8Array();
}

function faucetApt(to, chain) {
    const payload = {
        type: 'entry_function_payload',
        function: '0x1::aptos_account::transfer',
        type_arguments: [],
        arguments: [to, 1e8],
    };
    return sendTx(chain, payload);
}

function faucetMevm(to, chain) {
    let payload = {
        function: `0x1::evm::deposit`,
        type_arguments: [],
        arguments: [toBuffer(to), toBuffer(toBeHex((1e18).toString()))],
    };
    return sendTx(chain, payload);
}

const SUPPORT_CHAIN_INDEX = [1, 2];

router.post('/mevm', async function (req, res) {
    console.log('request faucet body', req.body);
    const eth = req.body.address;
    let chain = req.body.chain;
    if (!ethers.isAddress(eth)) {
        res.json({ error: 'Invalid address' });
        return;
    }
    if (SUPPORT_CHAIN_INDEX.indexOf(chain) === -1) {
        res.json({ error: 'Chain not support' });
        return;
    }
    res.json({
        hash: await faucetMevm(eth, chain),
    });
});

router.post('/move', async function (req, res) {
    let move = req.body.address;
    let chain = req.body.chain;
    if (!move) {
        res.json({ error: 'Move address not found' });
        return;
    }
    if (SUPPORT_CHAIN_INDEX.indexOf(chain) === -1) {
        res.json({ error: 'Chain not support' });
        return;
    }
    move = move.startsWith('0x') ? move : '0x' + move;
    if (move.length !== 66) {
        res.json({ error: 'The move address lengh must start with 0x and lengh is 66' });
        return;
    }
    res.json({
        hash: await faucetApt(move, chain),
    });
});

exports.router_faucet = router;
