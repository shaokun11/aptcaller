<template>
  <div class="home">
   
    <div class="h-title">
      <div>
        <span>New-Block:</span>
        <span>{{ block }}</span>
      </div>
      <div style="display: flex;position: relative;align-items: center;margin-top: 24px;">
        <span style="width: 90px;">Search-TX:</span>
        <a-input style="margin: 0 16px;" type="text" v-model:value="inp" />
        <a-button type="primary" @click="check">Search</a-button>
      </div>
    </div>
    <div class="h-block">
      <div class="box" style="width: 240px;">
        <span>Block List:</span>
        <span class="txt" style="margin-top: 24px;">
            <span :class="curHash==item.txhash?'txt-on':'txt-off'" v-for="item in txList" :key="item.block" @click="selHash(item)">
              <span>{{ item.block }}</span>
              <span style="margin-left: 12px;">{{ item.txhash.toString().slice(0,6)+'...'+item.txhash.toString().slice(-6) }}</span>
            </span>
          
        </span>
      </div>
      <div class="box" style="flex:1;margin-left: 36px;">
        <span>Tx-content:</span>
        <span style="margin: 12px 0; color: greenyellow;">chain-from:{{ chain }}</span>
          <!-- <vue-json-pretty :data="tx" /> -->
          <json-viewer :value="tx" copyable boxed sort />
          <!-- <JsonViewer :value="jsonData" copyable boxed sort theme="dark"  @onKeyClick="keyClick"/> -->


        <!-- <span class="txt">{{ JSON.stringify(tx) }}</span> -->
      </div>
    </div>
   
    <!-- <h1>{{ store.test.useTestStore().count }}</h1> -->
    <!-- <button @click="store.test.useTestStore().add">click</button> -->
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { userStore } from "@/store/modules/user";
import { trace } from "@/utils/tools";
import { onMounted, ref } from "vue";
import { sha256 } from "@cosmjs/crypto";
import { toHex } from "@cosmjs/encoding";
import 'vue-json-pretty';

const _userStore = userStore();

const _s = storeToRefs(_userStore);
// const { count,getBlockLatest } = _s;


const maxTxNum = 100;             //#####################
const upBlockNum = ref(0);      //###########################
const downBlockNum = ref(0);    //###########################
const txList = ref<any[]>([]);           //############

const inp = ref("");   //############
const block = ref<number|string>(0);   //############
const tx = ref<any>({});
const curHash = ref("");
const chain = ref("");

// const jsonData = ref({
//   name: 'Vue',
//   version: '3',
//   description: 'Vue.js is a JavaScript framework'
// });

onMounted(() => {
  txList.value = JSON.parse(localStorage.getItem("txList") || "[]");
  getInfo();

  setInterval(() => {
    getInfo();
  }, 750);
});

function getHash(str:string){
  const txHash = toHex(sha256(Buffer.from(str,'base64')))
// const s256 = CryptoJS.SHA256(Buffer.from(str,'base64'));
// const hash = s256.toString(CryptoJS.enc.Hex);
console.log("hash",txHash,str);  // ######SHA-256##############################
  return txHash;
}

function getchain(item:any){
  const str = item.tx.body.messages[0].header;
  let hex= "";
  for (var i = 0; i < str.length; i += 2) {
    hex += String.fromCharCode(parseInt(str.substr(i, 2), 16));
  }
  return JSON.parse(hex).chain.replace("evm","rollup").replace("apt","rollup");
}


async function check(){
  let a = inp.value;
  //##################
  a = a.trim();
  console.log("a=",a,inp.value);
  if(a.length==64){
    const res = await _userStore.getTx(a);
    if(res){
      chain.value = getchain(res);
      tx.value = res as any;
    }else{
      tx.value = {txhash:"###############"} as any;
    }
  }else{
    tx.value = {txhash:"######hash############"} as any;
  }
}
function selHash(item:any){
  curHash.value = item.txhash;
  inp.value = item.txhash;
  check();
}
async function getInfo(){
  const res:any = await _userStore.getBlockLatest();
  // block.value = res.block.header.height;
  const b:number = +res.block.header.height;    //res.block.last_commit.height
  if(b>block.value){  
    block.value = b;//has new block
    if(upBlockNum.value==0){
      upBlockNum.value = block.value;
      downBlockNum.value = block.value;
      getUP();
    }else if(upBlockNum.value<=block.value){
      getUP();
    }
    
  }

  // if(txList.value.length<maxTxNum){
  //   if(downBlockNum.value>1) getDown();
  // }
  

  // trace("res", block.value,res);
  
}

async function getUP(){
  const res1:any = await _userStore.getBlock(upBlockNum.value);
  
  
  if(res1.txs.length>0){
    trace("res1", res1);
    for(let i=0;i<res1.txs.length;i++){
      txList.value.push({tx:res1.txs[i],block:upBlockNum.value,txhash:getHash(res1.block.data.txs[i])} as any);
    }
    localStorage.setItem("txList", JSON.stringify(txList.value));
  }
  trace("txList", txList.value);
  upBlockNum.value += 1;

  if((!tx.value)||JSON.stringify(tx.value)?.length<3){
    tx.value = txList.value[0];
  }
}

async function getDown(){
  downBlockNum.value --;
  const res1:any = await _userStore.getBlock(downBlockNum.value);
  trace("res1", res1);
  if(res1.txs.length>0){
    for(let i=0;i<res1.txs.length;i++){
      txList.value.unshift(res1.txs[i] as any);
    }
  }
}

// function handleClick() {
//   _userStore.add();
//   trace("count", count);
// }


</script>

<style lang="scss" scoped>
.home{
  position: relative;
  text-align: left;
  color: white;

  .h-title{
    position: relative;
    padding: 10px;
    background-color: #333;
  }
  .h-block{
    position: relative;
    min-height: 600px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #333;
    .box{
      width: 50%;
      padding: 10px;
      background-color: #666;
      display: inline-flex;
      flex-direction: column;

      .txt{ //############
        word-wrap: break-word;

        .txt-on{
          padding: 8px 6px;
          background-color: #6d6b6b;
          cursor: pointer;
          color: yellow;
          margin-bottom: 12px;
          width:100%;display: inline-flex;justify-content: space-between;
        }
        .txt-off{
          padding: 8px 6px;
          background-color: #333;
          cursor: pointer;
          color: azure;
          margin-bottom: 12px;
          width:100%;display: inline-flex;justify-content: space-between;
        }
        



      }
    }
  }

}
</style>
