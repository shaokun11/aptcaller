<template>
  <div class="">test components</div>
</template>

<script setup></script>
<style lang="scss" scoped>
.box {
  background: #08c0ee8c;

  ::v-deep(.el-input__inner) {
    width: 150px;
    color: red;
    font-size: 20px;
  }
  ::v-deep(.el-input__wrapper) {
    background-color: #08c0ee8c;
  }
}
</style>
