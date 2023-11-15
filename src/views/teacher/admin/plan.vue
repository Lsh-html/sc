<!-- name -->
<template>
  <div>
    <div v-show="!detailsBol" class="flex" style="margin-top: 59px">
      <typeTeacher
        @typeNum="typeNum"
        :txt="'研修计划管理'"
        style="margin-right: calc(calc(33.5 / 1920) * 100%)"
      ></typeTeacher>
      <Content
        :type="type"
        class="flex-1"
        @details="details"
        :state="state"
      ></Content>
    </div>
    <div v-if="detailsBol" class="flex flex-col">
      <setHeader
        :id="detailsObj.id"
        :state="detailsObj.state"
        @details="details2"
        @state="stateBol"
      ></setHeader>
      <studentContent
        class="flex-1"
        :typeObj="detailsObj.typeObj"
        :no="detailsObj.no"
      ></studentContent>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import typeTeacher from "@/components/type/index-teacher.vue";
import Content from "@/components/admin/plan/index.vue";
import studentContent from "@/components/students/plan/getPlan.vue";
import setHeader from "@/components/admin/plan/planSetHeader.vue";

const type = ref<string>("1");

const typeNum = (typeText: any) => {
  // typeObj.value = Text;
  type.value = typeText.type;
  console.log(typeText);
};

// 查看详情
type T = {
  id: string;
  no: string;
  state: string;
  typeObj: {
    type: number;
    text: string;
  };
};
let detailsObj = reactive<T>({
  id: "",
  no: "",
  state: "",
  typeObj: {
    type: 0,
    text: "",
  },
});
const detailsBol = ref<boolean>(false);
const details = (obj: T) => {
  detailsBol.value = true;
  detailsObj = {
    id: obj.id,
    no: obj.no,
    state: obj.state,
    typeObj: {
      type: obj.typeObj.type,
      text: "",
    },
  };
};
// end

// 详情页点击返回
const details2 = (text: boolean) => {
  detailsBol.value = text;
};
// end

// 详情页审核
const state = ref<number>(0);
const stateBol = (num: number) => {
  state.value = num;
};
// end
</script>

<style scoped lang="less"></style>
