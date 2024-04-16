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
      api:'https://api.aptos.m1.movementlabs.xyz',

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
    },

    faucetMevm(address: string,chain:number) {
      console.log('faucetMevm',address,chain)
      return new Promise((resolve, reject) => {
        fetch(`${this.api}/faucet/mevm`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({address,chain}),
        })
          .then((res) => res.json())
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    faucetMove(address: string,chain:number) {
      return new Promise((resolve, reject) => {
        fetch(`${this.api}/faucet/move`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({address,chain}),
        })
          .then((res) => res.json())
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    

    

  },

  //   persist: {
  //     enabled: true, // localstorage
  //     storage: localStorage, //  sessionStorage
  //     paths: [], // 
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
