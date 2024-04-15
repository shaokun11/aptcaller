<template>
  <a-flex class="heard" horizontal justify="space-between" align="center">
    <div>
      <img style="height: 20px" src="@/assets/logo_txt_w.svg" />
    </div>

    <a-flex  align="center">
      
      <!-- <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal" :theme="theme">
        <a-menu-item  key="1"><i>sub1</i></a-menu-item>
        <a-menu-item key="2"><i>option 2</i></a-menu-item>
      </a-menu> -->
    </a-flex>

    <a-flex v-if="0" align="center">
      <a-button
        type="primary"
        plain
        v-if="!aptAccount"
        class="title-btn"
        @click="connecAPT"
        >Connect Petra</a-button
      >
      <a-flex v-else>
        <a-popover
          placement="bottomLeft"
          width="162"
          trigger="click"
          :bodyStyle="{ background: 'red', color: 'blue' }"
        >
          <template #content>
            <div class="accoutInfo">
              <div>
                <div class="accoutInfoTitle">Network：</div>
                <div>
                  <span
                    style="
                      display: inline-block;
                      border-radius: 4px;
                      width: 4px;
                      height: 4px;
                      background: #1eecbb;
                      margin-right: 8px;
                      margin-bottom: 3px;
                    "
                  ></span>
                  MOVE-APT
                </div>
              </div>
              <div
                style="
                  border: 1px solid rgba(255, 255, 255, 0.03);
                  width: 200px;
                  margin-left: -20px;
                  margin-top: 6px;
                "
              ></div>
              <div
                style="margin-top: 16px; display: flex; cursor: pointer"
                @click="copyToAccApt"
              >
                <img src="@/assets/icon_copy.png" />
                Copy Address
              </div>
              <div
                style="margin-top: 16px; display: flex; cursor: pointer"
                @click="loginOutApt"
              >
                <img src="@/assets/icon_balance.png" />
                Disconnect
              </div>
            </div>
          </template>

          <a-flex class="mcon2" align="center">
            <a-flex
              style="width: 18px; height: 17px; margin-right: 6px; color: white"
            >
              <svg
                width="100%"
                height="100%"
                baseProfile="tiny"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 112 112"
                overflow="visible"
                xml:space="preserve"
              >
                <path
                  fill="currentColor"
                  d="M86.6 37.4h-9.9c-1.1 0-2.2-.5-3-1.3l-4-4.5c-1.2-1.3-3.1-1.4-4.5-.3l-.3.3-3.4 3.9c-1.1 1.3-2.8 2-4.5 2H2.9C1.4 41.9.4 46.6 0 51.3h51.2c.9 0 1.8-.4 2.4-1l4.8-5c.6-.6 1.4-1 2.3-1h.2c.9 0 1.8.4 2.4 1.1l4 4.5c.8.9 1.9 1.4 3 1.4H112c-.4-4.7-1.4-9.4-2.9-13.8H86.6zM53.8 65l-4-4.5c-1.2-1.3-3.1-1.4-4.5-.3l-.3.3-3.5 3.9c-1.1 1.3-2.7 2-4.4 2H.8c.9 4.8 2.5 9.5 4.6 14h25.5c.9 0 1.7-.4 2.4-1l4.8-5c.6-.6 1.4-1 2.3-1h.2c.9 0 1.8.4 2.4 1.1l4 4.5c.8.9 1.9 1.4 3 1.4h56.6c2.1-4.4 3.7-9.1 4.6-14H56.8c-1.2 0-2.3-.5-3-1.4zm19.6-43.6 4.8-5c.6-.6 1.4-1 2.3-1h.2c.9 0 1.8.4 2.4 1l4 4.5c.8.9 1.9 1.3 3 1.3h10.8c-18.8-24.8-54.1-29.7-79-11-4.1 3.1-7.8 6.8-11 11H71c1 .2 1.8-.2 2.4-.8zM34.7 94.2c-1.2 0-2.3-.5-3-1.3l-4-4.5c-1.2-1.3-3.2-1.4-4.5-.2l-.2.2-3.5 3.9c-1.1 1.3-2.7 2-4.4 2h-.2C36 116.9 71.7 118 94.4 96.7c.9-.8 1.7-1.7 2.6-2.6H34.7z"
                ></path>
              </svg>
            </a-flex>
            <span class="mcont1">{{
              replaceStr(aptAccount["address"])
            }}</span>
          </a-flex>
        </a-popover>
      </a-flex>

      <span style="width: 24px"></span>

      <a-button
        type="primary"
        v-if="!account || account.length < 10"
        class="title-btn"
        @click="connecWallet"
        >Connect EVM</a-button
      >
      <a-flex v-else>
        <a-popover placement="bottomRight" width="162" trigger="click">
          <template #content>
            <div class="accoutInfo">
              <div>
                <div class="accoutInfoTitle">Network：</div>
                <div>
                  <span
                    style="
                      display: inline-block;
                      border-radius: 4px;
                      width: 4px;
                      height: 4px;
                      background: #1eecbb;
                      margin-right: 8px;
                      margin-bottom: 3px;
                    "
                  ></span>
                  {{ network }}
                </div>
              </div>
              <div
                style="
                  border: 1px solid rgba(255, 255, 255, 0.03);
                  width: 200px;
                  margin-left: -20px;
                  margin-top: 6px;
                "
              ></div>
              <div
                style="margin-top: 16px; display: flex; cursor: pointer"
                @click="copyToAcc"
              >
                <img src="@/assets/icon_copy.png" />
                Copy Address
              </div>
              <div
                style="margin-top: 16px; display: flex; cursor: pointer"
                @click="loginOut"
              >
                <img src="@/assets/icon_balance.png" />
                Disconnect
              </div>
            </div>
          </template>

          <div class="mcon">
            <img
              style="width: 18px; height: 17px; margin-right: 6px"
              src="@/assets/metamask.png"
            />
            <span class="mcont1">
              {{replaceStr(account)}}</span>
          </div>
        </a-popover>
      </a-flex>

      <a-switch
        :checked="theme === 'dark'"
        checked-children="Dark"
        un-checked-children="Light"
        @change="changeTheme"
      />
    </a-flex>
  </a-flex>
</template>
<script lang="ts" setup>
import { petraConnect } from "@/utils/sdk/petra";
import { trace, copy,replaceStr } from "@/utils/tools";
import { VueElement, computed, h, onMounted, onUnmounted, onUpdated, reactive, ref, watch } from "vue";
import { userStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";
import { MenuTheme, ItemType } from "ant-design-vue";

const selectedKeys = ref<string[]>(["1"]);
const preOpenKeys = ref(['sub1']);
const theme = ref<MenuTheme>('dark');
const ID = ref<Number>(0);
const store = userStore();
const { account, network, aptAccount, showConnect } = storeToRefs(store);
const items = reactive([
  getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
]);

onMounted(() => {
  trace("ID-", ID.value);
  console.log(`the component is now mounted.`);
});

onUpdated(() => {
  console.log(`the component is now updated.`);
});

watch(ID, (a: Number, b: Number) => {
  console.log("ID changed.", a, b);
});
watch(selectedKeys, (a: string[], b: string[]) => {
  console.log("router-change.", a, b);
});
computed(() => {
  return 1;
});
onUnmounted(() => {
  console.log(`the component is now unmounted.`);
});

//methods


function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType;
}


function changeTheme(checked: boolean){
  theme.value = checked ? 'dark' : 'light';
};
function loginOut() {
  store.logout();
  store.setAccount("");
  store.setNetwork("");
}
function loginOutApt() {
  store.logout();
  store.setAptAccount(null);
}
function showToast(content:any, type = "success") {
  this.$message({
    message: content,
    type: type || "success",
    duration: 3500,
  });
}
function copyToAcc() {
  copy(account, (res:any) => {
    if (res.code == 1) {
      showToast("Address replication succeeded.");
    } else {
      showToast("Address replication error.", "error");
    }
  });
}
function copyToAccApt() {
  if (
    copy(aptAccount.address, {
      debug: true,
      message: "Address replication succeeded",
    })
  ) {
    showToast("Address replication succeeded.");
  }
}
function connecWallet() {
  trace("connecWallet", showConnect.value);
  store.setshowConnect(!showConnect.value);
}
async function connecAPT() {
  try {
    let acc = await petraConnect((res:any) => {
     upAptAccount(res);
    });
    upAptAccount(acc);
  } catch (e) {
    trace(e);
  }
}

function upAptAccount(res:any) {
  if (res.code != 4001) {
        trace("res-petra-network",res.network)
        if(res?.network?.chainId==4){
          store.setAptAccount(res);
        }else{
          store.setAptAccount(null);
        }
      }else{
        store.setAptAccount(null);
      }
}
</script>

<style lang="scss" scoped>
.heard {
  position: relative;
}
.title-btn {
  width: 148px;
  height: 40px;
}

.mcon {
  padding: 12px 16px;
  cursor: pointer;
  height: 40px;
  display: inline-flex;
  align-items: center;

  margin-left: 16px;

  border-radius: 12px;
  border: 1px solid var(--bmq-primary);
  background: var(--bmq-primary);
}
.mcon2 {
  padding: 12px 16px;
  cursor: pointer;
  height: 40px;


  margin-left: 16px;

  border-radius: 12px;
  border: 1px solid var(--bmq-primary);
}
// .mcon:hover {
  // border: 1px solid var(--bmq-primary);
// }
.mcont1 {
  color: #fff;
  font-feature-settings:
    "salt" on,
    "liga" off;
  font-family: Sora;
  font-size: 12px;
  font-weight: 400;
}

.accoutInfo {
  // background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  // transform: matrix(1, 0, 0, -1, 0, 0);
  padding: 20px;

  font-family: "IBM Plex Mono";
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */

  color: #fff;
}
.accoutInfoTitle {
  font-family: "GT America Trial";
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;

  color: #fff;
}
.accoutInfo img {
  width: 24px;
  margin-right: 8px;
}
</style>
