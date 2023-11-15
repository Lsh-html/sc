<!-- 活动详情 -->
<template>
  <div class="bg-white w-full flex justify-center">
    <div class="pt-4 h-full flex flex-col" style="width: 1604px">
      <div class="pb-7 relative">
        <div style="z-index: 999" class="inline-block absolute ml-7">
          <myReturn @cli="cli"></myReturn>
        </div>

        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo flex justify-center"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">查看详情</el-menu-item>
          <el-menu-item index="2">节次</el-menu-item>
          <el-menu-item index="3">课件</el-menu-item>
          <el-menu-item index="4">作业</el-menu-item>
          <el-menu-item index="5">考勤</el-menu-item>
          <el-menu-item index="6">成绩</el-menu-item>
          <!-- <el-menu-item index="7">助教</el-menu-item> -->
        </el-menu>
      </div>

      <div class="h-full" style="background-color: #e0eaff">
        <Section
          v-if="activeIndex == '2'"
          :updateID="id"
          identity="学生"
        ></Section>

        <Courseware
          v-else-if="activeIndex == '3'"
          :updateID="id"
          identity="学生"
        ></Courseware>
        <Operation
          v-else-if="activeIndex == '4'"
          :updateID="id"
          identity="学生"
        ></Operation>
        <Clock
          v-else-if="activeIndex == '5'"
          :updateID="id"
          identity="学生"
        ></Clock>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, getCurrentInstance } from "vue";
import Section from "@/components/activity/add/addActivity/section.vue";
import Courseware from "@/components/activity/add/addActivity/courseware.vue";
import Operation from "@/components/activity/add/addActivity/operation.vue";
import Clock from "@/components/activity/add/addActivity/clock.vue"; // 考勤

import myReturn from "@/utils/vue/my_return.vue";

const emit = defineEmits(["my_state"]);

const instance = getCurrentInstance();

const id = ref<string>(``);

instance?.proxy?.$Bus.on("get", (text) => {
  id.value = text as string;
});

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value = key;
};

// 返回按钮
const cli = () => {
  emit("my_state", "0");
};
// end
</script>

<style scoped lang="less">
:deep(.el-menu-item) {
  line-height: 38px;
}
</style>
