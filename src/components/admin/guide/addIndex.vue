<!-- name -->
<template>
  <div class="h-full">
    <header>
      <div
        class="w-full bg-white px-7 py-2 flex justify-between"
        style="width: 100%; min-width: 1000px"
      >
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
          <myElselect
            :text="'学期数'"
            :placeHolder="'全部'"
            :arr="semesterArr"
            :value="semester"
            @choice="semesterChoice"
          ></myElselect>
          <el-button color="#0052D9" type="primary" @click="semesterSet(true)"
            >设置</el-button
          >
        </div>
        <div>
          <el-button color="#0052D9" type="primary" @click="uploadGuide(true)"
            >导入研修指南内容</el-button
          >
          <el-button color="#0052D9" type="primary" @click="preview(true)"
            >预览</el-button
          >
        </div>
      </div>
    </header>
    <article style="min-width: 100%; height: 100%">
      <div class="bg-white mt-5 px-3 py-8" style="min-height: 100%">
        <div class="flex">
          <el-button color="#0052D9" type="primary">指南名称</el-button>
          <el-input
            class="ml-5"
            v-model="guideName"
            placeholder="请输入指南名称"
          />
        </div>

        <div class="flex mt-5">
          <el-button color="#0052D9" type="primary">指南内容</el-button>
          <MyWangEditor
            class="ml-5"
            @text="getContent"
            :input="guideContent"
          ></MyWangEditor>
        </div>
        <div class="flex justify-end mt-4">
          <el-button color="#0052D9" type="primary" @click="addPlay(true)"
            >确认</el-button
          >
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

    <!-- 学期弹框 -->
    <el-dialog
      v-model="semesterBol"
      :before-close="handleClose"
      style="background-color: #e0eaff"
    >
      <p class="text-center">学期时间段设置</p>
      <div class="bg-white mt-4">
        <div v-for="(item, index) in Number(semester)" :key="index">
          <div class="p-4 flex justify-between items-center">
            <div class="flex items-center">
              <div style="width: 10rem">学期名称设置：</div>
              <el-input
                v-model="semesterName[Number(index)]"
                placeholder="Please input"
              />
            </div>

            <div class="flex items-center">
              <div>学期时间设置：</div>
              <el-date-picker
                v-model="semesterDate[Number(index)]"
                type="daterange"
                range-separator="~"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                :editable="false"
                :size="size"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
              />
            </div>
          </div>
          <!--<div class="flex justify-center">
            <el-divider
              style="margin: 0; width: 80%; border-top-color: #eaeaea"
            />
          </div> -->
        </div>
      </div>
    </el-dialog>
    <!-- end -->

    <!-- 研修指南导入 -->
    <!-- 指南上传 -->
    <el-dialog v-model="upload" width="700px">
      <Upload
        :placeholder="'请上传pdf文件，大小在10M以内。注：导入后原内容区内容不再显示'"
        :accept="'.pdf'"
        @play="uploadArr"
      ></Upload>
    </el-dialog>
    <!-- end -->
    <!-- end -->

    <!-- 预览 -->
    <el-dialog v-model="previewBol" style="min-width: 1000px; height: 80%">
      <div class="h-full">
        <div class="h-full" v-if="filesUrl && filesUrl != ''">
          <iframe :src="filesUrl" style="width: 100%; height: 100%"></iframe>
        </div>
        <div v-else>
          <p v-html="guideContent"></p>
        </div>
      </div>
    </el-dialog>
    <!-- end -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, watch } from "vue";
import myElselect from "@/utils/vue/my_elselect.vue";
import MyWangEditor from "@/utils/vue/my_wangEditor.vue";
import DiaLog from "@/components/Dialog/index.vue";
import Upload from "@/components/upload/index.vue";
import moment from "moment"; // 日期转换插件
import { addGuide } from "@/api/admin/guide";

const information = defineProps({
  type: {
    type: String,
    default: "1",
  },
});

const ids = ref<string>(""); // 指南id
const emit = defineEmits(["addGuide"]);

// 年级
type T = {
  value: string;
  label: string;
};
const grade = ref<string | number>("");
const gradeArr = ref<Array<T>>([]);
const gradeChoice = (text: string) => {
  grade.value = text;
};
const get_guideAllYears = () => {
  const myDate = new Date();
  const startYear = myDate.getFullYear() - 20; // 起始年份
  const endYear = myDate.getFullYear() + 20; // 结束年份
  for (var i = endYear; i >= startYear; i--) {
    gradeArr.value.push({ value: String(i), label: String(i) });
  }
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
};
// end

// 学期
const semester = ref<string>("");
const semesterArr = [
  {
    value: "1",
    label: "一个学期",
  },
  {
    value: "2",
    label: "两个学期",
  },
  {
    value: "3",
    label: "三个学期",
  },
  {
    value: "4",
    label: "四个学期",
  },
  {
    value: "5",
    label: "五个学期",
  },
  {
    value: "6",
    label: "六个学期",
  },
  {
    value: "7",
    label: "七个学期",
  },
  {
    value: "8",
    label: "八个学期",
  },
  {
    value: "9",
    label: "九个学期",
  },
  {
    value: "10",
    label: "十个学期",
  },
];
const semesterChoice = (text: string) => {
  semester.value = text; // 弹框打开
};
// end

// 学期内容
const semesterBol = ref<boolean>(false);
const size = ref<"default" | "large" | "small">("default");
const semesterName = ref<Array<any>>([]);
const semesterDate = ref<Array<any>>([]);
const semesterSet = (text: boolean) => {
  semesterBol.value = text;
};
// 阴影区域弹框关闭并保存
const handleClose = (done: () => void) => {
  done();
};
// end
// end

const guideName = ref<string>(""); // 指南名称

// 指南内容
const guideContent = ref<string>("<p></p>"); // 指南内容
const getContent = (text: string) => {
  guideContent.value = text;
};
// end

// 确认新增
const dialogVisible = ref<boolean>(false); // 确认新增弹框
const addPlay = (text: boolean) => {
  if (
    guideName.value == "" ||
    grade.value == "" ||
    information.type == "" ||
    academicDegree.value == ""
  ) {
    alert("必填内容不能为空");
    return;
  }
  dialogVisible.value = text;
};

// 取消新增
const cancel = (text: boolean) => {
  dialogVisible.value = text;
};
// end

const oper = (text: boolean) => {
  dialogVisible.value = text;
  if (!text) {
    const aaa = reactive<any>({
      model: {
        title: guideName.value,
        years: grade.value,
        type: information.type,
        content: guideContent.value,
        filesUrl: filesUrl.value,
        filesName: filesName.value,
        degree: academicDegree.value,
      },
      termModelList: [],
    });
    for (let index = 0; index < Number(semester.value); index++) {
      aaa.termModelList.push({
        years: grade.value,
        term:
          semesterName.value.length - 1 >= index
            ? semesterName.value[index]
            : "",
        startTime:
          semesterDate.value.length - 1 >= index
            ? moment(semesterDate.value[index][0]).format("YYYY-MM-DD")
            : "",
        endTime:
          semesterDate.value.length - 1 >= index
            ? moment(semesterDate.value[index][1]).format("YYYY-MM-DD")
            : "",
      });
    }
    addGuide(aaa).then((res) => {
      alert(res.msg);
      emit("addGuide", "");
    });
  }
};
// end

// 导入
const upload = ref<boolean>(false);
const filesUrl = ref<string>("");
const filesName = ref<string>("");
const uploadGuide = (text: boolean) => {
  upload.value = text;
};
const uploadArr = (text: any) => {
  if (text.length == 0) {
    filesUrl.value = "";
    filesName.value = "";
    return;
  }
  filesUrl.value = text[0].response.data.url;
  filesName.value = text[0].response.data.name;
};
// end

// 预览
const previewBol = ref<boolean>(false);
const preview = (text: boolean) => {
  previewBol.value = text;
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
