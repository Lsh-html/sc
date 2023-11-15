<!-- 活动详情 -->
<template>
  <div class="pl-20 pr-8 py-14">
    <el-form
      label-position="top"
      label-width="100px"
      :model="formLabelAlign"
      :inline="true"
      class="aaa"
    >
      <!-- 活动参数设置 -->
      <el-form-item label="活动参数设置" style="width: 100%; margin: 0">
        <el-form
          label-position="top"
          label-width="100px"
          :model="formLabelAlign"
          :inline="true"
        >
          <el-form-item style="width: 100%; margin: 0">
            <myElselect
              :text="'校区'"
              :placeHolder="'全部'"
              :fontSize="14"
              :arr="schoolAllArr"
              :bold="false"
              :value="formLabelAlign.campus"
              @choice="schoolAllChoice"
            ></myElselect>
            <!-- <myElselect
              :text="'学院'"
              :placeHolder="'全部'"
              :fontSize="14"
              :arr="collegeAllArr"
              :bold="false"
              @choice="collegeAllChoice"
            ></myElselect> -->
            <myElselect
              :text="'学期'"
              :placeHolder="'全部'"
              :fontSize="14"
              :arr="semesterAllArr"
              :bold="false"
              :value="formLabelAlign.termId"
              @choice="semesterAllChoice"
            ></myElselect>
            <myElselect
              :text="'活动标准'"
              :placeHolder="'全部'"
              :fontSize="14"
              :arr="standardAllArr"
              :bold="false"
              @choice="standardAllChoice"
            ></myElselect>
            <myElselect
              :text="'课程形式'"
              :placeHolder="'全部'"
              :fontSize="14"
              :arr="formAllArr"
              :bold="false"
              @choice="formAllChoice"
            ></myElselect>
          </el-form-item>
          <el-form-item label="负责人工号" style="width: 45%">
            <el-input v-model="formLabelAlign.principal" />
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- end -->

      <!-- 活动描述 -->
      <el-form-item label="活动描述" style="width: 100%">
        <el-form label-position="top" label-width="100px" :inline="true">
          <el-form-item style="width: 100%">
            <MyWangEditor
              @text="getTexts"
              :input="formLabelAlign.courseDesc"
            ></MyWangEditor>
          </el-form-item>
          <el-form-item label="活动开始时间" style="width: 45%">
            <el-date-picker
              class="w-full"
              v-model="formLabelAlign.startTime"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动结束时间" style="width: 45%">
            <el-date-picker
              class="w-full"
              v-model="formLabelAlign.endTime"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- end -->

      <!-- 活动报名设置 -->
      <el-form-item label="活动报名设置" style="width: 100%; padding: 0">
        <el-form
          label-position="top"
          label-width="100px"
          :model="formLabelAlign"
          :inline="true"
        >
          <el-form-item label="报名方式" style="width: 45%">
            <el-radio-group v-model="formLabelAlign.registrationMethod">
              <el-radio :label="1">抽签</el-radio>
              <el-radio :label="2">抢报</el-radio>
              <!-- <el-radio :label="3">指定人员</el-radio> -->
            </el-radio-group>
          </el-form-item>
          <el-form-item label="形式" style="width: 45%">
            <el-radio-group v-model="formLabelAlign.isResource">
              <el-radio :label="1">线上</el-radio>
              <el-radio :label="2">线下</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="性别划分" style="width: 100%">
            <el-radio-group v-model="formLabelAlign.gender">
              <el-radio :label="0">全部</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
              <el-radio :label="3">自定义</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="活动容量"
            style="width: 100%"
            v-if="formLabelAlign.gender == 0"
          >
            <el-input
              style="width: 45%"
              v-model="formLabelAlign.enrollPeopleNumber"
              placeholder="请输入活动人数"
            />
          </el-form-item>
          <el-form-item
            label="男生容量"
            v-if="formLabelAlign.gender == 1 || formLabelAlign.gender == 3"
          >
            <el-input
              v-model="formLabelAlign.man"
              placeholder="请输入活动人数"
            />
          </el-form-item>
          <el-form-item
            label="女生容量"
            v-if="formLabelAlign.gender == 2 || formLabelAlign.gender == 3"
          >
            <el-input
              v-model="formLabelAlign.woman"
              placeholder="请输入活动人数"
            />
          </el-form-item>

          <el-form-item label="活动发布时间" style="width: 100%">
            <el-date-picker
              style="width: 45%"
              v-model="formLabelAlign.releaseTime"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动报名开始时间" style="width: 45%">
            <el-date-picker
              class="w-full"
              v-model="formLabelAlign.enrollStartTime"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动报名结束时间" style="width: 45%">
            <el-date-picker
              class="w-full"
              v-model="formLabelAlign.enrollEndTime"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动公开范围" style="width: 100%">
            <el-radio-group v-model="formLabelAlign.scope">
              <el-radio :label="1">全部</el-radio>
              <el-radio :label="2">自定义</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item style="width: 100%">
            <my_select_tag
              :f_options="options"
              :f_value="value"
              @play="range"
            ></my_select_tag>
            <!-- end -->
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- end -->
    </el-form>

    <div>
      <TwoButton text="保存" type="primary" @confirm="save"></TwoButton>
      <!-- <el-button type="primary" @click="">保存</el-button> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, watch } from "vue";
import MyWangEditor from "@/utils/vue/my_wangEditor.vue";
// import Upload from "@/components/upload/index.vue";
import myElselect from "@/utils/vue/my_elselect.vue";
import TwoButton from "@/components/button/two_button.vue";
import my_select_tag from "@/utils/vue/my_select_tag.vue";
import moment from "moment"; // 日期转换插件
import { useTestStore } from "@/store/index";

import { getCollege } from "@/api/currency";
import { setInsertContent } from "@/api/admin/detailedList"; // 课程提交
import { getActivityList } from "@/api/activity/index";

const information = defineProps({
  type: {
    type: String,
    default: "1",
  },
  activity_text: {
    type: String,
    default: "...",
  },
  data: {
    type: String,
    default: "",
  },
  updateID: {
    type: String,
    default: "",
  },
});

// onMounted(() => {
//   // 临时注释
//   // console.log("information.data", information.data);
//   // console.log(JSON.parse(information.data));
//   if (information.data && information.data != "") {
//     let data = JSON.parse(information.data);
//     formLabelAlign.id = data.id;
//     formLabelAlign.createBy = data.createBy;
//   } else if (information.updateID && information.updateID != "") {
//     console.log(information.updateID);
//   }
// });

watch([() => information.data, () => information.updateID], (newVlaue) => {
  if (information.data && information.data != "") {
    let data = JSON.parse(information.data);
    formLabelAlign.value.id = data.id;
    formLabelAlign.value.createBy = data.createBy;
  } else if (information.updateID && information.updateID != "") {
    console.log(information.updateID);
    upList();
  }
});

type Range = {
  value: string;
  label: string;
};

const value = ref<Array<string>>([]); // 记录选中的学院

const options = ref<Array<Range>>([
  {
    value: "1",
    label: "学校1",
  },
  {
    value: "2",
    label: "学校2",
  },
]); // 所有学院

const range = (obj: Array<Range>) => {
  console.log(obj);
};

const formLabelAlign = ref({
  id: "", // 课程id
  createBy: "", // 创建人id
  sectionNumber: "", // 活动节次
  startTime: "", // 开始时间
  endTime: "", // 结束时间
  registrationMethod: 1, // 报名方式   -- ？？？？
  scope: 1, // 活动公开范围
  isResource: 1, //形式

  campus: "1", // 校区
  termId: "1", // 学期
  // 标准
  // 课程/活动形式
  principal: "", // 负责人工号
  courseDesc: "", // 活动/课程描述
  // 报名方式
  // 形式
  gender: 0, //性别
  enrollPeopleNumber: null, // 活动人数
  man: null, // 男生人数
  woman: null, // 女生人数
  releaseTime: "", // 活动发布时间
  enrollStartTime: "", // 报名开始时间
  enrollEndTime: "", // 报名结束时间
});

// 获取活动描述
const getTexts = (text: string) => {
  formLabelAlign.value.courseDesc = text;
};
// end

// 校区
// const school = ref<string>("");
const schoolAllArr = useTestStore().schoolAllArr;
const schoolAllChoice = (text: string) => {
  formLabelAlign.value.campus = text;
};
// end

// 学院
type T = {
  value: string;
  label: string;
};
const collegeAll = ref<string>("");
const collegeAllArr = ref<Array<T>>([]);
const collegeAllChoice = (text: string) => {
  collegeAll.value = text;
};
const get_college = () => {
  getCollege("").then((res) => {
    if (res.data && res.data.length > 0) {
      res.data.forEach((item: string) => {
        collegeAllArr.value.push({
          value: item,
          label: item,
        });
      });
    }
  });
};
get_college();
// end

// 学期
// const semester = ref<string>("");
const semesterAllArr = [
  {
    value: "1",
    label: "学期1",
  },
  {
    value: "2",
    label: "学期2",
  },
];
const semesterAllChoice = (text: string) => {
  formLabelAlign.value.termId = text;
};
// end

// 活动标准
const standard = ref<string>("");
const standardAllArr = [
  {
    value: "1",
    label: "时长",
  },
  {
    value: "2",
    label: "分数",
  },
];
const standardAllChoice = (text: string) => {
  standard.value = text;
};
// end

// 课程形式
const form = ref<string>("");
const formAllArr = [
  {
    value: "1",
    label: "时长",
  },
  {
    value: "2",
    label: "分数",
  },
];
const formAllChoice = (text: string) => {
  form.value = text;
};
// end

// 保存
const save = () => {
  // 根据性别划分计算总人数
  switch (formLabelAlign.value.gender) {
    case 1:
      (formLabelAlign.value.enrollPeopleNumber! as number) =
        formLabelAlign.value.man!;
      break;
    case 2:
      (formLabelAlign.value.enrollPeopleNumber! as number) =
        formLabelAlign.value.woman!;
      break;
    case 3:
      (formLabelAlign.value.enrollPeopleNumber! as number) =
        formLabelAlign.value.man! + formLabelAlign.value.woman!;
      break;

    default:
      break;
  }
  // end

  // 时间转化
  formLabelAlign.value.startTime = moment(
    formLabelAlign.value.startTime
  ).format("YYYY-MM-DD hh:mm:ss");
  formLabelAlign.value.endTime = moment(formLabelAlign.value.endTime).format(
    "YYYY-MM-DD hh:mm:ss"
  );
  formLabelAlign.value.releaseTime = moment(
    formLabelAlign.value.releaseTime
  ).format("YYYY-MM-DD hh:mm:ss");
  formLabelAlign.value.enrollStartTime = moment(
    formLabelAlign.value.enrollStartTime
  ).format("YYYY-MM-DD hh:mm:ss");
  formLabelAlign.value.enrollEndTime = moment(
    formLabelAlign.value.enrollEndTime
  ).format("YYYY-MM-DD hh:mm:ss");
  // end
};
// end

// 当修改时，查询详情
const upList = () => {
  getActivityList(`id=${information.updateID}`).then((res) => {
    formLabelAlign.value = res.data;
  });
};
// end
</script>

<style scoped lang="less">
:deep(.aaa > div > .el-form-item__label) {
  font-size: 16px;
  font-weight: bold;
  color: black;
}
:deep(.el-form-item > .el-form-item__label) {
  padding-bottom: 8px;
  padding-top: 24px;
}
:deep(.el-form) {
  padding-bottom: 24px;
}
:deep(.el-date-editor.el-input) {
  width: 100%;
}
:deep(.el-input__wrapper) {
  width: 100%;
}
:deep(.el-radio__inner) {
  border-radius: 0;
}
</style>
