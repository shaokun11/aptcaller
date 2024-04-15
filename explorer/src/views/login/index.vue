<template>
  <div class="container">
    <a-button type="primary" @click="handleClick">click333</a-button>
    <h1>{{ res }}</h1>
    <br />
    <h1>{{ sexList }}</h1>
    <button @click="handleClick2">click</button>
    <WxMpAccount></WxMpAccount>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import WxMpAccount from '../../components/Business/WxMpAccount.vue';
const { proxy } = getCurrentInstance();
let res = $ref('null');

async function handleClick2() {
  proxy.submitOk('保存成功');
  proxy.submitFail('操作失败');
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  background: blue;

  h1 {
    font-weight: bold;
    color: red;
  }
}
</style>
