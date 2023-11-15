import { defineStore } from 'pinia'

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

// import { Names } from "./namespace/index";


/**
 * 参数一：唯一名称
 */
// 简单写法： export const useTestStore = defineStore('Name',{})

export const useTestStore = defineStore('Name', {
  state: () => {
    return {
      collegeAllArr: [], // 所有学院
      rou: '',
      newRouter: '', // 最新的路由
      oldRouter: false,
      user: {
        no: String,
        realName: String,
        college: String
      },
      token: null,
      academicDegreeArr: [
        {
          value: "1",
          label: "专科",
        },
        {
          value: "2",
          label: "本科",
        },
        {
          value: "3",
          label: "研究生",
        },
        {
          value: "4",
          label: "博士生",
        },
      ],
      schoolAllArr: [
        {
          value: "1",
          label: "兴庆校区",
        },
        {
          value: "2",
          label: "雁塔校区",
        },
        {
          value: "3",
          label: "曲江校区",
        },
        {
          value: "4",
          label: "创新港校区",
        },
      ],
      curriculumAllArr: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "0",
          label: "审核中",
        },
        {
          value: "1",
          label: "已通过",
        },
        {
          value: "2",
          label: "未通过",
        },
      ],
      stateArr: [
        {
          color: "#0052D9",
          color2: "#DCDCDC",
          text: "全部",
          state: "",
        },
        {
          color: "#00A870",
          color2: "#DCDCDC",
          text: "已通过",
          state: "1",
        },
        {
          color: "#ED7B2F",
          color2: "#DCDCDC",
          text: "审核中",
          state: "0",
        },
        {
          color: "#EA0000",
          color2: "#DCDCDC",
          text: "未通过",
          state: "2",
        },
      ],

      stateArr2: [
        {
          color: "#0052D9",
          color2: "#DCDCDC",
          text: "全部",
          state: "",
        },
        {
          color: "#00A870",
          color2: "#DCDCDC",
          text: "已通过(未开始)",
          state: "1",
        },
        {
          color: "#00A870",
          color2: "#DCDCDC",
          text: "已通过(进行中)",
          state: "2",
        },
        {
          color: "#00A870",
          color2: "#DCDCDC",
          text: "已通过(已完成)",
          state: "3",
        },
        {
          color: "#ED7B2F",
          color2: "#DCDCDC",
          text: "审核中",
          state: "0",
        },
        {
          color: "#EA0000",
          color2: "#DCDCDC",
          text: "未通过",
          state: "4",
        },
      ],

      typeArr: [
        {
          color: "#0052D9",
          color2: "#DCDCDC",
          text: "全部",
          state: "",
        },
        {
          color: "#00A870",
          color2: "#DCDCDC",
          text: "体育",
          state: "1",
        },
        {
          color: "#ED7B2F",
          color2: "#DCDCDC",
          text: "美育",
          state: "2",
        },
        {
          color: "#EA0000",
          color2: "#DCDCDC",
          text: "劳育",
          state: "3",
        },
      ],

      myActiveState: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "1",
          label: "已结束",
        },
        {
          value: "2",
          label: "进行中",
        },
        {
          value: "3",
          label: "即将开课",
        },
        {
          value: "4",
          label: "已报名",
        },
      ],
      headerRoStyle: {
        background: "#00B578",
        color: "#fff",
      },
      roStyle: {
        height: "80px",
      }
    }
  },
  persist: {
    enabled: true, // 持久化
  },
  //类似于computed 可以帮我们去修饰我们的值
  getters: {

  },
  //可以操作异步 和 同步提交state
  actions: {

  }

})