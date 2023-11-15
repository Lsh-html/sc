<!-- 二次按钮 -->
<template>
  <div class="inline-block">
    <el-button
      :style="{ color: text_color }"
      :type="type"
      :size="size"
      :color="color"
      @click="open"
      :link="link"
      >{{ text }}</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onBeforeMount } from "vue";
import type { EpPropMergeType } from "element-plus/es/utils/vue/props/types";
import { elMessage } from "@/components/ts/myMessage";

// const information = defineProps({
//   type: {
//     type: EpPropMergeType<StringConstructor, "" | "Default" | "Text" | "Primary" | "Success" | "Warning" | "Info" | "danger", unknown>,
//     default: null,
//   },
// });

// const information = defineProps({
//   type: {
//     type: EpPropMergeType<StringConstructor, "" | "Default" | "Text" | "Primary" | "Success" | "Warning" | "Info" | "danger", unknown>,
//     default: "1",
//   },
// });

const emit = defineEmits(["confirm"]);

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
    text: string;
    color: string;
    text_color: string | null;
    size:
      | EpPropMergeType<
          StringConstructor,
          "" | "default" | "small" | "large",
          never
        >
      | undefined;
    type2: string;
    link: boolean;
  }>(),
  {
    type: () => "", // 默认值
    text: () => "",
    color: () => "",
    size: () => "default", // 'large'| 'default'| 'small'
    type2: () => "", // success / info / warning / error
    link: () => false,
    text_color: () => null,
  }
);
let op = reactive<any>({
  confirmButtonText: "确定",
  cancelButtonText: "取消",
  type: "",
  draggable: true,
  dangerouslyUseHTMLString: true,
});

onBeforeMount(() => {
  op = {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: content.type2,
    draggable: true,
    dangerouslyUseHTMLString: true,
  };
});

const open = () => {
  // ElMessageBox.confirm(
  //   `<p>是否执行<span style="color:#67C23A">${content.text}</span>操作</p>`,
  //   "提示",
  //   op
  // )
  //   .then(() => {
  //     emit("confirm", "");
  //   })
  //   .catch(() => {
  //     elMessage("取消操作");
  //   });
};
</script>

<style scoped lang="less"></style>
