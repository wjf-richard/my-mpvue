<template>
  <div class="content-page uk-body">
    <div class="calendar">
      <button class="month-less" @click="prevMonth()"></button>
      <h4>{{ year }}年{{ month }}月{{ date }}日</h4>
      <button class="month-add" @click="nextMonth()"></button>
      <table class="sign_tab" border="0px" cellpadding="0px" cellspacing="0px">
        <thead>
          <tr>
            <th>日</th>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dateArr" v-if="true" :key="index">
            <!-- <td v-for="dateData in item" :class="{ 'cur_day': dateData == date, 'ui-state-default': true }" v-if="isCheck(dateData)">
            </td>
            <td v-else :class="{ 'over':dateData == '', 'cur_day': dateData == date }">
              {{dateData}}
            </td> -->
            <td class="over" v-for="(dateData, itemIndex) in item" 
              :key="itemIndex"
              :class="{ 'cur_day' : dateData ===date}">
              {{dateData}}
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      today: new Date(),
      year: '',
      month: '',
      day: '',
      date: '',
      dateArr: [],
      checkin: [1, 3, 5, 7, 20]
    }
  },
  created () {
    this.year = this.today.getFullYear()
    this.month = this.today.getMonth() + 1
    this.day = this.today.getDay()
    this.date = this.today.getDate()
    this.getCalendar()
  },
  methods: {
    isLeap () {
      console.log(this.year)
      const year = this.year
      if (year % 4 === 0 && year % 100 > 0) {
        return true
      } else if (year % 400 === 0 && year % 3200 > 0) {
        return true
      } else {
        return false
      }
    },
    getLen () {
      const month = this.month
      if (month === 2) {
        if (this.isLeap) {
          return 29
        } else {
          return 28
        }
      } else {
        if (month < 8) {
          if (month % 2 > 0) {
            return 31
          } else {
            return 30
          }
        } else {
          if (month % 2 > 0) {
            return 30
          } else {
            return 31
          }
        }
      }
    },
    getCalendarTime () {
      return this.year + '-' + this.month + '-' + this.date
    },
    getCalendar () {
      var len = this.getLen()
      var d = new Date(this.year, this.month - 1, 1)
      var dfw = d.getDay()
      var arr = []
      // console.log(arr)
      var tem = 0
      for (var i = 0; i < 6; i++) {
        arr[i] = []
        for (var j = 0; j < 7; j++) {
          tem++
          if (tem - dfw > 0 && tem - dfw <= len) {
            arr[i][j] = tem - dfw
          } else {
            arr[i][j] = ''
          }
        }
      }
      this.dateArr = arr
      console.log(this.dateArr)
    },
    nextMonth () {
      if (this.month === 12) {
        this.year++
        this.month = 1
      } else {
        this.month++
      }
      this.getCalendar()
    },
    prevMonth () {
      if (this.month === 1) {
        this.year--
        this.month = 12
      } else {
        this.month--
      }
      this.getCalendar()
    },
    contains (arr) {
      console.log(arr)
      if (
        (arr[0] === '') &&
        (arr[1] === '') &&
        (arr[2] === '') &&
        (arr[3] === '') &&
        (arr[4] === '') &&
        (arr[5] === '') &&
        (arr[6] === '')
      ) {
        return false
      } else {
        console.log('是的')
        return true
      }
    },
    isCheck (index) {
      console.log('index', index)
      for (let i in this.checkin) {
        if (index === this.checkin[i]) {
          console.log('真的')
          return true
        }
      }
      return false
    }
  }
}
</script>

<style scoped lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .calendar 
    width 100%
    margin px2rem(100) 0 px2rem(40) 0
    color #555
    position relative


  .calendar h4 
    border-bottom px2rem(4) solid #5bd999
    text-align center
    font-size px2rem(44)
    font-weight 700
    margin-bottom 0px
    padding px2rem(24) 0


  .calendar button 
    position absolute
    width px2rem(50)
    height px2rem(50)
    top px2rem(30)

  .calendar button:focus
    border none
    outline none

  .calendar button.month-less 
    left px2rem(40)
    background url(./left-icon.png) no-repeat left -60px

  .calendar button.month-add 
    right px2rem(40)
    background url(./right-icon.png) no-repeat left -60px


  .calendar .sign_tab 
    width 100%
    border-collapse collapse
    border px2rem(2) solid #e8e8e8
    border-top 0
    table-layout fixed

  .calendar .sign_tab thead tr, .calendar .sign_tab tbody tr
    display flex
    justify-content center
    align-items center
  .calendar .sign_tab th, .calendar .sign_tab td
    flex 1
    display flex
    justify-content center
    align-items center
    text-align center
    height 14.28571428571429vw
    font-weight 700


  .calendar .sign_tab td 
    border 1px solid #e8e8e8
    height 14.28571428571429vw
    text-align center
    font-size px2rem(30)
    font-family arial


  .calendar .sign_tab td.over 
    background-color #fff
    border-left 0
    border-right 0

  .calendar .ui-state-default
    background url(./checkin.png) no-repeat center center

  .calendar .sign_tab td.cur_day 
    background-color #FFD2D2
    color #FFF

</style>