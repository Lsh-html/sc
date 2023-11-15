<!-- 上传模块 -->
<template>
  <div class="flex">
    <!-- 上传成功后显示区域 -->
    <div v-if="arr && arr.length > 0" class="inline-block p-4 flex">
      <div
        v-for="(item, index) in arr"
        class="inline-block relative flex flex-col items-center justify-center"
        :class="index == arr.length - 1 ? '' : 'mr-8'"
        style="width: 10rem"
        :style="{ width: width, backgroundColor: backgroundColor }"
      >
        <img
          :src="item.response.data.url"
          alt=""
          :style="{ width: width, height: width }"
        />
        <div
          v-for="item2 in textType"
          :key="item2.icon"
          style="font-size: 9rem; line-height: 9rem"
        >
          <div
            class="iconfont"
            :class="item2.icon"
            style="font-size: 9rem; line-height: 9rem"
            v-if="
              item2.type.includes(
                item.name.split('.')[item.name.split('.').length - 1]
              )
            "
          ></div>
        </div>
        <div class="text-center">{{ item.name }}</div>
        <div class="absolute right-0 -top-4" @click="handleRemove(item)">
          <el-icon color="#409EFC" class="text-xl">
            <CloseBold></CloseBold>
          </el-icon>
        </div>
      </div>
    </div>
    <!-- end -->

    <!-- 上传本体 -->
    <div class="inline-block p-4" v-if="content.limit > arr.length">
      <el-upload
        :file-list="arr"
        class="upload-demo"
        drag
        :action="action"
        :headers="headers"
        multiple
        :on-success="success"
        :on-progress="progress"
        :show-file-list="false"
        :limit="content.limit"
        style="height: 10rem"
        :style="{ width: width }"
        :accept="accept"
        :auto-upload="autoUpload"
      >
        <el-icon
          style="height: 100%"
          v-if="!content.placeholder2 || content.placeholder2 == ''"
          ><Plus
        /></el-icon>
        <div v-else>{{ content.placeholder2 }}</div>
      </el-upload>
      <div class="el-upload__tip">
        {{ content.placeholder }}
      </div>
    </div>
    <!-- end -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from "vue";
import { CloseBold, Plus } from "@element-plus/icons-vue";
import type {
  UploadFile,
  UploadFiles,
  UploadProgressEvent,
} from "element-plus";

const action = import.meta.env["VITE_HTTP"] + "/api/v1/tools/oss/uploads";

// 父传子
const content = withDefaults(
  defineProps<{
    placeholder: string; // 提示信息
    placeholder2: string; // 提示信息
    accept: string; // 类型限制
    limit: number; // 个数限制
    uploadcontent: Array<any>;
    width: string;
    backgroundColor: string;
    autoUpload: boolean;
  }>(),
  {
    placeholder: () => "", // 默认值
    placeholder2: () => "", // 默认值
    accept: () => ".text,.txt,.PPTX,.ppt,.xlsx,.docx,.png,.jpg,.jpeg,.gif",
    limit: () => 1,
    uploadcontent: () => [],
    width: () => "10rem",
    backgroundColor: () => "",
    autoUpload: () => true,
  }
);

onMounted(() => {
  arr.value = content.uploadcontent;
});

// 子传父
const emit = defineEmits(["play"]);

type Arr = {
  name: string;
  percentage?: number;
  raw?: any;
  response?: any;
};

const arr = ref<Arr[]>([]);

// 文本类型
const textType = [
  {
    icon: "icon-caozuo-zhinan",
    type: ["txt", "text"],
  },
  {
    icon: "icon-WPS-PPT",
    type: ["PPTX", "ppt", "pdf"],
  },
  {
    icon: "icon-WPS-EXCLE",
    type: ["xlsx"],
  },
  {
    icon: "icon-WPS-WORD",
    type: ["docx"],
  },
  {
    icon: "",
    type: ["png", "jpg", "jpeg", "gif"],
  },
];
//  上传请求头
const headers = {
  Token: localStorage.getItem("token"),
};

// 删除
const handleRemove = (file: any) => {
  console.log(file);

  arr.value.map((item, index) => {
    // if (file.response.timestamp == item.response.timestamp) {
    arr.value.splice(index, 1);
    // }
  });
  emit("play", arr.value); // 子传父
};

const progress = (
  evt: UploadProgressEvent,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  console.log(evt);
  console.log(uploadFile);
  console.log(uploadFiles);
};

// 上传成功
const success = (response: any, uploadFile: any, uploadFiles: UploadFiles) => {
  // if (uploadFile.response.code == 200) {
  //   // arr.value.push(uploadFile as never);
  // } else {
  //   console.log("上传失败");
  // }
  console.log(uploadFiles);
  // console.log(arr);
  arr.value = uploadFiles;
  emit("play", arr.value); // 子传父
};

//
const remove = () => {
  console.log(123);
};
</script>

<style scoped lang="less">
:deep(.el-upload-dragger) {
  height: 10rem;
  line-height: 5rem;
}
</style>
