<!-- 要闻 -->
<template>
  <div class="bg-white" style="padding: 40px 120px">
    <div
      class="relative flex"
      style="margin: 0 auto; width: 1600px; height: calc(478px / 3 * 4)"
    >
      <div
        class="h-full"
        style="
          width: calc(610px / 3 * 4);
          padding: calc(16px / 3 * 4) 45px;
          background-color: #e7e7e7;
        "
      >
        <p class="mb-3" style="font-size: 36px; color: #2641f3">交大要闻</p>
        <div
          class="px-4 py-3 truncate text cur"
          style="background-color: #c4c4c4"
          v-for="item in 8"
        >
          西安交通大学干部师生热议2023年全国两会召开
        </div>
      </div>
      <div class="h-full" style="width: calc(590px / 3 * 4)">
        <img
          class="my-video"
          src="@/assets/images/视频预览.png"
          alt=""
          srcset=""
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
</script>

<style scoped lang="less">
.text + .text {
  margin-top: 19px;
}

.my-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
