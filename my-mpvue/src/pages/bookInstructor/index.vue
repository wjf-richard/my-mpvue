<template>
  <div class="container">
    <div class="header"></div>
    <div class="content">
      <scroll-view scroll-x class="scroll-view_H" style="width: 100%">
        <view class="scroll-view-item_H ":class="{'tabbar-bottom':currentTab==index}" scroll-into-view="toview" v-for="(item, index) in tabBar" :key="index" @click="clickTab(index, item.date)">
          {{item.dateWeek}}
        </view>
      </scroll-view>
      <swiper :current="currentTab" @change="changeTab">
        <swiper-item class="swiper-item" v-for="(items, indexs) in tabBar" :key="indexs" >
            <scroll-view scroll-y style="height: 250px;" scroll-with-animation="true">
              <div class="content" v-if="isData" >
                <div class="time-item" 
                  v-for="(item, itemIndex) in tabContent" 
                  :key="itemIndex"
                  :class="{'full-selected':isSelected===item.isBooked, 'select-item':currentBook===itemIndex}"
                  @click="clickBook(itemIndex, item.startTime)"
                >
                  {{item.startTime}}--{{item.endTime}}
                  <span class="tips">满</span>
                </div>
              </div>
              <div class="no-data-content" v-else>
                <div class="move cell">今天教练休息不能预约o(╥﹏╥)o</div>
              </div>
            </scroll-view>
        </swiper-item>
        
      </swiper>
      
    </div>
    <div class="remain">剩余课程 <span class="num">{{reastNum}}</span> 次</div>
    <div class="book" v-if="isData" @click="_addInstrtuctorBook()">确定预约</div>
  </div>
</template>

<script>
import {ERR_OK} from '@/http/config'
import {getBookableDate, getReastTimes, addInstrtuctorBook} from '@/http/instructors'
export default {
  data () {
    return {
      instructorId: '',
      id: '',
      startYear: '',
      startTime: '',
      startYearDate: '',
      selectedDate: '',
      tabBar: [],
      isData: false,
      tabContent: [],
      currentTab: 0,
      currentBook: '',
      currentDate: '',
      reastNum: '',
      isSelected: true
    }
  },
  mounted () {
    // 设置时间
    this.getDateList()
    this.startYear = this.tabBar[this.currentTab].date
    this._getReastTimes(this.instructorId, this.id)
  },
  onLoad (options) {
    this.instructorId = options.instructorId
    this.id = options.id
    this._getBookableDate(this.instructorId, this.getToday())
  },
  methods: {
    getDateList () {
      let dateObj = ''
      for (let i = 0; i < 7; i++) {
        let dateItem = this.getDate(i)
        dateObj = this.getWeek(dateItem)
        this.tabBar.push(dateObj)
      }
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
    getWeek (date) {
      let weekday = new Array(7)
      weekday[0] = '周日'
      weekday[1] = '周一'
      weekday[2] = '周二'
      weekday[3] = '周三'
      weekday[4] = '周四'
      weekday[5] = '周五'
      weekday[6] = '周六'
      let dateObject = new Date(date)
      let week = weekday[dateObject.getDay()]
      if (date === this.getToday()) {
        week = '今天'
      }
      let dateWeek = date + week
      let detailDate = {date: date, dateWeek: dateWeek}
      return detailDate
    },
    getDate (n) {
      let ss = 24 * 60 * 60 * 1000 // 一天的毫秒数86400
      let timestamp = new Date().getTime() // 获取当前时间戳
      let date = this.formatDate(ss * n + timestamp)
      return date // 拼接成我们需要的格式返回
    },
    formatDate (value) { // 转换时间戳
      const date = new Date(value)
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      if (m < 10) { m = '0' + m }
      if (d < 10) { d = '0' + d }
      const t = y + '-' + m + '-' + d
      return t
    },
    clickTab (index, date) {
      this.currentTab = index
      this.currentDate = date
      console.log(this.currentDate)
      this.startYear = date
      this._getBookableDate(this.instructorId, date)
    },
    changeTab (e) {
      this.currentTab = e.mp.detail.current
      this.startYear = this.tabBar[this.currentTab].date
      this._getBookableDate(this.instructorId, this.startYear)
      console.log('左右滑动的改变', this.startYear)
    },
    clickBook (index, startTime) {
      this.currentBook = index
      this.startTime = startTime
      this.startYearDate = this.startYear + ' ' + this.startTime
      console.log('选择的具体时间', this.startYearDate)
    },
    _getReastTimes (instructorId, id) {
      getReastTimes(instructorId, id).then((res) => {
        console.log('剩余次数', res)
        if (res.data.code === ERR_OK) {
          this.reastNum = res.data.data.frequency
        }
      })
    },
    _getBookableDate (instructorId, date) {
      getBookableDate(instructorId, date).then((res) => {
        if (res.data.code === ERR_OK) {
          this.isData = true
          this.tabContent = res.data.data
          console.log(this.tabContent)
        } else {
          this.isData = false
        }
      })
    },
    _addInstrtuctorBook () {
      addInstrtuctorBook(this.instructorId, this.id, this.startYearDate).then((res) => {
        console.log(this.instructorId, this.id, this.startYearDate, res)
        if (res.data.code === ERR_OK) {
          console.log(res)
          this.$tips.alert('预约成功，记得按时来上课哦(*^▽^*)')
          this._getBookableDate(this.instructorId, this.getToday())
          this._getReastTimes(this.instructorId, this.id)
        } else {
          this.$tips.alert('服务器出错，请稍后在预约...')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .book
    bottom px2rem(10)
  .container
    height 100vh
    .top
      margin px2rem(35) 0
      width auto
      line-height px2rem(60)
      white-space nowrap
      display flex
      justify-content flex-start
      align-items center

    .tabbar 
      margin-right px2rem(40)
      font-size $font-size-medium-x
      color $color-text1
      font-weight 400
      height px2rem(70)
      display inline-block
      position relative
    

    .tabbar-bottom
      color #007AFF
      font-weight 900
      border-bottom px2rem(4) solid #007AFF
    .active-bottom
      position absolute
      bottom 0
      left px2rem(38)
      width px2rem(52)
      height px2rem(8)
      border-radius px2rem(30)
      background #2196f3
    swiper
      height px2rem(550)
      .swiper-item
        width 89.34% !important
        padding px2rem(40)
        height 100%
        .content
          height 100%
          color $color-text3
          letter-spacing px2rem(1.8)
          line-height px2rem(40)
          font-size $font-size-medium
          display flex
          justify-content space-between
          align-items center
          flex-wrap wrap

          .time-item
            display flex
            justify-content center
            align-items center
            border-radius px2rem(100)
            margin px2rem(20) 0
            width 45%
            height px2rem(60)
            color $color-text1
            box-shadow 0 2px 4px 0 rgba(0,0,0,0.15)
            position relative
            .tips
              display none
          
          .select-item
            background #FF9800
            color #fff
          
          .full-selected
            background #e6e6e6
            color $color-text1
            .tips
              display block
              position absolute
              right 0
              top 0
              height px2rem(35)
              width px2rem(60)
              line-height px2rem(35)
              text-align center
              font-size $font-size-small-s
              color #fff
              background #B3B3B3
              border-bottom-left-radius px2rem(100)
              border-top-right-radius px2rem(100)
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
    .header
      height 30vh
      background url(http://gcms.qncdn.mygear.vip/bg2.png) no-repeat
      background-size 100% 100%

    .remain
      position:fixed;
      bottom: px2rem(150)
      right 0
      color #FF9800
      font-size $font-size-medium
      float right
      padding 0 px2rem(40)
      .num
        font-size $font-size-large
      
  .scroll-view_H{
    width: 100% 
    white-space: nowrap 
  }
  .scroll-view-item_H{
    display flex
    justify-content center
    align-items center
    box-sizing border-box
    font-size $font-size-medium
    color $color-text1
    height: px2rem(80)
    padding px2rem(20)
    display: inline-block 
    line-height px2rem(40)
  }
</style>