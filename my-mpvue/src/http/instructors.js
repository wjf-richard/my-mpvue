import fly from './api'
// import qs from 'qs'

// 获取教练列表
export function getInstructorsList () {
  const url = '/instructors'
  return fly.get(
    url,
    null,
    {method: 'get'}
  )
}

// 获取人气教练
export function getPopularityInstructors () {
  const url = '/instructors/recommended'
  return fly.get(
    url,
    null,
    {method: 'get'}
  )
}
