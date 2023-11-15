import request from '../../utils/request' // 引入封装得axios

// 我的课程活动查询
export function getAssistantLists(data: String) {
  return request({
    url: `/api/v1/system/user/getTutor?${data}`,
    method: 'GET',
  })
}