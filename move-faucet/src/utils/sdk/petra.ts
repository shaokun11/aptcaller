import { AptosClient } from "aptos";
import { convertBigNumberToNormal, convertNormalToBigNumber } from "./tools";

//@ts-ignore
const isPetraInstalled = window["aptos"];
const getAptosWallet = () => {
  if ("aptos" in window) {
    return window.aptos;
  } else {
    window.open("https://petra.app/", `_blank`);
  }
};

const wallet: any = getAptosWallet();
export async function petraConnect(
  callback: (arg0: { address: string; network: string }) => void
) {
  let res = { code: 200, address: "", network: "", message: "successful" };
  try {
    await wallet.connect();
    const account = await wallet.account();
    res.address = account.address;
    res.network = await wallet.getNetwork();
    wallet.onAccountChange(async (newAccount: string) => {
      let network = await wallet.getNetwork();
      if (newAccount) {
        if(callback)callback({ address: newAccount, network });
      }
    });
    wallet.onNetworkChange(async (network: string) => {
      let account = await wallet.account();
      if (account) {
        if(callback)callback({ address: account.address, network });
      }
    });
  } catch (error: any) {
    res = { code: 4001, address: "", network: "", message: error };
  }
  return res;
}

export async function petraDisconnect() {
  await wallet.disconnect();
}

const contractAddress =
  "0x6c7efc6b3b0f2a3240736b0efaf514c7aa3c3de79c5e9b82dc72c8fe93b15ec2";
export async function petraSend(
  amount: string | number,
  address: string,
  callback: (arg0: number, arg1: string) => void
) {
  let payload = {
    function: contractAddress + `::evmtx::deposit`,
    type_arguments: [],
    arguments: [convertNormalToBigNumber(amount), formatEthAddress(address)],
  };
  const otherOptions = {
    max_gas_amount: "1000",
  };
  //@ts-ignore
  if (!isPetraInstalled) {
    callback(-1, "check aptos wallet!");
    return;
  }
  //@ts-ignore
  window["aptos"]
    .signAndSubmitTransaction(payload, otherOptions)
    .then((tx: { hash: any }) => {
      callback(1, tx.hash);
    })
    .catch((error: { message: any }) => callback(-1, error.message));
}

function formatEthAddress(addr: string) {
  addr = addr.toLowerCase();
  return "0x" + addr.slice(2).padStart(64, "0");
}

export async function getHashDetail(hash: string) {
  const client = new AptosClient("https://seed-node1.movementlabs.xyz");
  const txn = await client.waitForTransactionWithResult(hash);
  return txn.hash;
}

export async function petraGetbalance(symbol: string, user: string) {
  const client = new AptosClient("https://seed-node1.movementlabs.xyz");
  const resources = await client.getAccountResources(user);
  if (symbol === "APT") symbol = "AptosCoin";
  const isExist = resources.some((element) => element.type.includes(symbol));
  if (!isExist) {
    return 0;
  }
  let type_arguments = ["0x1::aptos_coin::AptosCoin"];
  switch (symbol) {
    case "USDC":
      type_arguments = [`${contractAddress}::usdc::USDC`];
      break;
    default:
      break;
  }
  const payload = {
    function: "0x1::coin::balance",
    type_arguments: type_arguments,
    arguments: [user],
  };
  let amount = await client.view(payload);
  return convertBigNumberToNormal(amount.toString(), 8);
}
