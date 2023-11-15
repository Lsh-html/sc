import request from '../utils/request' // 引入封装得axios
import { useTestStore } from "@/store/index";

// 获取新闻列表   http://47.97.34.76/szjy-boot
export function getUser() {
  return request({
    url: '/api/v1/system/user/getInfo',
    method: 'GET',
    headers: {
      "Token": useTestStore().token
    },
  })
}