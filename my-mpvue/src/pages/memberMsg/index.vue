<template>
  <div class="container ">
    <div class="baseMsg">
      <div class="name cell">
        <div class="cell-hb">
          <div class="name-label">姓名</div>
        </div>
        <div class="cell-bd">
          <input type="text" v-model="member.name" class="cell-input" placeholder="请输入名字">
        </div>
      </div>
      
      <div class="sex cell">
        <div class="cell-hb">
          <div class="name-label">性别</div>
        </div>
        <div class="cell-bd">
          <radio-group class="radio-group" @change="radioChange">
            <label class="radio" v-for="(item, index) in items" :key="item.name">
              <radio :value="item.name" :checked="item.checked" color="#0299FF"/> {{item.value}}
            </label>
          </radio-group>
        </div>
      </div>
    </div>
    <div class="photo cell">
      <div class="cell-hb">
        <div class="name-label">电话</div>
      </div>
      <div class="cell-bd">
        <div class="cell-bd">
          <input type="number" v-model="member.telephone" class="cell-input" placeholder="请输入联系方式" @change="telephoneChange">
        </div>
      </div>
    </div>
    <div class="birthday cell">
      <div class="cell-hb">
        <div class="name-label">出生日期</div>
      </div>
      <div class="cell-bd">
        <picker mode="date"
          @value="member.birthday"
          start="1970-01-01" :end="pickerEnd" @change="bindDateChange">
          <div class="picker">
            {{member.birthday}}
          </div>
        </picker>
      </div>
      <div class="cell_hb optional">选填</div>
    </div>
    <div class="email cell">
      <div class="cell-hb">
        <div class="name-label">邮箱</div>
      </div>
      <div class="cell-bd">
        <div class="cell-bd">
          <input type="email" v-model="member.email" class="cell-input" placeholder="请输入邮箱信息">
        </div>
      </div>
      <div class="cell_hb optional">选填</div>
    </div>
    <div class="book pay">
      <div class="left"><span>￥<span>{{memberPrice}}</span></span>&nbsp/&nbsp年</div>
      <div class="right" @click="goToPay">去支付</div>
    </div>
  </div>
</template>

<script>
import {ERR_OK} from '@/http/config'
import {getCourseList} from '@/http/member'
import {payMent} from '@/http/pay'
import {getOnly} from '@/http/setting'
export default {
  data () {
    return {
      items: [
        {name: '男', value: '先生', checked: true},
        {name: '女', value: '女士'}
      ],
      member: {
        name: '',
        email: '',
        gender: '男',
        telephone: '',
        birthday: ''
      },
      pickerEnd: '',
      memberPrice: ''
    }
  },
  mounted () {
    // 设置时间
    let today = this.getToday()
    this.pickerEnd = today
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
    getToday () {
      let myDate = new Date()
      let myMonth = myDate.getMonth() + 1
      if (myMonth < 10) {
        myMonth = '0' + myMonth
      }
      let mydate = myDate.getDate()
      if (myDate.getDate() < 10) {
        mydate = '0' + myDate.getDate()
      }
      let today = myDate.getFullYear() + '-' + myMonth + '-' + mydate
      return today
    },
    _getOnly () {
      getOnly().then((res) => {
        this.memberPrice = res.data.data.memberPrice
      })
    },
    telephoneChange (e) {
      this.member.telephone = e.target.value
      console.log(this.member.telephone)
    },
    radioChange (e) {
      this.member.gender = e.target.name
      console.log('radio发生change事件，携带value值为：', e.target.value)
    },
    bindDateChange (e) {
      this.member.birthday = e.target.value
      console.log('picker发送选择改变，携带值为', e.target.value)
    },
    goToPay () {
      console.log(this.member)
      getCourseList(this.member).then((res) => {
        console.log(res)
        if (res.data.data.openId) {
          payMent(res.data.data.openId).then((res) => {
            console.log('请求回来的', res)
            if (res.data.code === ERR_OK) {
              wx.requestPayment({
                timeStamp: res.data.data.WxPayMpOrderResult.timeStamp,
                nonceStr: res.data.data.WxPayMpOrderResult.nonceStr,
                package: res.data.data.WxPayMpOrderResult.package,
                signType: res.data.data.WxPayMpOrderResult.signType,
                paySign: res.data.data.WxPayMpOrderResult.paySign,
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
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  page {
    width 100%
    height 100%
    background-color red
  }
  .picker {
    height px2rem(84)
    background-color #FFFFFF
    font-size $font-size-medium-x
    display flex
    display -ms-flexbox
    -moz-justify-content flex-start
    -ms-justify-content flex-start
    justify-content flex-start
    -ms-flex-align center
    align-items center
  }

  .container
    background $color-background-d
    width 100%
    height 100vh
    .baseMsg
      box-sizing content-box
      padding px2rem(30) 0
    .cell
      padding px2rem(20) px2rem(30)
      position relative
      display flex
      display -ms-flexbox
      align-items center
      -ms-flex-align center
      background $color-background
      .name-label
        font-size $font-size-medium-x
        width px2rem(150)
        word-wrap break-word
        word-break break-all
      .cell-bd
        -ms-flex 1
        flex 1
        .cell-input
          height px2rem(44)
          min-height px2rem(44)
          line-height px2rem(40)
          font-size $font-size-medium-x
    .photo, .email
      margin px2rem(30) 0
    .birthday
      padding 0 px2rem(30)
      box-sizing content-box
    .radio
      font-size $font-size-medium-x
      margin-right px2rem(40)
    .noName
      border px2rem(1) solid #f00
    .optional
      font-size $font-size-small
      color $color-text1
    
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
</style>