<!-- 黑名单 -- 学生 -->
<template>
  <div>
    <div class="bg-white py-7 px-8 mb-1 flex ilems-center">
      <span style="font-size: 18px">黑名单</span>
      <span class="ml-6">
        <myState
          @state="typeText"
          :stateArr="typeArr"
          :stateNum="type"
        ></myState>
      </span>
    </div>

    <!-- 黑名单列表 -->
    <div
      class="px-8 py-9 rounded-lg bg-white mb-3 flex justify-between"
      v-for="item in 40"
    >
      <div>
        <img
          class="inline-block"
          src="@/assets/images/Group_7.png"
          alt=""
          srcset=""
        />
        <span class="ml-7">黑名单说明：王立群同学你进入黑名单，请尽快处理</span>
      </div>
      <div>
        <el-button type="primary" @click="look">查看</el-button>
      </div>
    </div>
    <!-- end -->

    <!-- 查看详情 -->
    <el-dialog v-model="dialogVisible" :show-close="false" width="658px">
      <div class="-mt-8 p-9 bg-white" style="min-height: 455px">
        <div class="font-black">黑名单详情</div>
        <div class="mt-2 flex items-center">
          <div
            class="px-4 py-3 flex-grow border-dashed border-2 border-gray-300 rounded-full"
            style="background-color: #f9f9fb; color: #3d3d3d"
          >
            黑名单详情
          </div>
          <el-button class="ml-3" type="primary" size="large" @click="appealObj"
            >申诉</el-button
          >
        </div>
      </div>
    </el-dialog>
    <!-- end -->

    <!-- 申诉 -->
    <el-dialog v-model="dialogVisible2" :show-close="false" width="658px">
      <div class="-mt-8 p-9 bg-white" style="min-height: 455px">
        <div class="font-black mb-4">黑名单申诉说明</div>
        <el-input
          v-model="textarea"
          :rows="2"
          type="textarea"
          placeholder="Please input"
          class="mb-4"
        />
        <div class="font-black mb-4">证明资料上传</div>
        <Upload
          placeholder="图片大小不得超过10m"
          :autoUpload="true"
          :limit="3"
          accept=".png,.jpg,.jpeg,.gif"
          :uploadcontent="uploadcontent"
          @play="play"
        ></Upload>
      </div>
    </el-dialog>
    <!-- end -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import { useTestStore } from "@/store/index";
import myState from "@/utils/vue/my_state.vue";
import Upload from "@/components/upload/index2.vue";

// 状态
const type = ref<string>("");
const typeArr = useTestStore().typeArr;
const typeText = (text: string) => {
  console.log(text);
  type.value = text;
};
// end

// 查看
const dialogVisible = ref<boolean>(false);
const look = () => {
  dialogVisible.value = true;
};
// end

// 发起申诉
const dialogVisible2 = ref<boolean>(false);
const textarea = ref(""); // 文本域
const uploadcontent = ref<Array<any>>([]); // 已上传文件
const appealObj = () => {
  dialogVisible2.value = true;
};
const play = (arr: any) => {
  console.log(arr, 456); // 上传接口反值
};
// end
</script>

<style scoped lang="less">
:deep(.el-dialog) {
  background-color: #eceef4;
}
</style>
