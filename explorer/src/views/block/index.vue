<template>
    <div class="block">

        <div class="block-title">
            <span class="t1">Block</span>
            <span class="t2">#{{ block }}</span>
        </div>
        <div class="b-con" style="margin-top: 60px;" v-if="info!=null">
            <div class="c-title">Overview</div>
            <div class="c-item">
                <span class="t1">Block Height:</span>
                <span class="t2">{{ info.height }}</span>
            </div>
            <div class="c-item">
                <span class="t1">Block Timestamp:</span>
                <span class="t2">{{ info.timestamp }}</span>
            </div>
            <div class="c-item">
                <span class="t1">Transactions:</span>
                <span class="t2">{{ info.txs }}</span>
            </div>
           
            <div class="c-item">
                <span class="t1">Block Hash:</span>
                <span class="t2">{{ info.block_hash }}</span>
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
const info = ref<any>();
const block = ref<number|string>();

async function getBlock(){
  const res1:any = await _userStore.getBlock(block.value);

  info.value = {
    height: res1.block.header.height,
    txs:res1.block.data.txs.length,
    timestamp:res1.block.header.time,
    block_hash:res1.block_id.hash,
   

  };
  
  trace("res1", res1);
  
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
    block.value = router.currentRoute.value.query.block;
    trace("block", block);
    getBlock();
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
            padding: 20px 0;
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
