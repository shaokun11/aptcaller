import { defineStore } from "pinia";
export type AptAccount = {
  address: string;
  publicKey: string;
  network: string;
};
export const userStore = defineStore({
  // unique id for this store
  id: "user",
  // return initial state
  state: () => {
    return {
      count: 0,
      token: "",
      user: null,
      api:'https://cosmos.bbd.sh',

      account: "",
      network: "",
      showConnect: false,
      showSwitchNet: false,
      icon: "",
      aptAccount: null,
    };
  },
  getters: {
    // user: (state) => {
    //   if (!state.user) {
    //     try {
    //       const user = localStorage.getItem(process.env.VITE_APP_USER_KEY||'user');
    //       state.user = JSON.parse(user || "{}");
    //     } catch (e) {
    //       console.error(e);
    //     }
    //   }
    //   return state.user;
    // },
  },
  // actions for this store
  actions: {
    // set the network
    setNetwork(n: string) {
      this.network = n;
    },

    // set the showConnect
    setshowConnect(b: boolean) {
      this.showConnect = b;
    },
    // set the showSwitchNet
    setshowSwitchNet(b: boolean) {
      this.showSwitchNet = b;
    },

    // set the account
    setAccount(account: string) {
      this.account = account;
    },
    // set the aptAccount
    setAptAccount(account: any) {
      this.aptAccount = account;
    },
    // set the icon
    setIcon(icon: string) {
      this.icon = icon;
    },

    // add the count
    add() {
      this.count++;
    },

    // set the user info
    setUserInfo(data: any) {
      this.user = data.user_info;
      this.token = data.token;
    },
    // logout the user
    logout() {
      this.token = "";
      this.user = null;
    },
    // set the user
    setUser(user: any) {
      this.user = user;
      //   localStorage.setItem(process.env.VITE_APP_USER_KEY||'user', JSON.stringify(user));
    },

    getBlockLatest(){   //查询最新block数据
      return new Promise((resolve, reject) => {
        fetch(`${this.api}/cosmos/base/tendermint/v1beta1/blocks/latest`)
          .then((res) => res.json())
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    //查询block数据
    getBlock(height: number|string) {
      return new Promise((resolve, reject) => {
        fetch(`${this.api}/cosmos/tx/v1beta1/txs/block/${height}`)
          .then((res) => res.json())
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    //查询交易数据
    getTx(hash: string) {
      return new Promise((resolve, reject) => {
        fetch(`${this.api}/cosmos/tx/v1beta1/txs/${hash}`)
          .then((res) => res.json())
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }

  },

  //   persist: {
  //     enabled: true, // 开启缓存  默认会存储在本地localstorage
  //     storage: localStorage, // 缓存使用方式 sessionStorage
  //     paths: [], // 需要缓存键
  //   },
});

// const userStore = userStore()

// const {count,token} = storeToRefs(userStore)

// function updateStore(){

//     //  ---1
//     userStore.count = 55;
//     userStore.token = 'fasdfa';

//     //---2
//     userStore.$patch({
//         count : 55,
//         token : 'fasdfa'
//     })
//----3 $reset()
//      userStore.$reset()

// }
