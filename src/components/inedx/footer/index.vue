<!-- name -->
<template>
  <!-- 背景：#403e3f -->
  <div
    style="background-color: #ccaa46"
    class="flex justify-center text-white p-8"
  >
    <div style="width: 1200px">
      <div class="flex justify-center">
        <el-link :underline="false" style="margin-right: 42px"
          >中华人民共和国教育部</el-link
        >
        <el-link :underline="false" style="margin-right: 42px" href=""
          >中国高职高专教育网</el-link
        >
        <el-link :underline="false" style="margin-right: 42px" href=""
          >全国高校教师网络培训中心</el-link
        >
        <el-link :underline="false" style="margin-right: 42px" href=""
          >爱课程网</el-link
        >
        <el-link :underline="false" style="margin-right: 42px" href=""
          >高等教育出版社</el-link
        >
        <el-link :underline="false" style="margin-right: 42px" href=""
          >中国知网</el-link
        >
        <el-link :underline="false" style="margin-right: 42px" href=""
          >会计视频数据库</el-link
        >
      </div>

      <div class="w-full flex items-center mt-8">
        <img
          class=""
          src="https://kjxy.scy.cn/images/db_logo.png"
          alt=""
          srcset=""
          style="height: 50px"
        />
        <div class="text-sm" style="margin-left: 80px">
          <p style="line-height: 30px">
            版权所有：陕西财经职业技术学院
            <br />
            地址：陕西省咸阳市文林路一号 电话：029-33732500 33732444 33732000
            <br />
            Copyright @2014, 陕西财经职业技术学院 陕ICP备06007066号-1
          </p>
        </div>
        <div class="flex ml-16">
          <img
            src="https://kjxy.scy.cn/images/ewm1.jpg"
            alt=""
            srcset=""
            style="width: 100px; height: 100px"
            class="ml-2"
          />
          <img
            src="https://kjxy.scy.cn/images/ewm2.jpg"
            alt=""
            srcset=""
            style="width: 100px; height: 100px"
            class="ml-2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
</script>

<style scoped lang="less">
:deep(.el-link__inner) {
  color: rgba(255, 255, 255, 0.6);
}
</style>
