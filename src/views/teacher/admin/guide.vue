<!-- 指南管理 -->
<template>
  <div class="flex" style="margin-top: 59px">
    <typeTeacher
      @typeNum="typeNum"
      :txt="'研修指南管理'"
      style="margin-right: calc(calc(33.5 / 1920) * 100%)"
    ></typeTeacher>
    <AddContent
      v-if="add == 'add'"
      :type="type"
      @addGuide="addGuide"
      class="flex-1"
    ></AddContent>
    <UpdateContent
      v-else-if="add == 'update'"
      :id="id"
      @addGuide="addGuide"
      class="flex-1"
    ></UpdateContent>
    <Content
      v-else
      :type="type"
      @addGuide="addGuide"
      @updateId="updateId"
      class="flex-1"
    ></Content>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, watch } from "vue";
import typeTeacher from "@/components/type/index-teacher.vue";
import Content from "@/components/admin/guide/index.vue";
import AddContent from "@/components/admin/guide/addIndex.vue";
import UpdateContent from "@/components/admin/guide/updateIndex.vue";
import Dialog from "@/components/Dialog/index.vue";

// const typeObj = ref<object>({
//   type: "1",
//   text: "体育",
// });

const type = ref<string>("1");

const typeNum = (typeText: any) => {
  // typeObj.value = Text;
  type.value = typeText.type;
  console.log(typeText);
};

// 切换创建页
const add = ref<string>("");
const addGuide = (text: string) => {
  add.value = text;
};
// end

// 修改指南的id
const id = ref<string>("");
const updateId = (text: string) => {
  id.value = text;
};
// end

// // 新增研修指南
// const add_guide = () => {
//   addGuide({});
// };
// // add_guide();
// // end

// // 研修指南查看
// const get_guide = () => {
//   getGuide(`type_EQ=${type.value}`);
// };

// // end

// // 研修指南删除
// const dialogVisible = ref<boolean>(false);
// const del = () => {
//   dialogVisible.value = true;
// };
// const oper = (bol: boolean) => {
//   dialogVisible.value = bol;
// };
// const delete_guide = () => {
//   deleteGuide({});
// };
// // delete_guide();
// // end

// // 研修指南修改
// const update_guide = () => {
//   updateGuide({});
// };

// update_guide();
// // end

// watch(
//   type,
//   (newvalue, oldvalue) => {
//     get_guide();
//   },
//   {
//     deep: true,
//     immediate: true, // 立即执行一次
//   }
// );
</script>

<style scoped lang="less"></style>
