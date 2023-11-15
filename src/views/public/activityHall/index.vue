<!-- 活动大厅 -->
<template>
  <div>
    <div v-show="my_state == '0'">
      <div class="flex" style="margin-top: 59px">
        <typeTeacher
          @typeNum="typeNum"
          :txt="'活动'"
          style="margin-right: calc(calc(33.5 / 1920) * 100%)"
        ></typeTeacher>
        <div class="flex-1">
          <activityHall
            :type="type"
            @my_state="my_stateObj"
            @id="idObj"
          ></activityHall>
        </div>
      </div>
    </div>
    <details2 v-show="my_state == '1'" :id="id"></details2>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import typeTeacher from "@/components/type/index-teacher.vue";
import activityHall from "@/components/public/activityHall/index.vue";
import details2 from "@/components/activity/add/addActivity/details2.vue";

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
