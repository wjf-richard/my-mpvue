import fly from './api'
// import qs from 'qs'

// 获取支付接口
export function payMent (openId) {
  const url = '/wechat_pay/payment?openId=' + openId
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}
