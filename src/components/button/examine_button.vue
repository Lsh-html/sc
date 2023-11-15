<!-- 通过/ 未通过按钮 -->
<template>
  <div v-if="thiryId && thiryId != ''" style="display: inline-block">
    <two_button
      :text="state == 1 ? '通过' : state == 2 ? '未通过' : '未知'"
      :type="state == 1 ? 'primary' : state == 2 ? 'warning' : ''"
      class="twoButton"
      @confirm="update"
    ></two_button>
  </div>
</template>

<script lang="ts" setup>
import two_button from "@/components/button/two_button.vue";
import { elMessage } from "@/components/ts/myMessage"; // 提示框
import { ref, reactive, toRefs } from "vue";

import { toExamine, toExamineAll } from "@/api/currency";

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

const emit = defineEmits(["play"]);

type T = {
  thiryId: string;
  state: number;
  grade: number;
  explains?: string;
};

const update = () => {
  let aaa = reactive<T>({
    thiryId: information.thiryId,
    state: information.state,
    grade: information.grade,
    explains: information.explains,
  });

  // if (information.explains && information.explains != "") {
  //   aaa.explains = information.explains;
  // }

  toExamine(aaa).then((res) => {
    elMessage(res.msg, res.code);
    // getAllList();
    emit("play", "");
  });
};
</script>

<style scoped lang="less"></style>
