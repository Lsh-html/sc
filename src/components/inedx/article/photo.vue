<!-- 影集 -->
<template>
  <div class="bg-white" style="padding: 40px 120px">
    <div class="relative" style="margin: 0 auto; width: 1600px">
      <div class="text-2xl text-center">更多影集</div>
      <el-divider class="" />
      <div class="flex justify-between">
        <!-- <img
          class="cur"
          v-for="item in 6"
          src="@/assets/images/school.png"
          alt=""
          style="width: calc(183px / 3 * 4); height: calc(103px / 3 * 4)"
        /> -->
        <el-image
          style="width: calc(183px / 3 * 4); height: calc(103px / 3 * 4)"
          v-for="item in 6"
          src="https://youimg1.c-ctrip.com/target/100m0d0000006xfeyCC13.jpg"
          :zoom-rate="1.2"
          :preview-src-list="[
            'https://youimg1.c-ctrip.com/target/100m0d0000006xfeyCC13.jpg',
          ]"
          :initial-index="4"
          fit="cover"
        />
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
