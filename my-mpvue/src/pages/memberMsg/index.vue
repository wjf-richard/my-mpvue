<template>
  <div class="container ">
    <div class="baseMsg">
      <div class="name cell">
        <div class="cell-hb">
          <div class="name-label">姓名</div>
        </div>
        <div class="cell-bd">
          <input type="text" v-model="member.name" class="cell-input" placeholder="请输入名字" @change="nameChange">
        </div>
      </div>
      
      <div class="sex cell">
        <div class="cell-hb">
          <div class="name-label">性别</div>
        </div>
        <div class="cell-bd">
          <radio-group class="radio-group" @change="radioChange">
            <label class="radio" v-for="item in items" :key="item.name">
              <radio :value="item.value" :checked="item.value === selectGender" color="#0299FF"/> {{item.value}}
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
        <div class="name-label">生日</div>
      </div>
      <div class="cell-bd">
        <picker mode="date"
          @value="member.birthday"
          start="1970-01-01" :end="pickerEnd" @change="birthdayChange">
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
          <input type="email" v-model="member.email" class="cell-input" placeholder="请输入邮箱信息" @change="emailChange">
        </div>
      </div>
      <div class="cell_hb optional">选填</div>
    </div>
    <div class="pay-method cell">
      <div class="cell-hb">
        <div class="name-label">支付方式</div>
      </div>
      <div class="cell-bd">
        <radio-group class="radio-group pay-method-item" @change="payMethodChange">
          <label class="radio" v-for="item in payMethod" :key="item.name">
            <radio :value="item.value" :checked="item.value === selectPayMethod" color="#0299FF"/> {{item.value}}
          </label>
        </radio-group>
      </div>
    </div>
    <div class="book pay" v-if="isInline">
      <div class="left"><span>￥<span>{{memberPrice}}</span></span>&nbsp/&nbsp年</div>
      <div class="right" @click="goToPay">保存并支付</div>
    </div>
    <div class="book" v-else @click="goSave">
      <div class="right" >保存</div>
    </div>
  </div>
</template>

<script>
import {ERR_OK} from '@/http/config'
import {addNewMember} from '@/http/member'
import {payMent} from '@/http/pay'
import {getOnly} from '@/http/setting'
export default {
  data () {
    return {
      isInline: true,
      items: [
        {name: '男', value: '男'},
        {name: '女', value: '女'}
      ],
      selectGender: '男',
      payMethod: [
        {name: 'online', value: '线上支付'},
        {name: 'offline', value: '线下支付'}
      ],
      selectPayMethod: '线上支付',
      member: {
        openId: '',
        name: '',
        email: '',
        gender: '',
        telephone: '',
        birthday: '',
        payMethod: ''
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
        this.member.gender = this.selectGender
        this.member.payMethod = this.selectPayMethod
        this.memberPrice = res.data.data.memberPrice
      })
    },
    nameChange (e) {
      this.member.name = e.target.value
      console.log(this.member.name)
    },
    radioChange (e) {
      console.log('radio发生change事件，携带value值为：', e.target.value)
      console.log(e)
      this.selectGender = e.target.value
      this.member.gender = e.target.value
      console.log(this.selectGender)
    },
    telephoneChange (e) {
      this.member.telephone = e.target.value
      console.log(this.member.telephone)
    },
    emailChange (e) {
      this.member.email = e.target.value
      console.log('email', e.target.value)
    },
    birthdayChange (e) {
      this.member.birthday = e.target.value
      console.log('picker发送选择改变，携带值为', e.target.value)
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
    goToPay () {
      console.log('...', this.member)
      addNewMember(this.member).then((res) => {
        console.log('支付', res)
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
    },
    goSave () {
      console.log(this.member)
      addNewMember(this.member).then((res) => {
        console.log('保存', res)
        if (res.data.data.openId) {
          payMent(res.data.data.openId).then((res) => {
            console.log('保存回来的', res)
            if (res.data.code === ERR_OK) {
              wx.showToast({
                title: '保存成功',
                success: function () {
                  console.log('准备跳转')
                  wx.switchTab({
                    url: '/pages/user/main'
                  })
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
        font-size $font-size-large
        width px2rem(160)
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
    .pay-method
      align-items flex-start
      .cell-hb
        margin-top px2rem(15)
      .pay-method-item
        display flex
        flex-direction column
        .radio
          margin px2rem(10) 0
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