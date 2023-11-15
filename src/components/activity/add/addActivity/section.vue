<!-- 节次设置 -->
<template>
  <div class="p-3">
    <div
      v-for="(item, index) in sectionLists"
      :key="item.id"
      class="px-20 py-9 mb-4 bg-white"
      style="box-shadow: 0 12px 24px 0px #ebeef5"
    >
      <div class="mb-4 flex justify-between items-center">
        <div class="flex items-center">
          <div class="w-7 h-7 -ml-8">
            <img
              src="@/assets/images/Group_178.png"
              alt=""
              class="-ml-4 w-7 h-7"
            />
          </div>
          <div class="text-base font-black mr-4">第{{ index + 1 }}节次</div>
          <div class="text-base font-black mr-4">{{ item.sectionsName }}</div>
        </div>
        <div v-if="identity == '老师'">
          <el-button type="success" @click="updateSectionBut(index)"
            >设置</el-button
          >

          <two_button
            text="删除"
            type="warning"
            class="twoButton ml-4"
            @confirm="del(item.id as string)"
          ></two_button>
          <!-- <el-button type="success" @click="updateSectionBut(index)"
            >删除</el-button
          > -->
        </div>
      </div>
      <div
        class="text-xs flex"
        style="color: #41475e"
        v-if="
          (item.cls && item.cls != '') ||
          (item.teacher && item.teacher != '') ||
          (item.startTime && item.startTime != '') ||
          (item.endTime && item.endTime != '') ||
          (item.planScore && item.planScore != '')
        "
        :class="item.sectionsDesc && item.sectionsDesc != '' ? 'mb-8' : ''"
      >
        <div class="mr-8" v-if="item.cls && item.cls != ''">
          节次类别：{{ item.cls }}
        </div>
        <div class="mr-8" v-if="item.teacher && item.teacher != ''">
          节次老师：{{ item.teacher }}
        </div>
        <div
          class="mr-8"
          v-if="
            (item.startTime && item.startTime != '') ||
            (item.endTime && item.endTime != '')
          "
        >
          节次时间：{{ item.startTime }} - {{ item.endTime }}
        </div>
        <div class="mr-8" v-if="item.planScore && item.planScore != ''">
          节次得分：{{ item.planScore }}
        </div>
      </div>
      <div
        class="text-xs flex"
        v-if="item.sectionsDesc && item.sectionsDesc != ''"
      >
        节次要求：{{ item.sectionsDesc }}
      </div>
    </div>
    <div
      class="px-20 py-9 mb-4 bg-white"
      style="box-shadow: 0 12px 24px 0px #ebeef5"
      @click="addSectionBut"
      v-if="identity == '老师'"
    >
      <div class="flex justify-center items-center">
        <div
          class="h-11 w-11 flex justify-center items-center"
          style="background-color: #d9e1ff; color: #0052d9; border-radius: 44px"
        >
          <div class="iconfont icon-add"></div>
        </div>
        <div class="ml-3 font-base font-black">添加节次</div>
      </div>
    </div>

    <div v-if="addSectionBol">
      <el-dialog v-model="addSectionBol" width="1000px">
        <div>
          <el-form
            label-position="top"
            label-width="100px"
            :model="addSectionList"
            :inline="true"
            class="aaa"
          >
            <el-form-item label="节次名称" style="width: 100%">
              <el-input v-model="addSectionList.sectionsName" />
            </el-form-item>
            <el-form-item label="节次要求" style="width: 100%">
              <el-input v-model="addSectionList.sectionsDesc" type="textarea" />
            </el-form-item>
            <el-form-item label="节次时间" style="width: 100%">
              <el-form
                style="width: 100%"
                label-position="top"
                label-width="100px"
                :model="addSectionList"
                :inline="true"
              >
                <el-form-item label="节次开始日期" style="width: 45%">
                  <el-date-picker
                    class="w-full"
                    v-model="addSectionList.startTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    format="YYYY/MM/DD hh:mm:ss"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="节次结束日期" style="width: 45%">
                  <el-date-picker
                    class="w-full"
                    v-model="addSectionList.endTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    format="YYYY/MM/DD hh:mm:ss"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-form>
            </el-form-item>
            <el-form-item label="节次考核" style="width: 100%">
              <el-form
                label-position="top"
                label-width="100px"
                :model="addSectionList"
                :inline="true"
              >
                <el-form-item label="得分设置" style="width: 100%">
                  <el-input v-model="addSectionList.planScore" type="number" />
                </el-form-item>
              </el-form>
            </el-form-item>
          </el-form>
          <div>
            <two_button
              text="保存"
              type="primary"
              class="twoButton"
              @confirm="addSectionListObj"
            ></two_button>
            <two_button
              text="取消"
              type="info"
              class="twoButton"
              @confirm="over"
            ></two_button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, watch } from "vue";
import two_button from "@/components/button/two_button.vue";
import moment, { fn } from "moment"; // 日期转换插件
import { elMessage } from "@/components/ts/myMessage"; // 提示框

import {
  setSection,
  getSection,
  updateSection,
  delSection,
} from "@/api/activity/section";

onMounted(() => {
  getLists();
  console.log(456);
});

watch([() => information.data, () => information.updateID], (newVlaue) => {
  FN();
  console.log(789);
});

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
  identity: {
    type: String,
    default: "老师",
  },
});

const operation = ref<string>("");

// 查询节次
const sectionLists = ref<Array<T>>([]);
const pageNo = ref<string>("1");
const pageSize = ref<string>("15");
const getLists = () => {
  let data = ref<string>(`pageNo=${pageNo.value}&pageSize=${pageSize.value}`);
  if (information.data && information.data != "") {
    getSection(
      data.value + `&courseInfoId_EQ=${JSON.parse(information.data).id}`
    ).then((res) => {
      sectionLists.value = res.data.rows;
    });
  } else if (information.updateID && information.updateID != "") {
    getSection(data.value + `&courseInfoId_EQ=${information.updateID}`).then(
      (res) => {
        sectionLists.value = res.data.rows;
      }
    );
  }
  // let data = `pageNo=${pageNo.value}&pageSize=${
  //   pageSize.value
  // }&courseInfoId_EQ=${information.updateID ? information.updateID : ID.value}`;
  // getSection(data).then((res) => {
  //   sectionLists.value = res.data.rows;
  // });
};

// 添加课件
const addSectionBol = ref<boolean>(false);
const addSectionBut = () => {
  over();
  operation.value = "add";
  addSectionBol.value = true;
};
// end

// 修改课件内容
const updateSectionBut = (index: number) => {
  operation.value = "update";
  addSectionList.value = sectionLists.value[index];
  addSectionBol.value = true;
};
// end

// 设置课件内容
interface T {
  type: string;
  sectionsName: string;
  cls: string;
  teacher: string;
  startTime: string;
  endTime: string;
  planScore: string | number;
  sectionsDesc: string;
  courseInfoId: string;
  id?: string;
}
let addSectionList = ref<T>({
  type: "",
  sectionsName: "", // 节次名称
  cls: "",
  teacher: "",
  startTime: "",
  endTime: "",
  planScore: "0",
  sectionsDesc: "", // 节次描述
  courseInfoId: "", // 课程id 1638738548207038465
});
// end

// 下标转换汉字
const chinese = (num: number) => {
  const num1 = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const num2 = ["", "十", "百", "千", "万"];
  if (!num || num == 0) {
    return;
  }
  const englist = num.toString().split("");
  // console.log(englist);

  let text = ref<Array<string>>([]);
  let result = ref<string>("");
  for (let index = englist.length; index > 0; index--) {
    text.value.unshift(num2[Number(englist.length - index)]);
    text.value.unshift(num1[Number(englist[index - 1])]);
  }
  result.value = text.value.join("");

  // console.log(text.value);
  return text.value.join("");
};
// end

// 提交
const addSectionListObj = (id = null) => {
  addSectionList.value.startTime = moment(
    addSectionList.value.startTime
  ).format("YYYY-MM-DD hh:mm:ss");
  addSectionList.value.endTime = moment(addSectionList.value.endTime).format(
    "YYYY-MM-DD hh:mm:ss"
  );

  switch (operation.value) {
    case "add": // 新增
      setSection(addSectionList.value).then((res) => {
        elMessage(res.msg, res.code);
      });
      getLists(); // 查询节次

      break;

    case "update":
      updateSection(addSectionList.value).then((res: any) => {
        elMessage(res.msg, res.code);
      });
      getLists(); // 查询节次

      break;

    default:
      break;
  }

  addSectionBol.value = false;
};
// end

// 删除
const del = (id: string) => {
  delSection({ id: id }).then((res) => {
    elMessage(res.msg, res.code);
    getLists(); // 查询节次
  });
};
// end

// 取消
const over = () => {
  addSectionList.value = {
    type: "",
    sectionsName: "",
    cls: "",
    teacher: "",
    startTime: "",
    endTime: "",
    planScore: 0,
    sectionsDesc: "",
    courseInfoId: "", // 课程id 1638738548207038465
  };
  FN();
  addSectionBol.value = false;
};
// end

// 课程id来源判断
const FN = () => {
  console.log("7788");

  if (information.data && information.data != "") {
    addSectionList.value.courseInfoId = JSON.parse(information.data).id;
    getLists(); // 查询节次
  } else if (information.updateID && information.updateID != "") {
    addSectionList.value.courseInfoId = information.updateID;
    getLists(); // 查询节次
  }
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
</style>
