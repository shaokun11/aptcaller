import Web3 from "web3";
export var web3: Web3;
import { ethers } from 'ethers';
import { printf, sleep } from './tools';
import { useWeb3Modal } from '@web3modal/ethers5/vue'
import { MultiCall } from '@indexed-finance/multicall';
import type { Provider } from '@web3modal/scaffold-utils/ethers';
export var multi: MultiCall;
import type { EventsControllerState } from '@web3modal/core';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/vue'
import { Chains, IuserInfo, chainIdDict, tokenItem, tokens, userInfo } from './config';
import { trace } from "../tools";
//@ts-ignore
const _ethereum: any = window["ethereum"];
const projectId = '7e48604750ff839dfde67bffc47f08ec';

const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
}
const metadata = {
    name: 'My Website',
    description: 'My Website description',
    url: 'https://mywebsite.com',
    icons: ['https://avatars.mywebsite.com/']
}

var web3modal = createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [mainnet],
    projectId
})
const modal = useWeb3Modal();
let lastCallbackTimer = 0;
let callbackTimerGap = 300;
var CALLBACK: (data: IuserInfo) => void;

export function connect(callback: (data: IuserInfo) => void) {
    CALLBACK = callback;
    modal.open();
    handleConnectSuccess()
}

web3modal.subscribeEvents(handleWeb3ModalEvent);
function handleWeb3ModalEvent(event: EventsControllerState) {
    switch (event.data.event) {
        case 'CONNECT_SUCCESS':
            handleConnectSuccess();
            break;
        case 'DISCONNECT_SUCCESS':
            printf("DISCONNECT_SUCCESS");
            break;
        case 'MODAL_CLOSE':
            handleConnectSuccess();
            printf("MODAL_CLOSE");
            break;
    }
}

async function handleConnectSuccess() {
    await sleep(800);
    if (!web3modal.getIsConnected()) return;
    try {
        const provider = web3modal.getWalletProvider()!;
        userInfo.providerInfo = web3modal.getWalletProviderType();
        if (userInfo.providerInfo === "eip6963") {
            userInfo.providerInfo = "injected";
        }
        //@ts-ignore
        web3 = new Web3(provider);
        multi = new MultiCall(new ethers.providers.Web3Provider(provider));
        if (web3) {
            userInfo.account = web3modal.getAddress()?.toLowerCase() || "";
            userInfo.chainID = web3modal.getChainId() as typeof userInfo.chainID;
            userInfo.chain = chainIdDict[userInfo.chainID] ?? "";
            const balance = await web3.eth.getBalance(userInfo.account);
            printf(balance);
        }
        eventsOn(provider);
    } catch (e: any) {
        userInfo.message = e.message;
    }
    if (Date.now() - lastCallbackTimer > callbackTimerGap) {
        if(CALLBACK)CALLBACK(userInfo);
        lastCallbackTimer = Date.now()
    }
}

function eventsOn(provider: Provider) {
    provider.on("accountsChanged", handleAccountsChanged);
    provider.on("chainChanged", handleChainChanged);
    provider.on("disconnect", handleDisconnect);
}

async function handleAccountsChanged(accounts: string[]) {
    await sleep(150);
    userInfo.account = accounts[0]?.toLowerCase() || "";
    userInfo.message = "accountsChanged";
    if (Date.now() - lastCallbackTimer > callbackTimerGap) {
        if(CALLBACK)CALLBACK(userInfo);
        lastCallbackTimer = Date.now()
    }
}

async function handleChainChanged(chainId: string) {
    await sleep(150);
    userInfo.account = (await web3.eth.getAccounts())[0]?.toLocaleLowerCase() || "";
    userInfo.chainID = Number(chainId) as typeof userInfo.chainID;
    userInfo.chain = chainIdDict[userInfo.chainID];
    userInfo.message = "chainChanged";
    if (Date.now() - lastCallbackTimer > callbackTimerGap) {
        if(CALLBACK)CALLBACK(userInfo);
        lastCallbackTimer = Date.now()
    }
}

async function handleDisconnect() {
    await sleep(150);
    userInfo.account = (await web3.eth.getAccounts())[0]?.toLocaleLowerCase() || "";
    userInfo.chainID = 1;
    userInfo.chain = "Ethereum";
    userInfo.message = "disconnect";
    if (Date.now() - lastCallbackTimer > callbackTimerGap) {
        if(CALLBACK)CALLBACK(userInfo);
        lastCallbackTimer = Date.now()
    }
}
/**
 * 退出
 * @returns 
 */
export function logout() {
    //@ts-ignore
    web3 = null;
    userInfo.account = "";
    userInfo.chainID = 5;
    userInfo.chain = chainIdDict[userInfo.chainID];
    if (web3modal.getIsConnected()) {
        web3modal.disconnect();
    }
    return {
        account: userInfo.account,
        chainID: userInfo.chainID,
        chain: userInfo.chain,
        message: "logout",
    }
}
/**
 * 导入token
 * @param token 
 * @returns 
 */
export async function importToken(token: tokenItem) {
    const params = {
        type: "ERC20",
        options: {
            address: token.id,
            symbol: token.symbol,
            decimals: token.decimals,
        }
    }
    return await _ethereum.request({
        method: "wallet_watchAsset",
        params: params,
    })
}
/**
 * 一键添加切换智能链
 * @param chainid
 * @returns
 */
export async function changeMetamaskChain(chainid: 1 | 5 | 97 | 280 | 324 | 336 | 4002 | 59144 | 43113 | 80001 | 421613 | 534352) {
    trace('changeMetamaskChain',chainid)
    if (!_ethereum || !_ethereum.isMetaMask) {
        return;
    }
    try {
        await _ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: '0x' + chainid.toString(16) }]
        })
    } catch (switchError: any) {
        trace('switchError-',switchError)
        if (switchError.code === 4902) {
            await _ethereum.request({ method: 'wallet_addEthereumChain', params: Chains[chainid] }).catch();
        }
    }
}
/**
 * 判断是否为以太坊地址
 * @param token_address 地址
 * @returns bool
 */
export async function isETHAddress(token_address: string) {
    try {
        var code = await web3.eth.getCode(token_address);
        if (code === "0x") {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}
/**
 * 查询token的信息
 * @param param 
 * @param chainid 
 * @returns 
 */
export function getToken(param: string) {
    let _token = tokens.find(item => item.chainid === userInfo.chainID && (item.id === param || item.symbol === param));
    if (_token) {
        return _token;
    }
    return tokens.find(item => (item.id === param || item.symbol === param)) ?? { decimals: 18, id: "", symbol: "unknow", chainid: 1 };
}
/**
 * 执行合约
 * @param contract 合约实例
 * @param methodName 方法
 * @param value value
 * @param params 参数
 * @param callback 回调
 */
export async function executeContract(contract: any, methodName: string, value: string, params: any, callback: (code: number, hash: string) => void) {
    let b = false;
    try {
        if (methodName !== "approve") {
            let call_res = await contract.methods[methodName](...params).call({
                from: userInfo.account,
                value: value,
            });
            printf("call_res=", call_res)
        }
        b = true;
    }
    catch (err: any) {
        printf("--------params--------", params);
        printf("executeContract-", err);
        let str = JSON.stringify(err);
        if (str == "{}") {
            str = err.message
        }
        let id1 = str.indexOf("{");
        let id2 = str.lastIndexOf("}");
        let va = "";
        if (str.indexOf("Error:") >= 0) {
            va = str.slice(str.indexOf("Error"), id1);
            if (va.length < 8) {
                callback(4, str);
            } else {
                callback(4, va);
            }
            return;
        }
        str = str.slice(id1, id2 + 1);
        try {
            let aa = JSON.parse(str);
            if (aa.message) {
                va = aa.message;
            }
            else if (aa.originalError && aa.originalError.message) {
                va = aa.originalError.message;
            }
            else {
                va = str;
            }
        }
        catch (err2) {
            va = str;
        }

        if (va.length < 8) {
            va = JSON.stringify(err);
        }
        if (va === "execution reverted: No enough liquidity") {
            callback(4, va);
        } else {
            callback(-1, va);
        }
        b = false;
    }
    if (!b)
        return;
    // contract.methods[methodName](...params).estimateGas().catch((e: any) => console.error("-----methodName----", e));
    let sendParams: any = { from: userInfo.account, value: value }
    // //@ts-ignore
    // if (userInfo.chainID === 97) {
    //   sendParams = { from: userInfo.account, value: value, gasPrice: 10000000000 }
    // }
    contract.methods[methodName](...params)
        .send(sendParams)
        .once("transactionHash", function (hash: string) {
            callback(0, hash);
        })
        // .on("confirmation", function (confirmationNumber: number, receipt: any) {
        //   if (confirmationNumber === 1) {
        //     callback(1, receipt.transactionHash);
        //   }
        // })
        .once("receipt", function (receipt: any) {
            if (receipt.status === true) {
                callback(1, receipt.transactionHash);
            }
        })
        .on("error", function (error: any, message: any) {
            if (message && message.transactionHash) {
                callback(3, message.transactionHash);
            } else {
                callback(2, error.message);
            }
        });
}