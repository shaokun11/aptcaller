import { AbiItem } from "web3-utils";
import { toHex } from "./tools";
import { erc20 } from "./abis/erc20";
import { erc20mock } from "./abis/erc20mock";
import { stakepool } from "./abis/stakepool";
import { zkpayrolll1 } from "./abis/zkpayrolll1";
import { zkpayrolll2 } from "./abis/zkpayrolll2";
export const ERC20 = erc20 as AbiItem[];
export const ERC20MOCK = erc20mock as AbiItem[];
export const STAKEPOOL = stakepool as AbiItem[];
export const ZKPAYROLLL1 = zkpayrolll1 as AbiItem[];
export const ZKPAYROLLL2 = zkpayrolll2 as AbiItem[];

export const chainIdDict = {
  1: "Ethereum Mainnet",
  2: "Aptos Testnet",
  3: "Ropsten Testnet",
  4: "Rinkeby Testnet",
  5: "Goerli Testnet",
  42: "Kovan Testnet",
  56: "Bsc Mainnet",
  97: "Bsc Testnet",
  128: "HECO Mainnet",
  137: "Polygon Mainnet",
  250: "Fantom Mainnet",
  280: "zkSync Era Testnet",
  324: "zkSync Era",
  336: "MULTEST",
  1023: "CLOVER Mainnet",
  4002: "Fantom Testnet",
  59140: "Linea Testnet",
  59144: "Linea",
  11155111: "Sepolia Testnet",
  534351: "Scroll Testnet",
  534352: "Scroll",
  80001: "Polygon Mumbai",
  43113: "Avalanche Testnet",
  43114: "Avalanche Mainnet",
  421613: "Arbitrum Testnet",
};

export const isOnLine = true;//是否是线上

export interface IuserInfo { account: string, chainID: 1 | 5 | 280 | 324 | 59140 | 59144 | 11155111 | 534351 | 534352, chain: string, message: string, providerInfo: any }

export const userInfo: IuserInfo = {
  account: "",
  chainID: 5,
  chain: chainIdDict[5],
  message: "success",
  providerInfo: ""
};
export const ContractAddress = {
  1: {//Ethereum Mainnet
    "L1": "0xA27989f75A33D093795E4A5eb6e25e67387cEBB1",
    "L2": "",
    "WETH": "",
    "stakingPool": "0xb5EA2984afF668234477740E50DeD90C52653270",
    "rpc": "",
    "scan": "https://etherscan.io/",
    // "gql": "https://graphql.cedro.finance/subgraphs/name/cedro/server",//线上
    "gql": "https://graphv2.multiple.fi/subgraphs/name/cedro/server1",//测试站
  },
  
  5: {//Goerli Testnet
    "L1": "0xE022Ad497Edd470fF403ef49d66c7f5C5acF58Bd",
    "L2": "",
    "WETH": "",
    "stakingPool": "0xb5EA2984afF668234477740E50DeD90C52653270",
    "rpc": "",
    "scan": "https://goerli.etherscan.io/",
    // "gql": "https://graphql.cedro.finance/subgraphs/name/cedro/server",//线上
    "gql": "https://graphv2.multiple.fi/subgraphs/name/cedro/server1",//测试站
  },
  280: {//zkSync Era Testnet
    "L1": "",
    "L2": "0x93B3172f7EC39262ca71ee45168b36Bb7d0acAea",
    "stakingPool": "",
    "WETH": "",
    "rpc": "",
    "scan": "https://scan-v2.zksync.dev/",
    "gql": "https://graphv2.multiple.fi/subgraphs/name/cedro/server1",
  },
  324: {//zkSync Era Mainnet
    "L1": "",
    "L2": "0xA5079671B7ba3f57b2c265f8BE5EEca946E9ECC0",
    "stakingPool": "",
    "WETH": "",
    "rpc": "",
    "scan": "https://explorer.zksync.io",
    "gql": "https://graphv2.multiple.fi/subgraphs/name/cedro/server1",
  },
 
  59140: {//Linea Testnet
    "L1": "",
    "L2": "0x25a8227206e037c74CfeC5Ad790E1991fBa0DC13",
    "stakingPool": "",
    "WETH": "",
    "rpc": "",
    "scan": "https://goerli.lineascan.build/",
    "gql": "https://graphv2.multiple.fi/subgraphs/name/cedro/server1",
  },
  59144: {//Linea
    "L1": "",
    "L2": "0xaf2F12F571FA356DeeF7521B01a1713B792C2623",
    "stakingPool": "",
    "WETH": "",
    "rpc": "",
    "scan": "https://lineascan.build",
    "gql": "https://graphv2.multiple.fi/subgraphs/name/cedro/server1",
  },
  11155111: {//sepolia
    "L1": "0xF80cd4FDB750560d9Cd72Ca58898dF78b0CF3CC9",
    "L2": "",
    "WETH": "",
    "stakingPool": "",
    "rpc": "",
    "scan": "https://sepolia.etherscan.io/",
    "gql": "https://graphv2.multiple.fi/subgraphs/name/cedro/server1",
  },
  534351: {//Scroll Testnet
    "L1": "",
    "L2": "0x38DC712f2885D4261d2a7571C5b555c60612766a",
    "stakingPool": "",
    "WETH": "",
    "rpc": "",
    "scan": "https://scroll-sepolia.l2scan.co",
    "gql": "https://graphv2.multiple.fi/subgraphs/name/cedro/server1",
  },
  534352: {//Scroll
    "L1": "",
    "L2": "0xaf2F12F571FA356DeeF7521B01a1713B792C2623",
    "stakingPool": "",
    "WETH": "",
    "rpc": "",
    "scan": "https://scrollscan.com",
    "gql": "https://graphv2.multiple.fi/subgraphs/name/cedro/server1",
  }
};
export interface tokenItem {
  symbol: string,
  id: string,
  decimals: number,
  chainid: number
}
/**
 * tokens
 */
export const tokens: tokenItem[] = [
  { decimals: 6, id: "0xdAC17F958D2ee523a2206206994597C13D831ec7", symbol: "USDT", chainid: 1 },
  { decimals: 6, id: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", symbol: "USDC", chainid: 1 },
  { decimals: 6, id: "0x493257fD37EDB34451f62EDf8D2a0C418852bA4C", symbol: "USDT", chainid: 324 },
  { decimals: 6, id: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4", symbol: "USDC", chainid: 324 },
  { decimals: 6, id: "0xf55BEC9cafDbE8730f096Aa55dad6D22d44099Df", symbol: "USDT", chainid: 534352 },
  { decimals: 6, id: "0xA9Fd3496EE5131aFFcadF4944ed617Ca3585d1aA", symbol: "USDC", chainid: 534352 },
  // { decimals: 6, id: "0xA219439258ca9da29E9Cc4cE5596924745e12B93", symbol: "USDT", chainid: 59144 },
  { decimals: 6, id: "0x176211869cA2b568f2A7D4EE941E073a821EE1ff", symbol: "USDC", chainid: 59144 },

  { decimals: 6, id: "0xF14323d30F1f1563A5B90904B772D7263f253AE2", symbol: "USDT", chainid: 5 },
  { decimals: 18, id: "0xe863b78D754a6FD91e8D173839A5D3dFaC0B3463", symbol: "BUSD", chainid: 5 },
  { decimals: 6, id: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F", symbol: "USDC", chainid: 5 },
  { decimals: 18, id: "0x18c269b4C04aDc3810A506f9F3A553E48c7a6f38", symbol: "XLD", chainid: 5 },

  { decimals: 18, id: "0xec798a5c3f23119F4E7d6f5e4A0662122cb48dF1", symbol: "USDT", chainid: 280 },
  { decimals: 18, id: "0x8B7F3bFA6A7257a7e13EAEB1EF99c52414f97711", symbol: "BUSD", chainid: 280 },
  { decimals: 18, id: "0xA913841aeFC48Ef3913eDd61c1146a0eE3044D44", symbol: "USDC", chainid: 280 },

  { decimals: 18, id: "0xB4257F31750961C8e536f5cfCBb3079437700416", symbol: "USDC", chainid: 59140 },
  { decimals: 6, id: "0x9405A67c48664C460Dd3B48D1077b87f5A620A27", symbol: "USDC", chainid: 11155111 },
  { decimals: 18, id: "0x0B3F2E9986c6E999E4D16E83C414AFe404288896", symbol: "USDC", chainid: 534351 },

];
export const importTokens: tokenItem[] = [
  { decimals: 6, id: "0xdAC17F958D2ee523a2206206994597C13D831ec7", symbol: "USDT", chainid: 1 },
  { decimals: 6, id: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", symbol: "USDC", chainid: 1 },
  { decimals: 6, id: "0x493257fD37EDB34451f62EDf8D2a0C418852bA4C", symbol: "USDT", chainid: 324 },
  { decimals: 6, id: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4", symbol: "USDC", chainid: 324 },
  { decimals: 6, id: "0xf55BEC9cafDbE8730f096Aa55dad6D22d44099Df", symbol: "USDT", chainid: 534352 },
  { decimals: 6, id: "0xA9Fd3496EE5131aFFcadF4944ed617Ca3585d1aA", symbol: "USDC", chainid: 534352 },
  // { decimals: 6, id: "0xA219439258ca9da29E9Cc4cE5596924745e12B93", symbol: "USDT", chainid: 59144 },
  { decimals: 6, id: "0x176211869cA2b568f2A7D4EE941E073a821EE1ff", symbol: "USDC", chainid: 59144 },

  { decimals: 6, id: "0xF14323d30F1f1563A5B90904B772D7263f253AE2", symbol: "USDT", chainid: 5 },
  { decimals: 18, id: "0xe863b78D754a6FD91e8D173839A5D3dFaC0B3463", symbol: "BUSD", chainid: 5 },
  { decimals: 6, id: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F", symbol: "USDC", chainid: 5 },
  { decimals: 18, id: "0x18c269b4C04aDc3810A506f9F3A553E48c7a6f38", symbol: "XLD", chainid: 5 },
  { decimals: 18, id: "0xec798a5c3f23119F4E7d6f5e4A0662122cb48dF1", symbol: "USDT", chainid: 280 },
  { decimals: 18, id: "0x8B7F3bFA6A7257a7e13EAEB1EF99c52414f97711", symbol: "BUSD", chainid: 280 },
  { decimals: 18, id: "0xA913841aeFC48Ef3913eDd61c1146a0eE3044D44", symbol: "USDC", chainid: 280 },
  { decimals: 18, id: "0xB4257F31750961C8e536f5cfCBb3079437700416", symbol: "USDC", chainid: 59140 },
  { decimals: 6, id: "0x9405A67c48664C460Dd3B48D1077b87f5A620A27", symbol: "USDC", chainid: 11155111 },
  { decimals: 18, id: "0x0B3F2E9986c6E999E4D16E83C414AFe404288896", symbol: "USDC", chainid: 534351 },
];
export interface poolItem {
  id: string,
  token0: tokenItem,
  token1: tokenItem,
}
/**
 * pools
 */
export const pools: poolItem[] = [{
  id: "1",
  token0: { decimals: 18, id: "0xeC6Fa956E645700e7E91d3310191c6C56D7f11fF", symbol: "USDT", chainid: 5 },
  token1: { decimals: 18, id: "0xC5856FF91E8BB97C8E536AdE917A96754774B39E", symbol: "BUSD", chainid: 5 },
}]

export const Chains = {
  1: [{
    chainId: toHex(1),
    chainName: 'Ethereum Mainnet',
    nativeCurrency:
    {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/eth'],
    blockExplorerUrls: ['https://etherscan.io/'],
  }],
  5: [{
    chainId: toHex(5),
    chainName: 'Goerli Testnet',
    nativeCurrency:
    {
      name: 'GoerliETH',
      symbol: 'GoerliETH',
      decimals: 18,
    },
    rpcUrls: ['https://goerli.blockpi.network/v1/rpc/public'],
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  }],
  97: [{
    chainId: toHex(97),
    chainName: 'Bsc Testnet',
    nativeCurrency:
    {
      name: 'tBNB',
      symbol: 'tBNB',
      decimals: 18,
    },
    rpcUrls: ['https://data-seed-prebsc-1-s3.binance.org:8545/'],
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
  }],
  137: [{
    chainId: toHex(137),
    chainName: 'Polygon Mainnet',
    nativeCurrency:
    {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/'],
  }],
  280: [{
    chainId: toHex(280),
    chainName: 'zkSync Era Testnet',
    nativeCurrency:
    {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://testnet.era.zksync.dev'],
    blockExplorerUrls: ['https://scan-v2.zksync.dev/'],
  }],
  324: [{
    chainId: toHex(324),
    chainName: 'zkSync Era Mainnet',
    nativeCurrency:
    {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.era.zksync.io'],
    blockExplorerUrls: ['https://explorer.zksync.io'],
  }],
  
  336: [
    {
      chainId: toHex(336),
      chainName: 'MovementTestnet',
      nativeCurrency:
      {
        name: 'MOV EVM',
        symbol: 'SDN',
        decimals: 18,
      },
      rpcUrls: ['https://mevm.devnet.m1.movementlabs.xyz/v1'],
      blockExplorerUrls: ['https://mevm.devnet.m1.movementlabs.xyz/v1'],
    },
  ],
  4002: [{
    chainId: toHex(4002),
    chainName: 'Fantom Test Network',
    nativeCurrency:
    {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/fantom_testnet'],
    blockExplorerUrls: ['https://testnet.ftmscan.com/'],
  }],
  43113: [{
    chainId: toHex(43113),
    chainName: 'Avalanche FUJI C-Chain',
    nativeCurrency:
    {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://testnet.snowtrace.io/'],
  }],
  59140: [{
    chainId: toHex(59140),
    chainName: 'Linea Goerli',
    nativeCurrency:
    {
      name: 'LineaETH',
      symbol: 'LineaETH',
      decimals: 18,
    },
    rpcUrls: ['https://linea-goerli.infura.io/v3/'],
    blockExplorerUrls: ['https://goerli.lineascan.build/'],
  }],
  59144: [{
    chainId: toHex(59144),
    chainName: 'Linea',
    nativeCurrency:
    {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.linea.build'],
    blockExplorerUrls: ['https://lineascan.build'],
  }],
  80001: [{
    chainId: toHex(80001),
    chainName: 'Polygon Mumbai',
    nativeCurrency:
    {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://rpc.ankr.com/polygon_mumbai'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  }],
  421613: [{
    chainId: toHex(421613),
    chainName: 'Arbitrum Goerli Testnet',
    nativeCurrency:
    {
      name: 'AGOR',
      symbol: 'AGOR',
      decimals: 18
    },
    rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://goerli.arbiscan.io/'],
  }],
  11155111: [{
    chainId: toHex(11155111),
    chainName: 'Sepolia',
    nativeCurrency:
    {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.goerli.linea.build'],
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
  }],
  534351: [{
    chainId: toHex(534351),
    chainName: 'Scroll Testnet',
    nativeCurrency:
    {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://scroll-testnet-public.unifra.io'],
    blockExplorerUrls: ['https://scroll-sepolia.l2scan.co'],
  }],
  534352: [{
    chainId: toHex(534352),
    chainName: 'Scroll',
    nativeCurrency:
    {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.scroll.io'],
    blockExplorerUrls: ['https://scrollscan.com'],
  }],
}