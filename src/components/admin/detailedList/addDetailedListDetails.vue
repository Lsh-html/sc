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
        :placeHolder="'请输入清单内容'"
        class="ml-4"
      ></mySearch2>
    </div>
    <div class="flex items-center">
      <span class="w-32 font-black text-xl">考核说明</span>
      <mySearch2
        @search="checkExplainText"
        :placeHolder="'请输入考核说明'"
        class="ml-4"
      ></mySearch2>
    </div>
    <div
      class="iconfont icon-add"
      style="font-size: 1.25rem; color: #3674f0"
      @click="add"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import mySearch2 from "@/utils/vue/my_search2.vue";
import myElselect from "@/utils/vue/my_elselect.vue";

const information = defineProps({
  updateListObj: {
    type: Object,
    default: {},
  },
});

const emit = defineEmits(["addList"]);

// 性质
const isRequired = ref<string>("");
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
const isRequiredChoice = (text: string) => {
  isRequired.value = text;
};
// end

// 类别
const clssification = ref<string>("");
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
const clssificationChoice = (text: string) => {
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
  emit("addList", {
    studyguideId: "",
    isRequired: isRequired.value,
    clssification: clssification.value,
    descs: descs.value,
    checkExplain: checkExplain.value,
  });
};
// end
</script>

<style scoped lang="less"></style>
