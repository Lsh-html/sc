<!-- 活动管理 -->
<template>
  <div>
    <div class="flex" style="margin-top: 59px" v-show="operation == 'lists'">
      <typeTeacher
        @typeNum="typeNum"
        :txt="'活动审核管理'"
        style="margin-right: calc(calc(33.5 / 1920) * 100%)"
      ></typeTeacher>
      <div class="flex-1">
        <Management
          @operationObj="operationObj"
          @dataObj="dataObj"
        ></Management>
      </div>
    </div>
    <AddActivity
      v-show="operation == 'content'"
      :data="data"
      :type="type"
      @myState="myState"
    ></AddActivity>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import typeTeacher from "@/components/type/index-teacher.vue";
import Management from "@/components/activity/management/index.vue";

import AddActivity from "@/components/activity/add/addActivity/index.vue";

const type = ref<string>("1");
const typeNum = (typeText: any) => {
  type.value = typeText.type;
};

const operation = ref<string>(`lists`);
const operationObj = (text: string) => {
  operation.value = text;
};

// 参数
const data = ref<string>("");
const dataObj = (text: string) => {
  data.value = text;
};
// end

//
const myState = (text: string) => {
  if (text == "addList") {
    operation.value = "lists";
  }
};
// end

// // typeObj
// const type = ref<string>('')
// const typeObj = (text:string)=>{

// }
// // end
</script>

<style scoped lang="less"></style>
