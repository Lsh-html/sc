<!-- 资讯 -->
<template>
  <div class="" style="padding: 40px 0">
    <div class="relative" style="margin: 0 auto; width: calc(387px / 3 * 4)">
      <div class="relative">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          style="background-color: transparent"
        >
          <el-menu-item index="1">资讯</el-menu-item>
          <el-menu-item index="2">体育</el-menu-item>
          <el-menu-item index="3">美育</el-menu-item>
          <el-menu-item index="4">劳育</el-menu-item>
        </el-menu>
        <div class="absolute right-0 bottom-4">
          <el-button link>更多</el-button>
        </div>
      </div>
      <div class="mt-12">
        <p class="text cur" v-for="item in 13" style="color: #606266">
          西安交通大学干部师生热议2023年全国两会召开
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped lang="less">
.p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.text + .text {
  margin-top: 16px;
}

:deep(.is-active) {
  background-color: transparent !important;
  color: #000 !important;
  font-size: 30px !important;
}
:deep(.el-menu-item) {
  color: #606266;
  font-size: 24px;
}
</style>
