<template>
  <div class="home">
   
    <div class="h-title">
      
      <GB-Search></GB-Search>

      <div class="block-height">
        <span><img style="width: 36px;margin-right: 6px;" src="@/assets/icon-51.svg" alt="SVG">Block Height:</span>
        <span>
          {{ block }}
          <span class="t-color2">(6s)</span>
        </span>
      </div>
    </div>

    <div class="con-pane">
      <div class="latest-block">
        <div class="b-title">Latest Blocks</div>
        <div class="b-list">
          <div class="b-item" v-for="item in blocks" :key="item.block" @click="lookBlock(item)">
            <span class="b-item-t1">BK</span>
            <span class="b-item-t2">{{item.block}}</span>
            <span class="b-item-t3"><span class="t-color2">txns:</span>{{item.txns}}</span>
            <span class="b-item-t4">{{item.time}}</span>
          </div>

        </div>
      </div>
      <div class="latest-txs">
        <div class="b-title">Latest Transactions</div>
        <div class="b-list">
          <div class="b-item" v-for="item in txs" :key="item.block" @click="lookTx(item)">
            <span class="b-item-t1" style="margin-right: 6px;">TX</span>
            <span class="b-item-t2" style="display: inline-flex;"><span class="t-color2" style="margin-right: 4px;">Tx#</span> {{getH(item.tx)}}</span>
            <span class="b-item-t3"><span class="t-color2">height:</span>{{item.height}}</span>
            <span class="b-item-t3" style="width: 206px;text-align: left;"><span class="t-color2">time:</span>{{item.timestamp}}</span>
          </div>

        </div>
      </div>
    </div>

    <!-- 

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
         
          <json-viewer :value="tx" copyable boxed sort />
       
      </div>
    </div>
    -->
    <!-- <h1>{{ store.test.useTestStore().count }}</h1> -->
    <!-- <button @click="store.test.useTestStore().add">click</button> -->
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { userStore } from "@/store/modules/user";
import { trace } from "@/utils/tools";
import { onMounted, onUnmounted, ref } from "vue";
import { sha256 } from "@cosmjs/crypto";
import { toHex } from "@cosmjs/encoding";
import 'vue-json-pretty';
import { useRouter } from "vue-router";
const router = useRouter();

const _userStore = userStore();

const _s = storeToRefs(_userStore);
// const { count,getBlockLatest } = _s;


const maxTxNum = 10;           
const upBlockNum = ref(0);     
const downBlockNum = ref(0);   
const txList = ref<any[]>([

]);          
const blocks = ref<any[]>([
  //{block:1333,time:'2022-01-01 12:12:12',txns:2},
  
]);   
const txs = ref<any[]>([
  //{"tx":"E19DD396653021FC9210EF8D7A76FCE84CB2D7D550DBE0B892047E83A79CD335",timestamp:"2024-04-15T09:49:11Z","height":"259550"}
]);      

const block = ref<number|string>(0);   //############
const tx = ref<any>({});
const curHash = ref("");
const chain = ref("");
const tid = ref<number|undefined>(0);

// const jsonData = ref({
//   name: 'Vue',
//   version: '3',
//   description: 'Vue.js is a JavaScript framework'
// });

onMounted(async () => {
  txList.value = JSON.parse(localStorage.getItem("txList") || "[]");
  await getBlocks();
  getInfo();

  tid.value = setInterval(() => {
    getInfo();
  }, 2000);

  
});

function getHash(str:string){
  const txHash = toHex(sha256(Buffer.from(str,'base64')))
// const s256 = CryptoJS.SHA256(Buffer.from(str,'base64'));
// const hash = s256.toString(CryptoJS.enc.Hex);
console.log("hash",txHash,str);  // ######SHA-256##############################
  return txHash;
}

function lookBlock(item:any){
  router.push({path:'block',query:{block:item.block}});
}
function lookTx(item:any){
  router.push({path:'tx',query:{tx:item.tx}});
}

function getH(item:any){
  return item.toString().slice(0,4)+'...'+item.toString().slice(-4)
}

async function getTX(){
  const res:any = await _userStore.getTxs();
  txs.value = res;
}

async function getBlocks(newBlock:number){
  for(var i=newBlock;i>newBlock-maxTxNum;i--){
    _userStore.getBlock(i).then((res1:any)=>{
      addBlock(res1,true);
    });
    // const res1:any = await _userStore.getBlock(i);
    // addBlock(res1,true);
  }
  
}

function addBlock(item:any,b:boolean=false){
  var height= +item.block.header.height;
  var   txs=item.block.data.txs.length;
  var  timestamp=getT(item.block.header.time);
  var  block_hash=item.block_id.hash;
  if(blocks.value.length>0&&blocks.value[0].block>=height&&!b){
    return;
  }
  if(b){
    blocks.value.push({block:height,time:timestamp,txns:txs,hash:block_hash});
  }else{
    blocks.value.unshift({block:height,time:timestamp,txns:txs,hash:block_hash});
  }

  blocks.value.sort((a,b)=>b.block-a.block);
  blocks.value = blocks.value.slice(0,maxTxNum);
}



async function getInfo(){
  getTX();
  const res:any = await _userStore.getBlockLatest();
  
  // block.value = res.block.header.height;
  const b:number = +res.block.header.height;
  if(blocks.value.length<10){
    await getBlocks(b);
  }
  if(b>block.value){  
    block.value = b;//has new block
    if(upBlockNum.value==0){
      upBlockNum.value = block.value;
      // downBlockNum.value = block.value;
      getUP();
    }else if(upBlockNum.value<=block.value){
      getUP();
    }
  }
}

function getT(str:string){
  var id = str.lastIndexOf(".");
  return str.slice(0,id)+"Z";

}

async function getUP(){
  const res1:any = await _userStore.getBlock(upBlockNum.value);
  addBlock(res1);
  
  // if(res1.txs.length>0){
  //   trace("res1", res1);
  //   for(let i=0;i<res1.txs.length;i++){
  //     txList.value.push({tx:res1.txs[i],block:upBlockNum.value,txhash:getHash(res1.block.data.txs[i])} as any);
  //   }
  //   localStorage.setItem("txList", JSON.stringify(txList.value));
  // }
  // trace("txList", txList.value);
  upBlockNum.value += 1;

  // if((!tx.value)||JSON.stringify(tx.value)?.length<3){
  //   tx.value = txList.value[0];
  // }
}

// async function getDown(){
//   downBlockNum.value --;
//   const res1:any = await _userStore.getBlock(downBlockNum.value);
//   trace("res1", res1);
//   if(res1.txs.length>0){
//     for(let i=0;i<res1.txs.length;i++){
//       txList.value.unshift(res1.txs[i] as any);
//     }
//   }
// }

// function handleClick() {
//   _userStore.add();
//   trace("count", count);
// }


onUnmounted(() => {
  clearInterval(tid.value)
});

</script>

<style lang="scss" scoped>
.home{
  position: relative;
  text-align: left;
  color: var(--bmq-text);
  width: 1160px;
  max-width: 100%;
  margin: 0 auto;

  .t-color2{
    color: var(--bmq-text2);
  }

  .h-title{
    position: relative;
    padding: 10px;
    .block-height{
      position: relative;
      margin: 24px auto;
      font-size: 20px;
      font-weight: 600;

    }

    
  }
  .con-pane{
    position: relative;
    display: flex;
    justify-content: space-between;
  }

  .latest-block,.latest-txs{
    position: relative;
    width: calc(50% - 16px);
    padding: 16px;
    border-radius: 24px;
    border: 1px solid var(--bmq-bg2);
    .b-title{
      font-size: 24px;
      font-weight: 600;
      margin: 12px 0 24px;
    }
    .b-list{

      .b-item{
        padding-bottom: 6px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: solid 1px var(--bmq-bg2);
        
        margin-bottom: 12px;
        .b-item-t1{
          padding: 10px;
          border-radius: 6px;
          width: 40px;
          text-align: center;
          background-color: var(--bmq-bg2);
        }
        .b-item-t2{
          width: 100px;
          text-align: center;
        }
        .b-item-t3{
          width: 200px;
          text-align: center;
        }
      }
    }

  }
  .latest-txs{
    .b-item{
        .b-item-t1{
          border-radius: 40px !important;
        }
      }
  }
  .h-block{
    position: relative;
    min-height: 600px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
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
