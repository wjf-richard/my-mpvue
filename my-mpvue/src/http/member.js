import fly from './api'
// import qs from 'qs'

// 新增会员
export function addNewMember (data) {
  const url = '/members'
  return fly.request(
    url,
    data,
    {method: 'post'}
  )
}

// 获取openid会员
export function getMemberOpenId (openId) {
  const url = '/members/open_id?openId=' + openId
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}

// 根据id获取会员
export function getMemberId (id) {
  const url = '/members/' + id
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}

// 根据id更新会员信息
export function updataMemberId (id, data) {
  const url = '/members/' + id
  return fly.request(
    url,
    data,
    {method: 'put'}
  )
}

// 查询会员是否缴费
export function checkMemberIsPay (openId) {
  const url = '/members/is_member?openId=' + openId
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}

// 根据会员ID获取消息
export function getMessage (memberId) {
  const url = '/messages/member?memberId=' + memberId
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}
