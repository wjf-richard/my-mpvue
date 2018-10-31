<template>
  <div class="container ">
    <div class="notLogin" v-if="isNotLogin">
      <h1>您好，请先登录</h1>
      <div class="bg-btn">
        <div class="login-btn" @click="toMemberMsg()">
          填写资料
        </div>
      </div>
    </div>
    <div class="logined" v-if="isLogin">
      <div class="member-name">
        <h1>
          Hi，{{member.name}}
          <span v-if="member.gender === '先生'">先生</span>
          <span v-else>女士</span>
        </h1>
        <!-- <div class="signIn" @click="_memberSignIn(openId)">
          签到
        </div> -->
      </div>
      <div class="bg-btn" @click.stop="toUpdataMsg()">
        <div class="vip-num" v-if="isActivated">
          <div class="cardNo">
            {{ member.cardNo }}
          </div>
          <div class="deadline">

          </div>
        </div>
        <div class="vip-num" v-else-if="type === '年卡'">
            确认中...
        </div>
        <div class="not-vip-num" v-else  @click.stop="toPay()">
          开通年度VIP会员
        </div>
      </div>
    </div>
    <div class="vip-detail-list" v-if="isLogin">
      <div class="detail-item" v-if="expiryDate != null" @click="toContinueBuy()">
        <div class="type">
          <span class="icon">
            <img src="http://gcms.qncdn.mygear.vip/type@2x.png" alt="">
          </span>
          <span class="title">会员类型</span>
        </div>
        <div class="content">
          <span class="integral">{{member.type}}</span>
          <div class=" right-arrow">
            <span class="num">
              <img src="../../common/images/back.png" alt="">
            </span>
          </div>
        </div>
      </div>
      <div class="detail-item" v-if="expiryDate != null" @click="toContinueBuy()">
        <div class="type">
          <span class="icon">
            <img src="http://gcms.qncdn.mygear.vip/term@2x.png" alt="">
          </span>
          <span class="title">有效期限</span>
        </div>
        <div class="content">
          <span class="integral">{{member.expiryDate}}</span>
          <div class=" right-arrow">
            <span class="num">
              <img src="../../common/images/back.png" alt="">
            </span>
          </div>
        </div>
      </div>
      <div class="detail-item">
        <div class="type">
          <span class="icon">
            <img src="http://gcms.qncdn.mygear.vip/integral@2x.png" alt="">
          </span>
          <span class="title">我的积分</span>
        </div>
        <div class="content"><span class="integral">{{member.credit}}</span></div>
      </div>
      <div class="detail-item" @click="toMyBook()">
        <div class="type">
          <span class="icon">
            <img src="http://gcms.qncdn.mygear.vip/order@2x.png" alt="">
          </span>
          <span class="title">我的预约</span>
        </div>
        <div class="content right-arrow">
          <span class="num">
            <img src="../../common/images/back.png" alt="">
          </span>
        </div>
      </div>
      <div class="detail-item" @click="toMyMsg()">
        <div class="type">
          <span class="icon">
            <img src="http://gcms.qncdn.mygear.vip/news@2x.png" alt="">
          </span>
          <span class="title">我的消息</span>
        </div>
        <div class="content right-arrow">
          <span class="num">
            <img src="../../common/images/back.png" alt="">
          </span>
        </div>
      </div>
      <!-- <div class="detail-item" @click="toSignIn()">
        <div class="type">
          <span class="icon">
            <img src="http://gcms.qncdn.mygear.vip/signIn@2x.png" alt="">
          </span>
          <span class="title">我的签到</span>
        </div>
        <div class="content right-arrow">
          <span class="num">
            <img src="../../common/images/back.png" alt="">
          </span>
        </div>
      </div> -->
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
      type: '',
      openId: '',
      id: '',
      member: '',
      expiryDate: ''
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
  onLoad () {
    // 重置data完成数据初始化
    Object.assign(this.$data, this.$options.data())
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
    toContinueBuy () {
      const url = '/pages/becomeVip/main?id=' + this.id + '&openId=' + this.openId + '&type=' + this.type + '&expiryDate=' + this.expiryDate
      wx.navigateTo({ url })
    },
    toPay () {
      const url = '/pages/pay/main?openId=' + this.openId
      wx.navigateTo({ url })
    },
    toMyBook () {
      setTimeout(() => {
        const url = '/pages/myBook/main?id=' + this.id
        wx.navigateTo({ url })
      }, 17)
    },
    toMyMsg () {
      setTimeout(() => {
        const url = '/pages/myMessage/main'
        wx.navigateTo({ url })
      }, 17)
    },
    toSignIn () {
      setTimeout(() => {
        const url = '/pages/signIn/main?id=' + this.id + '&openId=' + this.openId
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
          if (res.code) {
            wx.request({
              url: 'https://api.gcms.mygear.cn/wechat_login/get_session_info?code=' + res.code,
              data: {},
              header: {
                'content-type': 'json'
              },
              success: function (res) {
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
          this.isLogin = false
          this.isNotLogin = true
          this.isData = false
        } else {
          if (res.data.data.isActivated === true) {
            this.type = res.data.data.type
            this.isActivated = res.data.data.isActivated
            this.isLogin = true
            this.isNotLogin = false
            this._getMemberOpenId(openId)
          } else if (res.data.data.isPaid === true) {
            this.type = res.data.data.type
            console.log(this.type)
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
      getMemberOpenId(openId).then((res) => {
        if (res.data.code === ERR_OK) {
          this.id = res.data.data.id
          this.member = res.data.data
          this.expiryDate = res.data.data.expiryDate
          this.isLogin = true
          this.isNotLogin = false
          console.log('已经登录', this.member)
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
        margin px2rem(30) px2rem(60)
        font-weight 900
        font-size $font-size-large-x
      .bg-btn
        height px2rem(350)
        width 84%
        box-sizing border-box
        margin 0 px2rem(8%)
        overflow hidden
        background url(http://gcms.qncdn.mygear.vip/VIP.png) no-repeat
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
        display flex
        justify-content space-between
        margin px2rem(30) px2rem(60)
        h1
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
        background url(http://gcms.qncdn.mygear.vip/VIP-Copy.png) no-repeat
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
          display flex
          flex-direction column
          .deadline
            font-size $font-size-small-md
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
            margin-left px2rem(20)
            font-size $font-size-medium-x
      .right-arrow
        height px2rem(26)
        width px2rem(15)
      .content
        font-size $font-size-medium-x
        color #FE335C
        display flex
        align-items center
        .integral
          margin-right px2rem(10)
        .num
          height 100%
          width 100%
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
    height px2rem(30)
    text-align center
    padding px2rem(20) px2rem(40)
    background #FF9800 
    border-radius px2rem(100)
</style>