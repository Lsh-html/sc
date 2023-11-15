<!-- 助教管理 -->
<template>
  <div class="px-6 py-12">
    <div class="flex items-center">
      <span class="text-2xl mr-6">添加助教</span>

      <mySearch
        :placeholder="'学号搜索'"
        type="primary"
        :link="false"
        text="搜索"
        @search="searchText"
      ></mySearch>
    </div>
    <div style="margin-top: 60px">
      <el-table
        :data="lists"
        :header-row-style="headerRoStyle2"
        :header-cell-style="headerRoStyle2"
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
        <el-table-column prop="courseName" label="姓名" />
        <el-table-column prop="courseNumber" label="学号" />
        <el-table-column prop="title" label="班级" />
        <el-table-column prop="createByName" label="职位" />
        <el-table-column prop="createTime" label="操作" />
        <el-table-column prop="createTime" label="状态"> </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="dialogVisible" width="500px">
      <div>
        <div>
          <el-icon size="24" color="#2ba471"><CircleCheckFilled /></el-icon>
          <span class="font-black">学生信息</span>
        </div>

        <el-icon size="24" color="#0256ff"><CircleCheckFilled /></el-icon>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import { headerRoStyle2, roStyle } from "@/utils/table";
import { CircleCheckFilled } from "@element-plus/icons-vue";
import { elMessage } from "@/components/ts/myMessage";
import mySearch from "@/utils/vue/my_search.vue";

import { getAssistantLists } from "@/api/activity/assistant";

// 搜素框
const no = ref<string>("");
const dialogVisible = ref<boolean>(false);
const searchText = (text: string) => {
  // dialogVisible.value = true;
  // no.value = text;
  getAssistantLists(`no_IN=${text}`).then((res) => {
    elMessage(res.msg, res.code);
  });
  // getLists();
};
// end

// 列表
const lists = ref<Array<any>>([]);
// end
</script>

<style scoped lang="less"></style>
