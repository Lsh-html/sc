<!-- 研修清单 -->
<template>
  <div class="flex flex-col">
    <Type class="pt-12" :text="text" @typeNum="typeNum"></Type>
    <Content
      class="mt-16"
      :typeObj="typeObj"
      v-if="add"
      @get="getContent"
    ></Content>
    <GetContent
      class="mt-16"
      :typeObj="typeObj"
      v-if="get"
      @update="updateContent"
    ></GetContent>

    <!-- 无计划弹框 -->
    <el-dialog
      v-model="dialogVisible"
      @close="closePlan"
      style="
        width: 1362px;
        min-width: 1000px;
        height: 604px;
        background-color: #d8d8d8;
      "
    >
      <div
        class="-mt-14 w-full h-full flex flex-col items-center justify-center"
      >
        <img src="@/assets/images/notPlan.png" alt="" width="200" />
        <div class="text-2xl font-black leading-8">暂未创建研修计划</div>
        <div class="mt-2 leading-6">
          抱歉，同学您还没有创建研修计划，快去创建吧！
        </div>
        <div>
          <el-button color="#0052D9" type="primary" @click="closePlan"
            >立即创建</el-button
          >
        </div>
      </div>
    </el-dialog>
    <!-- end -->

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
              ? "研修计划正在审核中"
              : state == 1
              ? "研修计划审核通过"
              : state == 2
              ? "研修计划审核未通过"
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
                  style="font-size: 22px"
                  class="iconfont icon-number1"
                  v-if="state == 0"
                ></div>
                <div v-else>
                  <el-icon :size="24"><CircleCheck /></el-icon>
                </div>

                <div class="font-black ml-4 text-base">审核中</div>
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
            <el-step v-else :status="state == 1 ? 'finish' : 'error'">
              <template #icon="icon">
                <div class="flex" v-if="state == 1">
                  <el-icon :size="24"><CircleCheck /></el-icon>
                  <div class="font-black ml-4 text-base">已通过</div>
                </div>
                <div class="flex" v-else-if="state == 2">
                  <el-icon :size="24"><CircleClose /></el-icon>
                  <div class="font-black ml-4 text-base">未通过</div>
                </div>
              </template>
            </el-step>
          </el-steps>
        </div>
        <div class="mt-24">
          <el-button
            color="#0052D9"
            type="primary"
            @click="closePlan2()"
            v-if="state != 2"
            >确定</el-button
          >
          <el-button
            color="#00B578"
            type="primary"
            @click="closePlan2(2)"
            v-else-if="state == 2"
            >调整计划</el-button
          >
        </div>
      </div>
    </el-dialog>
    <!-- end -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, watch } from "vue";

import Type from "@/components/type/index.vue";
import Content from "@/components/students/plan/index.vue";
import GetContent from "@/components/students/plan/getPlan.vue";
import { CircleCheck, CircleClose } from "@element-plus/icons-vue";
import { getStudentPlan } from "@/api/admin/plan";
import { useTestStore } from "@/store/index";

const dialogVisible = ref(false);
const dialogVisible2 = ref(false);

const typeObj = ref<object>({
  type: 1,
  text: "体育",
});

const type = ref<number>(1);
const text = "研修计划";

// 查询学生的研修计划
const state = ref<number>(1);
const active = ref<number>(2);
const add = ref<boolean>(false);
const get = ref<boolean>(false);
const update = ref<boolean>(false);
const get_StudentPlan = () => {
  getStudentPlan(`type_EQ=${type.value}&no_EQ=${useTestStore().user.no}`).then(
    (res) => {
      if (
        (res.data.rows && res.data.rows.length == 0) ||
        res.data.rows[0].state == -1
      ) {
        dialogVisible.value = true;
      } else {
        state.value = res.data.rows[0].state;
        dialogVisible2.value = true;
        if (
          res.data.rows[0].state == 1 ||
          res.data.rows[0].state == 2 ||
          res.data.rows[0].state == 3
        ) {
          active.value = 3;
        }
      }
    }
  );
};
// end

// 创建计划
const closePlan = () => {
  add.value = true;
  dialogVisible.value = false;
};
// end

// 查看计划
const closePlan2 = (num: number = 1) => {
  dialogVisible2.value = false;
  if (num == 1) {
    get.value = true;
  } else if (num == 2) {
    add.value = true;
  }
};
// end

get_StudentPlan();

const typeNum = (typeText: any) => {
  typeObj.value = typeText;
  type.value = typeText.type;
  add.value = false;
  get.value = false;
  get_StudentPlan();
};

const getContent = (text: boolean) => {
  add.value = false;
  get.value = false;
  get_StudentPlan();
};

// 修改计划
const updateContent = (text: boolean) => {
  add.value = true;
  get.value = false;
};
// end
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
