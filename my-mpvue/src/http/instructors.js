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

// 根据id获取教练课程节数价格
export function getInstructorSectionCost (instructorId) {
  const url = '/instructors/' + instructorId + '/section_discount'
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}

// 查询会员已购买教练课程次数
export function getReastTimes (instructorId, id) {
  const url = '/instructors/' + instructorId + '/instructor_bookings/booked?memberId=' + id
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}

// 根据日期查询教练可预约时间
export function getBookableDate (instructorId, date) {
  const url = '/instructors/' + instructorId + '/instructor_bookings/bookable?date=' + date
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}

// 新增教练预约
export function addInstrtuctorBook (instructorId, id, startDate) {
  const url = '/instructors/' + instructorId + '/instructor_bookings?memberId=' + id + '&startTime=' + startDate
  return fly.request(
    url,
    null,
    {method: 'post'}
  )
}
