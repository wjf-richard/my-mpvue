import fly from './api'
// import qs from 'qs'

// 获取课程列表
export function getCourseList () {
  const url = '/courses'
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}

// 根据id获取课程详情
export function getCourseDetail (courseId) {
  const url = '/courses/' + courseId + '/course_details'
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}

// 获取热门课程
export function getHotCourses () {
  const url = '/courses/recommended'
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}
