<template>
  <div class="container ">
    <div class="course-type-list">
      <div class="hot-course">
        <img src="http://pdwhalwaj.bkt.clouddn.com/yujia.png" alt="瑜伽">
      </div>
      <div class="other-courses">
        <div class="other-course-item boji">
          <img src="http://pdwhalwaj.bkt.clouddn.com/boji.png" alt="搏击">
        </div>
        <div class="other-course-item ">
          <img src="http://pdwhalwaj.bkt.clouddn.com/ticao.png" alt="体操">
        </div>
      </div>
    </div>
    <div class="course-list">
      <div class="course-item" v-for="(item, index) in courseList" :key="item.id" @click="toHotCourse()">
        <!-- <div class="left">
          <img class="course-heads" :src="item.cover" alt="">
        </div> -->
        <div class="mid">
          <div class="mid-content">
            <div class="course-name-flag">
              <p class="name">{{item.name}}</p>
              <div class="type">
                <span class="type-item" v-for="(innerItem, innerIndex) in item.tags" :key="innerIndex">{{innerItem}}</span>
              </div>
            </div>
            <div class="brief">{{item.brief}}</div>
            <div class="time">{{item.time}}</div>
          </div>
        </div>
        <!-- <div class="right">
          <a class="book-btn"@click="toHotCourse()">预约</a>
        </div> -->
      </div>
    </div>
    
  </div>
</template>

<script>
import {ERR_OK} from '@/http/config'
import {getCourseList} from '@/http/course'
export default {
  data () {
    return {
      courseList: []
    }
  },
  onLoad () {
    this._getCourseList()
  },
  methods: {
    toHotCourse () {
      const url = '/pages/courseDetail/main'
      wx.navigateTo({ url })
    },
    _getCourseList () {
      getCourseList().then((res) => {
        if (res.data.code === ERR_OK) {
          console.log(res.data.data)
          this.courseList = res.data.data
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .course-type-list
    display flex
    margin px2rem(40)
    
    .boji
      margin-bottom px2rem(6)
    .hot-course
      width 60%
      height px2rem(271)
      margin-right px2rem(6)
      box-sizing border-box
      img
        width 100%
        height 100%
    .other-courses
      width 40%
      .other-course-item
        position relative
        height px2rem(135)
        box-sizing border-box
        img
          width 100%
          height 100%
        
  .course-list
    display flex
    flex-direction column
    margin 0 0 0 px2rem(40)
    .course-item
      padding px2rem(40) px2rem(40) px2rem(40) 0
      display flex
      justify-content space-between
      border-bottom 1px solid $color-border
      .left
        .course-heads
          height px2rem(80)
          width px2rem(80)
          border-radius 50%
      .mid
        flex 1
        margin 0 px2rem(30)
        .mid-content
          display flex
          flex-direction column
          justify-content flex-start
          .course-name-flag
            display flex
            .name
              font-size $font-size-medium-x
              font-weight 900
            .type
              padding 0 px2rem(14)
              display flex
              justify-content center
              align-items center
              .type-item
                font-size $font-size-small-s
                padding px2rem(6) px2rem(16)
                background #F2F2F2
                color $color-text1
                margin-right px2rem(20)
          .time, .brief
            font-size $font-size-medium
            color #FF9800
            padding px2rem(24) 0 0 0
          .brief
            font-size $font-size-small
            color $color-text1
            line-height px2rem(34)
            no-wrap-more(2)
      .right
        .book-btn
          height px2rem(40)
          width px2rem(60)
          cursor pointer
          display flex
          justify-content center
          align-items center
          border-radius px2rem(50)
          padding px2rem(2) px2rem(20)
          font-size $font-size-small-md
          background linear-gradient(90deg, #00C5FF 0%, #0298FF 100%)
          color $color-background
          border none
          margin px2rem(30) 0

</style>

