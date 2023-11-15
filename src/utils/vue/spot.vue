<!-- 彩色圆点 -->
<template>
  <div>
    <div
      style="width: 20px; height: 20px; border-radius: 20px"
      :style="{ 'background-color': information.color }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";

const information = defineProps({
  color: {
    type: String,
    default: "#ffc300",
  },
});
</script>

<style scoped lang="less"></style>
