import request from '../../utils/request' // 引入封装得axios

// 节次新增
export function setSection(data: Object) {
  return request({
    url: `/api/v1/course/sections/insert`,
    method: 'POST',
    data
  })
}

// 节次查询
export function getSection(data: String) {
  return request({
    url: `/api/v1/course/sections/findPage?${data}`,
    method: 'GET',
  })
}

// 节次修改
export function updateSection(data: Object) {
  return request({
    url: `/api/v1/course/sections/update`,
    method: 'POST',
    data
  })
}
export function delSection(data: Object) {
  return request({
    url: `/api/v1/course/sections/deleteByTeacher`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })

}