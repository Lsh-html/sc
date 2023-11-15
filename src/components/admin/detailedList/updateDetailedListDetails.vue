<!-- name -->
<template>
  <div
    class="border-dashed border-black border-2 p-3 flex justify-between items-center"
    style="border-color: #3674f0"
  >
    <myElselect
      :text="'性质'"
      :placeHolder="'全部'"
      :arr="isRequiredArr"
      :value="isRequired"
      @choice="isRequiredChoice"
    ></myElselect>
    <myElselect
      :text="'类别'"
      :placeHolder="'全部'"
      :arr="clssificationArr"
      :value="clssification"
      @choice="clssificationChoice"
    ></myElselect>
    <div class="flex items-center">
      <span class="w-16 font-black text-xl">内容</span>
      <mySearch2
        @search="descsText"
        :placeholder="'请输入清单内容'"
        :value="descs"
        class="ml-4"
      ></mySearch2>
    </div>
    <div class="flex items-center">
      <span class="w-32 font-black text-xl">考核说明</span>
      <mySearch2
        @search="checkExplainText"
        :placeholder="'请输入考核说明'"
        :value="checkExplain"
        class="ml-4"
      ></mySearch2>
    </div>
    <!-- <div style="font-size: 1.25rem; color: #3674f0" @click="add">修改</div> -->

    <el-button style="font-size: 1rem" type="primary" @click="add" link
      >修改</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, watch } from "vue";
import mySearch2 from "@/utils/vue/my_search2.vue";
import myElselect from "@/utils/vue/my_elselect.vue";

const information = defineProps({
  updateListObj: {
    type: Object,
    default: {},
  },
});
onMounted(() => {
  isRequired.value = Number(information.updateListObj.isRequired);
  clssification.value = Number(information.updateListObj.clssification);
  descs.value = information.updateListObj.descs;
  checkExplain.value = information.updateListObj.checkExplain;
});

watch(
  () => information.updateListObj,
  () => {
    isRequired.value = Number(information.updateListObj.isRequired);
    clssification.value = Number(information.updateListObj.clssification);
    descs.value = information.updateListObj.descs;
    checkExplain.value = information.updateListObj.checkExplain;
  }
);
const emit = defineEmits(["updateList"]);

// 性质
const isRequired = ref<number>();
const isRequiredArr = [
  {
    value: 1,
    label: "必修",
  },
  {
    value: 2,
    label: "选修",
  },
];
const isRequiredChoice = (text: number) => {
  isRequired.value = text;
};
// end

// 类别
const clssification = ref<number>();
const clssificationArr = [
  {
    value: 1,
    label: "课程",
  },
  {
    value: 2,
    label: "活动",
  },
  {
    value: 3,
    label: "竞赛",
  },
  {
    value: 4,
    label: "app跑步",
  },
  {
    value: 5,
    label: "主题劳动",
  },
  {
    value: 6,
    label: "实验室或工位环境维护",
  },
  {
    value: 7,
    label: "锻炼过程积分",
  },
  {
    value: 8,
    label: "劳育思政课",
  },
  {
    value: 9,
    label: "社团集训",
  },
];
const clssificationChoice = (text: number) => {
  clssification.value = text;
};
// end

// 清单内容
const descs = ref<string>("");
const descsText = (text: string) => {
  descs.value = text;
};
// end

// 考核说明
const checkExplain = ref<string>("");
const checkExplainText = (text: string) => {
  checkExplain.value = text;
};
// end

// 添加
const add = () => {
  emit("updateList", {
    id: information.updateListObj.id,
    isRequired: isRequired.value,
    clssification: clssification.value,
    descs: descs.value,
    checkExplain: checkExplain.value,
  });
};
// end
</script>

<style scoped lang="less"></style>
