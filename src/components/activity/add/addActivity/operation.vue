<!-- 作业设置 -->
<template>
  <div class="p-3" style="min-height: 100%">
    <div
      v-for="(item, index) in lists"
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
          <div class="text-base font-black mr-4">作业{{ index + 1 }}</div>
          <div class="text-base font-black mr-4">{{ item.name }}</div>
        </div>
        <div>
          <el-button type="success" @click="updateBut(index)">设置</el-button>
          <TwoButton
            text="删除"
            type="warning"
            @confirm="del(item.id)"
            class="ml-4"
          ></TwoButton>
        </div>
      </div>
      <div class="text-xs flex mt-2" style="color: #41475e">
        <span>作业要求：</span>
        <span>{{ item.descs }}</span>
      </div>
      <div class="text-xs flex mt-2" style="color: #41475e">
        <span>作业附件：</span>
        <a
          v-for="(ite,inde) in (item.fileUrl as string).split(',')"
          :key="ite"
          :src="ite"
          >{{ (item.fileUrl as string).split(",")[inde] }}</a
        >
      </div>
      <div class="text-xs flex mt-2 justify-between" style="color: #41475e">
        <div>
          <span>时间：</span>
          <span>{{ item.submitTimeStart }} -- {{ item.submitTimeEnd }}</span>
        </div>
        <div style="color: #909399">
          <span>创建时间：</span>
          <span>{{ item.createTime }}</span>
        </div>
      </div>
    </div>
    <div
      class="px-20 py-9 mb-4 bg-white"
      style="box-shadow: 0 12px 24px 0px #ebeef5"
      @click="addBut"
    >
      <div class="flex justify-center items-center">
        <div
          class="h-11 w-11 flex justify-center items-center"
          style="background-color: #d9e1ff; color: #0052d9; border-radius: 44px"
        >
          <div class="iconfont icon-add"></div>
        </div>
        <div class="ml-3 font-base font-black">添加作业</div>
      </div>
    </div>

    <div v-if="addBol">
      <el-dialog v-model="addBol" width="1000px">
        <div>
          <el-form
            label-position="top"
            label-width="100px"
            :model="addList"
            :inline="true"
            class="aaa"
          >
            <el-form-item label="作业名称" style="width: 100%">
              <el-input v-model="addList.name" />
            </el-form-item>

            <el-form-item label="作业要求" style="width: 100%">
              <el-input v-model="addList.descs" type="textarea" />
            </el-form-item>

            <el-form-item label="作业交付开始时间" style="width: 45%">
              <el-date-picker
                v-model="addList.submitTimeStart"
                type="datetime"
                placeholder="开始时间"
              />
            </el-form-item>

            <el-form-item label="作业交付结束时间" style="width: 45%">
              <el-date-picker
                style="width: 100%"
                v-model="addList.submitTimeEnd"
                type="datetime"
                placeholder="结束时间"
              />
            </el-form-item>

            <el-form-item label="作业附件" style="width: 100%">
              <Upload
                style="width: 100%"
                @play="uploadArr"
                :action="action"
                :autoUpload="true"
                :uploadcontent="uploadcontent"
              ></Upload>
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
import Upload from "@/components/upload/index2.vue";
import moment from "moment"; // 日期转换插件
import TwoButton from "@/components/button/two_button.vue";
import { elMessage } from "@/components/ts/myMessage"; // 提示框

import {
  setOperation,
  getOperation,
  delOperation,
  updateOperation,
} from "@/api/activity/operation";

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

watch([() => information.data, () => information.updateID], () => {
  FN();
});

const action = import.meta.env.VITE_HTTP + "api/v1/tools/oss/uploads"; // 上传路径，明天问后端

interface T {
  id: string;
  name?: string;
  descs?: string;
  fileUrl?: string;
  fileName?: string;
  submitTimeStart: string;
  submitTimeEnd: string;
  createTime: string;
}
interface T1 {
  courseInfoId: string; // 课程id
  name: string;
  descs: string;
  fileUrl: string;
  fileName: string;
  submitTimeStart: string;
  submitTimeEnd: string;
  id?: string; // 作业id
}

const lists = ref<Array<T>>([]);

const getLists = () => {
  getOperation(
    `courseInfoId_EQ=${
      information.updateID
        ? information.updateID
        : JSON.parse(information.data).id
    }&pageSize=100&ORDER=DESC`
  ).then((res) => {
    lists.value = res.data.rows;
    console.log(lists.value);
  });
};

const addBol = ref<boolean>(false); // 编辑弹框
const myState = ref<number>(1); // 1：新建    2：修改

// 修改
const uploadcontent = ref<Array<any>>([]);
const updateBut = (num: number) => {
  myState.value = 2;
  addBol.value = true;
  uploadcontent.value =
    lists.value[num].fileUrl != ""
      ? [{ name: lists.value[num].fileName, url: lists.value[num].fileUrl }]
      : [];
  addList.value = {
    name: lists.value[num].name as string,
    descs: lists.value[num].descs as string,
    fileUrl: lists.value[num].fileUrl as string,
    fileName: lists.value[num].fileName as string,
    submitTimeStart: lists.value[num].submitTimeStart as string, // 提交开始时间
    submitTimeEnd: lists.value[num].submitTimeEnd as string, // 提交结束时间
    id: lists.value[num].id as string, // 作业id
    courseInfoId: "", // 课程id
  };
};

let addList = ref<T1>({
  name: "",
  descs: "",
  fileUrl: "",
  fileName: "",
  submitTimeStart: "", // 提交开始时间
  submitTimeEnd: "", // 提交结束时间
  id: "", // 作业id
  courseInfoId: "", // 课程id
});

// 点击新增
const addBut = () => {
  // addList.value = {
  //   name: "",
  //   descs: "",
  //   fileUrl: "",
  //   fileName: "",
  //   submitTimeStart: "", // 提交开始时间
  //   submitTimeEnd: "", // 提交结束时间
  //   id: "", // 作业id
  //   courseInfoId: "", // 课程id
  // };
  FN();
  addList.value.name = "";
  addList.value.descs = "";
  addList.value.fileUrl = "";
  addList.value.fileName = "";
  addList.value.submitTimeStart = "";
  addList.value.submitTimeEnd = "";
  addBol.value = true;
  myState.value = 1;
};
// end

// 附件导入
const uploadArr = (text: any) => {
  console.log(text);

  if (text.length == 0) {
    addList.value.fileUrl = "";
    addList.value.fileName = "";
    return;
  }
  text.forEach((item: any, index: number) => {
    addList.value.fileUrl += item.response.data.url;
    addList.value.fileName += item.response.data.name;
    if (index > 1) {
      addList.value.fileUrl += ",";
      addList.value.fileName += ",";
    }
  });
};
// end

// 确定
const addSectionListObj = () => {
  addList.value.submitTimeStart = moment(addList.value.submitTimeStart).format(
    "YYYY-MM-DD hh:mm:ss"
  );

  addList.value.submitTimeEnd = moment(addList.value.submitTimeEnd).format(
    "YYYY-MM-DD hh:mm:ss"
  );

  if (myState.value == 1) {
    setOperation(addList.value).then((res) => {
      getLists();
      elMessage(res.msg, res.code);
    });
  } else if (myState.value == 2) {
    updateOperation(addList.value).then((res) => {
      getLists();
      elMessage(res.msg, res.code);
    });
  }
};
// end

// 删除
const del = (ids: string) => {
  delOperation({ ids: ids }).then((res) => {
    getLists();
    elMessage(res.msg, res.code);
  });
};
// end

// 取消
const over = () => {};
// end

// 课程id来源判断
const FN = () => {
  if (information.data && information.data != "") {
    addList.value.courseInfoId = JSON.parse(information.data).id;
  } else if (information.updateID && information.updateID != "") {
    addList.value.courseInfoId = information.updateID;
    getLists(); // 查询节次
  }
};
// end
</script>

<style scoped lang="less"></style>
