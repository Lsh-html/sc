<!-- name -->
<template>
  <div style="background-color: #ececec; min-width: 1600px">
    <header>
      <headerTop></headerTop>
      <Carousel></Carousel>
    </header>
    <article style="">
      <Event></Event>
      <div class="w-full">
        <div
          style="width: 1600px; margin: 0 auto"
          class="relative flex justify-between"
        >
          <Notice style="width: calc(793px / 3 * 4)"></Notice>
          <Information style="width: calc(387px / 3 * 4)"></Information>
        </div>
      </div>
      <Video></Video>
      <Photo></Photo>
      <Important></Important>
    </article>
    <footer>
      <Footer></Footer>
    </footer>
    <!-- <el-button type="success" @click="login">登录</el-button> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import headerTop from "@/components/inedx/header/top.vue";
import Carousel from "@/components/inedx/header/carousel.vue";
import Event from "@/components/inedx/article/event.vue";
import Notice from "@/components/inedx/article/notice.vue";
import Information from "@/components/inedx/article/information.vue";
import Video from "@/components/inedx/article/video.vue";
import Photo from "@/components/inedx/article/photo.vue";
import Important from "@/components/inedx/article/important.vue";
import Footer from "@/components/inedx/footer/index.vue";

const router = useRouter();

const login = () => {
  router.push("/login");
};
</script>

<style scoped lang="less"></style>
