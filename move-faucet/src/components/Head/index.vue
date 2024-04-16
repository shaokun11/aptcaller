<template>
  <a-flex class="heard" horizontal justify="space-between" align="center">
    <div style="margin-top: 24px;">
      <span style="cursor: pointer;" @click="goHome"><svg width="522" height="58" viewBox="0 0 522 58" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="width: auto; height: 26px;"><rect width="522" height="58" fill="url(#pattern0)"></rect><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_602_54" transform="scale(0.00444444 0.04)"></use></pattern><image id="image0_602_54" width="225" height="25" xlink:href="data:image/png;base64,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"></image></defs></svg></span>
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
import { useRouter } from "vue-router";
const router = useRouter();
const selectedKeys = ref<string[]>(["1"]);
const preOpenKeys = ref(['sub1']);
const theme = ref<MenuTheme>('dark');
const ID = ref<Number>(0);
const store = userStore();
const { account, network, aptAccount, showConnect } = storeToRefs(store);
const items = reactive([
  getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
]);

function goHome(){
  router.push({path:'/'});
}

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
