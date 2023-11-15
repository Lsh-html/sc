<!-- 我的活动 -->
<template>
  <div>
    <div
      class="flex"
      style="padding-top: 59px; min-height: 100%"
      v-show="!add_activity"
    >
      <typeTeacher
        @typeNum="typeNum"
        :txt="'活动管理'"
        style="margin-right: calc(calc(33.5 / 1920) * 100%)"
      ></typeTeacher>
      <Content
        :type="type"
        class="flex-1"
        @myState="myState"
        @addActivity="addActivity"
        @update="updateId"
        @data="dataText"
        v-if="my_state == ''"
      ></Content>
      <DetailedList
        :type="type"
        class="flex-1"
        @myState="myState"
        @listId="listId"
        v-else-if="my_state == 'add'"
      ></DetailedList>
      <AddList
        :type="type"
        :list_id="list_id"
        class="flex-1"
        @myState="myState"
        @addActivity="addActivity"
        @activityText="activityText"
        @data="dataText"
        v-else-if="my_state == 'addList'"
      ></AddList>
    </div>
    <div class="mt-9" v-show="add_activity" style="min-height: 100%">
      <AddActivity
        style="width: 100%; min-height: 100%"
        :type="type"
        :activity_text="activity_text"
        :data="data_text"
        @myState="myState"
        @addActivity="addActivity"
      ></AddActivity>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, watch } from "vue";
import typeTeacher from "@/components/type/index-teacher.vue";
import Content from "@/components/activity/myActivity.vue";
import DetailedList from "@/components/activity/add/detailedList.vue";
import AddList from "@/components/activity/add/addList.vue";
import AddActivity from "@/components/activity/add/addActivity/index.vue";

const type = ref<string>("1");

const typeNum = (typeText: any) => {
  type.value = typeText.type;
};

// 状态变化
const my_state = ref<string>("");
const myState = (text: string) => {
  my_state.value = text;
};
// end

// 创建时的类型传值
const list_id = ref<string>("");
const listId = (listId: string) => {
  list_id.value = listId;
  console.log(list_id);
};
// end

// 切换创建所在页面
const add_activity = ref<boolean>(false); // 临时修改
const addActivity = (text: boolean) => {
  add_activity.value = text;
};
// end

// 创建活动名称填写
const activity_text = ref<string>("");
const activityText = (text: string) => {
  console.log(text, "text");

  activity_text.value = text;
};
// end

// 完成活动创建获得id
const data_text = ref<string>("");
const dataText = (data: any) => {
  data_text.value = JSON.stringify(data);
};
// end

// 需要修改的id
const updateId = () => {};
// end
</script>

<style scoped lang="less"></style>
