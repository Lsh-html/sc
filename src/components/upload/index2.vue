<!-- 手动上传模块 -->
<template>
  <div class="flex">
    <!-- 上传成功后显示区域 -->
    <!-- <div v-if="arr && arr.length > 0" class="inline-block pr-4"> -->
    <div
      v-if="arr && arr.length > 0"
      v-for="(item, index) in arr"
      class="inline-block relative mr-2 flex flex-col items-center justify-center"
      style="width: 10rem"
      :style="{ width: width, backgroundColor: backgroundColor }"
    >
      <div
        v-for="item2 in textType"
        :key="item2.icon"
        style="font-size: 1rem; line-height: 9rem"
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
        >
          <div v-if="item2.icon == ''" :style="{ width: width, height: width }">
            <img
              v-if="item.response && item.response.data"
              :src="item.response.data.url"
              alt=""
              style="display: inline-block"
            />
          </div>
        </div>
        <div
          v-if="
            !item2.type.includes(
              item.name.split('.')[item.name.split('.').length - 1]
            )
          "
          style="font-size: 14px; line-height: 20px"
        ></div>
      </div>
      <div class="text-center">{{ item.name }}</div>
      <div class="absolute top-2 right-2" @click="handleRemove(item)">
        <el-icon color="#409EFC" class="text-xl">
          <CloseBold></CloseBold>
        </el-icon>
      </div>
    </div>
    <!-- </div> -->
    <!-- end -->

    <!-- 上传本体 -->
    <div class="inline-block pr-4" v-show="content.limit > arr.length">
      <el-upload
        ref="uploadRef"
        :file-list="arr"
        class="upload-demo"
        drag
        :action="action"
        :headers="headers"
        multiple
        :on-success="success"
        :on-progress="progress"
        :on-change="chenge"
        :show-file-list="false"
        :limit="content.limit"
        style="height: 10rem"
        :style="{ width: width }"
        :accept="content.accept"
        :auto-upload="content.autoUpload"
        :data="content.data"
      >
        <el-icon style="height: 100%"><Plus /></el-icon>
      </el-upload>
      <div class="el-upload__tip">
        {{ content.placeholder }}
      </div>
    </div>
    <!-- end -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, watch, onMounted } from "vue";
import { CloseBold, Plus } from "@element-plus/icons-vue";
import type { UploadInstance } from "element-plus";
import type {
  UploadFile,
  UploadFiles,
  UploadProgressEvent,
} from "element-plus";

// 父传子
const content = withDefaults(
  defineProps<{
    placeholder: string; // 提示信息
    accept: string; // 类型限制
    limit: number; // 个数
    uploadcontent: Array<any>; // 已上传文件
    width: string;
    backgroundColor: string;
    // action: string;
    up: boolean;
    data: object;
    autoUpload: boolean;
  }>(),
  {
    placeholder: () => "", // 默认值
    accept: () => ".text,.txt,.PPTX,.ppt,.xlsx,.docx,.png,.jpg,.jpeg,.gif",
    limit: () => 1, // 上传上限
    uploadcontent: () => [],
    width: () => "10rem",
    backgroundColor: () => "",
    // action: () => "",
    up: () => false,
    data: () => {
      return {};
    },
    autoUpload: () => false,
  }
);
watch(
  () => content.up,
  (newValue) => {
    if (newValue) {
      submitUpload();
    }
  }
);

const action = `http://202.117.63.134:8082/szjy-boot/api/v1/tools/oss/uploads`; // 上传路径

const uploadRef = ref<UploadInstance>();

const submitUpload = () => {
  uploadRef.value!.submit();
};

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
    // icon: "icon-icon_found_img",
    icon: "",
    type: ["png", "jpg", "jpeg", "gif"],
  },
];
//  上传请求头
const headers = {
  Token: localStorage.getItem("token"),
};

// 上传
const chenge = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  arr.value = uploadFiles;
  console.log(arr);
};
// end

// 删除
const handleRemove = (file: any) => {
  arr.value.map((item, index) => {
    arr.value.splice(index, 1);
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
  // console.log(uploadFiles);

  emit("play", arr.value); // 子传父
};
</script>

<style scoped lang="less">
:deep(.el-upload-dragger) {
  height: 10rem;
}
</style>
