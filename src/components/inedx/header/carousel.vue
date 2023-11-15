<!-- 走马灯 -->
<template>
  <div class="relative">
    <div
      class="flex justify-between items-center px-12"
      style="background-color: #c6a441"
    >
      <div
        style="
          width: 1280px;
          background: url(https://kjxy.scy.cn/images/header_bg1.png) 900px top
            no-repeat;
          height: 80px;
        "
        class="h-full flex justify-between items-center"
      >
        <img
          class=""
          src="https://kjxy.scy.cn/images/logo.png
"
          alt=""
          srcset=""
          style="height: 50px"
        />
      </div>
      <div class="flex items-center">
        <span
          class="iconfont icon-yonghu"
          style="color: rgba(255, 255, 255, 0.7); font-size: 2rem"
        ></span>
        <span class="text-white ml-4">登陆</span>
      </div>
    </div>

    <div class="flex justify-center relative" style="height: 350px">
      <img
        src="https://www.scy.cn/images/xuexiao5.jpg"
        alt=""
        srcset=""
        class="absolute w-full"
        style="object-fit: cover; opacity: 0.2; height: 350px"
      />
      <!-- <el-carousel height="350px" indicator-position="none">
        <el-carousel-item v-for="item in 4" :key="item">
          <img
            src="@/assets/images/school.png"
            alt=""
            srcset=""
            class="my-video"
          />
        </el-carousel-item>
      </el-carousel> -->
      <div
        class="top-0 bottom-0 left-0 right-0"
        style="
          margin: 0 auto;
          width: 1200px;
          height: 350px;
          background-color: #ececec;
          background: url(https://www.scy.cn/images/xuexiao5.jpg) no-repeat 100%
            100%;
          background-size: 100% 100%;
        "
      >
        <div style="height: 350px" class="relative">
          <div class="top-12 text-center relative text-6xl text-white">
            会计学院教学资源库
          </div>
        </div>
      </div>
    </div>

    <!-- <div
      class="absolute bottom-0 h-20 flex justify-center items-center"
      style="background-color: rgba(0, 0, 0, 0.3); width: 100%"
    > -->
    <!-- <div class="flex justify-between" style="width: 600px; height: 100%"> -->
    <!-- <el-divider direction="vertical" class="divider" />
        <div class="h-full flex items-center px-8" style="color: #fff">
          <span
            class="iconfont icon-yonghu"
            style="color: rgba(255, 255, 255, 0.7); font-size: 3rem"
          ></span>
          <div class="ml-8 p-4 flex items-center">
            <div class="text-xl">登陆</div>
            <div class="text-sm ml-4">一体化平台登陆</div>
          </div>
        </div>

        <el-divider direction="vertical" class="divider" /> -->
    <!-- </div> -->
    <!-- </div> -->

    <!-- <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in 6" :key="item">
        <img
          src="@/assets/images/school.png"
          alt=""
          srcset=""
          class="my-video"
        />
      </el-carousel-item>
    </el-carousel> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
</script>

<style scoped lang="less">
.divider {
  height: 100% !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
  border-left-width: 2px;
}
.my-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
