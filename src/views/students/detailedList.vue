<!-- 研修清单 -->
<template>
  <div>
    <Type class="pt-12" :text="text" @typeNum="typeNum"></Type>
    <Content class="mt-16" :typeObj="typeObj"></Content>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";

import Type from "@/components/type/index.vue";
import Content from "@/components/students/detailedList/content.vue";

const typeObj = ref<object>({
  type: 1,
  text: "体育",
});

const text = "研修清单";

const typeNum = (typeText: object) => {
  typeObj.value = typeText;
};
</script>

<style scoped lang="less"></style>
