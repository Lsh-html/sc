import request from '../utils/request' // 引入封装得axios

// 学院获取
export function getCollege(data: string) {
  return request({
    url: `/api/v1/system/org/selectCollege?${data}`,
    method: 'GET',
  })
}

// 审核
export function toExamine(data: object) {
  return request({
    url: `/api/v1/course/approval/insert`,
    method: 'POST',
    data
  })
}

// 批量审核  
export function toExamineAll(data: object) {
  return request({
    url: `/api/v1/course/approval/insertBatch`,
    method: 'POST',
    data
  })
}

