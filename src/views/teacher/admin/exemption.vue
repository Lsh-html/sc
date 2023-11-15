<!-- 免修申请 -->
<template>
  <div class="flex" style="margin-top: 59px">
    <typeTeacher
      @typeNum="typeNum"
      :txt="'研修清单管理'"
      style="margin-right: calc(calc(33.5 / 1920) * 100%)"
    ></typeTeacher>
    <Content :type="type" class="flex-1"></Content>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import typeTeacher from "@/components/type/index-teacher.vue";
import Content from "@/components/admin/exemption/index.vue";

const type = ref<string>("1");

const typeNum = (typeText: any) => {
  type.value = typeText.type;
};
</script>

<style scoped lang="less"></style>
