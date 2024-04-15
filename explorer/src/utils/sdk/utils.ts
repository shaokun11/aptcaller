import Provider, { EthereumProvider } from '@walletconnect/ethereum-provider'
import { ProviderRpcError } from '@walletconnect/ethereum-provider/dist/types/types';
import Web3 from "web3";
import { ethers } from 'ethers';
import { MultiCall } from '@indexed-finance/multicall';
export var multi: MultiCall;
import { printf } from './tools';
import { Chains, chainIdDict, tokenItem, tokens, userInfo } from './config';
export var web3: Web3;
//@ts-ignore
const _ethereum: any = window["ethereum"];
const projectId = '7e48604750ff839dfde67bffc47f08ec';
var provider: Provider;
/**
 * ######
 * @returns 
 */
export function logout() {
    //@ts-ignore
    web3 = null;
    userInfo.account = "";
    userInfo.chainID = 5;
    userInfo.chain = chainIdDict[userInfo.chainID];
    if (provider.connecting) {
        provider.disconnect();
    }
    return {
        account: userInfo.account,
        chainID: userInfo.chainID,
        chain: userInfo.chain,
        message: "logout",
    }
}
/**
 * ############
 * @param type "injected" | "walletconnect"
 * @param callback 
 * @returns 
 */
export async function connect(type: "metamask" | "walletconnect", callback: (data: { account: string; chainID: number; chain: string, message: string; }) => void) {
    try {
        if (type === "metamask") {
            if (_ethereum) {
                await _ethereum.request({ method: 'eth_requestAccounts' });
                web3 = new Web3(_ethereum);
                multi = new MultiCall(new ethers.providers.Web3Provider(_ethereum));
                eventsOn(_ethereum, callback);
                userInfo.providerInfo = "metamask";
            }
        } else if (type === "walletconnect") {
            provider = await EthereumProvider.init({
                projectId: projectId,
                chains: [1],
                showQrModal: true,
                optionalChains: [137, 56]
            })
            await provider.enable()
            web3 = new Web3(provider);
            multi = new MultiCall(new ethers.providers.Web3Provider(provider));
            eventsOn(provider, callback);
            userInfo.providerInfo = "walletconnect";
        }
        if (web3) {
            userInfo.account = (await web3.eth.getAccounts())[0].toLowerCase();
            userInfo.chainID = await web3.eth.getChainId() as typeof userInfo.chainID;
            userInfo.chain = chainIdDict[userInfo.chainID] ?? "";
        }
    } catch (e: any) {
        userInfo.message = e.message;
    }
    return userInfo
}
/**
 * ######token
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
let walletDisconnectTimer: NodeJS.Timeout | null;
/**
 * ######### ############
 * @param _provider 
 * @param callback 
 */
function eventsOn(_provider: Provider, callback: (data: { account: string; chainID: number; chain: string, message: string; }) => void) {
    _provider.on("accountsChanged", (accounts: string[]) => {
        userInfo.account = accounts[0]?.toLowerCase();
        callback({
            account: userInfo.account,
            chainID: userInfo.chainID,
            chain: chainIdDict[userInfo.chainID] ?? "",
            message: "accountsChanged",
        });
    });
    _provider.on("chainChanged", async (chainId: string) => {
        userInfo.chainID = Number(chainId) as typeof userInfo.chainID;
        callback({
            account: (await web3.eth.getAccounts())[0].toLowerCase(),
            chainID: userInfo.chainID,
            chain: chainIdDict[userInfo.chainID] ?? "",
            message: "chainChanged",
        });
    });
    _provider.on("disconnect", (args: ProviderRpcError) => {
        if (walletDisconnectTimer !== null) clearTimeout(walletDisconnectTimer)
        walletDisconnectTimer = setTimeout(() => {
            walletDisconnectTimer = null;
            if (args.code) {
                userInfo.account = "";
                userInfo.chainID = 5;
                userInfo.chain = "Ethereum";
                callback({
                    account: "",
                    chainID: 1,
                    chain: "",
                    message: "disconnect",
                })
            }
        }, 300);
    })
}
/**
 * ###########################
 * @param chainid
 * @returns
 */
export async function changeMetamaskChain(chainid: 1 | 5 | 97 | 280 | 324 | 4002 | 59144 | 43113 | 80001 | 421613 | 534352) {
    if (!_ethereum || !_ethereum.isMetaMask) {
        return;
    }
    try {
        await _ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: '0x' + chainid.toString(16) }]
        })
    } catch (switchError: any) {
        if (switchError.code === 4902) {
            await _ethereum.request({ method: 'wallet_addEthereumChain', params: Chains[chainid] }).catch();
        }
    }
}
/**
 * ##############################
 * @param token_address ######
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
 * ######token#########
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
 * ############
 * @param contract ############
 * @param methodName ######
 * @param value value
 * @param params ######
 * @param callback ######
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