<!-- 研修清单  -->
<template>
  <div class="h-full flex flex-col">
    <header>
      <div
        class="w-full bg-white px-7 py-2 flex justify-between items-center"
        style="width: 100%; min-width: 1000px"
      >
        <div>
          <myElselect
            :text="'研修指南'"
            :placeHolder="'全部'"
            :arr="gradeArr"
            :value="grade"
            @choice="gradeChoice"
          ></myElselect>
        </div>
      </div>
    </header>
    <article class="flex-1 mt-5" style="min-width: 100%">
      <div class="px-3 py-8 bg-white h-full flex flex-col justify-between">
        <div class="">
          <div class="flex justify-end" v-if="addDat == ''">
            <el-button
              color="#0052D9"
              type="primary"
              @click="addDetailedList('add')"
              >新建研修清单</el-button
            >
          </div>
          <div v-if="addDat == 'add'">
            <div class="flex justify-end">
              <el-button color="#0052D9" type="primary" @click="imp(true)"
                >导入研修清单</el-button
              >
            </div>

            <addDetailedListDetails
              class="mt-5"
              @addList="addList"
            ></addDetailedListDetails>
          </div>

          <UpdateDetailedListDetails
            v-else-if="addDat == 'update'"
            class="mt-5"
            :updateListObj="updateListObj"
            @updateList="update"
          ></UpdateDetailedListDetails>
          <div class="mt-5" style="min-height: 100%">
            <el-table
              :data="arrDetailedList"
              :header-row-style="headerRoStyle"
              :header-cell-style="headerRoStyle"
              empty-text="暂无数据"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column prop="isRequired" label="性质">
                <template #default="scope">
                  <div v-if="scope.row.isRequired == 1">必修</div>
                  <div v-else-if="scope.row.isRequired == 2">选修</div>
                </template>
              </el-table-column>
              <el-table-column prop="clssification" label="类别">
                <template #default="scope">
                  <div v-if="scope.row.clssification == 1">课程</div>
                  <div v-else-if="scope.row.clssification == 2">活动</div>
                  <div v-else-if="scope.row.clssification == 3">竞赛</div>
                  <div v-else-if="scope.row.clssification == 4">app跑步</div>
                  <div v-else-if="scope.row.clssification == 5">主题劳动</div>
                  <div v-else-if="scope.row.clssification == 6">
                    实验室或工位环境维护
                  </div>
                  <div v-else-if="scope.row.clssification == 7">
                    锻炼过程积分
                  </div>
                  <div v-else-if="scope.row.clssification == 8">劳育思政课</div>
                  <div v-else-if="scope.row.clssification == 9">社团集训</div>
                </template>
              </el-table-column>
              <el-table-column prop="descs" label="内容" />
              <el-table-column prop="checkExplain" label="考核说明" />
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button
                    style="border: 0"
                    :icon="EditPen"
                    @click="updateList(scope.row)"
                    circle
                  />
                  <el-button
                    style="border: 0"
                    :icon="Delete"
                    @click="deleteList(scope.row.id)"
                    circle
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </article>

    <!-- \删除确认框 -->
    <DiaLog
      :dialogVisible="dialogVisible"
      @oper="oper"
      @cancel="cancel"
    ></DiaLog>
    <!-- end -->

    <!-- 上传成功确认框 -->
    <DiaLog
      :dialogVisible="dialogVisibleSuccess"
      :text="textSuccess"
      @oper="operSuccess"
      @cancel="cancelSuccess"
    ></DiaLog>
    <!-- end -->

    <!-- 导入研修清单 -->
    <div v-if="importBol">
      <el-dialog
        v-model="importBol"
        style="min-width: 1000px; height: 80%; background-color: #e0eaff"
      >
        <div class="h-full flex flex-col items-center justify-around">
          <div class="flex flex-col items-center justify-center">
            <div
              class="bg-white border border-dashed flex justify-center items-center"
              style="
                width: 344px;
                height: 164px;
                border-color: #3674f0;
                color: #0256ff;
              "
              @click="download"
            >
              点击下载模板表格
            </div>
            <div
              class="text-center"
              style="width: 200px; color: rgba(0, 0, 0, 0.4); font-size: 12px"
            >
              模板为excil表格文件，大小在10M以内，注意按要求填写内容。
            </div>
          </div>
          <div class="flex flex-col items-center justify-center">
            <Upload
              :width="'334px'"
              :accept="'.xlsx'"
              :backgroundColor="'#fff'"
              :action="action"
              :data="{ studyguideId: grade }"
              @play="uploadArr"
              :up="up"
            ></Upload>
            <div
              class="text-center"
              style="width: 200px; color: rgba(0, 0, 0, 0.4); font-size: 12px"
            >
              请上传excil表格文件，大小在10M以内，注意按要求填写内容。
            </div>
            <div class="mt-4">
              <el-button color="#0052D9" type="primary" @click="uplod"
                >上传</el-button
              >
            </div>
          </div>
        </div>
      </el-dialog>
    </div>

    <!-- end -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, watch } from "vue";
import myElselect from "@/utils/vue/my_elselect.vue";
import DiaLog from "@/components/Dialog/index.vue";
import addDetailedListDetails from "@/components/admin/detailedList/addDetailedListDetails.vue";
import UpdateDetailedListDetails from "@/components/admin/detailedList/updateDetailedListDetails.vue";
import Upload from "@/components/upload/index2.vue";
import { downLoad1 } from "@/assets/ts/download";
import { EditPen, Delete } from "@element-plus/icons-vue";
import { getGuide } from "@/api/admin/guide";
import {
  getDetailedList,
  deleteDetailedListDetails,
  setDetailedListDetails,
  updateDetailedListDetails,
} from "@/api/admin/detailedList";

const information = defineProps({
  type: {
    type: String,
    default: "1",
  },
});

// 研修指南
type T = {
  value: string;
  label: string;
};
const grade = ref<string>("");
const gradeArr = ref<Array<T>>([]);
const gradeChoice = (text: string) => {
  grade.value = text;
  detailedListArr();
};
// end

// 新增研修清单
const addDat = ref<string>("");
const addDetailedList = (text: string) => {
  addDat.value = text;
};

type AddList = {
  studyguideId: string;
  isRequired: number;
  clssification: number;
  descs: string;
  checkExplain: string;
};
const addList = (text: AddList) => {
  console.log(text);
  text.studyguideId = grade.value;
  setDetailedListDetails(text).then((res) => {
    detailedListArr();
  });
};
// end

// 修改单条清单
const updateListId = ref<string>("");
const updateListObj = ref<any>({});
type UpdateList = {
  id: string;
  isRequired: number;
  clssification: number;
  descs: string;
  checkExplain: string;
};
const updateList = (text: UpdateList) => {
  addDat.value = "update";
  updateListId.value = text.id;
  updateListObj.value = text;
};

const update = (text: any) => {
  updateDetailedListDetails(text).then((res) => {
    detailedListArr();
  });
};

// 多选
const handleSelectionChange = (val: any) => {
  console.log(val);
};
// end

// 查询研修清单
const arrDetailedList = ref<Array<any>>([]); // 研修清单列表
const total = ref<number>(0); // 研修清单列表
const detailedListArr = () => {
  getDetailedList(
    `studyguideId_EQ=${grade.value}&pageNo=1&pageSize=10000`
  ).then((res) => {
    arrDetailedList.value = res.data.rows;
    total.value = res.data.total;
  });
};
// end

// 导入研修清单
const importBol = ref<boolean>(false);
const imp = (text: boolean) => {
  importBol.value = text;
};

const download = () => {
  downLoad1(
    import.meta.env.VITE_HTTP +
      `api/v1/course/trainingitem/importExcel/template`
  );
};

const action =
  import.meta.env.VITE_HTTP + `api/v1/course/trainingitem/importExcel`;

const up = ref<boolean>(false);

const uplod = () => {
  up.value = true;
};
// end

// 提交导入 + 提示
const dialogVisibleSuccess = ref<boolean>(false); // 是否显示提示对话框
const textSuccess = ref<string>("");
const uploadArr = (text: any) => {
  dialogVisibleSuccess.value = true;
  textSuccess.value = "上传成功，是否继续添加";
  detailedListArr();
};

const operSuccess = () => {
  dialogVisibleSuccess.value = false;
  up.value = false;
};
const cancelSuccess = () => {
  dialogVisibleSuccess.value = false;
  importBol.value = false;
  up.value = false;
};
// end

watch(
  () => information.type,
  (newValue) => {
    getGuide(`type_EQ=${information.type}&pageNo=1&pageSize=10000`).then(
      (res) => {
        grade.value = res.data.rows[0].id;
        detailedListArr();
        res.data.rows.forEach((item: any) => {
          console.log(item);
          gradeArr.value.push({
            value: item.id,
            label: item.title,
          });
        });
      }
    );
  },
  {
    deep: true,
    immediate: true,
  }
);

// 删除单条清单
const dialogVisible = ref<boolean>(false);
const idDetailedList = ref<string>("");
const deleteList = (id: string) => {
  dialogVisible.value = true;
  idDetailedList.value = id;
};

// 确认删除
const oper = (text: boolean) => {
  dialogVisible.value = text;
  if (!text) {
    deleteDetailedListDetails({ ids: idDetailedList.value }).then((res) => {
      detailedListArr();
    });
  }
};
// end

// 取消删除
const cancel = (text: boolean) => {
  dialogVisible.value = text;
};
// end
// end

// 表头样式
const headerRoStyle = {
  background: "#EEEEEE",
  color: "#0256FF",
};
// end
</script>

<style scoped lang="less">
:deep(.el-table__cell) {
  text-align: center;
}
:deep(.el-dialog__body) {
  height: 100%;
}
</style>
