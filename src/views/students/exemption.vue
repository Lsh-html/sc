<!-- 免修 -->
<template>
  <div class="flex flex-col">
    <Type class="pt-12" :text="text" @typeNum="typeNum"></Type>
    <Content class="mt-16" :typeObj="typeObj" @get_state="getState"></Content>

    <!-- 有计划弹框 -->
    <el-dialog
      v-model="dialogVisible2"
      @close="closePlan2"
      style="
        width: 1362px;
        min-width: 1000px;
        height: 604px;
        background-color: #d8d8d8;
      "
    >
      <div
        class="-mt-4 w-full h-full flex flex-col items-center justify-center"
      >
        <img src="@/assets/images/notPlan.png" alt="" width="200" />
        <div class="font-black text-xl">
          {{
            state == 0
              ? "研修计划免修申请正在审核中"
              : state == 1
              ? "研修计划免修申请审核通过"
              : state == 2
              ? "研修计划免修申请审核未通过"
              : ""
          }}
        </div>
        <div class="mt-6" style="width: 948px">
          <el-steps
            :space="300"
            :active="active"
            finish-status="finish"
            align-center
          >
            <el-step>
              <template #icon="icon">
                <el-icon :size="24"><CircleCheck /></el-icon>
                <div class="font-black ml-4 text-base">已提交</div>
              </template>
            </el-step>
            <el-step>
              <template #icon="icon">
                <div
                  style="font-size: 22px; color: #409eff"
                  class="iconfont icon-number1"
                  v-if="state == 0"
                ></div>
                <div v-else style="color: #409eff">
                  <el-icon :size="24"><CircleCheck /></el-icon>
                </div>

                <div class="font-black ml-4 text-base" style="color: #409eff">
                  审核中
                </div>
              </template>
            </el-step>
            <el-step v-if="state == 0">
              <template #icon="icon">
                <div
                  style="font-size: 22px; color: #828282"
                  class="iconfont icon-NumberCircleThree"
                ></div>
                <div class="font-black ml-4 text-base" style="color: #828282">
                  审核结果
                </div>
              </template>
            </el-step>
            <el-step v-else :status="state == 2 ? 'finish' : 'error'">
              <template #icon="icon">
                <div class="flex" v-if="state == 2">
                  <el-icon :size="24"><CircleCheck /></el-icon>
                  <div class="font-black ml-4 text-base">已通过</div>
                </div>
                <div class="flex" v-else-if="state == 3">
                  <el-icon :size="24"><CircleClose /></el-icon>
                  <div class="font-black ml-4 text-base">未通过</div>
                </div>
              </template>
            </el-step>
          </el-steps>
        </div>
        <div class="mt-24">
          <el-button color="#0052D9" type="primary" @click="closePlan2()"
            >确定</el-button
          >
        </div>
      </div>
    </el-dialog>
    <!-- end -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";

import Type from "@/components/type/index.vue";
import Content from "@/components/students/exemption/index.vue";
import { CircleCheck, CircleClose } from "@element-plus/icons-vue";

const typeObj = ref<object>({
  type: 1,
  text: "体育",
});

const text = "免修申请";
const dialogVisible2 = ref<boolean>(true);
const state = ref<number | null>(null);
const active = ref<number>(1);

const typeNum = (typeText: object) => {
  typeObj.value = typeText;
};

const closePlan2 = () => {
  dialogVisible2.value = false;
};

const getState = (ste: number) => {
  state.value = ste;
  if (ste == 1 || ste == 2 || ste == 3) {
    active.value = 3;
  }
  if (state.value) {
    dialogVisible2.value = true;
  } else {
    dialogVisible2.value = false;
  }
};
</script>

<style scoped lang="less">
:deep(.el-dialog__body) {
  height: 100%;
}

:deep(.el-step__icon) {
  background-color: transparent;
}
:deep(.el-step.is-center .el-step__line) {
  left: 70%;
  right: -30%;
}
</style>
