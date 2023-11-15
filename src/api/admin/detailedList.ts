import request from '../../utils/request' // 引入封装得axios

// 研修清单查询
export function getDetailedList(data: string) {
  return request({
    url: `/api/v1/course/trainingitem/findPage?${data}`,
    method: 'GET',
  })
}

// 研修清单单条查询
export function getDetailedListDetails(data: string) {
  return request({
    url: `/api/v1/course/trainingitem/get?${data}`,
    method: 'GET',
  })
}

// 研修清单单条删除
export function deleteDetailedListDetails(data: object) {
  return request({
    url: `/api/v1/course/trainingitem/delAll`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 研修清单单条删除
export function setDetailedListDetails(data: object) {
  return request({
    url: `/api/v1/course/trainingitem/insert`,
    method: 'POST',
    data,
  })
}

// 
// 研修清单单条修改
export function updateDetailedListDetails(data: object) {
  return request({
    url: `/api/v1/course/trainingitem/update`,
    method: 'POST',
    data,
  })
}
// /api/v1/course/trainingitem//importExcel

// 研修清单导入
export function updateDetailedList(data: object) {
  return request({
    url: `/api/v1/course/trainingitem/importExcel`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 老师创建课程页面
export function teacherAddClass(data: object) {
  return request({
    url: `/api/v1/course/trainingitem/selectCreateCourse`,
    method: 'POST',
    data,
  })
}


// 课程新增
export function setInsert(data: object) {
  return request({
    url: `/api/v1/course/course/insert`,
    method: 'POST',
    data,
  })
}


// 提交课程   --- 课程/活动详情
export function setInsertContent(data: object) {
  return request({
    url: `/api/v1/course/course/submit`,
    method: 'POST',
    data,
  })
}
