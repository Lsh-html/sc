<!-- 搜索框 -->
<template>
  <div class="flex items-center">
    <el-input
      v-model="input"
      placeholder="搜索关键字"
      :prefix-icon="Search"
      style="width: 375px"
      size="large"
    />
    <el-button :type="type" class="ml-4" @click="play" :link="link">
      <p v-if="link" class="w-10 text-base font-black" style="color: #0052d9">
        {{ content.text }}
      </p>
      <p v-else>{{ content.text }}</p>
    </el-button>
    <!-- <span
      class="w-10 text-base font-black ml-4"
      style="color: #0052d9"
      @click="play"
      >确定</span
    > -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import type { EpPropMergeType } from "element-plus/es/utils/vue/props/types";
// const information = defineProps({
//   link: {
//     type: Boolean,
//     default: true,
//   },
// });

const content = withDefaults(
  defineProps<{
    type: EpPropMergeType<
      StringConstructor,
      | ""
      | "default"
      | "text"
      | "primary"
      | "success"
      | "warning"
      | "info"
      | "danger",
      unknown
    >;
    link: boolean;
    text: string;
  }>(),
  {
    type: () => "", // 默认值
    link: () => true,
    text: () => "确定",
  }
);

const input = ref("");

const emit = defineEmits(["search"]);

const play = () => {
  emit("search", input.value);
};
</script>
<style scoped lang="less"></style>
