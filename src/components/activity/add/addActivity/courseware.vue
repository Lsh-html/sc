<!-- 课件设置 -->
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
          <div class="text-base font-black mr-4">第{{ index + 1 }}节次</div>
          <div class="text-base font-black mr-4">{{ item.name }}</div>
        </div>
        <div v-if="identity == '老师'">
          <el-button type="success" @click="updateBut(index)">设置</el-button>
        </div>
      </div>
      <div
        class="text-xs flex"
        style="color: #41475e"
        v-if="cls && cls.length > 0"
      >
        <span>课件类型：</span>
        <span v-for="itm in cls" :key="itm.id">
          <span v-if="itm.id == item.clsId">{{ itm.label }}</span>
        </span>
      </div>
      <div class="text-xs flex mt-2" style="color: #41475e">
        <span>课件说明：</span>
        <span>{{ item.content }}</span>
      </div>
      <div class="text-xs flex mt-2 justify-between" style="color: #41475e">
        <div>
          <span>课件内容：</span>
          <span v-for="itm in (item.filesUrl as string).split(',')">{{
            itm
          }}</span>
        </div>
        <div style="color: #909399">
          <span>创建时间：</span>
          <span>{{ item.date }}</span>
        </div>
      </div>
    </div>
    <div
      class="px-20 py-9 mb-4 bg-white"
      style="box-shadow: 0 12px 24px 0px #ebeef5"
      @click="addBut"
      v-if="identity == '老师'"
    >
      <div class="flex justify-center items-center">
        <div
          class="h-11 w-11 flex justify-center items-center"
          style="background-color: #d9e1ff; color: #0052d9; border-radius: 44px"
        >
          <div class="iconfont icon-add"></div>
        </div>
        <div class="ml-3 font-base font-black">添加课件</div>
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
            <el-form-item label="课件类型" style="width: 100%">
              <el-select
                v-model="addList.clsId"
                class="m-2"
                placeholder="Select"
                size="large"
              >
                <el-option
                  v-for="item in cls"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="课件名称" style="width: 100%">
              <el-input v-model="addList.name" />
            </el-form-item>

            <el-form-item label="课件说明" style="width: 100%">
              <el-input v-model="addList.content" type="textarea" />
            </el-form-item>
            <el-form-item label="课件附件" style="width: 100%">
              <Upload @play="uploadArr" :action="action"></Upload>
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
import { ref, reactive, toRefs } from "vue";
import Upload from "@/components/upload/index2.vue";

const information = defineProps({
  updateID: {
    type: String,
    default: "",
  },
  identity: {
    type: String,
    default: "老师",
  },
});

const action = ""; // 上传路径，明天问后端

interface T {
  id: string;
  name?: string;
  clsId?: string;
  content?: string;
  filesUrl?: string;
  filesName?: string;
  date: string;
}
interface T1 {
  name: string;
  clsId: string;
  content: string;
  filesUrl: string;
  filesName: string;
}

interface Cls {
  id: string;
  label?: string;
}

const cls = ref<Array<Cls>>([
  { id: "1", label: "文本课件" },
  { id: "2", label: "视频课件" },
]);

const lists = ref<Array<T>>([
  {
    id: "1",
    name: "篮球视频课件",
    clsId: "1",
    content: "本课件适用于第一、二节次",
    filesUrl: "aaaa.mp4",
    filesName: "aaaa.mp4",
    date: "2023/5/15  14：24：36",
  },
]);

const addBol = ref<boolean>(false); // 编辑弹框

const updateBut = (num: number) => {};

const addList = reactive<T1>({
  name: "",
  clsId: cls.value[0].id,
  content: "",
  filesUrl: "",
  filesName: "",
});

const addBut = () => {
  addBol.value = true;
};

// 导入
const uploadArr = (text: any) => {
  if (text.length == 0) {
    addList.filesUrl = "";
    addList.filesName = "";
    return;
  }
  addList.filesUrl = text[0].response.data.url;
  addList.filesName = text[0].response.data.name;
};
// end

// 确定
const addSectionListObj = () => {};
// end

// 取消
const over = () => {};
// end
</script>

<style scoped lang="less"></style>
