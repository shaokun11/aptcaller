<!-- @author middear -->

<script lang="ts" setup>
import { ref } from 'vue';
import { trace } from '../../utils/tools';

const pro = ref('MMM');   //process.env.VITE_APP_USER_KEY
trace('pro-',pro.value)
</script>

<template>
  <div class="con-f">
   
    <div class="p2">
      <div class="p2-navs">
        <a target="_blank" href="//www.google.com">
          <img src="@/assets/icon_twitter.svg" alt="" />
        </a>
        <a target="_blank" href="//www.google.com" style="margin: 0 40px">
          <img src="@/assets/icon_telegrm.svg" alt="" />
        </a>
        <a target="_blank" href="//www.google.com">
          <img src="@/assets/icon_discord.svg" alt="" />
        </a>
      </div>
      <div style="margin-top: 10px">© 2023 {{ pro }} All rights reserved</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.con-f {
  position: relative;
  color: #fff;
  .p1 {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .p2 {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 65px;
    opacity: 0.5;

    .p2-navs {
      a {
        img {
          width: 24px;
          transition: all 0.5s ease 0.1s;
        }
      }
      a:hover {
        img {
          transform: scale(1.2);
        }
      }
    }
  }

  .nav0 {
    border: 0 !important;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: solid 0.0625rem #000000 !important;
  }
}
</style>
