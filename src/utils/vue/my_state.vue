<!-- 状态 -->
<template>
  <div>
    <el-button
      v-for="(item, index) in information.stateArr"
      :key="index"
      :color="mystate == item.state ? item.color : item.color2"
      :style="{ color: mystate == item.state ? '#fff' : '#000' }"
      size="small"
      @click="play(item.state)"
      >{{ item.text }}</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, watch } from "vue";
const information = defineProps({
  stateArr: {
    type: Array<any>,
    default: [
      {
        color: "#0052D9",
        color2: "#DCDCDC",
        text: "全部",
        state: "",
      },
      {
        color: "#00A870",
        color2: "#DCDCDC",
        text: "已审核",
        state: "1",
      },
      {
        color: "#ED7B2F",
        color2: "#DCDCDC",
        text: "审核中",
        state: "2",
      },
      {
        color: "#EA0000",
        color2: "#DCDCDC",
        text: "未通过",
        state: "3",
      },
    ],
  },
  stateNum: {
    type: String,
    default: "1",
  },
});

onMounted(() => {
  mystate.value = information.stateNum;
});

watch(
  () => information.stateNum,
  () => {
    mystate.value = information.stateNum;
  }
);

const mystate = ref<any>("");

const emit = defineEmits(["state"]);

const play = (text: string) => {
  mystate.value = text;
  emit("state", text);
};
</script>

<style scoped lang="less">
:deep(.el-button) {
  border-radius: 0;
}
</style>
