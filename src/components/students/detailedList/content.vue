<!-- 研修指南内容区 -->
<template>
  <div style="background-color: #e0eaff; min-width: 1200px" class="py-5 px-12">
    <!-- 顶部 -->
    <div class="flex justify-between">
      <div class="flex items-end">
        <div class="text-2xl pr-3">{{ information.typeObj.text }}研修清单</div>
        <div>上传时间：2023-01-12 16:40</div>
      </div>
      <div
        class="h-12 px-4 py-3 text-white"
        style="background-color: #0256ff; cursor: pointer"
        @click="addPlan"
      >
        创建研修计划
      </div>
    </div>
    <!-- end -->
    <el-divider style="border-top-color: #767676" />

    <!-- 按钮组 -->
    <div style="font-size: 18px">
      <el-button-group>
        <el-button
          :type="claNum == index ? 'primary' : ''"
          @click="get_detailedList(item.id)"
          v-for="(item, index) in cla"
          :key="item.id"
          >{{ item.text }}</el-button
        >
      </el-button-group>
    </div>
    <!-- end -->

    <!-- 表格 -->
    <div class="pt-7">
      <el-table
        :data="tableData"
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
            <div v-else-if="scope.row.clssification == 7">锻炼过程积分</div>
            <div v-else-if="scope.row.clssification == 8">劳育思政课</div>
            <div v-else-if="scope.row.clssification == 9">社团集训</div>
          </template>
        </el-table-column>
        <el-table-column prop="descs" label="内容" />
        <el-table-column prop="checkExplain" label="考核说明" />
      </el-table>
    </div>
    <!-- end -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, watch } from "vue";
import { getStudentGuide } from "@/api/admin/guide";
import { getDetailedList } from "@/api/admin/detailedList";
import { useTestStore } from "@/store/index";

const information = defineProps({
  typeObj: {
    type: Object,
    default: {
      type: 1,
      text: "体育",
    },
  },
});

// 查询指南
const guideId = ref<string>("");
const guide = () => {
  getStudentGuide(`type=${information.typeObj.type}`).then((res) => {
    guideId.value = res.data.id;
    get_detailedList();
  });
};
// end

// 查询清单
const get_detailedList = (type = "0") => {
  claNum.value = type;
  const data = ref<string>(
    `studyguideId_EQ=${guideId.value}&pageNo=1&pageSize=10000`
  );
  if (type !== null && type !== "0") {
    data.value += `&isRequired_EQ=${type}`;
  }
  getDetailedList(data.value).then((res) => {
    tableData.value = res.data.rows;
  });
};
// end

// 分类
const cla = [
  {
    id: "0",
    text: "全部",
  },
  {
    id: "1",
    text: "必修",
  },
  {
    id: "2",
    text: "选修",
  },
];
const claNum = ref<number | string>("0");
// end

// 表头样式
const headerRoStyle = {
  background: "#3662ec",
  color: "#fff",
  height: "44px",
  // textAlign: "center",
};
// end

// 表格样式
const roStyle = {
  background: "#e0eaff",
  height: "62.5px",
  // textAlign: "center",
};
// end

// 表格内容
const tableData = ref<Array<any>>([]);
// end

//  跳转添加计划页
const addPlan = () => {};
// end

// 监听并执行相关指南查询
watch(
  () => information.typeObj,
  (newValue, oldValue) => {
    guide();
  },
  {
    deep: true,
    immediate: true,
  }
);
// end
</script>

<style scoped lang="less">
// 按钮组
:deep(.el-button-group .el-button) {
  border-radius: 4px !important;
  margin-right: 18px !important;
  width: 140px;
  height: 48px;
  font-size: 18px;
}
// end

// 表格分割线
:deep(.el-table td.el-table__cell) {
  border-bottom-color: #0256ff;
}
// end
</style>
