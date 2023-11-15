<!-- 下拉框 -->
<template>
  <div>
    <div class="flex items-center">
      <div
        class="text-xl"
        :class="information.bold ? 'font-black' : ''"
        :style="{ 'font-size': information.fontSize + 'px' }"
      >
        {{ text }}
      </div>
      <div style="margin-left: 22.5px; margin-right: 22.5px">
        <el-select
          v-model="value"
          clearable
          :placeholder="information.placeHolder"
          @change="gradeChange"
          size="large"
          style="width: 135px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, onUpdated } from "vue";

const information = defineProps({
  text: {
    type: String,
    default: "",
  },
  placeHolder: {
    type: String,
    default: "全部",
  },
  arr: {
    type: Array,
    default: [],
  },
  value: {
    type: [String, Number],
    default: "",
  },
  fontSize: {
    type: Number,
    default: "20",
  },
  bold: {
    type: Boolean,
    default: true,
  },
});

const value = ref<any>("");

const options = ref<any>([]);

onMounted(() => {
  options.value = information.arr;
  if (information.value && information.value != "") {
    value.value = information.value;
  }
});
onUpdated(() => {});

// 年级发生变化
const emit = defineEmits(["choice"]);
const gradeChange = (val: string) => {
  emit("choice", value.value);
};
// end
</script>

<style scoped lang="less"></style>
