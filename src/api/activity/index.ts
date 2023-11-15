import request from '../../utils/request' // 引入封装得axios

// 我的课程活动查询
export function getActivityLists(data: Object) {
  return request({
    url: `/api/v1/course/course/findPage?${data}`,
    method: 'GET',
  })
}


// 课程详细信息 
export function getActivityList(data: String) {
  return request({
    url: `/api/v1/course/course/get?${data}`,
    method: 'GET',
  })
}

// 课程报名 
export function setActivity(data: Object) {
  return request({
    url: `/api/v1/course/enorll/insert`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
