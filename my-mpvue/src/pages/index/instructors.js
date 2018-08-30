import fly from './api'
// import qs from 'qs'

// 获取人气教练
export function getPopularityInstructorList () {
  const url = '/instructors/recommended'
  return fly.get(
    url,
    null,
    {method: 'get'}
  )
}
