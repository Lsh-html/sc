<!-- 研修指南 -->
<template>
  <div class="flex flex-col">
    <Type class="pt-12" :text="text" @typeNum="typeNum"></Type>
    <Content class="mt-16 h-full" :typeObj="typeObj"></Content>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";

import Type from "@/components/type/index.vue";
import Content from "@/components/students/guide/content.vue";

const typeObj = ref<object>({
  type: 1,
  text: "体育",
});

const text = "研修指南";

const typeNum = (typeText: object) => {
  typeObj.value = typeText;
};
</script>

<style scoped lang="less"></style>
