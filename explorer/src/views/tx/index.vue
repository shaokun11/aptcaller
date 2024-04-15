<template>
    <div class="block">

        <div class="block-title">
            <span class="t1">Transaction Hash:</span>
            <span class="t2" style="cursor: pointer;" @click="toMove">
                {{ tx }}
            </span>
        </div>
        <div class="b-con" v-if="info!=null">
            <div class="c-title">Transaction Details</div>
           
            <div class="c-item">
                <span class="t1">Block:</span>
                <span class="t2">{{ info.block }}</span>
            </div>
            <div class="c-item">
                <span class="t1">Timestamp:</span>
                <span class="t2">{{ info.time }}</span>
            </div>
            <div class="c-item">
                <span class="t1">Sender:</span>
                <span class="t2">{{ info.sender }}</span>
            </div>
            <div class="c-item">
                <span class="t1">Function:</span>
                <span class="t2">{{ info.to }}</span>
            </div>
            <div class="c-item">
                <span class="t1">Rollup ID:</span>
                <span class="t2">{{ info.id }}</span>
            </div>
            <div class="c-item">
                <span class="t1">Gas Limit:</span>
                <span class="t2">{{ info.gas_limit }}</span>
            </div>
            <div class="c-item">
                <span class="t1">Gas Used:</span>
                <span class="t2">{{ info.gas_used }}</span>
            </div>
            <div class="c-item">
                <span class="t1">Gas Wanted:</span>
                <span class="t2">{{ info.gas_wanted }}</span>
            </div>
            
            
            
        </div>
    </div>
</template>
<script lang="ts" setup>
import {
  onMounted,
  ref,
  watch,
  computed,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount,
} from "vue";
import { trace } from "@/utils/tools";
import { useRouter } from "vue-router";
import { userStore } from "@/store/modules/user";
const router = useRouter();
const _userStore = userStore();

const ID = ref<Number>(1);
const cid = ref<Number>(1);
const info = ref<any>();
const tx = ref<number|string>();

async function getTX(){
  const res1:any = await _userStore.getTx(tx.value);        //chain.replace("evm","rollup").replace("apt","rollup")
  cid.value = +getchain(res1).chain.replace("evm","").replace("apt","");
  trace("res1", res1,getchain(res1),cid);
  let e = res1.tx_response.events
  let v = JSON.parse(e[e.length-1].attributes[0].value)
  let h = v.hash;
  trace("v",v,h);
  info.value = {
    block: res1.tx_response.height,
    gas_used: res1.tx_response.gas_used,
    gas_wanted: res1.tx_response.gas_wanted,
    gas_limit:res1.tx.auth_info.fee.gas_limit,
    time: res1.tx_response.timestamp,
    sender:v.sender,
    to:v.payload.function,
    id:cid.value,
    mhash: h,

  };
}
function toMove(){
  const u1 = "https://explorer.test1.m1.movementlabs.xyz/#/txn/"+info.value.mhash+"?network=local";
  const u2 = "https://explorer.test2.m1.movementlabs.xyz/#/txn/"+info.value.mhash+"?network=local";
  window.open((cid.value==1)?u1:u2,"_blank")
}
function getchain(item:any){
  const str = item.tx.body.messages[0].header;
  let hex= "";
  for (var i = 0; i < str.length; i += 2) {
    hex += String.fromCharCode(parseInt(str.substr(i, 2), 16));
  }
  return JSON.parse(hex);
}

onBeforeUpdate(() => {
  console.log(`the component is now before updated.`);
});

onBeforeMount(() => {
  console.log(`the component is now before mounted.`);
});

onBeforeUnmount(() => {
  console.log(`the component is now before unmounted.`);
});

onBeforeMount(() => {
  console.log(`the component is now before mounted.`);
});

onMounted(() => {
    tx.value = router.currentRoute.value.query.tx;
    trace("tx", tx);
    getTX();
});

onUpdated(() => {
  console.log(`the component is now updated.`);
});

watch(ID, (a: Number, b: Number) => {
  console.log("ID changed.", a, b);
});
computed(() => {
  return 1;
});
onUnmounted(() => {
  console.log(`the component is now unmounted.`);
});
</script>
<style lang="scss" scoped>

 .block{
    position: relative;
    text-align: left;
    color: var(--bmq-text);
    width: 1160px;
    max-width: 100%;
    margin: 0 auto;
    
    .block-title{
        margin-top: 24px;
        .t1{
            font-size: 20px;
            font-weight: 600;
            
        }
        .t2{
            font-size: 1.3125rem;
            font-weight: 600;
            margin-left: 12px;
            color: var(--bmq-text2);
        }
        .t2:hover{
            color: var(--bmq-text3);
        }
    }
    
    .b-con{
        background: var(--bmq-bg2);
        padding: 24px;
        margin-top: 36px;
        border-radius: 16px;
        .c-title{
            font-size: 1.3125rem;
            font-weight: 600;
            margin-bottom: 24px;
            padding-bottom: 12px;
            border-bottom: 1px solid var(--bmq-line);
        }
        .c-item{
            display: flex;
            padding: 12px 0;padding: 20px 0;
            .t1{
                font-size: 1rem;
                font-weight: 600;
                color: var(--bmq-text2);
                width: 160px;
            }
            .t2{
                font-size: 1rem;
                font-weight: 600;
            }
        }
    }
 }
</style>
