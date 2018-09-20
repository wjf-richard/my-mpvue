import fly from './api'
// import qs from 'qs'

// 会员签到
export function memberSignIn (openId) {
  const url = '/members/sign_up?openId=' + openId
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}

// 签到记录
export function signInRecords (id, date) {
  const url = '/members/' + id + '/credit_records/sign_in?date=' + date
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}
