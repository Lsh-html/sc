<!-- 研修计划 -->
<template>
  <div class="flex justify-between">
    <div
      class="h-full left p-8 flex flex-col justify-between"
      style="width: 514px"
    >
      <div class="">
        <div class="text-center pt-2 pb-8 text-base font-black">学期列表</div>
        <div
          class="mb-3 p-4 bg-white flex justify-between items-center"
          v-for="(item, index) in semesterLists"
          :key="item.term.id"
          @click="semesterListsNum = index"
        >
          <div class="flex items-center">
            <div class="ml-2">{{ item.term.term }}</div>
          </div>
          <div
            class="px-3 text-white rounded-tr-full rounded-br-full"
            :style="{
              'background-color':
                item.szjyStudyPlanTerm === null ? '#767676' : '#0052D9',
            }"
          >
            <div v-if="!item.szjyStudyPlanTerm">未制定</div>
            <div v-else>已制定</div>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <el-button color="#0052D9" type="primary" @click="plan"
          >免修申请</el-button
        >
      </div>
    </div>
    <div class="right p-7 flex flex-col" style="width: 1061px">
      <div class="text-center flex justify-center items-center">
        <div class="p-3 flex items-center" v-if="semesterListsNum != 0">
          <el-icon @click="getLists('left')"><ArrowLeft /></el-icon>
        </div>
        <div class="px-24" v-if="semesterLists.length > 0">
          {{ semesterLists[semesterListsNum].term.term }}学期研修计划
        </div>
        <div
          class="p-3 flex items-center"
          v-if="semesterListsNum != semesterListsNums - 1"
        >
          <el-icon @click="getLists('right')"><ArrowRight /></el-icon>
        </div>
      </div>
      <div
        v-for="(item, index) in tableDatas"
        :key="index"
        v-show="index == semesterListsNum"
        class="flex flex-col justify-between flex-1"
      >
        <el-table
          class="flex-1"
          ref="multipleTableRef"
          :data="tableDatas[index]"
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

          <el-table-column prop="date" label="序号" width="55">
            <template #default="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="isRequired" label="性质" width="55">
            <template #default="scope">
              <div v-if="scope.row.isRequired == 1">必修</div>
              <div v-else-if="scope.row.isRequired == 2">选修</div>
            </template>
          </el-table-column>
          <el-table-column prop="clssification" label="类别" width="110">
            <template #default="scope">
              <div v-if="scope.row.clssification == 1">课程</div>
              <div v-else-if="scope.row.clssification == 2">活动</div>
              <div v-else-if="scope.row.clssification == 3">竞赛</div>
              <div v-else-if="scope.row.clssification == 4">app跑步</div>
              <div v-else-if="scope.row.clssification == 5">主题劳动</div>
              <div v-else-if="scope.row.clssification == 6">
                实验室或工位环境维护
              </div>
              <div v-else-if="scope.row.clssification == 7">锻炼过程积分</div>
              <div v-else-if="scope.row.clssification == 8">劳育思政课</div>
              <div v-else-if="scope.row.clssification == 9">社团集训</div>
            </template>
          </el-table-column>
          <el-table-column prop="descs" label="内容" width="110" />
          <el-table-column prop="checkExplain" label="得分说明" />
          <el-table-column prop="" label="计划分数">
            <template #default="scope">
              <div>
                {{ tableDatas2[index][scope.$index].planScore }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="explain" label="说明">
            <template #default="scope">
              {{ tableDatas2[index][scope.$index].checkExplain }}
            </template>
          </el-table-column>
          <el-table-column label="免修状态">
            <template #default="scope">
              {{
                tableDatas2[index][scope.$index].state == 3
                  ? "已免修"
                  : "未免修"
              }}
            </template>
          </el-table-column>
        </el-table>
        <div class="mt-9">
          <div class="flex justify-between items-center">
            <div>
              <div
                v-if="
                  semesterLists[index].szjyStudyPlanTerm &&
                  semesterLists[index].szjyStudyPlanTerm !== null
                "
              >
                <span
                  >当前获得{{
                    semesterLists[index].szjyStudyPlanTerm.planScore
                  }}分</span
                >
                <span
                  v-if="
                    semesterLists[index].szjyStudyPlanTerm.planScore ==
                    semesterLists[index].term.minScore
                  "
                  >=</span
                >
                <span
                  v-if="
                    semesterLists[index].szjyStudyPlanTerm.planScore <
                    semesterLists[index].term.minScore
                  "
                  >&lt;</span
                >
                <span
                  v-if="
                    semesterLists[index].szjyStudyPlanTerm.planScore >
                    semesterLists[index].term.minScore
                  "
                  >&gt;</span
                >
                <span>考核标准{{ semesterLists[index].term.minScore }}分</span>
              </div>
            </div>

            <div v-if="information.no == ''">
              <el-button color="#0052D9" type="primary" @click="updatePlan"
                >修改计划</el-button
              >
            </div>
          </div>
          <div style="color: #8c8c8c; font-size: 12px">
            注：研修计划预选学分大于等于考核标准学分时才可以提交审核哦！
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import { ElTable } from "element-plus";
import {
  getStudentPlan,
  setStudentPlan,
  getStudentSemesterPlan,
  updateAndSetDetailedList,
  setStudentPlan2,
} from "@/api/admin/plan";
import { useTestStore } from "@/store/index";
import {
  CircleCheckFilled,
  ArrowLeft,
  ArrowRight,
} from "@element-plus/icons-vue";

const information = defineProps({
  typeObj: {
    type: Object,
    default: {
      type: 1,
      text: "体育",
    },
  },
  no: {
    type: String,
    default: "",
  },
});
const router = useRouter();
const emit = defineEmits(["update"]);

// 查询学生的研修计划
const guide = ref<any>("");
const guideId = ref<string>("");
const piniaId = ref<string>("");
const semesterLists = ref<Array<any>>([]); // 学期列表
const semesterListsNums = ref<number>(0); // 学期总数，用于计算切换那个
const semesterListsNum = ref<number>(0); // 当前列表数
const tableData = ref<Array<any>>([]); // 学期计划列表
const tableDatas = ref<Array<any>>([]); // 学期计划列表组
const tableDatas2 = ref<Array<any>>([]); // 学期计划列表组  -- 实际
const get_StudentPlan = () => {
  getStudentPlan(
    `type_EQ=${information.typeObj.type}&no_EQ=${
      information.no != "" ? information.no : useTestStore().user.no
    }`
  ).then((res) => {
    guide.value = res.data.rows[0];
    guideId.value = res.data.rows[0].studyguideId;
    piniaId.value = res.data.rows[0].id;
    if (res.data.rows && res.data.rows.length == 0) {
      setStudentPlan({ type: information.typeObj.type }).then((res) => {
        get_StudentPlan();
      });
    } else {
      getStudentSemesterPlan({
        id: piniaId.value,
        studyguideId: guideId.value,
      }).then((res) => {
        semesterLists.value = res.data;
        semesterListsNums.value = res.data.length;
        for (let index = 0; index < semesterListsNums.value; index++) {
          tableDatas.value[index] = [];
          tableDatas2.value[index] = [];
          update_and_setDetailedList(index);
        }
      });
    }
  });
};
// end

// 列表默认选中
/**
 * toggleRowSelection：用于多选表格，切换某一行的选中状态， 如果使用了第二个参数，则可直接设置这一行选中与否
 */
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const toggleSelection = () => {
  tableData.value.forEach((row) => {
    multipleTableRef.value!.toggleRowSelection(row, true);
  });
};
// end

// 当前列表查询
const update_and_setDetailedList = (index: number) => {
  updateAndSetDetailedList({
    studyplanInfoId: piniaId.value,
    termId: semesterLists.value[index].term.id,
  }).then((res) => {
    res.data.forEach((item: any) => {
      if (item.szjyStudyplanItem && item.szjyStudyplanItem.id !== null) {
        tableDatas.value[index].unshift(item.szjyCourseTrainningListItem);
        tableDatas2.value[index].unshift(item.szjyStudyplanItem);
      }
    });
  });
};
// end

// 列表切换
const getLists = (text: string) => {
  if (text == "left") {
    semesterListsNum.value--;
  } else if (text == "right") {
    semesterListsNum.value++;
  }
};
// end

// 修改计划
const updatePlan = () => {
  emit("update", true);
};
// end

// 监听并执行相关指南查询
watch(
  () => information.typeObj,
  (newValue, oldValue) => {
    get_StudentPlan();
    guide.value = "";
    guideId.value = "";
    piniaId.value = "";
    semesterLists.value = [];
    semesterListsNums.value = 0;
    semesterListsNum.value = 0;
    tableData.value = [];
    tableDatas.value = [];
    tableDatas2.value = [];
  },
  {
    deep: true,
    immediate: true,
  }
);
// end

//
const plan = () => {
  router.push("/exemption");
};
// end

// 表头样式
const headerRoStyle = {
  background: "#00B578",
  color: "#fff",
  height: "44px",
  // textAlign: "center",
};
// end

// 表格样式
const roStyle = {
  background: "#fff",
  height: "62.5px",
  // textAlign: "center",
};
// end
</script>

<style scoped lang="less">
.left,
.right {
  background-color: #e0eaff;
}
:deep(.el-table__cell) {
  text-align: center;
  font-size: 14px;
}
</style>
