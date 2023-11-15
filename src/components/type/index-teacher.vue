<!-- type分类 -->
<template>
  <div class="">
    <!-- <div
      class="flex justify-center items-center"
      style="height: 280px; width: 354px; background-color: #e0eaff"
      v-for="(item, index) in typeText"
      :style="{ 'margin-bottom': index == typeText.length - 1 ? '' : '23.5px' }"
      :key="index"
      :class="typeNum == item.type ? 'select' : ''"
      @click="updateTypeNum(item.type)"
    >
      <div
        class="text-2xl"
        :class="typeNum == item.type ? 'text-white' : 'text-black'"
      >
        {{ item.text }}{{ txt }}
      </div>
    </div> -->
    <div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @select="updateTypeNum"
      >
        <el-menu-item
          :index="String(index + 1)"
          v-for="(item, index) in typeText"
        >
          <el-icon><icon-menu /></el-icon>
          <template #title>{{ item.text }}</template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
// const type = defineProps(<{
//   type:string|number
// }>(),{
//   type:1
// })

const typeNum = ref<string>("1");

const information = defineProps({
  typeNum: {
    type: String,
    default: "1",
  },
  txt: {
    type: String,
    default: "",
  },
});

const typeText = [
  {
    text: "体育",
    type: "1",
  },
  {
    text: "美育",
    type: "2",
  },
  {
    text: "劳育",
    type: "3",
  },
];

const emit = defineEmits(["typeNum"]);

// const updateTypeNum = (num: string) => {
//   typeNum.value = num;
//   emit("typeNum", typeText[Number(typeNum.value) - 1]);
// };

const updateTypeNum = (index: string) => {
  console.log(123);

  typeNum.value = index;
  emit("typeNum", typeText[Number(typeNum.value) - 1]);
};

onMounted(() => {
  typeNum.value = information.typeNum;
});
</script>

<style scoped lang="less">
.select {
  // background-image: url("@/assets/images/select.png");
  // background-size: 100% 100%;
  background-color: #0256ff !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
