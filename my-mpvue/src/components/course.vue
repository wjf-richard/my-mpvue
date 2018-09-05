<template>
  <div class="container ">
    <!-- <div class="tab">
      <a class="tab-item" href="/pages/instructor/main">
        <span class="tab-link">教练</span>
      </a>
      <a  class="tab-item" href="/pages/course/main">
        <span class="tab-link">课程</span>
      </a>
    </div> -->
    <div class="slider-wrapper">
      <swiper class="swiper" 
        indicator-dots="true"
        circular="true" 
        autoplay="true" 
        interval="3000" 
        duration="1000"
        indicator-color="#ffffff"
        indicator-active-color="#0298FF"
      >
        <block v-for="(item, index) in imgUrls" :index="index" :key="key">
          <swiper-item>
            <a>
              <image :src="item" class="slide-image" mode="aspectFill"/>
            </a>
          </swiper-item>
        </block>
      </swiper>
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
      imgUrls: [
        'http://pdwhalwaj.bkt.clouddn.com/timg-8.png',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535191181542&di=3eaa706d3f575f8dbd27209193ec73c9&imgtype=0&src=http%3A%2F%2Fpic33.photophoto.cn%2F20141127%2F0009021411691874_b.jpg',
        'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/319680.jpg',
        'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/319161.jpg'
      ],
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
        console.log(res)
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
  .slider-wrapper
    margin 0 px2rem(40) px2rem(40) px2rem(40)
    position relative
    overflow hidden
    box-sizing content-box
    border-radius px2rem(20)
    box-shadow 0 px2rem(20) px2rem(40) 0 rgba(0,0,0,0.15),
      0 px2rem(8) px2rem(20) 0 rgba(0,0,0,0.15)
    .swiper
      border-radius px2rem(20)
      height px2rem(250)
      swiper-item
        border-radius px2rem(20)
        a
        image
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

