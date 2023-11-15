<!-- 下拉框 + tag -->
<template>
  <div>
    <el-row>
      <el-tag
        v-for="(item, index) in value"
        :key="index"
        class="mx-1"
        closable
        @close="delTag(index)"
      >
        {{ item.label }}
      </el-tag>
    </el-row>
    <el-row class="mt-3">
      <!-- 拥有查询功能的下拉框 -->
      <el-select
        v-model="value"
        multiple
        filterable
        remote
        collapse-tags
        placeholder="Select"
        style="width: 240px"
        :remote-method="remoteMethod"
      >
        <el-option
          v-if="lists && lists.length > 0"
          v-for="item in lists"
          :key="item.value"
          :label="item.label"
          :value="{ value: item.value, label: item.label }"
        />
      </el-select>
      <!-- end -->
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, watch } from "vue";

const emit = defineEmits(["play"]);

const information = defineProps({
  f_value: {
    type: Array<{ value: string; label: string }>,
    default: [], // 初始化选中
  },
  f_options: {
    type: Array<{ value: string; label: string }>,
    default: [], // 列表所有
  },
});

onMounted(() => {
  options.value = information.f_options;
  value.value = information.f_value;
  lists.value = options.value;
});

const value = ref<Array<{ value: string; label: string }>>([]); // 记录选中的学院

const options = ref<Array<{ value: string; label: string }>>([]); // 所有学院

const lists = ref<Array<{ value: string; label: string }>>([]); // 当前显示学院

const remoteMethod = (query: string) => {
  if (query) {
    lists.value = [];
    (lists.value! as any) = options.value.filter((item) => {
      if (item.label.toLowerCase().includes(query.toLowerCase())) {
        return item;
      }
    });
  } else {
    lists.value = options.value;
  }
};

const delTag = (index: number) => {
  value.value.splice(index, 1);
};

watch(value, (newValue, oldValue) => {
  emit("play", newValue);
});
</script>

<style scoped lang="less"></style>
