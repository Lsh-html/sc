<!-- 搜索框 -->
<template>
  <div class="flex items-center">
    <el-input
      v-model="input"
      :placeholder="information.placeholder"
      :prefix-icon="Search"
      :style="{ width: information.width }"
      size="large"
      @change="play"
    />
    <!-- <span
      class="w-10 text-base font-black ml-4"
      style="color: #0052d9"
      @click="play"
      >确定</span
    > -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from "vue";
import { Search } from "@element-plus/icons-vue";

const information = defineProps({
  placeholder: {
    type: String,
    default: "搜索",
  },
  value: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "218px",
  },
});

onMounted(() => {
  placeholder.value = information.placeholder;
});
watch(
  () => information.value,
  () => {
    input.value = information.value;
  }
);

const input = ref("");
const placeholder = ref<string>("搜索关键字");

const emit = defineEmits(["search"]);

const play = () => {
  emit("search", input.value);
};
</script>
<style scoped lang="less"></style>
