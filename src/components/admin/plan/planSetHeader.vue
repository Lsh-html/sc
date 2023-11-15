<!-- 查看详情头部 -->
<template>
  <div class="w-full bg-white px-7 py-8 my-5">
    <div class="flex justify-between">
      <div class="flex items-center">
        <myReturn @cli="cli"></myReturn>
        <div class="font-black ml-8" style="font-size: 18px">研修计划详情</div>
      </div>
      <div v-if="information.state == '0'">
        <el-button color="#0052D9" type="primary" @click="examine(1)"
          >通过</el-button
        >
        <el-button color="#EA0000" type="primary" @click="examine(2)"
          >拒绝</el-button
        >
      </div>
      <div v-else class="flex items-center">
        <div>
          {{
            information.state == "1"
              ? "研修计划已通过"
              : information.state == "2"
              ? "研修计划未通过"
              : ""
          }}
        </div>
        <el-button
          class="ml-8"
          v-if="information.state == '1' || information.state == '2'"
          style="color: #909399"
          type="primary"
          @click="stateUpdate"
          link
          >修改</el-button
        >
      </div>
    </div>

    <myDialog
      :stateUp="stateUp"
      :dialogVisible="dialogVisible"
      @cancel="cancel"
      @oper="operation"
    ></myDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import myReturn from "@/utils/vue/my_return.vue";
import myDialog from "@/utils/vue/my_dialog.vue";
import { toExamine } from "@/api/currency";

const information = defineProps({
  id: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "0",
  },
});

const emit = defineEmits(["details", "state"]);

const cli = (text: boolean) => {
  if (text) {
    emit("details", false);
  }
};

const examine = (num: number) => {
  toExamine({
    thiryId: information.id,
    state: num,
    grade: 3,
    explains: "",
  }).then((res) => {
    emit("state", num);
    alert(res.msg);
  });
};

// 修改审核状态
const stateUp = ref<string>("1");
const dialogVisible = ref<boolean>(false);
const stateUpdate = () => {
  stateUp.value = String(information.state);
  dialogVisible.value = true;
};
// end

// 点击取消
const cancel = (text: boolean) => {
  dialogVisible.value = false;
};
// end

// 点击确认
const operation = (text: string) => {
  dialogVisible.value = false;
  examine(Number(text));
};
// end
</script>

<style scoped lang="less"></style>
