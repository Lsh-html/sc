import request from '../../utils/request' // 引入封装得axios

// 研修指南新增
export function addGuide(data: object) {
  return request({
    url: '/api/v1/course/studyguide/insert',
    method: 'POST',
    data
  })
}

// 研修指南查看
export function getGuide(data: string) {
  return request({
    url: `/api/v1/course/studyguide/findPage?${data}`,
    method: 'GET',
  })
}
// 学生研修指南查看
export function getStudentGuide(data: string) {
  return request({
    url: `/api/v1/course/studyguide/selectGuideByUser?${data}`,
    method: 'GET',
  })
}

// 研修指南学期查看
export function getSemester(data: string) {
  return request({
    url: `/api/v1/course/trainingTerm/findPage?${data}`,
    method: 'GET',
  })
}
// end

// 研修指南学期修改
export function updateSemester(data: object) {
  return request({
    url: `/api/v1/course/trainingTerm/update`,
    method: 'POST',
    data,
  })
}
// end
// 研修指南学期修改
export function setSemester(data: any) {
  return request({
    url: `/api/v1/course/trainingTerm/insert`,
    method: 'POST',
    data,
  })
}
// end

// 研修指南学期删除
export function deleteSemester(data: object) {
  return request({
    url: `/api/v1/course/trainingTerm/delAll`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
// end



// 研修指南查看详情
export function getGuideList(data: string) {
  return request({
    url: `/api/v1/course/studyguide/get?${data}`,
    method: 'GET',
  })
}

// 研修指南删除
export function deleteGuide(data: object) {
  return request({
    url: '/api/v1/course/studyguide/delAll',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 研修指南修改 
export function updateGuide(data: object) {
  return request({
    url: '/api/v1/course/studyguide/update',
    method: 'POST',
    data
  })
}

// 研修指南所有学年
export function getGuideAllYears(data: object) {
  return request({
    url: `/api/v1/course/studyguide/selectAllYears`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}