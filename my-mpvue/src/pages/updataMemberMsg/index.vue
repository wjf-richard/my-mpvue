<template>
  <div class="container ">
    <div class="baseMsg">
      <div class="name cell">
        <div class="cell-hb">
          <div class="name-label">姓名</div>
        </div>
        <div class="cell-bd">
          <input type="text" v-model="memberMsg.name" class="cell-input" placeholder="请输入名字" @change="nameChange" disabled>
        </div>
      </div>
      
      <div class="sex cell">
        <div class="cell-hb">
          <div class="name-label">性别</div>
        </div>
        <div class="cell-bd" id="mysex">
          <radio-group class="radio-group" @change="radioChange">
            <label class="radio" v-for="(item, index) in items" :key="item.name">
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
          <input type="number" v-model="memberMsg.telephone" class="cell-input" placeholder="请输入联系方式" @change="telephoneChange">
        </div>
      </div>
    </div>
    <div class="birthday cell">
      <div class="cell-hb">
        <div class="name-label">生日</div>
      </div>
      <div class="cell-bd">
        <picker mode="date"
          v-model="memberMsg.birthday"
          start="1970-01-01" :end="pickerEnd" @change="birthdayChange">
          <div class="picker">
            {{memberMsg.birthday}}
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
          <input type="email" v-model="memberMsg.email" class="cell-input" placeholder="请输入邮箱信息"  @change="emailChange">
        </div>
      </div>
      <div class="cell_hb optional">选填</div>
    </div>
    
    <div class="book" @click="submit()">
      保存
    </div>
  </div>
</template>

<script>
import {ERR_OK} from '@/http/config'
import {getMemberId, updataMemberId} from '@/http/member'
export default {
  data () {
    return {
      id: '',
      items: [
        {name: '男', value: '先生'},
        {name: '女', value: '女士'}
      ],
      selectGender: '男',
      memberMsg: {
        name: '',
        email: '',
        gender: '',
        telephone: '',
        birthday: ''
      },
      pickerEnd: ''
    }
  },
  mounted () {
    // 设置时间
    let today = this.getToday()
    this.pickerEnd = today
    // 获取openID
    this.id = this.id
    this._getMemberId(this.id)
    // this._updataMemberId(this.id, this.memberMsg)
  },
  onLoad (options) {
    this.id = options.id
    console.log('member', this.id)
  },
  methods: {
    submit () {
      this._updataMemberId(this.id, this.memberMsg)
      console.log(this.memberMsg)
    },
    _getMemberId (id) {
      getMemberId(id).then((res) => {
        console.log(res)
        if (res.data.code === ERR_OK) {
          this.memberMsg.name = res.data.data.name
          this.memberMsg.gender = res.data.data.gender
          this.selectGender = res.data.data.gender
          this.memberMsg.telephone = res.data.data.telephone
          this.memberMsg.birthday = res.data.data.birthday
          this.memberMsg.email = res.data.data.email
          console.log('memberMsg', this.memberMsg)
        }
      })
    },
    _updataMemberId (id, data) {
      updataMemberId(id, data).then((res) => {
        console.log(res)
        if (res.data.code === ERR_OK) {
          setTimeout(() => {
            wx.showToast({
              title: '修改成功',
              success: function () {
                console.log('准备跳转')
                wx.switchTab({
                  url: '/pages/user/main'
                })
              }
            })
          }, 600)
        }
      })
    },
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
      this.memberMsg.name = e.target.value
      console.log(this.memberMsg.name)
    },
    telephoneChange (e) {
      this.memberMsg.telephone = e.target.value
      console.log(this.memberMsg.telephone)
    },
    radioChange (e) {
      console.log('radio发生change事件，携带value值为：', e.target.value)
      console.log(e)
      this.selectGender = e.target.value
      this.memberMsg.gender = e.target.value
      console.log('radio发生change事件，携带value值为：', e.target.value)
    },
    birthdayChange (e) {
      this.memberMsg.birthday = e.target.value
      console.log('birthday', e.target.value)
    },
    emailChange (e) {
      this.memberMsg.email = e.target.value
      console.log('email', e.target.value)
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
    .pay-way
      align-items flex-start
      .cell-hb
        margin-top px2rem(15)
      .pay-way-item
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