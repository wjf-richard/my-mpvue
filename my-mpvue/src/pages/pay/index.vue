<template>
  <div class="container ">
    <h1 class="title">开通会员</h1>
    <div class="baseMsg">
      <div class="content">
        <div class="item-price">
          <div class="item-value">
            <radio-group class="radio-group" @change="radioChange">
              <label class="radio" v-for="(item, index) in SectionDiscount" :key="index">
                <radio :value="[item.type, item.price, item.year]" />{{item.name}} - 共 {{item.price}} 元
              </label>
            </radio-group>
          </div>
        </div>
      </div>
    </div>
    <div class="isAgree" v-if="selectPrice">
      <radio-group class="radio-group" @change="isAgreed">
        <label class="radio" v-for="item in items" :key="item.name">
          <radio color="#0299FF" :value="item.value"/> 我已同意仕铂健身俱乐部会员协议
        </label>
      </radio-group>
    </div>
    <div class="footer">
      <div class="book pay" >
        <div class="left">合计共：&nbsp<span>￥<span>{{selectPrice}}</span></span>&nbsp元</div>
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
      SectionDiscount: [],
      selectType: '',
      selectPrice: '',
      selectYear: '',
      items: [
        { value: '同意' }
      ],
      isAgree: '同意',
      selectedAgree: ''
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
        let cards = res.data.data.cards
        let newCard = []
        console.log('返回的', res)
        if (res.data.data.sevenPrice) {
          console.log(res.data.data.sevenPrice)
          let sevenObj = {
            price: res.data.data.sevenPrice,
            type: 'seven',
            name: '7天体验卡'
          }
          newCard.push(sevenObj)
        }
        if (res.data.data.quarterPrice) {
          console.log(res.data.data.quarterPrice)
          let quarterObj = {
            price: res.data.data.quarterPrice,
            type: 'quarter',
            name: '季度卡(一个季度)'
          }
          newCard.push(quarterObj)
        }
        cards.forEach((item, index, arr) => {
          let newObj = {}
          newObj.price = arr[index].price
          newObj.year = arr[index].year
          newObj.name = arr[index].year + '年卡'
          newObj.type = 'year'
          newCard.push(newObj)
        })
        this.SectionDiscount = newCard
        console.log('返回的新数据', newCard)
      })
    },
    radioChange (e) {
      console.log('radio发生change事件，携带value值为：', e.target.value)
      this.selectType = e.target.value.split(',')[0]
      this.selectPrice = e.target.value.split(',')[1]
      this.selectYear = e.target.value.split(',')[2]
    },
    isAgreed (e) {
      console.log('isAgreed', e.target.value)
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
      payMent(this.member.openId, this.selectType, this.selectPrice, this.selectYear).then((res) => {
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
    .title
      font-size $font-size-large-lg
      font-weight 900
      color #000
      padding px2rem(20) px2rem(60)
      background #FFFFFF
      box-shadow 0 px2rem(6) px2rem(26) 0 rgba(0,0,0,0.10)
    .baseMsg
      padding 0 px2rem(60)
      margin-bottom px2rem(20)
      box-sizing content-box
      .content
        .item-price
          padding px2rem(40) 0
          .item-value
            padding px2rem(40) 0
            font-size $font-size-medium-x
            color $color-text1
            .radio-group
              display flex
              flex-direction column
              .radio
                margin px2rem(20) 0
                flex 1
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
      position fixed
      bottom px2rem(200)
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