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
      <div class="member-name">
        <h1>
          Hi，{{member.name}}
          <span v-if="member.gender === '男'">先生</span>
          <span v-else>女士</span>
        </h1>
      </div>
      <div class="bg-btn" @click="toUpdataMsg()">
        <div class="vip-num" v-if="member.cardNo && isActivated">
          {{ member.cardNo }}
        </div>
        <div class="vip-num" v-else-if="!member.cardNo && isActivated">
            确认中...
        </div>
        <div class="not-vip-num" v-else  @click="toPay()">
          开通VIP会员
        </div>
      </div>
    </div>
    <div class="vip-detail-list" v-if="isLogin">
      <div class="detail-item">
        <div class="type">
          <span class="icon">
            <img src="http://pdwhalwaj.bkt.clouddn.com/vip_integral.png" alt="">
          </span>
          <span class="title">我的积分</span>
        </div>
        <div class="content"><span class="integral">{{member.credit}}</span></div>
      </div>
      <div class="detail-item">
        <div class="type">
          <span class="icon">
            <img src="http://pdwhalwaj.bkt.clouddn.com/vip_coach.png" alt="">
          </span>
          <span class="title">我的私教</span>
        </div>
        <div class="content"><span class="num"></span></div>
      </div>
      <div class="detail-item" @click="toSignIn()">
        <div class="type">
          <span class="icon">
            <img src="http://pdwhalwaj.bkt.clouddn.com/sign.png" alt="">
          </span>
          <span class="title">我的签到</span>
        </div>
        <div class="content">
          <span class="num">&gt;</span>
        </div>
      </div>
      <div class="signIn" @click="_memberSignIn(openId)">
        签到
      </div>
    </div>
    <div class="loading-container" v-if="isData">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import {ERR_OK} from '@/http/config'
import {getMemberOpenId, checkMemberIsPay} from '@/http/member'
import {memberSignIn} from '@/http/signIn'
export default {
  data () {
    return {
      isNotLogin: '',
      isLogin: '',
      isData: true,
      isActivated: false,
      openId: '',
      id: '',
      member: {
        name: '',
        credit: '',
        cardNo: '',
        gender: ''
      }
    }
  },
  components: {
    Loading
  },
  onShow () {
    // 跳转过来后使用 onShow() 重新刷新页面
    this.getWxLoginResult()
  },
  created () {
    this.getWxLoginResult()
  },
  methods: {
    toMemberMsg () {
      const url = '/pages/memberMsg/main?openId=' + this.openId
      wx.navigateTo({ url })
    },
    toUpdataMsg () {
      const url = '/pages/updataMemberMsg/main?id=' + this.id
      wx.navigateTo({ url })
    },
    toPay () {
      const url = '/pages/pay/main?openId=' + this.openId
      wx.navigateTo({ url })
    },
    toSignIn () {
      setTimeout(() => {
        const url = '/pages/signIn/main?id=' + this.id
        wx.navigateTo({ url })
      }, 500)
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
          // console.log('完成', res)
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
                  _this._checkMemberIsPay(res.data.data.openid)
                }
                _this.openId = res.data.data.openid // 返回openid
              }
            })
          }
        }
      })
    },
    _checkMemberIsPay (openId) {
      console.log(openId)
      checkMemberIsPay(openId).then((res) => {
        console.log('checkMemberIsPay', res)
        if (res.data.code === 40004) {
          console.log('空值')
          this.isLogin = false
          this.isNotLogin = true
          this.isData = false
        } else {
          console.log(res.data.data)
          console.log('isACTIVEEADTED', res.data.data.isActivated)
          if (res.data.data.isActivated === true || res.data.data.cardNo) {
            this.isActivated = res.data.data.isActivated
            console.log('true')
            this.isLogin = true
            this.isNotLogin = false
            this._getMemberOpenId(openId)
          } else {
            this._getMemberOpenId(openId)
            console.log('false')
            this.isLogin = true
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    _getMemberOpenId (openId) {
      // console.log(openId)
      getMemberOpenId(openId).then((res) => {
        console.log('获取openID', res)
        if (res.data.code === ERR_OK) {
          this.id = res.data.data.id
          this.member.name = res.data.data.name
          this.member.credit = res.data.data.credit
          this.member.cardNo = res.data.data.cardNo
          this.member.gender = res.data.data.gender
          this.isLogin = true
          this.isNotLogin = false
          console.log('已经登录')
          this.isData = false
        } else {
          console.log('没有登录')
          this.isLogin = false
          this.isNotLogin = true
          this.isData = false
        }
      }, (err) => {
        console.log(err)
      })
    },
    _memberSignIn (openId) {
      memberSignIn(openId).then((res) => {
        console.log(res)
        if (res.data.code === ERR_OK) {
          this.$tips.success('签到成功')
          this.getWxLoginResult()
        } else {
          this.$tips.alert('今天已经签到了，明天继续哦！')
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
        background url(http://pdwhalwaj.bkt.clouddn.com/VIP.png) no-repeat
        background-size 100% 100%
        border-radius px2rem(20)
        box-shadow 0 10px 20px 0 rgba(22,14,67,0.15),
        0 4px 10px 0 rgba(22,14,67,0.15)
        display flex
        justify-content center
        align-items center
        position relative
        .login-btn
          position absolute
          bottom px2rem(80)
          cursor pointer
          color $color-background
          border px2rem(2) solid #fff
          font-weight 900
          font-size $font-size-large-x
          width 60%
          height px2rem(90)
          display flex
          justify-content center
          align-items center
          background #202132
          border-radius px2rem(50)
    .logined
      .member-name
        h1
          margin px2rem(40) px2rem(60)
          font-weight 900
          font-size $font-size-large-x
          span
            font-size $font-size-medium
      .bg-btn
        cursor pointer
        position relative
        height px2rem(350)
        width 84%
        box-sizing border-box
        margin 0 px2rem(8%)
        overflow hidden
        background url(http://pdwhalwaj.bkt.clouddn.com/VIP-Copy.png) no-repeat
        background-size 100% 100%
        border-radius px2rem(20)
        box-shadow 0 10px 20px 0 rgba(22,14,67,0.15),
        0 4px 10px 0 rgba(22,14,67,0.15)
        display flex
        justify-content center
        align-items center
        .vip-num
          font-size $font-size-medium-x
          color $color-background
          position absolute
          bottom px2rem(26)
          left px2rem(40)
        .not-vip-num
          font-size $font-size-medium
          color $color-background
          position absolute
          bottom px2rem(26)
          padding 0 px2rem(20)
          text-align center
          line-height px2rem(50)
          height px2rem(50)
          left px2rem(40)
          cursor pointer
          color $color-background
          border px2rem(2) solid #fff
          border-radius px2rem(50)

    .vip-detail-list
      position relative
      margin px2rem(80) px2rem(60) px2rem(60) px2rem(60)
      .detail-item
        cursor pointer
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
          height px2rem(80)
          width px2rem(80)
          img
            width 100%
            height 100%
        .back
          width px2rem(20)
          height px2rem(25)
      .signIn
        color $color-background
        font-size $font-size-medium-x
        width px2rem(80)
        text-align center
        padding px2rem(20) px2rem(40)
        background #FF9800 
        border-radius px2rem(100)
        float right

</style>