<template>
  <div class="container">
    <div class="slider-wrapper">
      <swiper class="swiper"
        indicator-dots="true"
        circular="true" 
        autoplay="true" 
        interval="3000" 
        duration="1000"
        indicator-color="#ffffff"
        indicator-active-color="#0298FF">
        <block v-for="(item, index) in imgLists" :index="index" :key="key">
          <swiper-item>
            <a>
              <image :src="item.image" class="slide-image" mode="aspectFill"/>
            </a>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="hot-course">
      <div class="title">
        <h3>热门课程</h3>
        
      </div>
      <scroll-view scroll-x class="course-scroll" >
        <view  class="scroll-view-item" v-for="(item, index) in hotCourses" :key="item.id" @click="toHotCourse(item.id)">
          <div class="item">
            <img :src="item.cover" alt="">
            <span class="item-title">{{ item.name }}</span>
          </div>
        </view>
      </scroll-view>
    </div>
    <div class="hot-coach">
      <div class="title">
        <h3>人气教练</h3>
      </div>
      <scroll-view scroll-x class="coach-scroll" >
        <view @click="toInstructorDetail(item.id)" class="scroll-view-item" v-for="(item, index) in popularityInstructors" :key="item.id">
          <div class="item">
            <img class="coach-heads" :src=" item.avatarUrl " alt="">
            <span class="coach-name">{{ item.name }}</span>
            <p class="job-name">{{ item.profession }}</p>
            <a class="book-btn"  @click="toInstructorDetail(item.id)">预约</a>
          </div>
        </view>
      </scroll-view>
    </div>
    <div class="teaching-video">
      <div class="title">
        <h3>教学视频</h3>
      </div>
      <div class="video-list">
        <div class="video-item">
          <div class="video-header">
            <img src="http://pdwhalwaj.bkt.clouddn.com/timg-8.png" alt="">
          </div>
          <div class="video-main">
            <p class="video-num">
              观看人数： <span class="view-num">9876</span>人
            </p>
            <span class="video-title">跑步机的正确使用方式</span>
            <button class="detail-btn">查看详情</button>
          </div>
        </div>
        <div class="video-item">
          <div class="video-header">
            <img src="http://pdwhalwaj.bkt.clouddn.com/timg-9.png?imageView2/2/w/200|imageslim" alt="" width="100%">
          </div>
          <div class="video-main">
            <p class="video-num">
              观看人数： <span class="view-num">9876</span>人
            </p>
            <span class="video-title">关于健身中营养餐的比例适配的问题关于健身中营养餐的比例适配的问题关于健身中营养餐的比例适配的问题关于健身中营养餐的比例适配的问题</span>
            <button class="detail-btn">查看详情</button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import {ERR_OK} from '@/http/config'
import {getPopularityInstructors} from '@/http/instructors'
import {getHotCourses} from '@/http/course'
import {getOnly} from '@/http/setting'
export default {
  data () {
    return {
      imgLists: [],
      popularityInstructors: [],
      hotCourses: []
    }
  },
  onLoad () {
    this.getSlidersBar()
    this._getPopularityInstructors()
    this._getHotCourses()
  },
  methods: {
    getSlidersBar () {
      getOnly().then((res) => {
        // console.log('轮播', res)
        this.imgLists = res.data.data.indexAdvertisement
      })
    },
    toHotCourse (courseId) {
      const url = '/pages/courseDetail/main?courseId=' + courseId
      console.log('热门课程', courseId)
      wx.navigateTo({ url })
    },
    toInstructorDetail (instructorId) {
      const url = '/pages/instructorDetail/main?instructorId=' + instructorId
      // console.log('热门教练', instructorId)
      wx.navigateTo({ url })
    },
    _getPopularityInstructors () {
      getPopularityInstructors().then((res) => {
        if (res.data.code === ERR_OK) {
          this.popularityInstructors = res.data.data
          // console.log(this.popularityInstructors[0].id)
        }
      }, (err) => { console.log(err) }
      )
    },
    _getHotCourses () {
      getHotCourses().then((res) => {
        // console.log(res)
        if (res.data.code === ERR_OK) {
          this.hotCourses = res.data.data
          // console.log(this.hotCourses)
        }
      }, (err) => { console.log(err) }
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl';
  @import '~common/stylus/mixin.styl';
  .container
    background: $color-background-d
    .slider-wrapper
      margin 0 20px 20px 20px
      position relative
      overflow hidden
      box-sizing content-box
      border-radius 10px
      box-shadow 0 10px 20px 0 rgba(0,0,0,0.15),
        0 4px 10px 0 rgba(0,0,0,0.15)
      .swiper
        border-radius 10px
        height px2rem(250)
        swiper-item
          border-radius 10px
          a
          image
            width 100%
            height 100%
    .hot-course
    .hot-coach
    .teaching-video
      .title
        display flex
        justify-content space-between
        align-items center
        margin px2rem(40) px2rem(40)
      h3
        font-weight bold
    .course-scroll
      //width: 1000rpx;  //注意：不能加宽度！！！否则会失效
      display: flex;
      white-space: nowrap; //很重要

      .scroll-view-item
        height: px2rem(260);
        width: px2rem(378);
        display: inline-block; //很重要
        margin-left: px2rem(40)
        border-radius px2rem(20)
        background $color-background
        .item
          display flex
          justify-content flex-start
          flex-direction column
          height 100%
          img
            width 100%
            height 80%
            border-radius px2rem(20)

          .item-title
            height 20%
            font-size $font-size-medium
            color $color-text1
            display flex
            justify-content flex-start
            align-items center
            padding-left px2rem(10)

    .coach-scroll
      //width: 1000rpx;  //注意：不能加宽度！！！否则会失效
      display: flex;
      white-space: nowrap; //很重要
      .scroll-view-item
        height: px2rem(320);
        width: px2rem(230);
        display: inline-block; //很重要
        margin-left: px2rem(40)
        border-radius px2rem(20)
        background $color-background

        .item
          display flex
          justify-content center
          align-items center
          flex-direction column
          height 100%

          .coach-heads
            height px2rem(100)
            width px2rem(100)
            border-radius 50%

          .coach-name
            font-size $font-size-small
            padding px2rem(15) 0

          .job-name
            font-size $font-size-small-ms
            color $color-text2

          .book-btn
            height px2rem(40)
            width px2rem(80)
            display flex
            justify-content center
            align-items center
            border-radius px2rem(50)
            padding px2rem(2) px2rem(20)
            font-size $font-size-small
            background linear-gradient(90deg, #00C5FF 0%, #0298FF 100%)
            color $color-background
            border none
            margin px2rem(30) 0

          .item-title
            height 20%
            font-size $font-size-medium
            color $color-text1
            display flex
            justify-content flex-start
            align-items center
            padding-left px2rem(10)
    .video-list
      //width: 1000rpx;  //注意：不能加宽度！！！否则会失效
      display flex
      white-space nowrap //很重要
      display inline-block //很重要
      background $color-background
      width 100%

      .video-item
        display flex
        flex-direction column
        justify-content flex-start
        border-bottom 1px solid $color-background-d
        .video-header
          height 100%
          width 100%
          position relative
          padding-top: 56%;
          overflow: hidden;
          img
            width:100%;
            height 100%
            position: absolute;
            top:0;
        .video-main
          display flex
          flex-direction column
          align-content space-around
          padding px2rem(30) px2rem(30) px2rem(40) px2rem(30)
          .video-num
            font-size $font-size-small
            color $color-text2
            margin-bottom px2rem(20)
          .video-title
            font-size $font-size-medium-x
            white-space pre-line
            no-wrap-more(2)
            line-height px2rem(40)
            font-weight bold
          .detail-btn
            color #4FBEFD
            width px2rem(180)
            font-weight bold
            margin px2rem(40) 0 0 0
            background #fff
            padding px2rem(5) px2rem(30)
            border 1px solid #4FBEFD
            border-radius px2rem(100)
            line-height px2rem(50)
            font-size $font-size-medium
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
