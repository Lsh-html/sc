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
        <div>考试中心</div>
        <div class="text-sm" style="color: #9ca3af">+更多</div>
      </div>
      <el-divider style="margin: 12px 0" />
      <div class="flex justify-between w-full">
        <ul style="line-height: 35px" class="truncate">
          <li
            title="关于做好2023年同等学力人员申请硕士学位外国语水平和学科综合水平全国统一考试工作的通知"
            v-for="item in 5"
          >
            关于做好2023年同等学力人员申请硕士学位外国语水平和学科综合水平全国统一考试工作的通知
          </li>
        </ul>
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
li {
  position: relative;
  padding-left: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
li:after {
  position: absolute;
  display: block;
  content: "";
  width: 5px;
  height: 5px;
  background: linear-gradient(-55deg, #ff7b7f, #ffbc46);
  border-radius: 50%;
  top: 15px;
  left: 0;
}
</style>
