<!-- 创建活动的真实页面 -->
<template>
  <div class="bg-white" style="min-height: 100%">
    <header class="">
      <div class="w-full px-7 pt-6 flex justify-between items-center">
        <myReturn class="" @cli="cli"></myReturn>
        <div>{{ information.activity_text }}</div>
        <el-button color="#0052D9" type="primary">预览活动</el-button>
      </div>
      <el-divider />
    </header>
    <article
      class="flex-1 flex justify-between"
      style="background-color: #f3f4f6"
    >
      <div class="mt-7 left bg-white" style="width: 360px">
        <div>
          <div class="py-4 text-center" style="font-size: 14px">
            活动基础信息
          </div>
          <el-divider />
        </div>
        <div class="px-2">
          <el-menu
            :default-active="String(activityKey)"
            class="el-menu-vertical-demo"
            @select="select"
          >
            <el-menu-item
              v-for="item in activityLists"
              :style="{ background: activityKey == item.key ? '#f2f3ff' : '' }"
              :key="item.key"
              :index="item.key"
            >
              <span>{{ item.text }}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="mt-7 right bg-white" style="width: 1212px">
        <Details
          v-show="activityKey == '1'"
          :data="information.data"
          :type="information.type"
          :activity_text="information.activity_text"
          :updateID="updateID"
        ></Details>
        <Section
          v-show="activityKey == '2'"
          :data="information.data"
          :type="information.type"
          :activity_text="information.activity_text"
          :updateID="updateID"
        ></Section>
        <Courseware
          v-show="activityKey == '3'"
          :data="information.data"
          :type="information.type"
          :activity_text="information.activity_text"
          :updateID="updateID"
        ></Courseware>

        <Operation
          v-show="activityKey == '4'"
          :data="information.data"
          :type="information.type"
          :activity_text="information.activity_text"
          :updateID="updateID"
        ></Operation>
        <Clock
          v-show="activityKey == '5'"
          :data="information.data"
          :type="information.type"
          :activity_text="information.activity_text"
          :updateID="updateID"
        ></Clock>
        <Assistant
          v-show="activityKey == '7'"
          :data="information.data"
          :type="information.type"
          :activity_text="information.activity_text"
          :updateID="updateID"
        ></Assistant>
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, getCurrentInstance } from "vue";
import myReturn from "@/utils/vue/my_return.vue";
import Details from "@/components/activity/add/addActivity/details.vue";
import Section from "@/components/activity/add/addActivity/section.vue";
import Courseware from "./courseware.vue";
import Operation from "./operation.vue";
import Clock from "./clock.vue"; // 考勤
import Assistant from "@/components/activity/add/addActivity/assistant.vue";

const information = defineProps({
  type: {
    type: String,
    default: "1",
  },
  // list_id: {
  //   type: String,
  //   default: "",
  // },
  activity_text: {
    type: String,
    default: "...",
  },
  data: {
    type: String,
    default: "", // 活动创建完成的反值
  },
});

const emit = defineEmits(["myState", "addActivity"]);
const instance = getCurrentInstance();

const updateID = ref<string>("");
instance?.proxy?.$Bus.on("update", (num) => {
  updateID.value = num as string;
});

// 返回
const cli = (text: boolean) => {
  if (text) {
    emit("myState", "addList");
    emit("addActivity", false);
  }
};
// end

const activityKey = ref<string>("1");
const activityLists = ref<Array<any>>([
  {
    key: "1",
    text: "活动详情",
  },
  {
    key: "2",
    text: "节次设置",
  },
  {
    key: "3",
    text: "课件设置",
  },
  {
    key: "4",
    text: "作业设置",
  },
  {
    key: "5",
    text: "考勤设置",
  },
  {
    key: "6",
    text: "成绩考核",
  },
  {
    key: "7",
    text: "助教设置",
  },
]);

const select = (index: string) => {
  activityKey.value = index;
  console.log(index);
};
</script>

<style scoped lang="less">
:deep(.el-menu) {
  border: 0;
}
</style>
