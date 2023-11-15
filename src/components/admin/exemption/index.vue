<!-- 免修申请管理 -->
<template>
  <div class="h-full flex flex-col">
    <header>
      <div
        class="w-full bg-white px-7 py-2"
        style="width: 100%; min-width: 1000px"
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
            :text="'学院'"
            :placeHolder="'全部'"
            :fontSize="18"
            :arr="collegeAllArr"
            @choice="collegeAllChoice"
          ></myElselect>
          <myElselect
            :text="'班级'"
            :placeHolder="'开发中（无）'"
            :fontSize="18"
          ></myElselect>
          <mySearch :placeholder="'学号搜索'" @search="searchText"></mySearch>
        </div>
        <div>
          <myState
            @state="stateText"
            class="mt-3"
            :stateArr="stateArr"
          ></myState>
        </div>
        <!-- <myState @state="stateText" class="mt-3"></myState> -->

        <!-- <div><mySearch @search="searchText"></mySearch></div> -->
      </div>
    </header>
    <article style="min-width: 100%" class="flex-1 mt-5">
      <div class="px-3 py-8 bg-white h-full flex flex-col justify-between">
        <el-table
          :data="studentList"
          :header-row-style="headerRoStyle"
          :header-cell-style="headerRoStyle"
          :row-style="roStyle"
          :cell-style="roStyle"
          empty-text="暂无数据"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <template #empty>
            <div class="flex flex-col items-center justify-center">
              <img class="mt-24" src="@/assets/images/NoResults.png" alt="" />
              <div class="mt-10" style="color: #aaaaaa">暂无搜索内容！</div>
            </div>
          </template>
          <el-table-column type="selection" width="55" v-if="state == '0'" />
          <el-table-column type="index" width="60" label="序号" />
          <el-table-column prop="createByName" label="学生名单" />
          <el-table-column prop="no" label="学号" />
          <el-table-column prop="college" label="学院" />
          <el-table-column prop="isRequired" label="班级(暂无)" />
          <el-table-column prop="degree" label="学位">
            <template #default="scope">
              {{ academicDegreeArr[scope.row.degree - 1].label }}
            </template>
          </el-table-column>
          <el-table-column prop="isRequired" label="操作">
            <template #default="scope">
              <el-button type="primary" link>查看详情</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="isRequired" label="审核状态">
            <template #default="scope">
              <div v-if="state != '1'" class="flex">
                <div v-for="(item, index) in stateArr" :key="index">
                  <el-button
                    :style="{ color: item.color }"
                    type="primary"
                    @click="stateText(item.state)"
                    v-if="item.state === String(scope.row.state)"
                    link
                    >{{ item.text }}</el-button
                  >
                </div>
                <TwoButton
                  v-if="state == '2' || state == '3'"
                  text="修改"
                  type="primary"
                  type2="warning"
                  text_color="#909399"
                  class="twoButton"
                  @confirm="update(state, scope.row.id)"
                  link
                ></TwoButton>
              </div>

              <div v-else-if="state == '1'">
                <TwoButton
                  text="通过"
                  type="primary"
                  color="#0052D9"
                  class="twoButton"
                  @confirm="examine(1, scope.row.id)"
                ></TwoButton>
                <TwoButton
                  text="拒绝"
                  type="primary"
                  color="#EA0000"
                  class="twoButton"
                  @confirm="examine(2, scope.row.id)"
                ></TwoButton>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="mt-4 flex justify-between">
          <div>
            <el-button v-if="state == '1'" color="#0052D9" type="primary"
              >全部通过</el-button
            >
          </div>

          <Pagination :total="total" @page="page"></Pagination>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import TwoButton from "@/components/button/two_button.vue";
import myElselect from "@/utils/vue/my_elselect.vue";
import mySearch from "@/utils/vue/my_search2.vue";
// import DiaLog from "@/components/Dialog/index.vue";
import Pagination from "@/utils/vue/my_pagination.vue";
import myState from "@/utils/vue/my_state.vue";
import { elMessage } from "@/components/ts/myMessage";
import { headerRoStyle, roStyle } from "@/utils/table";
import { getGuideAllYears } from "@/api/admin/guide";
import { getCollege } from "@/api/currency";
import { getExemption } from "@/api/admin/exemption";
import { toExamine, toExamineAll } from "@/api/currency";

const information = defineProps({
  type: {
    type: String,
    default: "1",
  },
});

// 多选
const handleSelectionChange = (rows?: any) => {
  console.log(rows);
};
// end

// 提交列表
const studentList = ref<Array<any>>([]);
const getAllList = () => {
  let data = `pageNo=${pageNo.value}&pageSize=${pageSize.value}&state=${state.value}`;
  if (grade.value && grade.value != "") {
    data += `&years=${grade.value}`;
  }
  if (academicDegree.value && academicDegree.value != "") {
    data += `&degree=${academicDegree.value}`;
  }
  if (collegeAll.value && collegeAll.value != "") {
    data += `&college=${collegeAll.value}`;
  }
  if (no.value && no.value != "") {
    data += `&no=${no.value}`;
  }
  getExemption(data).then((res) => {
    studentList.value = res.data.rows;
    total.value = res.data.total;
  });
};
// end

// 通过/不通过
const examine = (num: number, id: string) => {
  let aaa = {
    thiryId: id,
    state: num,
    grade: 4,
  };
  toExamine(aaa).then((res) => {
    elMessage(res.msg, res.code);
    getAllList();
  });
};
// end

// 修改
const update = (state: string, id: string) => {
  let num = state == "2" ? 2 : state == "3" ? 1 : 0;
  examine(num, id);
  getAllList();
};
// end

//
const total = ref<number>(0); // 总列表数
const pageNo = ref<number>(1); // 当前页
const pageSize = ref<number>(15); // 单页条目
// end

// 分页变化
type page = {
  pageNo: number;
  pageSize: number;
};
const page = (text: page) => {
  pageNo.value = text.pageNo;
  pageSize.value = text.pageSize;
  getAllList();
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
  getAllList();
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
get_guideAllYears();
// end

// 学位
const academicDegree = ref<string>("");
const academicDegreeArr = [
  {
    value: "1",
    label: "专科",
  },
  {
    value: "2",
    label: "本科",
  },
  {
    value: "3",
    label: "研究生",
  },
  {
    value: "4",
    label: "博士生",
  },
];
const academicDegreeChoice = (text: string) => {
  academicDegree.value = text;
  getAllList();
};
// end

// 学院
const collegeAll = ref<string>("");
const collegeAllArr = ref<Array<T>>([]);
const collegeAllChoice = (text: string) => {
  collegeAll.value = text;
  getAllList();
};
const get_college = () => {
  getCollege("").then((res) => {
    res.data.forEach((item: string) => {
      collegeAllArr.value.push({
        value: item,
        label: item,
      });
    });
  });
};
// end

// 搜素框
const no = ref<string>("");
const searchText = (text: string) => {
  no.value = text;
  getAllList();
};
// end

// 状态
const state = ref<string>("");
const stateArr = ref<Array<any>>([
  {
    color: "#0052D9",
    text: "全部",
    state: "",
  },
  {
    color: "#00A870",
    text: "已通过",
    state: "2",
  },
  {
    color: "#ED7B2F",
    text: "审核中",
    state: "1",
  },
  {
    color: "#DCDCDC",
    text: "未通过",
    state: "3",
  },
]);
const stateText = (text: string) => {
  state.value = text;
  getAllList();
};
// end

get_college();
getAllList(); // 查询列表
</script>

<style scoped lang="less"></style>
