<template>
  <div class="container ">
    <div class="baseMsg">
      <h1 class="title">铂仕健身俱乐部VIP会员协议</h1>
      <div class="content">
        {{txt}}
      </div>
    </div>
    <div class="isAgree">
      <radio-group class="radio-group" @change="radioChange">
        <label class="radio" v-for="item in items" :key="item.name">
          <radio color="#0299FF" :value="item.value"/> 我已阅读并同意
        </label>
      </radio-group>
    </div>
    <div class="footer">
      <div class="book pay" >
        <div class="left"><span>￥<span>{{memberPrice}}</span></span>&nbsp/&nbsp年</div>
        <div class="right" @click="isAgreeToPay" aria-disabled="true">去支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import {ERR_OK} from '@/http/config'
import {payMent} from '@/http/pay'
import {getOnly} from '@/http/setting'
export default {
  data () {
    return {
      member: [],
      items: [
        { value: '同意' }
      ],
      isAgree: '同意',
      selectedAgree: '',
      memberPrice: '',
      txt: '腾信息及隐私并选择接受或者不接受本讯游戏用户个人信息及隐私保护政腾信息及隐私并选择接受或者不接受本讯游戏用户个人信息及隐私保护政腾信息及隐私并选择接受或者不接受本讯游戏用户个人信息及隐私保护政腾信息及隐私并选择接受或者不接受本讯游戏用户个人信息及隐私保护政腾信息及隐私并选择接受或者不接受本讯游戏用户个人信息及隐私保护政腾信息及隐私并选择接受或者不接受本讯游戏用户个人信息及隐私保护政腾信息及隐私并选择接受或者不接受本讯游戏用户个人信息及隐私保护政腾信息及隐私并选择接受或者不接受本讯游戏用户个人信息及隐私保护政腾信息及隐私并选择接受或者不接受本讯游戏用户个人信息及隐私保护政腾信息及隐私并选择接受或者不接受本讯游戏用户个人信息及隐私保护政。腾讯在此特别提醒用户仔细阅读本腾讯游戏用户个人信息及隐私保护政策中的各个条款（未成年人应当在其法定监护人陪同下阅读），并选择接受或者不接受本讯游戏用户个人信息及隐私保护政。腾讯在此特别提醒用户仔细阅读本腾讯游戏用户个人信息及隐私保护政策中的各个条款（未成年人应当在其法定监护人陪同下阅读），并选择接受或者不接受本讯游戏用户个人信息及隐私保护政。腾讯在此特别提醒用户仔细阅读本腾讯游戏用户个人信息及隐私保护政策中的各个条款（未成年人应当在其法定监护人陪同下阅读），并选择接受或者不接受本讯游戏用户个人信息及隐私保护政。腾讯在此特别提醒用户仔细阅读本腾讯游戏用户个人信息及隐私保护政策中的各个条款（未成年人应当在其法定监护人陪同下阅读），并选择接受或者不接受本讯游戏用户个人信息及隐私保护政。腾讯在此特别提醒用户仔细阅读本腾讯游戏用户个人信息及隐私保护政策中的各个条款（未成年人应当在其法定监护人陪同下阅读），并选择接受或者不接受本讯游戏用户个人信息及隐私保护政。腾讯在此特别提醒用户仔细阅读本腾讯游戏用户个人信息及隐私保护政策中的各个条款（未成年人应当在其法定监护人陪同下阅读），并选择接受或者不接受本讯游戏用户个人信息及隐私保护政。腾讯在此特别提醒用户仔细阅读本腾讯游戏用户个人信息及隐私保护政策中的各个条款（未成年人应当在其法定监护人陪同下阅读），并选择接受或者不接受本讯游戏用户个人信息及隐私保护政。'
    }
  },
  mounted () {
    // 获取会员费用
    this._getOnly()
    // 获取openID
    this.member.openId = this.openId
  },
  onLoad (options) {
    this.openId = options.openId
    console.log('member', this.openId)
  },
  methods: {
    _getOnly () {
      getOnly().then((res) => {
        this.memberPrice = res.data.data.memberPrice
      })
    },
    radioChange (e) {
      console.log('radio发生change事件，携带value值为：', e.target.value)
      this.selectedAgree = e.target.value
    },
    payMethodChange (e) {
      console.log('payMethod', e.target.value)
      console.log(e)
      this.selectPayMethod = e.target.value
      this.member.payMethod = e.target.value
      if (this.member.payMethod === '线下支付') {
        console.log('改变了')
        this.isInline = false
      } else {
        this.isInline = true
      }
    },
    isAgreeToPay () {
      if (this.isAgree === this.selectedAgree) {
        this.goToPay()
      } else {
        this.$tips.alert('请同意该协议')
      }
    },
    goToPay () {
      console.log('...', this.member.openId)
      payMent(this.member.openId).then((res) => {
        console.log('支付', res)
        if (res.data.code === ERR_OK) {
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign,
            success: function (res) {
              console.log('成功后的', res)
              wx.showToast({
                title: '支付成功',
                success: function () {
                  console.log('准备跳转')
                  wx.switchTab({
                    url: '/pages/user/main'
                  })
                }
              })
            },
            fail: function (res) {
              console.log('失败后的', res)
              // wx.showToast({titlt: '支付失败' + res})
            }
          })
        } else {
          wx.showToast({title: '服务器忙' + res.data.code + res.data.msg})
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
    background $color-background-d
    width 100%
    height 100vh
    .baseMsg
      height 80vh
      overflow-y scroll
      padding 0 px2rem(60)
      margin-bottom px2rem(20)
      box-sizing content-box
      .title
        text-align center
        padding px2rem(30) 0
        font-weight 900
      .content
        line-height px2rem(36)
        font-weight 700
        font-size $font-size-small-s
    .pay-method
      align-items flex-start
      .cell-hb
        margin-top px2rem(15)
      .pay-method-item
        display flex
        flex-direction column
        .radio
          margin px2rem(10) 0
    .isAgree
      .radio-group
        padding 0 px2rem(40)
        .radio
          font-size $font-size-medium-x
    .footer
      background $color-background-d
      .pay
        display flex
        display -ms-flexbox
        padding 0
        font-size $font-size-medium-x
        .left, .right
          display flex
          display -ms-flexbox
          -moz-justify-content center
          -ms-justify-content center
          justify-content center
          -ms-flex-align center
          align-items center
          height px2rem(80)
        .left
          -ms-flex 2
          flex 2
          border-top-left-radius px2rem(100)
          border-bottom-left-radius px2rem(100)
          background #fff
          color #000
          span
            color red
        .right
          -ms-flex 1
          flex 1
  radio
    transform scale(0.8)
</style>