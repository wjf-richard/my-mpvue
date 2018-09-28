import fly from './api'
// import qs from 'qs'

// 获取支付接口
export function payMent (openId, fee, year) {
  const url = '/wechat_pay/payment?openId=' + openId + '&fee=' + fee + '&year=' + year
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}

// 购买教练课程节数
export function payInstructorCourse (openId, number, fee, instructorId) {
  const url = '/wechat_pay/instructor_course?openId=' + openId + '&number=' + number + '&fee=' + fee + '&instructorId=' + instructorId
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}
