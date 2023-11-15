<!-- name -->
<template>
  <div class="h-full w-full flex justify-between">
    <!-- <div class="h-16 inline-block flex items-center">体美劳育人管理平台</div> -->
    <div class="pl-8 flex items-center" style="overflow: hidden">
      体美劳育人管理平台
    </div>
    <div class="flex-1 ml-16" style="overflow: hidden">
      <el-menu
        class="h-full w-full el-menu-vertical-demo flex items-center"
        mode="horizontal"
        @select="handleSelect"
        :default-active="defaultActive"
        router
        style="margin: 0 auto; position: relative; overflow: hidden"
      >
        <!-- <div class="items-center flex-1 ml-60" style="overflow: hidden"> -->
        <el-menu-item
          :index="item.path"
          v-for="item in authority"
          :key="item.id"
        >
          {{ item.name }}
        </el-menu-item>
        <!-- </div> -->

        <!-- <div class="flex items-center flex-1 ml-60">
        <el-menu-item
          :index="item.path"
          v-for="item in authorityStudents"
          :key="item.id"
        >
          {{ item.name }}
        </el-menu-item>
      </div> -->
        <!-- <input type="button" value="换肤" @click="update(pf2)" /> -->
      </el-menu>
    </div>
    <div class="flex items-center pr-16" style="overflow: hidden">
      <input class="pr-8" type="button" value="退出登录" @click="logOut" />
      <el-icon><User /></el-icon>
    </div>
    <!-- text-white items-center -->
    <!-- <div class="leading-16 truncate inline-block">体美劳育人管理平台</div>
    <div class="inline-block">
      <input type="button" value="换肤" @click="update(pf2)" />

      <input type="button" value="退出登录" @click="logOut" />
    </div>

    <el-menu class="el-menu-vertical-demo" mode="horizontal" router>
      <el-menu-item
        :index="item.path"
        v-for="item in authority2"
        :key="item.id"
      >
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import { logout } from "@/api/login";
import { useTestStore } from "@/store/index";
import { useRouter } from "vue-router";

const defaultActive = ref<string>("");

if (useTestStore().newRouter && useTestStore().newRouter != "") {
  defaultActive.value = useTestStore().newRouter;
}

const router = useRouter();

const pf = reactive<Record<string, string>>({
  "theme-bg": "#246cff",
  "theme-bg-white": "#246cff",
  "theme-bg-aside": "",
  "theme-bg-aside-hover": "#246cff",
  "theme-text-aside": "#000",
  "theme-color": "#fff",
  "theme-boder-color": "#d6d6d6",
});

const pf2 = reactive<Record<string, string>>({
  "theme-bg": "pink",
  "theme-bg-white": "pink",
  "theme-bg-aside": "",
  "theme-text-aside": "#000",
  "theme-bg-aside-hover": "#ecf5ff",
  "theme-color": "#fff",
  "theme-boder-color": "#d6d6d6",
});

const update = (color: Record<string, string>) => {
  localStorage.setItem("pf", JSON.stringify(color));
  Object.keys(color).forEach((item: string) => {
    document.documentElement.style.setProperty(`--${item}`, color[item]);
  });
};

update(pf);

// 退出登录
const logOut = () => {
  logout().then((res) => {
    useTestStore().rou = "";
    useTestStore().oldRouter = false;
    // 由于缓存问题，添加强制刷新功能
    setTimeout(() => {
      window.location.reload();
    }, 0);
    // end
    router.push("/");
  });
};
// end

const handleSelect = (index: any, indexPath: any, item: any) => {
  console.log(index);
  console.log(indexPath);
  console.log(item);
};

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
    id: "1",
    order: "1",
    component: "/teacher/index/index",
    name: "首页",
    path: "/index",
    meta: { icon: "", title: "首页" },
  },
  {
    id: "2",
    order: "2",
    component: "/teacher/admin/guide",
    name: "研修指南管理",
    path: "/guide",
    meta: { icon: "", title: "研修指南管理" },
  },
  {
    id: "3",
    order: "3",
    component: "/teacher/admin/detailedList",
    name: "研修清单管理",
    path: "/detailedList",
    meta: { icon: "", title: "研修清单管理" },
  },
  {
    id: "4",
    order: "4",
    component: "/teacher/admin/plan",
    name: "研修计划管理",
    path: "/plan",
    meta: { icon: "", title: "研修计划管理" },
  },
  {
    id: "6",
    order: "6",
    component: "/teacher/admin/exemption",
    name: "免修申请管理",
    path: "/exemption",
    meta: { icon: "", title: "免修申请管理" },
  },
  {
    id: "5",
    order: "5",
    component: "/teacher/activity/plan",
    name: "我的活动管理",
    path: "/myActivity",
    meta: { icon: "", title: "我的活动管理" },
  },
  {
    id: "7",
    order: "7",
    component: "/public/activityHall/index",
    name: "活动大厅",
    path: "/hddt",
    meta: { icon: "", title: "活动大厅" },
  },
  {
    id: "8",
    order: "8",
    component: "/teacher/activity/management",
    name: "活动审核",
    path: "/hdsh",
    meta: { icon: "", title: "活动审核" },
  },
  {
    id: "9",
    order: "9",
    component: "/teacher/admin/information",
    name: "消息公告管理",
    path: "/xxgggl",
    meta: { icon: "", title: "消息公告管理" },
  },
]);

const authorityStudents = ref<Array<arr>>([
  // {
  //   id: "1",
  //   order: "1",
  //   component: "/teacher/index/index",
  //   name: "首页",
  //   path: "/index",
  //   meta: { icon: "", title: "首页" },
  // },
  {
    id: "2",
    order: "2",
    component: "/students/guide",
    name: "研修指南",
    path: "/guide",
    meta: { icon: "", title: "研修指南" },
  },
  {
    id: "3",
    order: "3",
    component: "/students/detailedList",
    name: "研修清单",
    path: "/detailedList",
    meta: { icon: "", title: "研修清单" },
  },
  {
    id: "4",
    order: "4",
    component: "/students/plan",
    name: "研修计划",
    path: "/plan",
    meta: { icon: "", title: "研修计划" },
  },
  {
    id: "7",
    order: "7",
    component: "/public/activityHall/index",
    name: "活动大厅",
    path: "/hddt",
    meta: { icon: "", title: "活动大厅" },
  },
  {
    id: "8",
    order: "8",
    component: "/students/myActivity",
    name: "活动管理",
    path: "/hdgl",
    meta: { icon: "", title: "活动管理" },
  },
  {
    id: "9",
    order: "9",
    component: "/user/students",
    name: "个人中心",
    path: "/grzx",
    meta: { icon: "", title: "个人中心" },
  },
]);

// if (useTestStore().newRouter == "/index") {
//   router.push("/layout");
// }
</script>

<style scoped lang="less">
* {
  color: var(--theme-color) !important;
  border-color: var(--theme-border-color) !important;
  background-color: #0256ff !important;
}

// 消除边框
:deep(.el-menu) {
  border: 0;
}
:deep(.el-menu--horizontal > .el-menu-item) {
  border: 0;
}
// end

// 移入、焦点、选中样式
:deep(.el-menu-item):hover {
  background-color: #3674f0 !important;
  color: #fff !important;
}

:deep(.el-menu-item):focus {
  // background-color: var(--theme-bg-aside-hover) !important;
  background-color: #3674f0 !important;
  color: #fff !important;
}
:deep(.el-menu-item.is-active) {
  background-color: #3674f0 !important;
  color: #fff !important;
}
// end

:deep(.el-menu-item) {
  margin-right: 4px;
  padding: 9px 24px;
  height: calc(1rem + 18px);
  border-radius: 3px;
  background-color: #fff !important;
  color: black !important;
}

:deep(.el-sub-menu) {
  margin-right: 4px;
  padding: 9px 24px;
  height: calc(1rem + 18px);
  border-radius: 3px;
  background-color: #fff !important;
  color: black !important;
  text-align: center;
}
</style>
