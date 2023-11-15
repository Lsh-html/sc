<!-- 视频 -->
<template>
  <div class="bg-white" style="padding: 40px 120px">
    <div class="relative" style="margin: 0 auto; width: 1600px">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">视频</el-menu-item>
        <el-menu-item index="2">体育</el-menu-item>
        <el-menu-item index="3">美育</el-menu-item>
        <el-menu-item index="4">劳育</el-menu-item>
      </el-menu>
      <div class="w-full mt-8 flex flex-wrap">
        <el-carousel
          :interval="4000"
          type="card"
          height="440px"
          class="w-full"
          indicator-position="none"
        >
          <el-carousel-item v-for="item in 6" :key="item">
            <video
              class="w-full h-full my-video"
              poster="@/assets/images/school.png"
              controls
            >
              <source src="@/assets/images/aaa.mp4" type="video/mp4" />
              <!-- <source src="@/assets/images/aaa.mp4" type="video/ogg" /> -->
              您的浏览器不支持 video 标签。
            </video>
          </el-carousel-item>
        </el-carousel>
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

.my-video {
  width: 100%;
  object-fit: cover;
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
