import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [{
  path: '/',
  component: () => import('@/views/index.vue'),
},
{
  path: '/login',
  component: () => import('@/views/login.vue'),
},
{
  path: '/layout',
  component: () => import('@/views/layout.vue'),
},
{
  path: '/404',
  name: 'PageNotExist',
  component: () => import('@/views/not404.vue')
}, {
  path: "/:catchAll(.*)", // 不识别的path自动匹配首页
  redirect: '/',
},]

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes
})

export default router