<!-- 富文本 -->
<template>
  <div>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        mode="default"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        mode="default"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { ref, reactive, toRefs } from "vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, onUpdated } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IDomEditor } from "@wangeditor/editor";

const information = defineProps({
  input: {
    type: String,
    default: "<p></p>",
  },
});

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p></p>");

onMounted(() => {
  // console.log(information.input);
  // setTimeout(() => {
  //   valueHtml.value = "<p></p>";
  // }, 1500);
});

onUpdated(() => {
  valueHtml.value = information.input;
});

const toolbarConfig = {};
const editorConfig = {
  placeholder: "请输入内容...",
  withCredentials: true,
  MENU_CONF: {
    // 图片上传import.meta.env.VITE_BASE_URL
    uploadImage: {
      server: "https://pahw.xjtu.edu.cn/szjy-boot/api/v1/tools/oss/uploads", // 上传路径
      fieldName: "file",
      metaWithUrl: false,
      meta: {
        token: localStorage.getItem("token"), // 获得token令牌
        // otherKey: "yyy",
      },
      // // 上传前
      onBeforeUpload(files: any) {
        console.log(files);
      },
      // 上传成功
      // onSuccess(file, res) {
      //   console.log(file);
      //   console.log(res);
      //   console.log("上传成功");
      //   // JS 语法
      //   // console.log(`${file.name} 上传成功`, res);
      // },
      // // 上传失败
      // onFailed(file, res) {
      //   // JS 语法
      //   console.log("上传失败");
      //   // console.log(`${file.name} 上传失败`, res);
      // },
      // // 自定义插入图片
      customInsert(res: any, insertFn: any) {
        insertFn(res.data);
      },
      // 上传进度的回调函数
      onProgress(progress: any) {
        console.log("progress", progress);
        // progress 是 0-100 的数字
      },

      // 上传错误，或者触发 timeout 超时
      onError(file: any, err: any, res: any) {
        console.log("onError");
        // console.log(`${file.name} 上传出错`, err, res);
      },
    },
    // 视频上传
    uploadVideo: {
      server: "http://47.97.34.76/szjy-boot" + "/api/v1/tools/oss/uploads", // 上传路径
      maxFileSize: 1024 * 1024 * 1024, // 1024M
      timeout: 60 * 1000, // 60 秒
      meta: {
        token: localStorage.getItem("token"), // 获得token令牌
        // otherKey: "yyy",
      },

      customInsert(res: any, insertFn: any) {
        // JS 语法
        // res 即服务端的返回结果

        // 从 res 中找到 url poster ，然后插入视频
        insertFn(res.data);
      },
    },
  },
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const emit = defineEmits(["text"]);

const handleChange = (editor: IDomEditor) => {
  // console.log("content", editor.children);
  // console.log(valueHtml);
  emit("text", valueHtml.value);
};
</script>

<style scoped lang="less"></style>
