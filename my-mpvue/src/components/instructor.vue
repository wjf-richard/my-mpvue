<template>
  <div class="container ">
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
              <image :src="item.image" class="slide-image" mode="aspectFill"/>
            </a>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="instructor-list">
      <div class="instructor-item" v-for="(item, index) in instructors" :key="item.id" @click="toInstructorDetail(item.id)">
        <div class="left">
          <img class="instructor-heads" :src="item.avatarUrl" alt="">
        </div>
        <div class="mid">
          <div class="mid-content">
            <div class="instructor-name-flag">
              <p class="name">{{item.name}}</p>
              <span class="flag" v-for="(flagItem, flagIndex) in item.specialities" :key="flagIndex">{{flagItem}}</span>
            </div>
            <div class="cost"><span>{{item.fee}}</span>元 / 小时</div>
            <div class="type">
              <span class="type-item"v-for="(tagsItem, tagsIndex) in item.tags" :key="tagsIndex">{{tagsItem}}</span>
              
            </div>
          </div>
        </div>
        <div class="right">
          <a class="book-btn" @click="toInstructorDetail(item.id)">预约</a>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import {getOnly} from '@/http/setting'
import {getInstructorsList} from '@/http/instructors'
import {ERR_OK} from '@/http/config'
export default {
  data () {
    return {
      imgUrls: [],
      instructors: [],
      isLoaded: false
    }
  },
  onLoad () {
    this._getOnly()
    this._getInstructorsList()
  },
  methods: {
    _getOnly () {
      getOnly().then((res) => {
        this.imgUrls = res.data.data.instructorAdvertisement
        console.log('教练轮播', this.imgUrls)
      })
    },
    toInstructorDetail (instructorId) {
      const url = '/pages/instructorDetail/main?instructorId=' + instructorId
      // console.log('热门教练', instructorId)
      wx.navigateTo({ url })
    },
    _getInstructorsList () {
      getInstructorsList().then((res) => {
        if (res.data.code === ERR_OK) {
          this.instructors = res.data.data
          this.isLoaded = true
          this.$emit('isLoaded', this.isLoaded)
        }
        // console.log(res)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  // .container
  //   height px2rem(260)
  //   width 100%
  //   background #4ba6f8
  //   border-radius 0 0 50% 0
  //   background #0298ff
  // .tab
  //   display: flex
  //   height: 44px
  //   line-height: 44px
  //   justify-content flex-start
  //   font-size: $font-size-medium
  //   margin 0 px2rem(40) 0 px2rem(40)
  //   .tab-item
  //     margin-right px2rem(60)
  //     text-align: center
  //     .tab-link
  //       padding-bottom: px2rem(10)
  //       color: $color-background
      
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
  
  .instructor-video
    .video
      width 100%
      object-fits fill

  .instructor-list
    display flex
    flex-direction column
    margin 0 0 0 px2rem(40)
    .instructor-item
      padding px2rem(40) px2rem(40) px2rem(40) 0
      display flex
      justify-content space-between
      border-bottom px2rem(1) solid $color-border
      .left
        .instructor-heads
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
          .instructor-name-flag
            display flex
            .name
              font-size $font-size-medium-x
              font-weight 900
            .flag
              font-size $font-size-small-s
              padding 0 px2rem(12)
              margin-left px2rem(10)
              color $color-background
              background-image url(http://pdwhalwaj.bkt.clouddn.com/flag.png)
              background-repeat no-repeat; 
              background-size 100% 100%
              -moz-background-size 100% 100%
              display flex
              justify-content center
              align-items center
              vertical-align middle
          .cost
            font-size $font-size-small
            color $color-text1
            padding px2rem(18) 0
          .type
            .type-item
              font-size $font-size-small-s
              padding px2rem(2) px2rem(16)
              background #F2F2F2
              color $color-text1
              margin-right px2rem(20)
      .right
        .book-btn
          height px2rem(40)
          width px2rem(60)
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

