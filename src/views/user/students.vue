<!-- 个人中心 -- 学生 -->
<template>
  <div class="bg-white w-full flex justify-center">
    <div class="pt-4 h-full flex flex-col" style="width: 1604px">
      <div class="pb-7 relative">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo flex justify-center"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">基础信息</el-menu-item>
          <el-menu-item index="2">黑名单</el-menu-item>
          <el-menu-item index="3">考勤流水</el-menu-item>
          <el-menu-item index="4">资源</el-menu-item>
        </el-menu>
      </div>

      <div class="h-full px-10 pt-5" style="background-color: #e0eaff">
        <!-- 基础信息 -->
        <div class="rounded mb-8 py-5 px-9 bg-white flex">
          <div class="block">
            <el-avatar :size="100" :src="userImg" />
          </div>
          <div
            class="flex flex-col justify-between"
            style="height: 100px; margin-left: 89px"
          >
            <p><span>姓名：</span> {{ user.realName }}</p>
            <p><span>学号：</span>{{ user.no }}</p>
            <p><span>学院(注：接口无字段)：</span>{{ user.college }}</p>
          </div>
        </div>
        <!-- end -->

        <!-- 黑名单 -->
        <blackList> </blackList>
        <!-- end -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, getCurrentInstance } from "vue";
import { useTestStore } from "@/store/index";
import blackList from "@/components/user/students/blacklist.vue";

const user = useTestStore().user;
console.log(useTestStore().user);

// const instance = getCurrentInstance();

// const id = ref<string>(``);

// instance?.proxy?.$Bus.on("get", (text) => {
//   id.value = text as string;
// });

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value = key;
};

// 头像
const userImg =
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
// end
</script>

<style scoped lang="less">
p {
  font-size: 14px;
  line-height: 22px;
}
p > span {
  color: #4e5969;
}
</style>
