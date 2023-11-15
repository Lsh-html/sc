<!-- name -->
<!-- 活动审核 -->
<template>
  <div class="h-full flex flex-col bg-white">
    <header>
      <div
        class="w-full px-7 py-6 flex justify-between items-center"
        style="width: 100%; min-width: 1200px"
      >
        <div class="w-full flex">
          <myElselect
            :text="'类型'"
            :placeHolder="'全部'"
            :fontSize="18"
            :arr="stateArr"
            @choice="stateChoice"
          ></myElselect>
          <myElselect
            :text="'年级'"
            :placeHolder="'全部'"
            :fontSize="18"
            :arr="gradeArr"
            @choice="gradeChoice"
          ></myElselect>

          <myElselect
            :text="'学位'"
            :placeHolder="'全部'"
            :fontSize="18"
            :arr="academicDegreeArr"
            @choice="academicDegreeChoice"
          ></myElselect>
        </div>
        <div>
          <el-button type="primary" @click="addObj">创建</el-button>
        </div>
      </div>
    </header>
    <article style="min-width: 100%" class="mt-5 flex-1">
      <div class="px-3 py-8 bg-white h-full flex flex-col justify-between">
        <div>
          <div
            v-for="(item, index) in Lists"
            :key="index"
            style=""
            v-if="Lists && Lists.length > 0"
          >
            <div
              class="flex justify-between"
              style="line-height: 54px; height: 54px"
            >
              <div class="mr-4">
                <el-tag v-if="item.state == '1'" class="ml-2" type="success"
                  >公告</el-tag
                >
                <el-tag v-else-if="item.state == '2'" class="ml-2" type="info"
                  >消息</el-tag
                >
              </div>
              <div class="flex-grow">{{ item.txetHeader }}</div>
              <div class="flex items-center">
                <div class="mr-4">{{ item.date }}</div>
                <div
                  class="iconfont"
                  :class="
                    item.collect == '1'
                      ? 'icon-shoucang c2'
                      : item.collect == '2'
                      ? 'icon-xingzhuang-xingxing c1'
                      : ''
                  "
                ></div>
              </div>
            </div>

            <el-divider style="margin: 0" />
          </div>
          <div class="flex flex-col items-center justify-center" v-else>
            <img class="mt-24" src="@/assets/images/NoResults.png" alt="" />
            <div class="mt-10" style="color: #aaaaaa">暂无搜索内容！</div>
          </div>
        </div>
        <div class="mt-4 flex justify-end">
          <Pagination :total="total" @page="page"></Pagination>
        </div>
      </div>
    </article>

    <el-dialog v-model="dialogVisible" width="1000px">
      <div style="">
        <div class="w-full flex">
          <myElselect
            :text="'类型'"
            :placeHolder="'全部'"
            :fontSize="14"
            :arr="stateArr"
            :bold="false"
            @choice="stateChoice2"
          ></myElselect>
          <myElselect
            :text="'年级'"
            :placeHolder="'全部'"
            :fontSize="14"
            :arr="gradeArr"
            :bold="false"
            @choice="gradeChoice2"
          ></myElselect>

          <myElselect
            :text="'学位'"
            :placeHolder="'全部'"
            :fontSize="14"
            :arr="academicDegreeArr"
            :bold="false"
            @choice="academicDegreeChoice2"
          ></myElselect>
        </div>
        <div class="mt-12">
          <div class="font-black mb-4 text-base">标题</div>
          <div>
            <el-input
              v-model="text"
              maxlength="30"
              type="text"
              placeholder="Please input"
            />
          </div>
        </div>
        <div class="mt-12">
          <div class="font-black mb-4 text-base">内容</div>
          <div>
            <MyWangEditor class="ml-5" @text="getTexts"></MyWangEditor>
          </div>
        </div>
        <div class="mt-12">
          <TwoButton
            text="创建"
            type="primary"
            @confirm="add"
            class="ml-4"
          ></TwoButton>
          <TwoButton
            text="取消"
            type="info"
            @confirm="over"
            class="ml-4"
          ></TwoButton>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, watch, getCurrentInstance } from "vue";
import { useTestStore } from "@/store/index";
import { StarFilled, Star } from "@element-plus/icons-vue";
import myElselect from "@/utils/vue/my_elselect.vue";
import Pagination from "@/utils/vue/my_pagination.vue";
import MyWangEditor from "@/utils/vue/my_wangEditor.vue";
import TwoButton from "@/components/button/two_button.vue";

import { getGuideAllYears } from "@/api/admin/guide";

const information = defineProps({
  type: {
    type: String,
    default: "1",
  },
});

// const emit = defineEmits(["my_state", "id"]);
// const instance = getCurrentInstance();

// 类型
const state = ref<string>("");
const stateArr = [
  {
    value: "1",
    label: "公告",
  },
  {
    value: "2",
    label: "消息",
  },
];
const stateChoice = (text: string) => {
  state.value = text;
  // getLists();
};
// end

// 年级
type T = {
  value: string;
  label: string;
};
const grade = ref<string | number>("");
const gradeArr = ref<Array<T>>([]);
const gradeChoice = (text: string) => {
  grade.value = text;
  // getLists();
};
const get_guideAllYears = () => {
  getGuideAllYears({ type: information.type }).then((res) => {
    res.data.forEach((item: string) => {
      gradeArr.value.push({
        value: item,
        label: item,
      });
    });
  });
};
// end

// 学位
const academicDegree = ref<string>("");
const academicDegreeArr = useTestStore().academicDegreeArr;
const academicDegreeChoice = (text: string) => {
  academicDegree.value = text;
  // getLists();
};
// end

// 列表查询  -- 通过
const Lists = ref<Array<any>>([]); // 列表
const total = ref<number>(0);
const pageNo = ref<number>(1);
const pageSize = ref<number>(15);
const getLists = () => {
  Lists.value = [
    {
      state: "1", // 1. 公告   2. 消息
      txetHeader:
        "2021-01-01 10:00的【国家电网线下签约】会议即将开始，请提前10分钟前往会议室1进行签到！", // 标题
      textCenter: "<p>啊啊实打实大苏打大苏打是</p>", // 内容
      date: "2022-02-25 12:00:00", // 时间
      collect: "1", // 1. 已收藏  2. 未收藏
    },
    {
      state: "2", // 1. 公告   2. 消息
      txetHeader:
        "2021-01-01 10:00的【国家电网线下签约】会议即将开始，请提前10分钟前往会议室1进行签到！", // 标题
      textCenter: "<p>啊啊实打实大苏打大苏打是</p>", // 内容
      date: "2022-02-25 12:00:00", // 时间
      collect: "2", // 1. 已收藏  2. 未收藏
    },
  ];
};

// 分页变化
type page = {
  pageNo: number;
  pageSize: number;
};
const page = (text: page) => {
  console.log(text);
  pageNo.value = text.pageNo;
  pageSize.value = text.pageSize;
  // getLists();
};
// end

// 创建弹框
const dialogVisible = ref<boolean>(false); // 是否显示
const text = ref<string>(""); // 文本
const addObj = () => {
  dialogVisible.value = true;
};
const stateChoice2 = (text: string) => {
  console.log(text, "类型");
};
const gradeChoice2 = (text: string) => {
  console.log(text, "年级");
};
const academicDegreeChoice2 = (text: string) => {
  console.log(text, "学位");
};
const getTexts = (text: string) => {
  console.log(text, "内容");
};
const add = () => {
  console.log("新增");
};
const over = () => {
  console.log("取消");
};

// end

// 监听type变化
watch(
  () => information.type,
  () => {
    get_guideAllYears();
    getLists();
  },
  {
    deep: true,
    immediate: true, // 立即执行一次
  }
);
// end
</script>

<style scoped lang="less">
.c1 {
  color: #bdbdbd;
}

.c2 {
  color: #e37318;
}
</style>
