<!-- 免修申请 -->
<template>
  <div class="flex justify-between">
    <div class="h-full left p-8" style="width: 514px">
      <div class="text-center pt-2 pb-8 text-base font-black">学期列表</div>
      <div
        class="mb-3 p-4 bg-white flex justify-between items-center"
        v-for="(item, index) in semesterLists"
        :key="item.term.id"
        @click="semesterListsNum = index"
      >
        <div class="flex items-center">
          <el-icon
            size="24px"
            :color="selectArr[index] == true ? '#0052D9' : '#767676'"
            @click="selectPlan(index)"
            ><CircleCheckFilled
          /></el-icon>
          <div class="ml-2">{{ item.term.term }}</div>
        </div>
        <div
          class="px-3 text-white rounded-tr-full rounded-br-full"
          :style="{
            'background-color':
              item.szjyStudyPlanTerm === null ? '#767676' : '#0052D9',
          }"
        >
          <div
            v-if="get_studentsExemptionList.length > 0"
            v-for="ite in get_studentsExemptionList"
            :key="item.id"
          >
            <div v-if="ite.termId == item.term.id">
              <div v-if="ite.exemptionState == 1">申请中</div>
              <div v-if="ite.exemptionState == 2">免修通过</div>
              <div v-if="ite.exemptionState == 3">未通过</div>
            </div>
          </div>
          <!-- <div>免修申请</div>
          <div>免修通过</div>
          <div>未通过</div> -->
        </div>
      </div>
    </div>
    <div class="right p-7" style="width: 1061px">
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
      >
        <el-table
          ref="multipleTableRef"
          :data="tableDatas[index]"
          :header-row-style="headerRoStyle"
          :header-cell-style="headerRoStyle"
          :row-style="roStyle"
          :cell-style="roStyle"
          empty-text="暂无数据"
          style="width: 100%"
          @selection-change="handleSelectionChange($event, index)"
        >
          <template #empty>
            <div class="flex flex-col items-center justify-center">
              <img class="mt-24" src="@/assets/images/NoResults.png" alt="" />
              <div class="mt-10" style="color: #aaaaaa">暂无搜索内容！</div>
            </div>
          </template>
          <el-table-column type="selection" width="55" />
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
        </el-table>
        <div class="mt-9">
          <div class="flex justify-between items-center">
            <div>
              <!-- 当前预选{{ planScoreAllArr[index] }}分 &gt;考核标准{{
                semesterLists[index].term.minScore
              }}分 -->
            </div>
            <div>
              <el-button color="#0052D9" type="primary" @click="set_exemption"
                >提交审核</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 免修申请弹框 -->
    <div>
      <el-dialog v-model="dialogVisible" width="1000px">
        <div>
          <div class="text-center font-black text-black">免修计划申请</div>
          <div class="mt-4">
            <div class="font-black">免修申请说明</div>
            <MyWangEditor
              @text="exemptionText"
              :input="exemptionContent"
            ></MyWangEditor>
          </div>
          <div class="mt-4">
            <div class="font-black">证明材料上传</div>
            <div>
              <Upload
                :placeholder="'请上传文件，大小在10M以内。注：导入后原内容区内容不再显示'"
                :accept="'.png,.jpg,.jpeg,.gif'"
                :limit="5"
                @play="uploadArr"
              ></Upload>
            </div>
          </div>
          <div>
            <el-button color="#0052D9" type="primary" @click="set_exemption_up"
              >提交</el-button
            >
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- end -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, watch } from "vue";
import { ElTable } from "element-plus";
import MyWangEditor from "@/utils/vue/my_wangEditor.vue";
import Upload from "@/components/upload/index.vue";
import {
  CircleCheckFilled,
  ArrowLeft,
  ArrowRight,
} from "@element-plus/icons-vue";
import {
  getStudentPlan,
  setStudentPlan,
  getStudentSemesterPlan,
  updateAndSetDetailedList,
} from "@/api/admin/plan";
import { useTestStore } from "@/store/index";
import {
  getExemption,
  setExemption,
  getStudentsExemption,
} from "@/api/admin/exemption";

// 后端要求必须存在计划后才可以对已制定的计划进行免修
// 2023/3/8  由于页面已完成，决定不使用新接口。可在手机端使用  /api/v1/course/studyplanInfo/findPlanAndExemption完全替代现有接口

const information = defineProps({
  typeObj: {
    type: Object,
    default: {
      type: 1,
      text: "体育",
    },
  },
});

const emit = defineEmits(["get_state"]);

// 查询学生的研修计划
const guide = ref<any>("");
const guideId = ref<string>("");
const piniaId = ref<string>("");
const semesterLists = ref<Array<any>>([]); // 学期列表
const semesterListsNums = ref<number>(0); // 学期总数，用于计算切换那个
const semesterListsNum = ref<number>(0); // 当前列表数
const tableDatas = ref<Array<any>>([]); // 学期计划列表组
const tableDatas2 = ref<Array<any>>([]); // 学期计划列表组  -- 实际
const tableDataAll = ref<Array<number>>([]); // 存储各学期的列表数
const get_StudentPlan = () => {
  getStudentPlan(
    `type_EQ=${information.typeObj.type}&no_EQ=${useTestStore().user.no}`
  ).then((res) => {
    if (res.data.rows && res.data.rows.length == 0) {
      setStudentPlan({ type: information.typeObj.type }).then((res) => {
        get_StudentPlan();
      });
    } else {
      guide.value = res.data.rows[0];
      guideId.value = res.data.rows[0].studyguideId;
      piniaId.value = res.data.rows[0].id;
      getStudentSemesterPlan({
        id: piniaId.value,
        studyguideId: guideId.value,
      }).then((res) => {
        semesterLists.value = res.data;
        semesterListsNums.value = res.data.length;
        for (let index = 0; index < semesterListsNums.value; index++) {
          tableDatas.value[index] = [];
          tableDatas2.value[index] = [];
          tableDataAll.value[index] = 0;
          selectArr.value[index] = false;
          update_and_setDetailedList(index);
        }
        get_exemption();
      });
    }
  });
};
// end

// 列表默认选中
/**
 * toggleRowSelection：用于多选表格，切换某一行的选中状态， 如果使用了第二个参数，则可直接设置这一行选中与否
 */
const multipleTableRef = ref<any>(); // 类型：InstanceType<typeof ElTable>  由于变成数组，不可用了
const toggleSelection = () => {
  // 思路：循环免修列表，根据grade区分。然后比较。
  get_exemptionList.value.forEach((item) => {
    if (item.grade == 2 && item.state == 2) {
      semesterLists.value.forEach((itm, inde) => {
        if (
          itm.szjyStudyPlanTerm &&
          itm.szjyStudyPlanTerm.id &&
          itm.szjyStudyPlanTerm.id == item.planId
        ) {
          tableDatas.value[inde].forEach((item: any, index: number) => {
            multipleTableRef.value[inde]!.toggleRowSelection(item, true);
          });
        }
      });
    } else if (item.grade == 3) {
      tableDatas.value.forEach((ite, index) => {
        ite.forEach((it: any, ind: any) => {
          if (
            tableDatas2.value[index][ind].id == item.planId &&
            tableDatas2.value[index][ind].state == 3
          ) {
            multipleTableRef.value[index]!.toggleRowSelection(
              tableDatas.value[index][ind],
              true
            );
          }
        });
      });
    }
  });
};
// end

// 当前列表查询
const update_and_setDetailedList = (index: number) => {
  updateAndSetDetailedList({
    studyplanInfoId: piniaId.value,
    termId: semesterLists.value[index].term.id,
  }).then((res) => {
    tableDataAll.value[index] = res.data.length;
    res.data.forEach((item: any) => {
      if (item.szjyStudyplanItem && item.szjyStudyplanItem.id !== null) {
        tableDatas.value[index].unshift(item.szjyCourseTrainningListItem);
        tableDatas2.value[index].unshift(item.szjyStudyplanItem);
      }
    });
  });
};
// end

// 免修查询
const get_exemptionList = ref<Array<any>>([]);
const get_exemption = () => {
  getExemption(
    `type=${information.typeObj.type}&no=${useTestStore().user.no}`
  ).then((res) => {
    get_exemptionList.value = res.data.rows;
    toggleSelection();
    get_studentsExemption();
    if (res.data.rows && res.data.rows.length > 0) {
      emit("get_state", res.data.rows[0].state); // 2023/2/15  应该是从接口拿，但是后台无对应接口
    }
  });
};
// end

// 学期免修的查询
const get_studentsExemptionList = ref<Array<any>>([]);
const get_studentsExemption = () => {
  getStudentsExemption({
    type: information.typeObj.type,
    no: useTestStore().user.no,
  }).then((res) => {
    get_studentsExemptionList.value = res.data.studyplanTermList;
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

// 选中
const handleSelectionArr = ref<Array<any>>([]);
const handleSelectionChange = (val: any, index: number) => {
  handleSelectionArr.value[index] = val;
  if (val.length == tableDatas2.value[index].length) {
    selectArr.value[index] = true;
  }
};
// end

// 提交免修
const dialogVisible = ref<boolean>(false);
const set_exemption = () => {
  dialogVisible.value = true;
};

const set_exemption_up = () => {
  dialogVisible.value = false;
  const planId_A = ref<string>("");
  const planId_B = ref<Array<any>>([]);
  const planId_C = ref<Array<any>>([]);
  handleSelectionArr.value.forEach((item, index) => {
    if (item.length == tableDataAll.value[index]) {
      planId_B.value.push(semesterLists.value[index].szjyStudyPlanTerm.id);
    } else {
      item.forEach((ite: any, inde: number) => {
        console.log(ite.id);

        tableDatas.value[index].forEach((it: any, ind: any) => {
          if (it.id == ite.id) {
            planId_C.value.push(tableDatas2.value[index][ind].id);
          }
        });
        // console.log(ite.id, tableDatas.value[index][inde].id);

        // if (item.id == tableDatas.value[index][inde].id) {
        //   planId_C.value.push(tableDatas2.value[index][inde].id);
        // }
      });
    }
  });
  if (planId_B.value.length === semesterLists.value.length) {
    planId_A.value = piniaId.value;
  }

  let aaa = ref<Array<any>>([]);

  if (planId_A.value && planId_A.value != "") {
    aaa.value = [
      {
        fileUrls: filesUrl.value,
        fileName: filesName.value,
        exemptionExplain: exemptionContent.value,
        planId: planId_A.value,
        studyguideId: guideId.value,
        type: information.typeObj.type,
        state: 0,
        grade: 1,
      },
    ];
    setExemption(aaa.value);
    return;
  } else {
    if (planId_B.value && planId_B.value.length > 0) {
      planId_B.value.forEach((item) => {
        console.log(item);
        aaa.value.push({
          fileUrls: filesUrl.value,
          fileName: filesName.value,
          exemptionExplain: exemptionContent.value,
          planId: item,
          studyguideId: guideId.value,
          type: information.typeObj.type,
          state: 1,
          grade: 2,
        });
      });
    }
    if (planId_C.value && planId_C.value.length > 0) {
      planId_C.value.forEach((item) => {
        aaa.value.push({
          fileUrls: filesUrl.value,
          fileName: filesName.value,
          exemptionExplain: exemptionContent.value,
          planId: item,
          studyguideId: guideId.value,
          type: information.typeObj.type,
          state: 1,
          grade: 3,
        });
      });
    }
  }

  setExemption(aaa.value).then((res) => {
    alert(res);
  });
};
// end

// 学期选中/取消
const selectArr = ref<Array<boolean>>([]);
const selectPlan = (num: number) => {
  selectArr.value[num] = !selectArr.value[num];
  tableDatas.value[num].forEach((item: any) => {
    multipleTableRef.value[num]!.toggleRowSelection(item, selectArr.value[num]);
  });
};
// end

// 免修内容
const exemptionContent = ref<string>("<p></p>"); // 指南内容
const exemptionText = (text: string) => {
  exemptionContent.value = text;
};
// end
// end

// 上传
const filesUrl = ref<string>("");
const filesName = ref<string>("");
const uploadArr = (text: any) => {
  filesUrl.value = "";
  filesName.value = "";
  text.forEach((item: any) => {
    filesUrl.value += item.response.data.url;
    filesName.value += item.response.data.name;
  });
};
// end

// 监听并执行相关指南查询
watch(
  () => information.typeObj,
  (newValue, oldValue) => {
    get_StudentPlan();
  },
  {
    deep: true,
    immediate: true,
  }
);
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
