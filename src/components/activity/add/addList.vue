<!-- 活动创建 - 首页 -->
<template>
  <div class="p-8 bg-white">
    <header class="">
      <div class="flex justify-between">
        <div class="flex items-center">
          <myReturn @cli="cli"></myReturn>
          <div class="ml-10 font-black">活动创建</div>
        </div>
        <el-button color="#0052D9" type="primary">批量创建</el-button>
      </div>
      <div class="mt-12 flex flex-col items-center">
        <img src="@/assets/images/BG.png" alt="" />
        <div class="mb-44 flex flex-col items-end">
          <div class="mt-12 flex items-center">
            <span class="mr-6 text-2xl">活动名称</span>
            <MySearch
              placeholder="请输入活动名称"
              class="mr-8"
              :width="'346px'"
              @search="activityName"
            ></MySearch>
          </div>
          <div class="mt-12 flex items-center">
            <span class="mr-6 text-2xl">活动编号</span>
            <MySearch
              placeholder="请输入活动编号"
              class="mr-8"
              :width="'346px'"
              @search="activityId"
            ></MySearch>
          </div>

          <div class="mt-12 mr-8">
            <el-button
              class="w-full"
              style="height: 36px; width: 346px"
              color="#0052D9"
              type="primary"
              @click="addActivity"
              >创建活动</el-button
            >
          </div>
        </div>
      </div>
    </header>
    <article>
      <div class="ml-20 my-4 font-black" style="font-size: 18px">
        我的历史活动
      </div>
      <el-table
        :data="oldActivityLists"
        :header-row-style="headerRoStyle"
        :header-cell-style="headerRoStyle"
        :row-style="roStyle"
        :cell-style="roStyle"
        empty-text="暂无数据"
        style="width: 100%"
      >
        <template #empty>
          <div class="flex flex-col items-center justify-center">
            <img class="mt-24" src="@/assets/images/NoResults.png" alt="" />
            <div class="mt-10" style="color: #aaaaaa">暂无搜索内容！</div>
          </div>
        </template>
        <el-table-column type="index" width="60" label="序号" />
        <el-table-column prop="createByName" label="活动名称" />
        <el-table-column prop="college" label="活动类型" />
        <el-table-column prop="isRequired" label="创建老师" />
        <el-table-column prop="degree" label="提交时间"> </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" link>查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="">
          <template #default="scope">
            <el-button color="#0052D9" type="primary">复用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import { headerRoStyle, roStyle } from "@/utils/table";
import { elMessage } from "@/components/ts/myMessage";
import myReturn from "@/utils/vue/my_return.vue";
import MySearch from "@/utils/vue/my_search2.vue";

import { setInsert } from "@/api/admin/detailedList";
const information = defineProps({
  type: {
    type: String,
    default: "1",
  },
  list_id: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["myState", "addActivity", "activityText", "data"]);

// 历史活动
const oldActivityLists = ref<Array<any>>([]);
const getOldActivity = () => {
  /**
   * 从接口拿到值，然后赋给oldActivityLists数组
   */
};
// end

// 返回
const cli = (text: boolean) => {
  if (text) {
    emit("myState", "add");
  }
};
// end

// 创建活动名称
const courseName = ref<string>();
const activityName = (text: string) => {
  courseName.value = text;
  // emit("activityText", text);
};
// end

// 创建活动编号
const courseNumber = ref<string>();
const activityId = (text: string) => {
  courseNumber.value = text;
  // emit("activityText", text);
};
// end

// 创建活动
interface T {
  courseNumber: string;
  courseName: string;
  traininglistItemId: string;
  type: string;
}
const addActivity = () => {
  const data = reactive<T>({
    courseNumber: courseNumber.value as string,
    courseName: courseName.value as string,
    traininglistItemId: information.list_id as string,
    type: information.type,
  });
  setInsert(data).then((res) => {
    if (res.code == 200) {
      emit("addActivity", true);
      emit("data", res.data);
    } else {
      elMessage(res.msg, res.code);
    }
  });
};
// end
</script>

<style scoped lang="less"></style>
