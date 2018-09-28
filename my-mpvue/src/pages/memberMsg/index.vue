<template>
  <div class="container">
    <div class="baseMsg">
      <div class="name cell">
        <div class="cell-hb">
          <div class="name-label">姓名</div>
        </div>
        <div class="cell-bd">
          <input type="text" v-model="member.name" class="cell-input" placeholder="请输入您的名字" @change="nameChange">
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
    <div class="book" @click="goSave">
      <div class="right" >保存</div>
    </div>
  </div>
</template>

<script>
import {ERR_OK} from '@/http/config'
import {addNewMember} from '@/http/member'
export default {
  data () {
    return {
      isInline: true,
      items: [
        {name: '男', value: '先生'},
        {name: '女', value: '女士'}
      ],
      selectGender: '男',
      member: {
        openId: '',
        name: '',
        email: '',
        gender: '',
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
    // 获取openID
    this.member.openId = this.openId

    this.member.gender = this.selectGender
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
    goSave () {
      console.log(this.member)
      addNewMember(this.member).then((res) => {
        console.log('保存', res)
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
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
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
</style>