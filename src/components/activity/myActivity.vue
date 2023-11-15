<!-- 我的活动管理 -->
<template>
  <div class="" style="min-height: 100%">
    <header>
      <div
        class="w-full bg-white px-7 py-2"
        style="width: 100%; min-width: 1200px"
      >
        <div class="w-full flex justify-between">
          <myElselect
            :text="'年级'"
            :placeHolder="'全部'"
            :fontSize="18"
            :arr="gradeArr"
            @choice="gradeChoice"
          ></myElselect>
          <myElselect
            :text="'学位'"
            :placeHolder="'全部'"
            :fontSize="18"
            :arr="academicDegreeArr"
            @choice="academicDegreeChoice"
          ></myElselect>

          <myElselect
            :text="'校区'"
            :placeHolder="'全部'"
            :fontSize="18"
            :arr="schoolAllArr"
            @choice="schoolAllChoice"
          ></myElselect>

          <myElselect
            :text="'学院'"
            :placeHolder="'全部'"
            :fontSize="18"
            :arr="collegeAllArr"
            @choice="collegeAllChoice"
          ></myElselect>

          <myElselect
            :text="'课程状态'"
            :placeHolder="'全部'"
            :fontSize="18"
            :arr="curriculumAllArr"
            @choice="curriculumAllChoice"
          ></myElselect>
        </div>
        <div class="w-full flex justify-between items-center mt-4">
          <myState
            @state="stateText"
            :stateArr="stateArr"
            :stateNum="state"
          ></myState>
          <mySearch :placeholder="'学号搜索'" @search="searchText"></mySearch>
        </div>
      </div>
    </header>
    <!-- <article> -->
    <div
      class="px-3 py-8 bg-white mt-5 flex flex-col"
      style="min-height: calc(100% - 132px)"
    >
      <!-- flex flex-col justify-between -->
      <div class="flex-1">
        <el-table
          :data="planAllList"
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
          <el-table-column prop="courseName" label="活动名称" />
          <el-table-column prop="courseNumber" label="活动编号" />
          <el-table-column prop="title" label="活动类型" />
          <el-table-column prop="createByName" label="创建老师" />
          <el-table-column prop="createTime" label="提交时间" width="220px">
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="primary" link @click="details(scope.row.id)"
                >查看详情</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="isRequired" label="审核状态">
            <template #default="scope">
              <div class="flex">
                <div
                  v-if="state == ''"
                  v-for="(item, index) in stateArr"
                  :key="index"
                >
                  <el-button
                    :style="{ color: item.color }"
                    type="primary"
                    v-if="item.state === String(scope.row.state)"
                    @click="stateText(item.state)"
                    link
                    >{{ item.text }}</el-button
                  >
                </div>
                <el-button
                  style="color: #909399"
                  type="primary"
                  @click="updatePlan(scope.row.id)"
                  link
                  >修改</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="mt-4 flex justify-between">
        <div>
          <el-button color="#0052D9" type="primary" @click="addPlan"
            >创建新活动</el-button
          >
        </div>

        <Pagination :total="total" @page="page"></Pagination>
      </div>
    </div>
    <!-- </article> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, getCurrentInstance } from "vue";
import myElselect from "@/utils/vue/my_elselect.vue";
import mySearch from "@/utils/vue/my_search.vue";
import myState from "@/utils/vue/my_state.vue";
import Pagination from "@/utils/vue/my_pagination.vue";
import { useTestStore } from "@/store/index";

import { getGuideAllYears } from "@/api/admin/guide";
import { getCollege } from "@/api/currency";
import { getActivityLists } from "@/api/activity/index";

const information = defineProps({
  type: {
    type: String,
    default: "1",
  },
});

const emit = defineEmits(["myState", "addActivity", "update", "data"]);
const instance = getCurrentInstance();

// 列表查询
const planAllList = ref<Array<any>>([]); // 列表
const total = ref<number>(0);
const pageNo = ref<number>(1);
const pageSize = ref<number>(15);
const getLists = () => {
  let data = `type_EQ=${information.type}&state_EQ=${state.value}&pageNo=${pageNo.value}&pageSize=${pageSize.value}`;
  getActivityLists(data).then((res) => {
    if (res.data && res.data.rows.length > 0) {
      planAllList.value = res.data.rows;
      total.value = res.data.total;
    }
  });
};
// end

// 分页变化
type page = {
  pageNo: number;
  pageSize: number;
};
const page = (text: page) => {
  console.log(text);
  pageNo.value = text.pageNo;
  pageSize.value = text.pageSize;
  getLists();
};
// end

// 新增
const addPlan = () => {
  emit("myState", "add");
};
// end

// 修改
const updatePlan = (id: string) => {
  emit("addActivity", true);
  instance?.proxy?.$Bus.emit("update", id);
};
// end

// 年级
type T = {
  value: string;
  label: string;
};
const grade = ref<string | number>("");
const gradeArr = ref<Array<T>>([]);
const gradeChoice = (text: string) => {
  grade.value = text;
  getLists();
};
const get_guideAllYears = () => {
  getGuideAllYears({ type: information.type }).then((res) => {
    if (res.data && res.data.length > 0) {
      res.data.forEach((item: string) => {
        gradeArr.value.push({
          value: item,
          label: item,
        });
      });
    }
  });
};
// end

// 学位
const academicDegree = ref<string>("");
const academicDegreeArr = useTestStore().academicDegreeArr;
const academicDegreeChoice = (text: string) => {
  academicDegree.value = text;
  getLists();
};
// end

// 校区
const school = ref<string>("");
const schoolAllArr = useTestStore().schoolAllArr;
const schoolAllChoice = (text: string) => {
  school.value = text;
  getLists();
};
// end

// 学院
const collegeAll = ref<string>("");
const collegeAllArr = ref<Array<T>>([]);
const collegeAllChoice = (text: string) => {
  collegeAll.value = text;
  getLists();
};
const get_college = () => {
  getCollege("").then((res) => {
    if (res.data && res.data.length > 0) {
      res.data.forEach((item: string) => {
        collegeAllArr.value.push({
          value: item,
          label: item,
        });
      });
    }
  });
};
// end

// 课程状态
// const curriculum = ref<string>("");
const curriculumAllArr = useTestStore().curriculumAllArr;
const curriculumAllChoice = (text: string) => {
  // curriculum.value = text;
  state.value = text;
  getLists();
};
// end

// 搜素框
const no = ref<string>("");
const searchText = (text: string) => {
  no.value = text;
  getLists();
};
// end

// 状态
const state = ref<string>("");
const stateArr = useTestStore().stateArr;
const stateText = (text: string) => {
  state.value = text;
  getLists();
};
// end

// 查看详情
const details = (id: string) => {
  instance?.proxy?.$Bus.emit("update", id);
  emit("addActivity", true);
};
// end

// 表头样式
const headerRoStyle = {
  background: "#00B578",
  color: "#fff",
};
// end

// 表格样式
const roStyle = {
  height: "80px",
  // textAlign: "center",
};
// end

get_college();
get_guideAllYears();
getLists();
</script>

<style scoped lang="less"></style>
.
