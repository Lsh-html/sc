<!-- 对话框 -->
<template>
  <el-dialog v-model="dialog" title="提示" width="400px" :draggable="true">
    <div style="margin-top: -20px">{{ content.text }}</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel(true)" link>取消</el-button>
        <el-button type="primary" @click="operation(true)" link>
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, watch } from "vue";

const dialog = ref<boolean>(false);

const content = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: "您确定要执行此操作吗",
  },
});

// 子 =》 父
const emit = defineEmits(["oper", "cancel"]);

const cancel = (text?: boolean) => {
  emit("cancel", false);
  if (text) {
    console.log("点击取消");
  }
};

const operation = (text?: boolean) => {
  emit("oper", false);
  if (text) {
    console.log("点击确认");
  }
};
// end

// 监听是否显示
watch(
  () => content.dialogVisible,
  (newValue, oldValue) => {
    dialog.value = newValue;
  }
);
// end

onMounted(() => {
  dialog.value = content.dialogVisible;
});
</script>

<style scoped lang="less">
:deep(.el-id-7704-3) {
  padding-top: 0 !important;
}
</style>
