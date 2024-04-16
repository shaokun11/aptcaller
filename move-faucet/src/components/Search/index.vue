<!-- @author middear -->

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
const router = useRouter();
const inp = ref("");
async function check(){
    if(isBlock()){
        router.push({path:'block',query:{block:inp.value}});
    }else if(isTxn()){
        router.push({path:'tx',query:{tx:inp.value}});
    }
}

function isBlock(){
    let a = inp.value;
    a = a.trim();
    console.log("a=",a,inp.value);
    return a.length==6;
}
function isTxn(){
    let a = inp.value;
    a = a.trim();
    console.log("a=",a,inp.value);
    return a.length==64;
}
</script>

<template>
  <div class="con-search">
    <div class="h-input">
        <div class="h-input-title">Movement Shared Sequencer Explorer</div>
        <a-input-search
          class="input-search"
          size="large"
          v-model:value="inp"
          placeholder="Search by Txn Hash / Block "
          enter-button
          @search="check"
        />
      </div>
    
    
  </div>
</template>

<style lang="scss" scoped>
.con-search {
  position: relative;

  .h-input{
      text-align: center;
      position: relative;align-items: center;margin-top: 24px;
      .h-input-title{
        margin-bottom: 24px;
        font-size: 1.3125rem;
        font-weight: 600;
        
      }
      .input-search{
        width: 650px;
      }
    }
  
}
</style>
