import request from '../../utils/request' // 引入封装得axios

// 作业新增
export function setOperation(data: Object) {
  return request({
    url: `/api/v1/course/homework/insert`,
    method: 'POST',
    data
  })
}

// 作业分页查询
export function getOperation(data: String) {
  return request({
    url: `/api/v1/course/homework/findPage?${data}`,
    method: 'get',
  })
}

// 作业删除
export function delOperation(data: Object) {
  return request({
    url: `/api/v1/course/homework/delAll`,
    method: 'POST',
    data
  })
}

// 作业修改
export function updateOperation(data: Object) {
  return request({
    url: `/api/v1/course/homework/update`,
    method: 'POST',
    data
  })
}