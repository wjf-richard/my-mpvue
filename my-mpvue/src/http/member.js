import fly from './api'
// import qs from 'qs'

// 获取openid会员
export function getMemberOpenId (openId) {
  const url = '/members/open_id?openId=' + openId
  return fly.get(
    url,
    null,
    {method: 'get'}
  )
}

// 新增会员
export function getCourseList (data) {
  const url = '/members'
  return fly.post(
    url,
    data,
    {method: 'post'}
  )
}
