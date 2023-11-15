import request from '../../utils/request' // 引入封装得axios

// 免修申请查询
export function getExemption(data: string) {
  return request({
    url: `/api/v1/course/exemption/findExemption?${data}`,
    method: 'GET',
  })
}

// 免修申请提交 
export function setExemption(data: any) {
  return request({
    url: `/api/v1/course/exemption/insert`,
    method: 'POST',
    data
  })
}

// 所有计划和免修查询
export function getStudentsExemption(data: any) {
  return request({
    url: `/api/v1/course/studyplanInfo/findPlanAndExemption`,
    method: 'POST',
    data
  })
}

// 分页查询免修申请 
export function getAllLiatExemption(data: string) {
  return request({
    url: `/api/v1/course/exemption/findPage?${data}`,
    method: 'GET',
  })
}