import fly from './api'
// import qs from 'qs'

// 获取推文列表
export function getArticleList () {
  const url = '/articles'
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}

// 根据推文id获取推文详细内容
export function getArticleDetail (articleId) {
  const url = '/articles/' + articleId + '/details'
  return fly.request(
    url,
    null,
    {method: 'get'}
  )
}
