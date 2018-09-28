<template>
  <div class="container ">
    <div class="instructor-base-msg" >
      <div class="head">
        <div class="left">
          <div class="instructor-name-flag">
            <p class="name">{{instructorDetail.instructor.name}}</p>
            <span class="flag" v-for="(item, index) in instructorDetail.instructor.specialities" :key="index">{{item}}</span>
          </div>
          <div class="self-introduction">{{instructorDetail.instructor.brief}}</div>
          <div class="type">
            <span class="type-item"v-for="(tagsItem, index) in instructorDetail.instructor.tags" :key="index">{{tagsItem}}</span>
          </div>
        </div>
        <div class="right">
          <img class="instructor-heads" :src="instructorDetail.instructor.avatarUrl" alt="">
        </div>
      </div>
      
    </div>
    <tab v-if="tabDeatil" :tabContent="tabDeatil" :tabBar="tabBar"></tab>
    <div class="book" v-if="!isPaid" @click="toPay()">开通VIP会员</div>
    <div class="book" v-else-if="isPaid && !isBought" @click="toBuyCourses()">购买课程</div>
    <div class="book" v-else-if="isBought" @click="toBookInstructor()">预定课程</div>
  </div>
</template>

<script>
import {ERR_OK} from '@/http/config'
import {getPopularityInstructors, getInstructorsDetail, getReastTimes} from '@/http/instructors'
import tab from '@/components/tab'
import {getMemberOpenId, checkMemberIsPay} from '@/http/member'
import {getInstructorsList} from '@/http/bookInstructor'

export default {
  data () {
    return {
      openId: '',
      id: '',
      instructorId: '',
      isPaid: false,
      isBought: false,
      instructorDetail: {
        instructor: []
      },
      tabDeatil: [],
      tabBar: [
        { 'title': '课程介绍' },
        { 'title': '训练效果' },
        { 'title': '时间' }
      ]
    }
  },
  mounted () {
    // 获取openID
    this.instructorDetail.instructorId = this.instructorId
    this._getInstructorsDetail(this.instructorDetail.instructorId)
    this._getReastTimes(this.instructorId, this.id)
  },
  onLoad (options) {
    Object.assign(this.$data, this.$options.data())
    this.openId = options.openId
    this.id = options.id
    this._checkMemberIsPay(this.openId)
    this.instructorId = options.instructorId
  },
  methods: {
    toPay () {
      const url = '/pages/pay/main?openId=' + this.openId
      wx.navigateTo({ url })
    },
    toBuyCourses () {
      const url = '/pages/selectCourses/main?instructorId=' + this.instructorId + '&openId=' + this.openId + '&id=' + this.id
      wx.navigateTo({ url })
    },
    toBookInstructor () {
      const url = '/pages/bookInstructor/main?instructorId=' + this.instructorId + '&id=' + this.id
      wx.navigateTo({ url })
    },
    _getReastTimes (instructorId, id) {
      getReastTimes(instructorId, id).then((res) => {
        if (res.data.code === ERR_OK) {
          this.isBought = true
        }
      })
    },
    _checkMemberIsPay (openId) {
      checkMemberIsPay(openId).then((res) => {
        if (res.data.code === 40004) {
          this.isPaid = false
        } else {
          if (res.data.data.isActivated === true) {
            this.isPaid = res.data.data.isPaid
            this.isActivated = res.data.data.isActivated
            this.isBought = false
            this._getInstructorsList(this.instructorId, this.id)
            this._getMemberOpenId(openId)
          } else if (res.data.data.isPaid === true) {
            this.isPaid = res.data.data.isPaid
            this.isBought = false
            this._getInstructorsList(this.instructorId, this.id)
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
        console.log('获取openID', res)
        if (res.data.code === ERR_OK) {
          this.id = res.data.data.id

          this.isLogin = true
          this.isNotLogin = false
          console.log('已经登录')
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
    _getInstructorsList (instructorId, id) {
      getInstructorsList(instructorId, id).then((res) => {
        if (res.data.code === ERR_OK) {
          this.isBought = true
        } else {
          this.isBought = false
        }
      })
    },
    _getPopularityInstructors () {
      getPopularityInstructors().then((res) => {
        console.log(res)
      })
    },
    _getInstructorsDetail (instructorId) {
      getInstructorsDetail(instructorId).then((res) => {
        if (res.data.code === ERR_OK) {
          this.tabDeatil = [ ]
          this.instructorDetail.instructor = res.data.data.instructor
          let instructorIntro = {intro: res.data.data.intro}
          let instructorEffects = {effects: res.data.data.effects}
          let timeTable = {timeTable: res.data.data.timeTable}
          this.tabDeatil.push(instructorIntro, instructorEffects, timeTable)
        }
      })
    }
  },
  components: {
    tab
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .instructor-base-msg
    margin px2rem(35)
    padding px2rem(40) 0 px2rem(40) px2rem(40)
    border-radius px2rem(30)
    overflow hidden
    box-shadow  0 2px 16px 0 rgba(0,0,0,0.15)
    .head
      display flex
      .left
        flex 1
        display flex
        flex-direction column
        justify-content flex-start
        .instructor-name-flag
          display flex
          .name
            font-size $font-size-large
            font-weight bold
          .flag
            height px2rem(30)
            font-size $font-size-small-s
            padding 0 px2rem(12)
            margin-left px2rem(16)
            color $color-background
            background-image url(http://gcms.qncdn.mygear.vip/flag.png)
            background-repeat no-repeat; 
            background-size 100% 100%
            -moz-background-size 100% 100%
            display flex
            justify-content center
            align-items center
            vertical-align middle
        .self-introduction
          font-size $font-size-small
          padding px2rem(30) 0
          line-height px2rem(34)
          letter-spacing px2rem(1.6)
          color $color-text1
        .type
          display flex
          flex-wrap wrap

          .type-item
            font-size $font-size-small-s
            padding px2rem(10) px2rem(16)
            background #F2F2F2
            color $color-text1
            margin 0 px2rem(20) px2rem(20) 0
        .cost
          font-size $font-size-small
          color #4FBEFD
          padding px2rem(20) 0 px2rem(40) 0
      .right
        flex .235
        .instructor-heads
          height px2rem(80)
          width px2rem(80)
          border-radius 50%
   
</style>

