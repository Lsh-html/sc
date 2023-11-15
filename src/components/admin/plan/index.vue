<!-- 研修计划管理 -->
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
    <article style="min-width: 100%" class="flex-1">
      <div class="mt-5 px-3 py-8 bg-white h-full flex flex-col justify-between">
        <el-table
          :data="planAllList"
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
          <el-table-column prop="college" label="学院" />
          <el-table-column prop="isRequired" label="班级(暂无)" />
          <el-table-column prop="degree" label="学位">
            <template #default="scope">
              {{ academicDegreeArr[scope.row.degree - 1].label }}
            </template>
          </el-table-column>
          <el-table-column prop="isRequired" label="操作">
            <template #default="scope">
              <el-button
                type="primary"
                link
                @click="
                  detailsGuide(scope.row.id, scope.row.no, scope.row.state)
                "
                >查看详情</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="isRequired" label="审核状态">
            <template #default="scope">
              <div v-if="state != '0'" class="flex">
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
                <el-button
                  v-if="state == '1' || state == '2'"
                  style="color: #909399"
                  type="primary"
                  @click="stateUpdate(scope.row.id, scope.row.state)"
                  link
                  >修改</el-button
                >
              </div>

              <div v-else>
                <el-button
                  color="#0052D9"
                  type="primary"
                  @click="examine(1, scope.row.id)"
                  >通过</el-button
                >
                <el-button
                  color="#EA0000"
                  type="primary"
                  @click="examine(2, scope.row.id)"
                  >拒绝</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="mt-4 flex justify-between">
          <div>
            <el-button
              v-if="state == '0'"
              color="#0052D9"
              type="primary"
              @click="examineAll"
              :disabled="stateRows.length > 0 ? false : true"
              >全部通过</el-button
            >
          </div>

          <Pagination :total="total" @page="page"></Pagination>
        </div>
      </div>
    </article>
    <myDialog
      :stateUp="stateUp"
      :dialogVisible="dialogVisible"
      @cancel="cancel"
      @oper="operation"
    ></myDialog>

    <myDialog2
      :dialogVisible="dialogVisible2"
      @cancel="cancel2"
      @oper="operation2"
    ></myDialog2>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, watch } from "vue";
import myElselect from "@/utils/vue/my_elselect.vue";
import mySearch from "@/utils/vue/my_search2.vue";
import myState from "@/utils/vue/my_state.vue";
import Pagination from "@/utils/vue/my_pagination.vue";
import myDialog from "@/utils/vue/my_dialog.vue";
import myDialog2 from "@/components/Dialog/index.vue";
import { getGuideAllYears } from "@/api/admin/guide";
import { teacher_getPlanAll } from "@/api/admin/plan";
import { getCollege, toExamine, toExamineAll } from "@/api/currency";

/**
 * 班级: 在学院是空的时候显示所有班级,在学院有内容的时候显示该学院下的班级
 */

const information = defineProps({
  type: {
    type: String,
    default: "1",
  },
  state: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["details"]);

// 年级
type T = {
  value: string;
  label: string;
};
const grade = ref<string | number>("");
const gradeArr = ref<Array<T>>([]);
const gradeChoice = (text: string) => {
  grade.value = text;
  getplanAll();
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
  getplanAll();
};
// end

// 班级
const collegeAll = ref<string>("");
const collegeAllArr = ref<Array<T>>([]);
const collegeAllChoice = (text: string) => {
  collegeAll.value = text;
  getplanAll();
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
get_college();
// end

// 搜素框
const no = ref<string>("");
const searchText = (text: string) => {
  no.value = text;
  getplanAll();
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
    state: "1",
  },
  {
    color: "#ED7B2F",
    text: "审核中",
    state: "0",
  },
  {
    color: "#DCDCDC",
    text: "未通过",
    state: "2",
  },
]);
const stateText = (text: string) => {
  state.value = text;
  getplanAll();
};
// end

// 查看计划
const planAllList = ref<Array<any>>([]);
const total = ref<number>(0);
const pageNo = ref<number>(1);
const pageSize = ref<number>(15);
const getplanAll = () => {
  const getplanAllDate = ref<string>(
    `type=${information.type}&pageNo=${pageNo.value}&pageSize=${pageSize.value}`
  ); // 查看计划所需参数
  if (grade.value && grade.value != "") {
    getplanAllDate.value += `&years=${grade.value}`;
  }
  if (academicDegree.value && academicDegree.value != "") {
    getplanAllDate.value += `&degree=${academicDegree.value}`;
  }
  if (collegeAll.value && collegeAll.value != "") {
    getplanAllDate.value += `&college=${collegeAll.value}`;
  }
  if (no.value && no.value != "") {
    getplanAllDate.value += `&no=${no.value}`;
  }
  if (state.value && state.value != "") {
    getplanAllDate.value += `&state=${state.value}`;
  }

  teacher_getPlanAll(getplanAllDate.value).then((res) => {
    planAllList.value = res.data.rows;
    total.value = res.data.total;
  });
};
getplanAll();
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
  getplanAll();
};
// end

// 审核
const stateUp = ref<string>("1");
const examine = (num: number, id: string) => {
  toExamine({
    thiryId: id,
    state: num,
    grade: 3,
    explains: "",
  }).then((res) => {
    getplanAll();
    alert(res.msg);
  });
};
// end

// 批量审核
const stateRows = ref<Array<any>>([]);
const dialogVisible2 = ref<boolean>(false);
const handleSelectionChange = (rows?: any) => {
  console.log(rows);
  stateRows.value = rows;
};
const examineAll = () => {
  dialogVisible2.value = true;
  // const aaa = stateRows.value.map((item) => {
  //   return {
  //     thiryId: item.id,
  //     state: 1,
  //     grade: 3,
  //     explains: "",
  //   };
  // });
  // console.log(aaa);
  // toExamineAll(aaa).then((res) => {});
};
// end

// 状态修改
const dialogVisible = ref<boolean>(false);
const updateId = ref<string>("");
const stateUpdate = (id: string, sta: string) => {
  updateId.value = id;
  stateUp.value = String(sta);
  dialogVisible.value = true;
};
// end

// 点击取消
const cancel = (text: boolean) => {
  dialogVisible.value = false;
};
// end

// 点击确认
const operation = (text: string) => {
  dialogVisible.value = false;
  examine(Number(text), updateId.value);
  updateId.value = "";
};
// end

// 点击取消2
const cancel2 = (text: boolean) => {
  dialogVisible2.value = false;
};
// end

// 点击确认2
const operation2 = (text: string) => {
  dialogVisible2.value = false;
  const aaa = stateRows.value.map((item) => {
    return {
      thiryId: item.id,
      state: 1,
      grade: 3,
      explains: "",
    };
  });

  toExamineAll(aaa).then((res) => {
    getplanAll();
    alert(res.msg);
  });
};
// end

// 表头样式
const headerRoStyle = {
  background: "#00B578",
  color: "#fff",
};
// end

// 查看详情
const detailsGuide = (id: string, no: string, state: string) => {
  emit("details", {
    id,
    no,
    state,
    typeObj: { type: information.type, text: "" },
  });
};
// end

// 表格样式
const roStyle = {
  height: "80px",
  // textAlign: "center",
};
// end

watch(
  () => information.state,
  (newValue, oldValue) => {
    console.log(newValue);

    getplanAll();
  }
);
</script>

<style scoped lang="less"></style>
