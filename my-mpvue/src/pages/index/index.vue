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
            <a :href="item.url">
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
        <view @click="toInstructorDetail(item.id, openId, id)" class="scroll-view-item" v-for="(item, index) in popularityInstructors" :key="item.id">
          <div class="item">
            <img class="coach-heads" :src="item.avatarUrl" alt="">
            <span class="coach-name">{{ item.name }}</span>
            <p class="job-name">{{ item.profession }}</p>
            <a class="book-btn"  @click="toInstructorDetail(item.id, openId, id)">预约</a>
          </div>
        </view>
      </scroll-view>
    </div>
    <div class="teaching-video">
      <div class="title">
        <h3>教学视频</h3>
      </div>
      <div class="video-list" v-for="(item, index) in articleList" :key="index">
        <div class="video-item">
          <div class="video-header">
            <img :src="item.cover" alt="">
          </div>
          <div class="video-main">
            <span class="video-title">{{item.title}}</span>
            <button class="detail-btn" @click="toCheckDetail(item.id)">查看详情</button>
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
import {getMemberOpenId} from '@/http/member'
import {getArticleList} from '@/http/articles'

export default {
  data () {
    return {
      id: '',
      openId: '',
      imgLists: [],
      popularityInstructors: [],
      hotCourses: [],
      articleList: []
    }
  },
  onLoad () {
    this.getSlidersBar()
    this._getPopularityInstructors()
    this._getHotCourses()
    this.getWxLoginResult()
    this._getArticleList()
  },
  methods: {
    getSlidersBar () {
      getOnly().then((res) => {
        this.imgLists = res.data.data.indexAdvertisement
      })
    },
    toHotCourse (courseId) {
      const url = '/pages/courseDetail/main?courseId=' + courseId
      wx.navigateTo({ url })
    },
    toCheckDetail (articleId) {
      const url = '/pages/articleDetail/main?articleId=' + articleId + '&isData=' + true
      wx.navigateTo({ url })
    },
    toInstructorDetail (instructorId, openId, id) {
      const url = '/pages/instructorDetail/main?instructorId=' + instructorId + '&openId=' + openId + '&id=' + id
      console.log('热门教练', url)
      wx.navigateTo({ url })
    },
    _getArticleList () {
      getArticleList().then((res) => {
        if (res.data.code === ERR_OK) {
          this.articleList = res.data.data
          console.log(this.articleList)
        }
      })
    },
    _getPopularityInstructors () {
      getPopularityInstructors().then((res) => {
        if (res.data.code === ERR_OK) {
          this.popularityInstructors = res.data.data
        }
      }, (err) => { console.log(err) }
      )
    },
    _getHotCourses () {
      getHotCourses().then((res) => {
        if (res.data.code === ERR_OK) {
          this.hotCourses = res.data.data
        }
      }, (err) => { console.log(err) }
      )
    },
    getWxLoginResult () {
      let _this = this
      wx.login({
        success (loginResult) {
          var code = loginResult.code
          if (code) {
            console.log('wx.login code..' + loginResult.code)
          }
        },
        fail (loginError) {
          console.log('微信登录失败，请检查网络状态')
        },
        complete (res) {
          if (res.code) {
            wx.request({
              url: 'https://api.gcms.mygear.cn/wechat_login/get_session_info?code=' + res.code,
              data: {},
              header: {
                'content-type': 'json'
              },
              success: function (res) {
                _this.openId = res.data.data.openid // 返回openid
                _this._getMemberOpenId(_this.openId)
              }
            })
          }
        }
      })
    },
    _getMemberOpenId (openId) {
      this.openId = openId
      getMemberOpenId(openId).then((res) => {
        if (res.data.code === ERR_OK) {
          this.id = res.data.data.id
        }
      }, (err) => {
        console.log(err)
      })
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
            border px2rem(1) solid #4FBEFD
            border-radius px2rem(100)
            line-height px2rem(50)
            font-size $font-size-medium
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
