<!-- name -->
<template>
  <div class="bg-gray-100" style="min-width: 100%; min-height: 100vh">
    <!-- <el-container class="" style="min-width: 100%; min-height: 100vh">
      <el-header><Header></Header></el-header>
      <el-main style="padding: 0; display: flex" class="bg-gray-100 w-full">
        <div class="flex-1"></div>
        <RouterView style="width: 1604px"></RouterView>
        <div class="flex-1"></div>
      </el-main>
    </el-container> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import Header from "@/components/layout/header.vue";
import Aside from "@/components/layout/aside.vue";
</script>

<style scoped lang="less">
:deep(.el-header) {
  padding: 0;
}
</style>
