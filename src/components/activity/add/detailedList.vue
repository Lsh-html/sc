<!-- 选择在那个条目下创建 -->
<template>
  <div class="bg-white p-8" style="min-height: calc(100% - 64px)">
    <div class="flex justify-between items-center">
      <myReturn @cli="cli"></myReturn>
      <div class="flex">
        <myElselect
          :text="'年级'"
          :placeHolder="'全部'"
          :arr="gradeArr"
          :value="grade"
          @choice="gradeChoice"
        ></myElselect>
        <myElselect
          :text="'学位'"
          :placeHolder="'全部'"
          :arr="academicDegreeArr"
          :value="academicDegree"
          @choice="academicDegreeChoice"
        ></myElselect>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div
        class="w-1/3 my-7"
        :class="
          index % 3 == 0
            ? 'flex'
            : index % 3 == 1
            ? 'flex justify-center'
            : 'flex justify-end'
        "
        v-for="(item, index) in getDetailedArr"
        @click="addList(item.traininglistItemId)"
        :key="index"
      >
        <div
          class="px-6 py-4 rounded-md text-white flex flex-col justify-between"
          style="
            width: 351px;
            height: 163px;
            background-color: #0052d9;
            font-size: 14px;
          "
        >
          <!-- class="px-6 py-4 rounded-md text-white flex flex-col justify-between"
          style="
            width: 351px;
            height: 163px;
            background-color: #0052d9;
            font-size: 14px;
          " -->
          <div class="text-right">必修</div>
          <div class="text-2xl text-center">{{ item.title }}</div>
          <div class="flex justify-between">
            <div>总活动数：{{ item.count }}</div>
            <div>我的活动：{{ item.myCourseNum }}</div>
            <div>已完成：{{ item.finishNum }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import myElselect from "@/utils/vue/my_elselect.vue";
import myReturn from "@/utils/vue/my_return.vue";
import { useTestStore } from "@/store/index";
import { getGuideAllYears } from "@/api/admin/guide";
import { teacherAddClass } from "@/api/admin/detailedList";

const information = defineProps({
  type: {
    type: String,
    default: "1",
  },
});

const emit = defineEmits(["myState", "listId"]);

// 年级
type T = {
  value: string;
  label: string;
};
const grade = ref<string | number>("");
const gradeArr = ref<Array<T>>([]);
const gradeChoice = (text: string) => {
  grade.value = text;
  // get_guide();
  getDetailedList();
};
const get_guideAllYears = () => {
  getGuideAllYears({ type: information.type }).then((res) => {
    console.log(res);
    res.data.forEach((item: string) => {
      gradeArr.value.push({
        value: item,
        label: item,
      });
    });
    grade.value = res.data[res.data.length - 1];
    academicDegree.value = academicDegreeArr[0].value;
    console.log(academicDegreeArr[0].value);
    getDetailedList();
  });
};
// end

// 学位
const academicDegree = ref<string>("");
const academicDegreeArr = useTestStore().academicDegreeArr;
const academicDegreeChoice = (text: string) => {
  academicDegree.value = text;
  // get_guide();
  getDetailedList();
};
// end

// 返回
const cli = (text: boolean) => {
  if (text) {
    emit("myState", "");
  }
};
// end

// 清单查询
const getDetailedArr = ref<Array<any>>([]);
const getDetailedList = () => {
  const data = {
    type: information.type,
    degree: academicDegree.value,
    years: grade.value,
  };
  teacherAddClass(data).then((res) => {
    getDetailedArr.value = res.data;
  });
};
// end

// 点击创建按钮
// const listId = ref<string>(""); // 编号id：唯一值，用来确认是谁（暂无接口）
const addList = (id: string) => {
  emit("myState", "addList");
  emit("listId", id);
};
// end

get_guideAllYears();
</script>

<style scoped lang="less"></style>
