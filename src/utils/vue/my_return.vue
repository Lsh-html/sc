<!-- 返回 -->
<template>
  <div>
    <div
      class="iconfont icon-left-circle-fill"
      :style="{
        fontSize: information.fontSize + 'px',
        color: information.color,
      }"
      @click="cli"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
const information = defineProps({
  fontSize: {
    type: Number,
    default: 20,
  },
  color: {
    type: String,
    default: "#00b578",
  },
});

const emit = defineEmits(["cli"]);
const cli = () => {
  emit("cli", true);
};
</script>

<style scoped lang="less"></style>
