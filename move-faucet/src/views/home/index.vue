<template>
  <div class="home">
   
    

    <div class="con-pane">

      <div class="con-title">
        <div class="t1">Movement Faucet</div>
        <div class="t2">Fell free to get ETH+Move to your wallet</div>
      
      </div>

      <div style="margin-top: 48px;display: flex;align-items: center;flex-direction: column;">
        <div style="margin-top: 24px;">
          <div style="margin-top: 24px;text-align: left;">
            <a-checkbox-group v-model:value="state.value1" name="checkboxgroup" :options="plainOptions" />
          </div>
          <div style="margin-top: 24px;text-align: left;">
            <span style="margin-right: 16px;">Get</span><a-input v-model:value="inp1" style="width: 480px" /><span style="width: 50px;display: inline-block;margin-left: 10px;">ETH</span>
          </div>
        </div>

        <div style="margin-top: 24px;">
          <div style="margin-top: 24px;text-align: left;">
            <a-checkbox-group v-model:value="state.value2" name="checkboxgroup" :options="plainOptions" />
          </div>
          <div style="margin-top: 24px;">
            <span style="margin-right: 16px;">Get</span><a-input v-model:value="inp2" style="width: 480px" /><span style="width: 60px;display: inline-block;">Move</span>
          </div>
        </div>

        <div style="margin-top: 24px;">
          <a-button style="width: 120px;" type="primary" @click="toFaucet">Faucet</a-button>
        </div>
      </div>
      
     
    </div>

    
  </div>
</template>

<script setup lang="ts">
// import { storeToRefs } from "pinia";
import { userStore } from "@/store/modules/user";
import { trace } from "@/utils/tools";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { message } from 'ant-design-vue';
// import { useRouter } from "vue-router";
// const router = useRouter();

const _userStore = userStore();
const plainOptions = ['Rollup1', 'Rollup2'];
const state = reactive({
  value1: ['Rollup1','Rollup2'],
  value2: ['Rollup1','Rollup2'],
});
const inp1 = ref("");
const inp2 = ref("");
// const { count,getBlockLatest } = _s;

function toFaucet(){
  const a = inp1.value.trim();
  const b = inp2.value.trim();
  if(a&&isEthAddress(a)){
    if(state.value1.includes('Rollup1')){
      _userStore.faucetMevm(a,1).then(res=>{
        if(res.hash){
          message.success("Success Rollup1:"+res.hash, 10);
        }else{
          message.error("Error Rollup1:"+res.message, 10);
        }
        
      });
    }
    if(state.value1.includes('Rollup2')){
      _userStore.faucetMevm(a,2).then(res=>{
        if(res.hash){
          message.success("Success Rollup2:"+res.hash, 10);
        }else{
          message.error("Error Rollup2:"+res.message, 10);
        }
      });
    }
  }
  if(b.length==66){   //move
    if(state.value2.includes('Rollup1')){
      _userStore.faucetMove(b,1).then(res=>{
        if(res.hash){
          message.success("Success Rollup1:"+res.hash, 10);
        }else{
          message.error("Error Rollup1:"+res.message, 10);
        }
      });
    }
    if(state.value2.includes('Rollup2')){
      _userStore.faucetMove(b,2).then(res=>{
        if(res.hash){
          message.success("Success Rollup2:"+res.hash, 10);
        }else{
          message.error("Error Rollup2:"+res.message, 10);
        }
      });
    }
    
  }
  
}

function isEthAddress(address:string):boolean {
  const ethAddressRegex = /^0x[0-9a-fA-F]{40}$/;
  return ethAddressRegex.test(address);
}
    


onMounted(async () => {



  
});


onUnmounted(() => {
  // clearInterval(tid.value)
});

</script>

<style lang="scss" scoped>
.home{
  position: relative;
  text-align: center;
  color: var(--bmq-text);
  width: 1080px;
  max-width: 100%;
  margin: 0 auto;

  

  .con-pane{
    position: relative;
    height: 65%;
    min-height: 660px;
    margin-top: 36px;
    padding: 48px 36px;
    background: var(--bmq-bg2);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);

    .con-title{
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;

      .t1{
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .t2{
        font-size: 18px;
      }
    }
  }

}
</style>
