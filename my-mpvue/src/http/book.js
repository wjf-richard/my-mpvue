import fly from './api'
// import qs from 'qs'

// 查询会员预约列表
export function getMemberBook (memberId) {
  const url = '/members/' + memberId + '/instructor_bookings'
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}
// 预约取消或完成操作
export function isOperate (memberId, instructorBookingId, type) {
  const url = '/members/' + memberId + '/instructor_bookings/' + instructorBookingId + '/operate?type=' + type
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}
