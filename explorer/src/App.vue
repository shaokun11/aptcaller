<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { userStore } from "@/store/modules/user";
import { connect, changeMetamaskChain } from "@/utils/sdk/wallets";
import { CSSProperties, computed, onMounted, onUnmounted, onUpdated, ref, watch } from "vue";
import { showToast, trace } from "./utils/tools";
const headerStyle: CSSProperties = {
  textAlign: 'center',
  height: 80,
  paddingInline: 80,
  lineHeight: '64px',
};

const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 228px)',
  padding:  '24px 50px',
};

const siderStyle: CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
};

const footerStyle: CSSProperties = {
  textAlign: 'center',
};

const ID = 336;
const wallets = ref<Object[]>([
  {
    id: "injected",
    icon: "metamask",
    name: "Metamask",
  },
  // {
  //   id:"walletconnect",
  //   icon:'walletConnect',
  //   name:"Wallet Connect",
  // },
  {
    id: "coinbase",
    icon: "coinbaseWallet",
    name: "Coinbase Wallet",
  },
  {
    id: "binance",
    icon: "binanceChainWallet",
    name: "Binance Chain Wallet",
  },
]);

const otherNetwork = ref({
  chainId: 1,
  icon: "",
  name: "",
});

const _userStore = userStore();
const _s = storeToRefs(_userStore);
const { showSwitchNet, showConnect } = _s;
onMounted(() => {
  trace("ID-", ID);
  trace(`the component is now mounted.`);
});

onUpdated(() => {
  trace(`the component is now updated.`);
});

watch(showConnect, (a: boolean, b: boolean) => {
  trace("watch-showConnect", a, b);
  if (a) {
    selWallet();
  }
});
computed(() => {
  return 1;
});
onUnmounted(() => {
  trace(`the component is now unmounted.`);
});

function selWallet() {
  connect((res: any) => {
    trace("account-info=", res, res.providerInfo.logo);
    if (res.chainID == ID) {
      _userStore.setIcon(res.providerInfo.logo);
      _userStore.setAccount(res.account);
      _userStore.setNetwork(res.chain);
      _userStore.setshowSwitchNet(false);

      if (res.message == "accountsChanged") {
        showToast("The account is successfully changed.");
      } else {
        showToast("The wallet is successfully connected.");
      }
    } else {
      if (res.chainID) {
        _userStore.setAccount("");
        _userStore.setNetwork("");
        _userStore.setshowSwitchNet(true);

        otherNetwork.value = {
          chainId: res.chainID,
          icon: res.providerInfo.logo,
          name: res.chain,
        };
      }
    }
  });
}

function switchNet() {
  changeMetamaskChain(ID);
}

function handleClose2() {
  _userStore.setshowSwitchNet(false);
}
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#00b96b',
        colorArrowBackground: '#0000ff',
      },
    }"
  >
  <a-layout>
    <a-layout-header :style="headerStyle">
      <GB-Head></GB-Head>
    </a-layout-header>
    <a-layout-content :style="contentStyle">
      <router-view />
    </a-layout-content>
    <a-layout-footer :style="footerStyle">
      <GB-Foot></GB-Foot>
    </a-layout-footer>
  </a-layout>
    <div class="container">
      

      

      <a-modal
        title="Switch Network"
        v-model:open="showSwitchNet"
        @cancel="handleClose2"
        width="480px"
      >
        <div class="classswitchCon">
          <div class="classswitchConP1" style="text-align: center">
            You're currently on {{ otherNetwork.name }}.
            <br />
            Please switch to <span style="color: #ffd016">EVM-MOVE. </span>
          </div>
          <div
            style="
              margin-top: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <img style="width: 68px" :src="otherNetwork.icon" />
            <img
              style="width: 48px; margin: 0 24px"
              src="./assets/arrow_right.png"
            />
            <img style="width: 68px" src="./assets/defaultNetwork.png" />
          </div>

          <div style="margin-top: 32px; text-align: center">
            <a-button type="primary" class="classcard1_btn" @click="switchNet"
              >Switch</a-button
            >
          </div>
        </div>
      </a-modal>

      <!-- <Footer></Footer> -->
    </div>
  </a-config-provider>
</template>

<style lang="scss" scoped>
.container {
  background: #1e1e1e;
}
.con1 {
  width: 100%;
  min-height: 100vh;
  background: #1e1e1e;
  overflow-y: auto;
}

.witem {
  position: relative;
  cursor: pointer;
  padding: 12px 28px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 24px;

  display: flex;
  align-items: center;
  border: transparent solid 1px;
}
.witem:hover {
  border: #ffd016 solid 1px;
}
.witem:hover span {
  color: #ffd016;
  font-size: 15px;
}
.witemimg {
  width: 36px;
  margin-right: 10px;
}
.witemtxt {
  font-family: "IBM Plex Mono";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  color: white;
}

.switchCon {
  position: relative;
}
.switchConP1 {
  font-family: "IBM Plex Mono";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;

  color: #ffffff;
}
</style>
