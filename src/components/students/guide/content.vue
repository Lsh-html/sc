<!-- 研修指南内容区 -->
<template>
  <div style="background-color: #e0eaff; min-width: 1200px" class="py-5 px-12">
    <!-- 顶部 -->
    <div class="flex justify-between">
      <div class="flex items-end">
        <div class="text-2xl pr-3">{{ information.typeObj.text }}研修指南</div>
        <div>上传时间：{{ guideType.createTime }}</div>
      </div>
      <div
        class="h-12 px-4 py-3 text-white"
        style="background-color: #0256ff; cursor: pointer"
        @click="load"
      >
        下载
      </div>
    </div>
    <!-- end -->
    <el-divider style="border-top-color: #767676" />
    <div style="font-size: 18px">
      <!-- <div>一、研修设置</div>
      <div>
        学生可通过理论教育、主题劳动、集体劳动、志愿服务、实践技能、自主设置、劳动竞赛等研修项目完成劳育环节。在学期间同时满足以下条件方可获得劳育环节“通过”：<br />
        1.4个学期获得“必修二”考核通过；<br />
        2.思政课程考核通过；<br />
        3.“选修”总计不低于6个学时。 <br />
        二、研修清单
      </div> -->
      <div v-html="guideType.content"></div>
    </div>
    <Dialog :dialogVisible="dialogVisible" @oper="oper"></Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, watch } from "vue";
import { getStudentGuide } from "@/api/admin/guide";
import { downLoad1 } from "@/assets/ts/download";
import Dialog from "@/components/Dialog/index.vue";

const information = defineProps({
  typeObj: {
    type: Object,
    default: {
      type: 1,
      text: "体育",
    },
  },
});

const guideType = ref<any>({});
const dialogVisible = ref<boolean>(false); // 传值 + 接受
const load = () => {
  dialogVisible.value = true;
};

const oper = (bol: boolean) => {
  dialogVisible.value = bol;
  if (!bol) {
    // 关于下载结果是打开原因：路径问题，与代码无关
    downLoad1(guideType.value.filesUrl);
  }
};
// end

// 查询指南
const guide = () => {
  getStudentGuide(`type=${information.typeObj.type}`).then((res) => {
    guideType.value = res.data;
  });
};
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

<style scoped lang="less"></style>
