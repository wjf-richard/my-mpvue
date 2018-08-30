import fly from './api'
// import qs from 'qs'

// 获取课程列表
export function getOpenId () {
  getWxLoginResult ()
  const url = '/wechat_login/get_session_info?code=' + code
  return fly.get(
    url,
    null,
    {method: 'get'}
  )
}

function getWxLoginResult () {
  console.log('getWxLoginResult..')
  let codeId = ''
  wx.login({
    success (loginResult) {
      console.log('wx.login code..' + loginResult.code)
      codeId = loginResult.code
      return codeId
    },
    fail (loginError) {
      console.log(loginError)
    }
  })

}
