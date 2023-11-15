<!-- 事迹 -->
<template>
  <div class="">
    <div class="relative" style="margin: 0 auto">
      <!-- <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
      >
        <el-menu-item index="1">在线精品课程</el-menu-item>
        
      </el-menu> -->

      <div class="mt-3 flex justify-between items-center w-full">
        <div>在线精品课程</div>
        <div class="text-sm" style="color: #9ca3af">+更多</div>
      </div>
      <el-divider style="margin: 12px 0" />
      <div class="flex justify-between w-full">
        <img
          style="width: 30%; height: 178px"
          src="@/assets/images/school.png"
          alt=""
        />
        <img
          style="width: 30%; height: 178px"
          src="@/assets/images/school.png"
          alt=""
        />
        <img
          style="width: 30%; height: 178px"
          src="@/assets/images/school.png"
          alt=""
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
// .p {
//   overflow: hidden;
//   text-overflow: ellipsis;
//   display: -webkit-box;
//   -webkit-line-clamp: 2;
//   -webkit-box-orient: vertical;
// }

:deep(.is-active) {
  // background-color: transparent !important;
  // color: #000 !important;
  // font-size: 30px !important;
  line-height: 36px;
}
// :deep(.el-menu-item) {
//   color: #606266;
//   font-size: 24px;
// }

:deep(.el-menu) {
  background-color: rgba(0, 0, 0, 0);
}
</style>
