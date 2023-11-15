<!-- 活动详情  ---  查看页面 -->
<template>
  <div class="pl-20 pr-8 py-14 bg-white mt-16" style="width: 1604px">
    <div class="flex justify-between items-center">
      <div class="flex">
        <p class="t">活动老师：{{ content.teacher }}</p>
        <p class="t">发布时间：{{ content.releaseTime }}</p>
        <p class="t">报名人数：{{ content.enrollPeopleNumber }}</p>
      </div>
      <div>
        <apply_button :thiryId="content.id"></apply_button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, watch } from "vue";
import apply_button from "@/components/button/apply_button.vue";

// 详情查看接口需要更换
import { getActivityList } from "@/api/activity/index";

const information = defineProps({
  id: {
    type: String,
    default: "",
  },
});

// 查看详情
const content = ref<any>({});
const getList = () => {
  getActivityList(`id=${information.id}`).then((res) => {
    content.value = res.data;
  });
};
// end

watch(
  () => information.id,
  () => {
    getList();
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<style scoped lang="less">
.t + .t {
  margin-left: 28px;
}
</style>
