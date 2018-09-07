import fly from './api'
// import qs from 'qs'

// 获取教练列表
export function getInstructorsList () {
  const url = '/instructors'
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}

// 根据id获取教练详情
export function getInstructorsDetail (instructorId) {
  const url = '/instructors/' + instructorId + '/instructor_details'
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}

// 获取人气教练
export function getPopularityInstructors () {
  const url = '/instructors/recommended'
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}
