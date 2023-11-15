<!-- name -->
<template>
  <div class="px-12 py-8 bg-white flex justify-between items-center">
    <div class="flex items-center">
      <div class="mr-6" style="width: 74px; height: 74px">
        <img src="@/assets/images/Logo2.png" alt="" />
      </div>
      <div class="text-2xl">西安交通大学体美劳育人管理平台</div>
    </div>
    <div>
      <el-button link @click="login"
        ><span class="text-base mr-2">登录</span>
        <div class="iconfont icon-guanyanren" style="font-size: 24px"></div>
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const login = () => {
  router.push("/login");
};
</script>

<style scoped lang="less"></style>
