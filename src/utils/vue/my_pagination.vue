<!-- 分页 -->
<template>
  <div>
    <el-config-provider :locale="zhCn">
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[15, 30, 50, 100]"
        layout="sizes,total, prev, pager, next,  jumper"
        :total="information.total"
        @size-change="handleSizeChange"
        @current-change="updatePageSize"
      />
      <!-- 
         -->
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
// 引入中文包
import zhCn from "element-plus/lib/locale/lang/zh-cn";

type Page = {
  pageNo: number;
  pageSize: number;
};
const emit = defineEmits(["page"]);

const information = defineProps({
  total: {
    type: Number,
    default: 0,
  },
});

const pageNo = ref<number>(1);
const pageSize = ref<number>(15);

const page = reactive<Page>({
  pageNo: 1,
  pageSize: 15,
});

// 修改条目数
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  page.pageSize = val;
  emit("page", page);
};
// end

// 修改页码数
const updatePageSize = (val: number) => {
  pageNo.value = val;
  page.pageNo = val;
  emit("page", page);
};
// end
</script>

<style scoped lang="less"></style>
