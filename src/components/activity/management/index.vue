<!-- 活动审核 -->
<template>
  <div class="h-full flex flex-col">
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
            :text="'活动类别'"
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
          <mySearch :placeholder="'学号搜索'" @search="searchText"> </mySearch>
        </div>
      </div>
    </header>
    <article style="min-width: 100%" class="mt-5 flex-1">
      <div class="px-3 py-8 bg-white h-full flex flex-col justify-between">
        <el-table
          :data="planAllList"
          :header-row-style="useTestStore().headerRoStyle"
          :header-cell-style="useTestStore().headerRoStyle"
          :row-style="useTestStore().roStyle"
          :cell-style="useTestStore().roStyle"
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
          <el-table-column
            prop="createTime"
            label="提交时间"
            style="width: 200px"
          >
          </el-table-column>

          <el-table-column label="操作">
            <template #default="scope">
              <div class="flex">
                <el-button type="primary" link @click="details(scope.row)"
                  >查看详情</el-button
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="isRequired"
            label="审核状态"
            v-if="state == ''"
          >
            <template #default="scope">
              <div class="flex">
                <div
                  v-if="state == ''"
                  v-for="(item, index) in stateArr2"
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

                <!-- <el-button
                  style="color: #909399"
                  type="primary"
                  @click="updatePlan(scope.row.id)"
                  link
                  >修改</el-button
                > -->
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            label="审核"
            :width="state != '' ? '200px' : ''"
          >
            <template #default="scope">
              <examine_button
                class="examine_button"
                :thiryId="scope.row.id"
                :state="1"
                :grade="2"
                @play="getLists()"
              ></examine_button>
              <examine_button
                class="examine_button"
                :thiryId="scope.row.id"
                :state="2"
                :grade="2"
                @play="getLists()"
              ></examine_button>
            </template>
          </el-table-column>
        </el-table>
        <div class="mt-4 flex justify-end">
          <Pagination :total="total" @page="page"></Pagination>
        </div>
      </div>
    </article>
  </div>

  <!-- <AddActivity
    v-else-if="operation == 'content'"
    :type="type"
    :activity_text="activity_text"
    :data="data_text"
  ></AddActivity> -->
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import { useTestStore } from "@/store/index";
import myElselect from "@/utils/vue/my_elselect.vue";
import mySearch from "@/utils/vue/my_search.vue";
import myState from "@/utils/vue/my_state.vue";
import Pagination from "@/utils/vue/my_pagination.vue";
import examine_button from "@/components/button/examine_button.vue";

import { getGuide } from "@/api/admin/guide";
import { getGuideAllYears } from "@/api/admin/guide";
import { getCollege } from "@/api/currency";
import { getActivityLists } from "@/api/activity/index";

const information = defineProps({
  type: {
    type: String,
    default: "1",
  },
});

const emit = defineEmits(["operationObj", "dataObj", "typeObj"]);

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
    res.data.forEach((item: string) => {
      gradeArr.value.push({
        value: item,
        label: item,
      });
    });
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
const collegeAllArr = useTestStore().collegeAllArr;
const collegeAllChoice = (text: string) => {
  collegeAll.value = text;
  getLists();
};
// end

// 活动类别 -- 等待接口
const curriculumAllArr = ref<Array<any>>([]);
const curriculumAllChoice = (text: string) => {};
// end

// 状态
const state = ref<string>("");
const stateArr = useTestStore().stateArr;
const stateArr2 = useTestStore().stateArr2;
const stateText = (text: string) => {
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

// 列表查询
const planAllList = ref<Array<any>>([]); // 列表
const total = ref<number>(0);
const pageNo = ref<number>(1);
const pageSize = ref<number>(15);
const getLists = () => {
  let myState = ref<string>(``);

  if (state.value == "1") {
    myState.value = `1,2,3`;
  } else if (state.value == "2") {
    myState.value = `4`;
  } else {
    myState.value = state.value;
  }

  let data = `type_EQ=${information.type}&state_IN=${myState.value}&pageNo=${pageNo.value}&pageSize=${pageSize.value}`;
  getActivityLists(data).then((res) => {
    // console.log(res);
    planAllList.value = res.data.rows;
    total.value = res.data.total;
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

// 查看详情
const details = (obj: any) => {
  emit("operationObj", "content");
  emit("dataObj", JSON.stringify(obj));
  // emit("typeObj", information.type);
};
// end

get_guideAllYears();
getLists();
</script>

<style scoped lang="less"></style>
