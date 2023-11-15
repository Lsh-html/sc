import { createApp } from 'vue'
import './index.css'
import './assets/style/public.css'
import './assets/iconfont/iconfont.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import { setRouter } from "@/utils/setRouter";

import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css

import { useTestStore } from "@/store/index";
// import { ElMessage } from "element-plus";

import ElementPlus from 'element-plus';
import locale from "element-plus/lib/locale/lang/zh-cn";   // 默认使用中文

import 'default-passive-events'

import mitt from 'mitt'
const Mit = mitt()

//TypeScript注册
// 由于必须要拓展ComponentCustomProperties类型才能获得类型提示
declare module "vue" {
  export interface ComponentCustomProperties {
    $Bus: typeof Mit
  }
}



const store = createPinia()
store.use(piniaPersist)

const app = createApp(App)

app.use(store)
app.use(router)
app.use(vue3videoPlay)
app.use(ElementPlus, { locale });//需要改变的地方，加入locale



router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);

  let routerlength = router.getRoutes().length
  if (routerlength > 5) {
    useTestStore().newRouter = to.path
  }
  setRouter()
  // console.log(router.getRoutes());





  // setTimeout(() => {
  //   if (to.path == '/404') {
  //     next('/index')
  //   } else {
  //     next()
  //   }
  // }, 100)
  console.log(useTestStore().newRouter);
  if (routerlength > 5 || useTestStore().newRouter == '') {
    next()
  } else if (!useTestStore().oldRouter) {
    next()
  } else {
    next(useTestStore().newRouter)
  }
})


//Vue3挂载全局API
app.config.globalProperties.$Bus = Mit

app.mount('#app')
