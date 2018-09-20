<template>
  <div class="container">
    <div class="header"></div>
    <div class="content">
      <div class="sign-content">
        <view class="section month cell">
          <picker mode="date" 
            fields="month" 
            @value="date" 
            start="2017-01" 
            :end="pickerEnd" 
            @change="bindDateChange"
          >
            <view class="picker">
              {{date}}
            </view>
          </picker>
          <span class="arrow-box"><i class="bottom-arrow"></i></span>
        </view>
        <div class="date-box"  v-if="isData">
          <div class="date-item cell" v-for="(item, index) in signInData" :key="index">
            <h3>{{ item.date }}</h3>
            <span class="integral">积分+ <span>{{ item.credit }}</span></span>
          </div>
        </div>
        <div class="no-data-content" v-else>
          <div class="move cell">该月份的没有签到o(╥﹏╥)o</div>
        </div>
      </div>
      <!-- <div class="move-data-content">
        <div class="move cell">加载更多数据...</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import {ERR_OK} from '@/http/config'
import {signInRecords} from '@/http/signIn'

export default {
  data () {
    return {
      signInData: '',
      id: '',
      yearMonth: '',
      monthList: [],
      pickerEnd: '',
      date: '2018年09月',
      isData: true
    }
  },
  onLoad (options) {
    this.id = options.id
    console.log('member', this.id)
  },
  mounted () {
    this.yearMonth = this.getYearMonth()
    this.pickerEnd = this.yearMonth
    this._signInRecords(this.id, this.yearMonth)
  },
  methods: {
    getYearMonth () {
      let myDate = new Date()
      let myMonth = myDate.getMonth() + 1
      if (myMonth < 10) {
        myMonth = '0' + myMonth
      }
      let yearMonth = myDate.getFullYear() + '-' + myMonth
      return yearMonth
    },
    _signInRecords (id, date) {
      signInRecords(id, date).then((res) => {
        console.log(res)
        if (res.data.code === ERR_OK) {
          let records = res.data.data
          console.log(records)
          this.signInData = records
          this.isData = true
        } else {
          this.isData = false
        }
      })
    },
    bindDateChange (e) {
      let selectDate = e.target.value
      let year = selectDate.substr(0, 4)
      let month = selectDate.substring(6)
      if (month < 10) {
        month = '0' + month
      }
      this.date = year + '年' + month + '月'
      this._signInRecords(this.id, selectDate)
      console.log('picker发送选择改变，携带值为', e.target.value)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'

  .container
    height 100vh
    .header
      height 30vh
      background url(http://pdwhalwaj.bkt.clouddn.com/bg_1.png) no-repeat
      background-size 100% 100%
    .content
      height 70vh
      overflow-y scroll
      box-sizing border-box
      padding px2rem(60) px2rem(60) 0 px2rem(60)
      .sign-content
        .cell
          padding px2rem(20) 0
          height px2rem(40)
        .month
          font-size $font-size-medium
          color $color-text1
          display flex
          justify-content flex-start
          align-items center
        .section
          position relative
          picker
            width px2rem(200)
            z-index 10
          .arrow-box
            z-index 9
            position absolute
            left px2rem(150)
            top px2rem(36)
            display flex
            justify-content flex-start
            align-items center

        .date-box
          font-size $font-size-medium
          .date-item
            display flex
            justify-content space-between
            align-items center
            border-bottom px2rem(1) solid $color-border
            h3
              font-weight 900
              color #000
            .integral
              color #ED0D0D
        .no-data-content
          .cell
            padding px2rem(20) 0
            height px2rem(40)
          .move
            font-size $font-size-medium
            color $color-text1
            display flex
            justify-content center
            align-items center
  .bottom-arrow:before
    content:""
    border: px2rem(12) solid #999
    border-bottom:none
    border-right-color:transparent
    border-left-color:transparent
    position:relative
    top: px2rem(18)
    left: px2rem(12)
    border-radius: px2rem(4)
  .bottom-arrow:after
    content:""
    border: px2rem(12) solid #fff
    border-bottom:none
    border-right-color:transparent
    border-left-color:transparent
    position:relative
    top:px2rem(14)
    left: -(px2rem(12))

</style>