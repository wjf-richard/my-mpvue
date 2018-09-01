<template>
  <div class="container ">
    <div class="notLogin" v-if="isNotLogin">
      <h1>您好，请先登录</h1>
      <div class="bg-btn">
        <div class="login-btn" @click="toMemberMsg()">
          成为会员
        </div>
      </div>
    </div>
    <div class="logined" v-if="isLogin">
      <h1>Hi，{{member.name}}</h1>
      <div class="bg-btn">
        <div class="vip-num">
          3939392
        </div>
      </div>
    </div>
    <div class="vip-detail-list"  v-if="isLogin">
      <div class="detail-item">
        <div class="type">
          <span class="icon">
            <img src="http://pdwhalwaj.bkt.clouddn.com/vip_integral.png" alt="">
          </span>
          <span class="title">我的积分</span>
        </div>
        <div class="content"><span class="integral">139</span>分</div>
      </div>
      <div class="detail-item">
        <div class="type">
          <span class="icon">
            <img src="http://pdwhalwaj.bkt.clouddn.com/vip_coach.png" alt="">
          </span>
          <span class="title">我的教练</span>
        </div>
        <div class="content"><span class="num">139</span></div>
      </div>
    </div>
    <!-- <div class="login">

    </div> -->
  </div>
</template>

<script>
import {ERR_OK} from '@/http/config'
import {getMemberOpenId} from '@/http/member'
export default {
  data () {
    return {
      isNotLogin: '',
      isLogin: '',
      openId: '',
      member: {
        name: ''
      }
    }
  },
  onShow () {
    // 跳转过来后没使用 onShow() 重新刷新页面
    this.getWxLoginResult()
  },
  onLoad () {
    this.getWxLoginResult()
  },
  methods: {
    toMemberMsg () {
      const url = '/pages/memberMsg/main?openId=' + this.openId
      wx.navigateTo({ url })
    },
    getWxLoginResult () {
      console.log('getWxLoginResult..')
      let _this = this
      wx.login({
        success (loginResult) {
          var code = loginResult.code
          if (code) {
            console.log('wx.login code..' + loginResult.code)
          }
        },
        fail (loginError) {
          console.log('微信登录失败，请检查网络状态')
        },
        complete (res) {
          console.log('完成', res)
          if (res.code) {
            wx.request({
              url: 'https://api.gcms.mygear.cn/wechat_login/get_session_info?code=' + res.code,
              data: {},
              header: {
                'content-type': 'json'
              },
              success: function (res) {
                console.log('完成后的', res)
                console.log('完成后的openID', res.data.data.openid)
                if (res.data.data.openid) {
                  _this._getMemberOpenId(res.data.data.openid)
                }
                _this.openId = res.data.data.openid // 返回openid
              }
            })
          }
        }
      })
    },
    _getMemberOpenId (openId) {
      console.log(openId)
      getMemberOpenId(openId).then((res) => {
        console.log('获取openID', res)
        if (res.data.code === ERR_OK) {
          if (res.data.data.isPaid) {
            console.log('返回的值', res.data)
            this.isLogin = true
            this.isNotLogin = false
            this.member.name = res.data.data.name
            console.log('已经登录')
          } else {
            console.log('有openid,但是为支付')
            this.isLogin = false
            this.isNotLogin = true
          }
        } else {
          console.log('没有登录')
          this.isLogin = false
          this.isNotLogin = true
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'

  .container
    .notLogin
      h1
        margin px2rem(40) px2rem(60)
        font-weight 900
        font-size $font-size-large-x
      .bg-btn
        height px2rem(350)
        width 84%
        box-sizing border-box
        margin 0 px2rem(8%)
        overflow hidden
        background url(http://pdwhalwaj.bkt.clouddn.com/vip_copy.png) no-repeat
        background-size 100% 100%
        border-radius px2rem(20)
        box-shadow 0 10px 20px 0 rgba(0,0,0,0.15),
        0 4px 10px 0 rgba(0,0,0,0.15)
        display flex
        justify-content center
        align-items center
        .login-btn
          cursor pointer
          color #0F5BFF
          font-weight 900
          font-size $font-size-large-x
          width 60%
          height px2rem(90)
          display flex
          justify-content center
          align-items center
          background $color-background
          border-radius px2rem(50)
    .logined
      h1
        margin px2rem(40) px2rem(60)
        font-weight 900
        font-size $font-size-large-x
      .bg-btn
        position relative
        height px2rem(350)
        width 84%
        box-sizing border-box
        margin 0 px2rem(8%)
        overflow hidden
        background url(http://pdwhalwaj.bkt.clouddn.com/vip_cover.png) no-repeat
        background-size 100% 100%
        border-radius px2rem(20)
        box-shadow 0 10px 20px 0 rgba(0,0,0,0.15),
        0 4px 10px 0 rgba(0,0,0,0.15)
        display flex
        justify-content center
        align-items center
        .vip-num
          font-size $font-size-medium-x
          color $color-background
          position absolute
          bottom px2rem(26)
          left px2rem(40)

    .vip-detail-list
      margin px2rem(80) px2rem(60) px2rem(60) px2rem(60)
      .detail-item
        display flex
        justify-content space-between
        align-items center
        margin px2rem(60) px2rem(6)
        .type
          display flex
          justify-content flex-start
          align-items center
          .icon
            height px2rem(53)
            width px2rem(53)
            img
              width 100%
              height 100%
          .title
            margin-left px2rem(40)
            font-size $font-size-medium-x
      .content
        font-size $font-size-medium-x
        color #FE335C
        .num
          color #0299FF

</style>