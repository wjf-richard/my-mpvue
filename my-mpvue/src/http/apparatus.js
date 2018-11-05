import fly from './api'
// import qs from 'qs'

// 获取器械列表
export function getApparatusList () {
  const url = '/apparatus'
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}

// 根据id获取器械详情信息
export function getApparatusDetail (apparatusId) {
  const url = '/apparatus/' + apparatusId + '/details'
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}
