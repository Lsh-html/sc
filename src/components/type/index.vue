<!-- type分类 -->
<template>
  <div>
    <div class="flex justify-between" style="min-width: 1200px">
      <div
        class="flex justify-center items-center"
        style="
          height: 212px;
          width: calc(calc(514 / 1600) * 100%);
          border-radius: 10px;
          background-color: #e0eaff;
        "
        v-for="(item, index) in typeText"
        :key="index"
        :class="typeNum == item.type ? 'select' : ''"
        @click="updateTypeNum(item.type)"
      >
        <!-- 圆点 -->
        <Spot
          class="pr-6"
          :color="typeNum == item.type ? '#00b578' : '#ffc300'"
        ></Spot>
        <div
          class="text-2xl"
          :class="typeNum == item.type ? 'text-white' : 'text-black'"
        >
          {{ item.text + information.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from "vue";
import Spot from "@/utils/vue/spot.vue";
// const type = defineProps(<{
//   type:string|number
// }>(),{
//   type:1
// })

const typeNum = ref<string | number>("1");

const information = defineProps({
  typeNum: {
    type: String,
    default: "1",
  },
  text: {
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

const updateTypeNum = (num: string) => {
  typeNum.value = num;
  emit("typeNum", typeText[Number(typeNum.value) - 1]);
};

onMounted(() => {
  typeNum.value = information.typeNum;
});
</script>

<style scoped lang="less">
.select {
  background-image: url("@/assets/images/select.png");
  background-size: 100% 100%;
}
</style>
