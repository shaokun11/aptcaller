import { web3, executeContract, getToken } from "./utils";
import { convertNormalToBigNumber } from "./tools";
import { userInfo, ContractAddress, tokenItem, ERC20MOCK, ZKPAYROLLL1, ZKPAYROLLL2, STAKEPOOL } from "./config";
/**
 * ###token######
 * @param token_address
 * @param callback
 */
export async function approveToken(token_address: string, callback: (code: number, hash: string) => void) {
  let destina_address = ContractAddress[userInfo.chainID].L1;
  if (token_address === getToken("XLD").id) {
    destina_address = ContractAddress[userInfo.chainID].stakingPool;
  }
  let contract = new web3.eth.Contract(ERC20MOCK, token_address);
  let bigAmount = convertNormalToBigNumber("1000000000", getToken(token_address).decimals);
  executeContract(contract, "approve", "0", [destina_address, bigAmount], callback);
}
/**
 * mint
 * @param token 
 * @param callback 
 */
export async function mint(token: tokenItem, callback: (code: number, hash: string | number) => void) {
  let contract = new web3.eth.Contract(ERC20MOCK, token.id);
  let bigAmount = convertNormalToBigNumber('1000000000', token.decimals);
  executeContract(contract, "mint", "0", [userInfo.account, bigAmount], callback);
}
/**
 * ######
 * @param token_address #########
 * @param to_address ############
 * @param amount ###### ######
 * @param callback ######
 */
export async function transfer(token_address: string, to_address: string, amount: string, callback: (code: number, hash: string) => void) {
  let contract = new web3.eth.Contract(ERC20MOCK, token_address);
  let bigAmount = convertNormalToBigNumber(amount, getToken(token_address).decimals);
  executeContract(contract, "transfer", "0", [to_address, bigAmount], callback);
}
/**
 * ###**######
 * @param token_address ############
 * @param from_address ############
 * @param to_address ############
 * @param amount ###### ######
 * @param callback ######
 */
export async function transferFrom(token_address: string, from_address: string, to_address: string, amount: string, callback: (code: number, hash: string) => void) {
  let contract = new web3.eth.Contract(ERC20MOCK, token_address);
  let bigAmount = convertNormalToBigNumber(amount, getToken(token_address).decimals);
  executeContract(contract, "transferFrom", "0", [from_address, to_address, bigAmount], callback);
}
/**
 * sign######
 * @param msg 
 * @param callback 
 */
export async function sign(timer: number) {
  //@ts-ignore
  let _ethereum: any = window['ethereum'];
  let msg = `omnix login address is ${userInfo.account},current time is ${timer}`;
  let res = { code: 1, sign: "" };
  try {
    const from = userInfo.account;
    const sign = await _ethereum.request({
      method: 'personal_sign',
      params: [msg, from],
    });
    res = { code: 1, sign };
  } catch (e: any) {
    res = { code: 2, sign: e.message };
  }
  return res;
}
/**
 * deposit   ZKSYNC = 1;  SCROLL = 2; LINEA = 3;
 * @param amount 
 * @param symbol 
 * @param callback 
 */
export async function distribute(desChain: 280 | 324 | 59140 | 59144 | 534351 | 534352, address: string, nonce: string, amount: string, callback: (code: number, hash: string) => void) {
  let cid = "1";
  let value = "1200000000000000";
  const L2 = ContractAddress[desChain].L2;
  let contract = new web3.eth.Contract(ZKPAYROLLL1, ContractAddress[userInfo.chainID].L1);
  // const gasPrice = await web3.eth.getGasPrice();
  // value = await contract.methods.estimateGas(gasPrice, "1000000").call();
  switch (desChain) {
    case 280: {
      cid = "1";
      value = "1200000000000000";
      break;
    }
    case 324: {
      cid = "1";
      value = "1200000000000000";
      break;
    }
    case 534351: {
      cid = "2";
      value = "8000000000000000";
      break;
    }
    case 534352: {
      cid = "2";
      value = "1200000000000000";
      break;
    }
    case 59140: {
      cid = "3";
      value = "0";
      break;
    }
    case 59144: {
      cid = "3";
      value = "0";
      break;
    }
  }
  let bigAmount = convertNormalToBigNumber(amount, getToken(address).decimals);
  executeContract(contract, "commitTransfer", value, [L2, address, nonce, cid, bigAmount, "1000000"], callback);
}

export async function withdraw(_data: any, proof: any, callback: (code: number, hash: string) => void) {
  let contract = new web3.eth.Contract(ZKPAYROLLL2, ContractAddress[userInfo.chainID].L2);
  executeContract(contract, "withdraw", '0', [_data, proof], callback);
}

export async function stake(amount: string | number, callback: (code: number, hash: string) => void) {
  let contract = new web3.eth.Contract(STAKEPOOL, ContractAddress[userInfo.chainID].stakingPool);
  let bigAmount = convertNormalToBigNumber(amount);
  executeContract(contract, "stake", '0', [bigAmount], callback);
}

export async function unstake(amount: string | number, callback: (code: number, hash: string) => void) {
  let contract = new web3.eth.Contract(STAKEPOOL, ContractAddress[userInfo.chainID].stakingPool);
  let bigAmount = convertNormalToBigNumber(amount);
  executeContract(contract, "withdraw", '0', [bigAmount], callback);
}

export async function claim(amount: string | number, callback: (code: number, hash: string) => void) {
  let contract = new web3.eth.Contract(STAKEPOOL, ContractAddress[userInfo.chainID].stakingPool);
  let bigAmount = convertNormalToBigNumber(amount);
  executeContract(contract, "claim", '0', [bigAmount], callback);
}
