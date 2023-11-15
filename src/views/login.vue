<!-- name -->
<template>
  <div class="h-full w-full" style="min-width: 800px">
    <div class="h-full w-full flex justify-center items-center">
      <div
        class="rounded-sm border border-solid flex"
        style="width: 1178px; height: 650px"
      >
        <!-- 左侧 - 图片 -->
        <div class="flex-1 bg">
          <div class="h-full flex flex-col justify-between align-center school">
            <div class="flex justify-center">
              <img class="pt-8" src="@/assets/images/logo.png" alt="" />
            </div>
            <div class="pb-6 text-white text-center">
              <div class="font-black leading-6">体美劳育人管理平台</div>
              <div class="pt-1 text leading-4">Teaching integration</div>
            </div>
          </div>
        </div>
        <!-- end -->

        <!-- 右侧 - 登录 -->
        <div
          class="flex flex-col justify-center items-center"
          style="width: 800px; position: relative"
        >
          <el-button
            v-if="loginMethod == 1"
            class="but"
            type="primary"
            size="large"
            @click="loginMethod = 2"
            plain
            >统一身份登录</el-button
          >
          <el-button
            v-if="loginMethod == 2"
            class="but"
            type="primary"
            size="large"
            @click="loginMethod = 1"
            plain
            >账号登录</el-button
          >

          <!-- 账号密码 -->
          <div style="width: 390px" v-if="loginMethod == 1">
            <el-form
              ref="ruleFormRef"
              :model="formInline"
              class="demo-form-inline"
              :rules="rules"
            >
              <el-form-item prop="username">
                <div class="font-black" style="font-size: 20px">用户名</div>
                <el-input
                  v-model="formInline.username"
                  placeholder="请输入账号"
                />
              </el-form-item>

              <el-form-item prop="password">
                <div class="font-black" style="font-size: 20px">密码</div>
                <el-input
                  v-model="formInline.password"
                  :type="passwordState ? 'text' : 'password'"
                  placeholder="请输入密码"
                >
                  <template #suffix>
                    <el-icon @click="passwordLook">
                      <View v-if="passwordState" />
                      <Hide v-else />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="w-full but-log"
                  type="primary"
                  @click="onSubmit(ruleFormRef)"
                  >登录</el-button
                >
                <div class="w-full flex justify-between">
                  <el-checkbox
                    v-model="checked"
                    label="记住密码"
                    size="large"
                  />
                  <el-button type="primary" link>忘记密码?</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <!-- end -->

          <!-- 统一身份认证 -->
          <div style="width: 390px" v-if="loginMethod == 2">
            <div
              class="text-center font-black pb-16"
              style="font-size: 20px; line-height: 28px"
            >
              统一身份认证登录
            </div>
            <el-button class="w-full but-log" type="primary"
              >点击进入</el-button
            >
          </div>
          <!-- end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useTestStore } from "@/store/index";
import { setRouter } from "@/utils/setRouter";
import { getArticleList } from "@/api/login";
import { getUser } from "@/api/user";
import type { FormInstance, FormRules } from "element-plus";
import { View, Hide } from "@element-plus/icons-vue";

import { getCollege } from "@/api/currency";

useTestStore().$reset(); // 重置pinia

const router = useRouter();

// 记住密码
const checked = ref<boolean>(
  localStorage.getItem("checked")
    ? JSON.parse(localStorage.getItem("checked") as string)
    : false
);
// end

// 密码可视
const passwordState = ref<boolean>(false);
const passwordLook = () => {
  passwordState.value = !passwordState.value;
};
// end

// 登陆方式   1：账号密码   2：统一身份认证
const loginMethod = ref<number>(1);
// end

// 账号密码
const formInline = reactive({
  username: localStorage.getItem("username")
    ? localStorage.getItem("username")
    : "",
  password: localStorage.getItem("password")
    ? localStorage.getItem("password")
    : "",
  uuid: "9f111c11-a5db-4101-aa1a-639f90cd25a7",
});
// end

// 表单信息存储
const ruleFormRef = ref<FormInstance>();
// end

// 验证规则
const rules = reactive<FormRules>({
  username: [
    { required: true, message: "请填写账号", trigger: "blur" },
    {
      min: 4,
      max: 12,
      message: "账号长度为4~12位",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请填写密码", trigger: "blur" },
    {
      min: 6,
      max: 12,
      message: "密码长度为6~12位",
      trigger: "blur",
    },
  ],
});
// end

// 验证 => 登录
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // console.log("符合");
      login();
    } else {
      // console.log("不符合", fields);
    }
  });
};
// end

// 登录
const login = () => {
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

  const authorityStudents = reactive<Array<arr>>([
    // {
    //   id: "1",
    //   order: "1",
    //   component: "/layout",
    //   name: "首页",
    //   path: "/layout",
    //   redirect: "/index",
    //   meta: {
    //     icon: "",
    //     title: "首页",
    //   },
    //   children: [
    //     {
    //       id: "1-1",
    //       order: "1-1",
    //       component: "/teacher/index/index",
    //       name: "首页",
    //       path: "/index",
    //       meta: { icon: "", title: "首页" },
    //     },
    //   ],
    // },
    {
      id: "2",
      order: "2",
      component: "/layout",
      name: "研修指南",
      path: "/layout",
      redirect: "/guide",
      meta: {
        icon: "",
        title: "研修指南",
      },
      children: [
        {
          id: "2-1",
          order: "2-1",
          component: "/students/guide",
          name: "研修指南",
          path: "/guide",
          meta: { icon: "", title: "研修指南" },
        },
      ],
    },
    {
      id: "3",
      order: "3",
      component: "/layout",
      name: "研修清单",
      path: "/layout",
      redirect: "/detailedList",
      meta: {
        icon: "",
        title: "研修清单",
      },
      children: [
        {
          id: "3-1",
          order: "3-1",
          component: "/students/detailedList",
          name: "研修清单",
          path: "/detailedList",
          meta: { icon: "", title: "研修清单" },
        },
      ],
    },
    {
      id: "4",
      order: "4",
      component: "/layout",
      name: "研修计划",
      path: "/layout",
      redirect: "/plan",
      meta: {
        icon: "",
        title: "研修计划",
      },
      children: [
        {
          id: "4-1",
          order: "4-1",
          component: "/students/plan",
          name: "研修计划",
          path: "/plan",
          meta: { icon: "", title: "研修计划" },
        },
      ],
    },
    {
      id: "5",
      order: "5",
      component: "/layout",
      name: "免修申请",
      path: "/layout",
      redirect: "/exemption",
      meta: {
        icon: "",
        title: "免修申请",
      },
      children: [
        {
          id: "5-1",
          order: "5-1",
          component: "/students/exemption",
          name: "免修申请",
          path: "/exemption",
          meta: { icon: "", title: "免修申请" },
        },
      ],
    },

    {
      id: "7",
      order: "7",
      component: "/layout",
      name: "活动大厅",
      path: "/layout",
      redirect: "/hddt",
      meta: {
        icon: "",
        title: "活动大厅",
      },
      children: [
        {
          id: "7-1",
          order: "7-1",
          component: "/public/activityHall/index",
          name: "活动大厅",
          path: "/hddt",
          meta: { icon: "", title: "活动大厅" },
        },
      ],
    },
    {
      id: "8",
      order: "8",
      component: "/layout",
      name: "活动管理",
      path: "/layout",
      redirect: "/hdgl",
      meta: {
        icon: "",
        title: "活动管理",
      },
      children: [
        {
          id: "8-1",
          order: "8-1",
          component: "/students/myActivity",
          name: "活动管理",
          path: "/hdgl",
          meta: { icon: "", title: "活动管理" },
        },
      ],
    },

    {
      id: "9",
      order: "9",
      component: "/layout",
      name: "个人中心",
      path: "/layout",
      redirect: "/grzx",
      meta: {
        icon: "",
        title: "个人中心",
      },
      children: [
        {
          id: "9-1",
          order: "9-1",
          component: "/user/students",
          name: "个人中心",
          path: "/grzx",
          meta: { icon: "", title: "个人中心" },
        },
      ],
    },
  ]);

  const authority = reactive<Array<arr>>([
    {
      id: "1",
      order: "1",
      component: "/layout",
      name: "首页",
      path: "/layout",
      redirect: "/index",
      meta: {
        icon: "",
        title: "首页",
      },
      children: [
        {
          id: "1-1",
          order: "1-1",
          component: "/teacher/index/index",
          name: "首页",
          path: "/index",
          meta: { icon: "", title: "首页" },
        },
      ],
    },
    {
      id: "2",
      order: "2",
      component: "/layout",
      name: "研修指南管理",
      path: "/layout",
      redirect: "/guide",
      meta: {
        icon: "",
        title: "研修指南管理",
      },
      children: [
        {
          id: "2-1",
          order: "2-1",
          component: "/teacher/admin/guide",
          name: "研修指南管理",
          path: "/guide",
          meta: { icon: "", title: "研修指南管理" },
        },
      ],
    },
    {
      id: "3",
      order: "3",
      component: "/layout",
      name: "研修清单管理",
      path: "/layout",
      redirect: "/detailedList",
      meta: {
        icon: "",
        title: "研修指南管理",
      },
      children: [
        {
          id: "3-1",
          order: "3-1",
          component: "/teacher/admin/detailedList",
          name: "研修清单管理",
          path: "/detailedList",
          meta: { icon: "", title: "研修清单管理" },
        },
      ],
    },
    {
      id: "4",
      order: "4",
      component: "/layout",
      name: "研修计划管理",
      path: "/layout",
      redirect: "/plan",
      meta: {
        icon: "",
        title: "研修计划管理",
      },
      children: [
        {
          id: "4-1",
          order: "4-1",
          component: "/teacher/admin/plan",
          name: "研修计划管理",
          path: "/plan",
          meta: { icon: "", title: "研修计划管理" },
        },
      ],
    },
    {
      id: "6",
      order: "6",
      component: "/layout",
      name: "免修申请管理",
      path: "/layout",
      redirect: "/exemption",
      meta: {
        icon: "",
        title: "免修申请管理",
      },
      children: [
        {
          id: "4-1",
          order: "4-1",
          component: "/teacher/admin/exemption",
          name: "免修申请管理",
          path: "/exemption",
          meta: { icon: "", title: "免修申请管理" },
        },
      ],
    },
    {
      id: "5",
      order: "5",
      component: "/layout",
      name: "我的活动管理",
      path: "/layout",
      redirect: "/myActivity",
      meta: {
        icon: "",
        title: "我的活动管理",
      },
      children: [
        {
          id: "5-1",
          order: "5-1",
          component: "/teacher/activity/index",
          name: "我的活动管理",
          path: "/myActivity",
          meta: { icon: "", title: "我的活动管理" },
        },
      ],
    },

    {
      id: "7",
      order: "7",
      component: "/layout",
      name: "活动大厅",
      path: "/layout",
      redirect: "/hddt",
      meta: {
        icon: "",
        title: "活动大厅",
      },
      children: [
        {
          id: "7-1",
          order: "7-1",
          component: "/public/activityHall/index",
          name: "活动大厅",
          path: "/hddt",
          meta: { icon: "", title: "活动大厅" },
        },
      ],
    },

    {
      id: "8",
      order: "8",
      component: "/layout",
      name: "活动审核",
      path: "/layout",
      redirect: "/hdsh",
      meta: {
        icon: "",
        title: "活动审核",
      },
      children: [
        {
          id: "8-1",
          order: "8-1",
          component: "/teacher/activity/management",
          name: "活动审核",
          path: "/hdsh",
          meta: { icon: "", title: "活动审核" },
        },
      ],
    },

    {
      id: "9",
      order: "9",
      component: "/layout",
      name: "消息公告管理",
      path: "/layout",
      redirect: "/xxgggl",
      meta: {
        icon: "",
        title: "消息公告管理",
      },
      children: [
        {
          id: "9-1",
          order: "9-1",
          component: "/teacher/admin/information",
          name: "消息公告管理",
          path: "/xxgggl",
          meta: { icon: "", title: "消息公告管理" },
        },
      ],
    },
  ]);

  useTestStore().rou = JSON.stringify(authority);
  // useTestStore().rou = JSON.stringify(authorityStudents);

  setRouter();

  // router.push("/guide"); // 无网络使用

  getArticleList({
    gsessionId: null,
    reqData: formInline,
  }).then((res) => {
    console.log(res);
    if (res.code == 200) {
      localStorage.setItem("token", res.data.token);
      useTestStore().token = res.data.token;
      localStorage.setItem("username", formInline.username as string);
      localStorage.setItem("checked", JSON.stringify(checked.value)); // 是否保存密码
      if (checked) {
        localStorage.setItem("password", formInline.password as string);
      } else {
        localStorage.setItem("password", "");
      }
      useTestStore().oldRouter = true;
      get_user();
    }
  });
};
// end

// 获取登录个人信息
const get_user = () => {
  // 添加定时器原因：跳转跑的比添加路由快
  setTimeout(() => {
    getUser().then((res) => {
      useTestStore().user = res.data;
      get_college();
      setTimeout(() => {
        window.location.reload(); // 强制刷新，解决过期token存在问题
        router.push("/guide");
      }, 100);
    });
  }, 100);
};
// end

const get_college = () => {
  getCollege("").then((res) => {
    let lists = ref<any>([]);
    res.data.forEach((item: string) => {
      lists.value.push({
        value: item,
        label: item,
      });
    });
    (useTestStore().collegeAllArr as any) = lists;
  });
};

// get_college;
</script>

<style scoped lang="less">
.bg {
  background-image: url("@/assets/images/school.png");
}
.school {
  background-color: rgba(2, 86, 255, 0.7);
}

.text {
  font-size: 12px;
  /* 利用放大缩小属性 */
  transform: scals(0.83);
  -webkit-transform: scals(0.83);
}

.but {
  width: 180px;
  height: 40px;
  line-height: 24px;
  border: 0;
  position: absolute;
  top: 26px;
  right: 18px;
  background-color: #e0eaff;
  color: #0256ff;
}
.but:hover {
  background-color: #409eff;
  color: #fff;
}

.but-log {
  height: 40px;
  margin-top: 18px;
  background-color: #0256ff;
}
.but-log:hover {
  background-color: #79bbff;
}
</style>
