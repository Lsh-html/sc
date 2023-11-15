<!-- name -->
<template>
  <div class="h-full flex flex-col">
    <header>
      <div
        class="w-full bg-white px-7 py-2 flex justify-between items-center"
        style="width: 100%; min-width: 1000px"
      >
        <div>
          <div class="flex">
            <myElselect
              :text="'年级'"
              :placeHolder="'全部'"
              :arr="gradeArr"
              @choice="gradeChoice"
            ></myElselect>
            <myElselect
              :text="'学位'"
              :placeHolder="'全部'"
              :arr="academicDegreeArr"
              @choice="academicDegreeChoice"
            ></myElselect>
          </div>
          <myState @state="stateText" class="mt-3"></myState>
        </div>

        <div><mySearch @search="searchText"></mySearch></div>
      </div>
    </header>
    <article class="mt-5 flex-1" style="min-width: 100%; height: 100%">
      <div
        class="px-3 py-8 bg-white flex flex-col justify-between"
        style="min-height: 100%"
      >
        <div class="">
          <div class="flex justify-end">
            <el-button color="#0052D9" type="primary" @click="addGuide"
              >新建研修指南</el-button
            >
          </div>
          <div class="mt-5" style="min-height: 100%">
            <el-table
              :data="arrGuide"
              :header-row-style="headerRoStyle"
              :header-cell-style="headerRoStyle"
              empty-text="暂无数据"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />

              <el-table-column prop="date" label="序号" width="55">
                <template #default="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="years" label="指南学年级" />
              <el-table-column prop="title" label="指南名称" />
              <el-table-column prop="address" label="所属环节">
                <template #default="scope">
                  <div>
                    {{
                      information.type == "1"
                        ? "体"
                        : information.type == "2"
                        ? "美"
                        : information.type == "3"
                        ? "劳"
                        : ""
                    }}育环节
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="发布时间"
                width="170px"
              />
              <el-table-column prop="address" label="操作" width="250px">
                <template #default="scope">
                  <el-button
                    type="primary"
                    link
                    @click="detailsGuide(scope.row.id)"
                    >查看详情</el-button
                  >
                  <el-button
                    color="#0052D9"
                    type="primary"
                    @click="modifyGuide(scope.row.id)"
                    >修改</el-button
                  >
                  <el-button type="danger" @click="delGuide(scope.row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="mt-4 flex justify-end">
          <Pagination :total="total" @page="page"></Pagination>
        </div>
      </div>
    </article>

    <!-- 确认框 -->
    <DiaLog
      :dialogVisible="dialogVisible"
      @oper="oper"
      @cancel="cancel"
    ></DiaLog>
    <!-- end -->

    <!-- 查看详情 -->
    <el-dialog v-model="details" style="min-width: 1000px; height: 80%">
      <div class="h-full">
        <div class="h-full" v-if="detailsUrl && detailsUrl != ''">
          <iframe :src="detailsUrl" style="width: 100%; height: 100%"></iframe>
        </div>
        <div v-else>
          <p v-html="detailsConten"></p>
        </div>
      </div>
    </el-dialog>
    <!-- end -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, watch } from "vue";
import myElselect from "@/utils/vue/my_elselect.vue";
import mySearch from "@/utils/vue/my_search.vue";
import DiaLog from "@/components/Dialog/index.vue";
import Pagination from "@/utils/vue/my_pagination.vue";
import myState from "@/utils/vue/my_state.vue";
import {
  getGuideAllYears,
  getGuide,
  deleteGuide,
  getGuideList,
} from "@/api/admin/guide";

const information = defineProps({
  type: {
    type: String,
    default: "1",
  },
});

const dialogVisible = ref<boolean>(false); // 确认弹框
const ids = ref<string>(""); // 指南id
const emit = defineEmits(["addGuide", "updateId"]);

// 年级
type T = {
  value: string;
  label: string;
};
const grade = ref<string | number>("");
const gradeArr = ref<Array<T>>([]);
const gradeChoice = (text: string) => {
  grade.value = text;
  get_guide();
};
const get_guideAllYears = () => {
  getGuideAllYears({ type: information.type }).then((res) => {
    console.log(res);
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
  get_guide();
};
// end

// 搜素框
const search = ref<string>("");
const searchText = (text: string) => {
  search.value = text;
  get_guide();
};
// end

// 审核状态 -- 未应用
const state = ref<string>("");
const stateText = (text: string) => {
  state.value = text;
};
// end

// 指南查询
const pageNo = ref<number>(1);
const pageSize = ref<number>(15);
const arrGuide = ref<Array<any>>([]);
const total = ref<number>(0);
const get_guide = () => {
  const url = ref<string>(
    `type_EQ=${information.type}&pageNo=${pageNo.value}&pageSize=${pageSize.value}`
  );
  if (grade.value) {
    url.value += `&years_EQ=${grade.value}`;
  }
  if (academicDegree.value) {
    url.value += `&degree_EQ=${academicDegree.value}`;
  }
  if (search.value) {
    url.value += `&title_LIKE=${search.value}`;
  }
  getGuide(url.value).then((res) => {
    console.log(res);
    arrGuide.value = res.data.rows;
    total.value = res.data.total;
  });
};
// 多选
const handleSelectionChange = (val: any) => {
  console.log(val);
};
// end

// get_guide();
// end

// 查看详情
const details = ref<boolean>(false); // 查看详情弹框
const detailsConten = ref<string>("<p></p>"); // 详情富文本内容
const detailsUrl = ref<string>(""); // 详情富文本内容
const detailsGuide = (id: string) => {
  details.value = true;
  getGuideList(`id=${id}`).then((res) => {
    detailsConten.value = res.data.content;
    detailsUrl.value = res.data.filesUrl;
  });
};
// end

// 指南删除
const delGuide = (id: string) => {
  dialogVisible.value = true;
  ids.value = id;
};

// 取消删除
const cancel = (text: boolean) => {
  dialogVisible.value = text;
};
// end

// 确认删除
const oper = (text: boolean) => {
  dialogVisible.value = text;
  if (!text) {
    deleteGuide({ ids: ids.value }).then((res) => {
      if (res.code == 200) {
        alert(res.msg);
        get_guide();
      }
    });
  }
};
// end
// end

// 新建研修指南按钮
const addGuide = () => {
  emit("addGuide", "add");
};
// end

//
const modifyGuide = (id: string) => {
  emit("addGuide", "update");
  emit("updateId", id);
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
  get_guide();
};
// end

// 监听type变化
watch(
  () => information.type,
  () => {
    get_guide();
  },
  {
    deep: true,
    immediate: true,
  }
);
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
