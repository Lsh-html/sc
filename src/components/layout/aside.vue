<!-- name -->
<template>
  <div class="h-full flex flex-col">
    <div class="pl-4 text-white flex items-center">
      <div class="pr-2 text-3xl">logo</div>
      <div class="h-16 leading-16 text-xl">XX大学</div>
    </div>
    <div class="h-full bg-white">
      <el-menu default-active="2" class="el-menu-vertical-demo" router>
        <el-menu-item
          :index="item.path"
          v-for="item in authority2"
          :key="item.id"
        >
          <span>{{ item.name }}</span>
        </el-menu-item>

        <el-sub-menu index="1" v-for="item in authority" :key="item.id">
          <template #title>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="itm in item.children"
            :key="itm.id"
            :index="itm.path"
            >{{ itm.name }}</el-menu-item
          >
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useTestStore } from "@/store/index";

const router = useRouter();

type arr = {
  id: string;
  order: string; // 序号
  component: string;
  name: string;
  path: string;
  meta?: {
    icon: string;
    title: string;
  };
  redirect?: string;
  children?: Array<arr>;
};

const authority = ref<Array<arr>>([
  {
    id: "11",
    order: "11",
    component: "/layout",
    name: "研修管理",
    path: "/layout",
    meta: {
      icon: "",
      title: "研修管理",
    },
    children: [
      {
        id: "12",
        order: "12",
        component: "/teacher/studyAdmin/guide/index",
        name: "指南管理",
        path: "/studyAdmin/guide",
        meta: { icon: "", title: "指南管理" },
      },
    ],
  },
  // {
  //   id: "11",
  //   order: "11",
  //   component: "/layout",
  //   name: "研修指南",
  //   path: "/aaa",
  //   meta: {
  //     icon: "",
  //     title: "研修指南",
  //   },
  //   children: [
  //     {
  //       id: "12",
  //       order: "12",
  //       component: "/students/guide",
  //       name: "研修指南1",
  //       path: "/aaa/bbb",
  //       meta: { icon: "", title: "研修指南1" },
  //     },
  //     {
  //       id: "13",
  //       order: "13",
  //       component: "/students/guide",
  //       name: "研修指南2",
  //       path: "/aaa/ccc",
  //       meta: { icon: "", title: "研修指南2" },
  //     },
  //   ],
  // },
]);

const authority2 = ref<Array<arr>>([
  {
    id: "12",
    order: "12",
    component: "/teacher/largeScreen/index",
    name: "数据大屏",
    path: "/largeScreen",
    meta: { icon: "", title: "数据大屏" },
  },
]);

if (useTestStore().newRouter == "/index") {
  router.push("/layout");
}
</script>

<style scoped lang="less">
div {
  color: var(--theme-color);
  border-color: var(--theme-border-color);
  background-color: var(--theme-bg);
}
.bg-white {
  background-color: var(--theme-bg-white);
}
:deep(ul > li) {
  background-color: var(--theme-bg-white);
  color: var(--theme-text-aside);
}
:deep(ul > li:hover) {
  background-color: var(--theme-bg-aside-hover);
}
</style>
