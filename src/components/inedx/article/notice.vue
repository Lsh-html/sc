<!-- 通知 -->
<template>
  <div class="" style="padding: 40px 0">
    <div class="relative" style="margin: 0 auto; width: calc(793px / 3 * 4)">
      <div class="relative">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          style="background-color: transparent"
        >
          <el-menu-item index="1">通知</el-menu-item>
          <el-menu-item index="2">体育</el-menu-item>
          <el-menu-item index="3">美育</el-menu-item>
          <el-menu-item index="4">劳育</el-menu-item>
        </el-menu>
        <div class="absolute right-0 bottom-4">
          <el-button link>更多</el-button>
        </div>
      </div>
      <div class="mt-12">
        <div
          class="flex w-full mb-3"
          style="background-color: #c4c4c4; height: 120px"
          v-for="item in 4"
        >
          <div
            class="h-full text-2xl text-white flex flex-col justify-center items-center"
            style="min-width: calc(183px / 3 * 4); background-color: #3e6be3"
          >
            <p class="leading-9">07-08</p>
            <p class="leading-9">12/2021</p>
          </div>
          <div
            class="h-full flex flex-col justify-center cur"
            style="
              padding-left: calc(33px / 3 * 4);
              padding-right: calc(115px / 3 * 4);
            "
          >
            <p style="font-size: 18px; line-height: 42px">劳育通知</p>
            <p class="p" style="font-size: 12px; line-height: 20px">
              劳育环节-必修一活动《研究生思政课程》已发布，同学们快去查看详细内容。了解考核
              通过条件！劳育环节-必修一活动《研究生思政课程》已发布，同学们快去查看详细内容。了解考核
              通过条件！
              劳育环节-必修一活动《研究生思政课程》已发布，同学们快去查看详细内容。了解考核
              通过条件！劳育环节-必修一活动《研究生思政课程》已发布，同学们快去查看详细内容。了解考核
              通过条件！
            </p>
          </div>
        </div>
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
