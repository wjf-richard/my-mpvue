import fly from './api'
// import qs from 'qs'

// 获取健身房设置内容
export function getOnly () {
  const url = '/settings/get_only'
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}
