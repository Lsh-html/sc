<!-- 通过/ 未通过按钮 -->
<template>
  <div v-if="thiryId && thiryId != ''" style="display: inline-block">
    <two_button
      text="报名"
      type="primary"
      class="twoButton"
      @confirm="update"
    ></two_button>
  </div>
</template>

<script lang="ts" setup>
import two_button from "@/components/button/two_button.vue";
import { elMessage } from "@/components/ts/myMessage"; // 提示框
import { ref, reactive, toRefs } from "vue";

import { setActivity } from "@/api/activity/index";

const information = defineProps({
  thiryId: {
    type: String,
    default: "",
  },
  grade: {
    type: Number,
    default: null,
  },
  state: {
    type: Number,
    default: null,
  },
  explains: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["f5"]);

const update = () => {
  setActivity({ courseInfoId: information.thiryId }).then((res) => {
    emit("f5", "");
    elMessage(res.msg, res.code);
  });
};
</script>

<style scoped lang="less"></style>
