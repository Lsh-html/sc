import request from '../utils/request' // 引入封装得axios

// 获取新闻列表   http://47.97.34.76/szjy-boot
export function getArticleList(data: object) {
  return request({
    url: '/system/login',
    method: 'POST',
    data
  })
}

export function logout(data?: object) {
  return request({
    url: '/system/logout',
    method: 'POST',
    data
  })
}