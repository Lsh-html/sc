<!-- 修改对话框 -->
<template>
  <el-dialog v-model="dialog" title="修改" width="400px">
    <div>
      <div>
        {{ content.text }}

        <el-radio-group v-model="stateUp" class="ml-4">
          <el-radio label="1" size="large">通过</el-radio>
          <el-radio label="2" size="large">拒绝</el-radio>
        </el-radio-group>
      </div>
      <div class="mt-6 flex justify-end">
        <el-button @click="cancel(true)" link>取消</el-button>
        <el-button type="primary" @click="operation(true)" link>
          确定
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, watch } from "vue";

const dialog = ref<boolean>(false);
const stateUp = ref<string>("1");

const content = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: "将审核状态修改为：",
  },
  stateUp: {
    type: String,
    default: "1",
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
  emit("oper", stateUp.value);
  if (text) {
    console.log("点击确认");
  }
};
// end

// 监听是否显示
watch(
  [() => content.dialogVisible, () => content.stateUp],
  (newValue, oldValue) => {
    console.log(newValue);

    dialog.value = newValue[0];
    stateUp.value = newValue[1];
  }
);
// end

onMounted(() => {
  dialog.value = content.dialogVisible;
  stateUp.value = content.stateUp;
});
</script>

<style scoped lang="less">
:deep(.el-id-7704-3) {
  padding-top: 0 !important;
}
</style>
