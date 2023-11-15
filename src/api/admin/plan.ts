import request from '../../utils/request' // 引入封装得axios

// 查询学生的研修计划
export function getStudentPlan(data: string) {
  return request({
    url: `/api/v1/course/studyplanInfo/findPage?${data}`,
    method: 'GET',
  })
}

// 创建研修计划主信息
export function setStudentPlan(data: object) {
  return request({
    url: `/api/v1/course/studyplanInfo/insert`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 通过研修主计划查询学生的学期研修计划 
export function getStudentSemesterPlan(data: object) {
  return request({
    url: `/api/v1/course/studyplanInfo/selectAllYears`,
    method: 'POST',
    data,
  })
}

// 修改和创建时查看研修计划 
export function updateAndSetDetailedList(data: object) {
  return request({
    url: `/api/vi/course/studyplanItem/selectItemByTerm`,
    method: 'POST',
    data
  })
}

// 提交清单
export function setStudentPlan2(data: object) {
  return request({
    url: `/api/v1/course/studyplanItem/submit`,
    method: 'POST',
    data
  })
}

// 提交清单
export function teacher_getPlanAll(data: string) {
  return request({
    url: `/api/v1/course/studyplanInfo/findPlanInfo?${data}`,
    method: 'GET'
  })
}

// 