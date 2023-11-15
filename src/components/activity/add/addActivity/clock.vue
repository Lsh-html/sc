<!-- 考勤设置 -->
<template>
  <div class="p-3 ml-3" style="min-height: 100%">
    <div class="mb-4">
      <div class="font-base font-black">考勤设置</div>
      <div>
        <span>考勤分数：</span>
        <span
          ><el-input v-model="text.num" type="number" style="width: 96px"
        /></span>
      </div>
    </div>

    <div class="mb-4">
      <div class="font-base font-black">考勤要求</div>
      <div>
        <span>活动开始前</span>&nbsp;&nbsp;
        <span
          ><el-input
            v-model="text.startTime"
            type="number"
            style="width: 96px" /></span
        >&nbsp;&nbsp; <span>分钟签到至活动结束后</span>&nbsp;&nbsp;
        <span
          ><el-input
            v-model="text.endTime"
            type="number"
            style="width: 96px" /></span
        >&nbsp;&nbsp;
        <span>分钟签退考勤有效</span>
      </div>
    </div>

    <div class="mb-4">
      <two_button
        text="保存"
        type="primary"
        class="twoButton"
        @confirm="update"
      ></two_button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from "vue";
import two_button from "@/components/button/two_button.vue";
import { elMessage } from "@/components/ts/myMessage"; // 提示框

interface T {
  num: number;
  startTime: number;
  endTime: number;
}

const text = ref<T>({
  num: 0,
  startTime: 0,
  endTime: 0,
});

// 保存
const update = () => {
  elMessage("模拟保存", 200);
};
// end
</script>

<style scoped lang="less"></style>
