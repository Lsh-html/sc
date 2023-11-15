<!-- 活动管理 -->
<template>
  <div v-show="my_state == '0'">
    <div class="flex" style="margin-top: 59px">
      <typeTeacher
        @typeNum="typeNum"
        :txt="'活动管理'"
        style="margin-right: calc(calc(33.5 / 1920) * 100%)"
      ></typeTeacher>
      <div>
        <myActivity
          :type="type"
          @my_state="my_stateObj"
          @id="idObj"
        ></myActivity>
      </div>
    </div>
  </div>
  <myDetails
    v-show="my_state == '1'"
    :id="id"
    @my_state="my_stateObj"
  ></myDetails>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import typeTeacher from "@/components/type/index-teacher.vue";
// import activityHall from "@/components/public/activityHall/index.vue";
import myActivity from "@/components/students/myActivity/inedx.vue";
import myDetails from "@/components/students/myActivity/details.vue";

const type = ref<string>("1");
const typeNum = (typeText: any) => {
  type.value = typeText.type;
};

// 列表 or 详情页
const my_state = ref<string>(`0`); // 临时修改： 原值：‘1’
const my_stateObj = (text: string) => {
  my_state.value = text;
};
// end

// 获取详情id
const id = ref<string>(``);
const idObj = (text: string) => {
  id.value = text;
};
// end
</script>

<style scoped lang="less"></style>
