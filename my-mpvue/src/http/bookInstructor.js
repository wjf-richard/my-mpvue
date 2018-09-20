import fly from './api'
// import qs from 'qs'

// 查询会员已购买教练课程次数
export function getInstructorsList (instructorId, id) {
  const url = '/instructors/' + instructorId + '/instructor_bookings/booked?memberId=' + id
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}
