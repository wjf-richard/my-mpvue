<template>
  <div class="container">
    <div class="loading-container" v-if="isDataLoaded">
      <loading></loading>
    </div>
    <div v-if="isShow" >
      <scroll-view scroll-x class="top">
        <div class="tabbar" :class="{'tabbar-bottom':currentTab==index}" v-for="(item,index) in tabBar" :key="index" @click="clickTab(index)">
          {{item.title}}
          <span :class="{'active-bottom':currentTab==index}" ></span>
        </div>
      </scroll-view>
      <swiper :current="currentTab" @change="changeTab" >
        <swiper-item class="swiper-item" v-for="(item, index) in tabContent" :key="index" >
          <div class="content" v-if="index === 0">
            <scroll-view scroll-y style="height: 92vh" >
              <instructor @isLoaded="isInstructorData"></instructor>
            </scroll-view>
          </div>
          <div class="content" v-if="index === 1">
            <scroll-view scroll-y style="height: 92vh" >
              <course @isLoaded="isCourseData"></course>
            </scroll-view>
          </div>
        </swiper-item>
      </swiper>

    </div>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import instructor from '@/components/instructor'
import course from '@/components/course'
export default {
  data () {
    return {
      isDataLoaded: true,
      isShow: false,
      isInstructorLoaded: false,
      isCourseLoaded: false,
      tabBar: [
        { 'title': '教练信息' },
        { 'title': '课程介绍' }
      ],
      tabContent: [
        { 'content': 'instructor'
        },
        { 'content': 'course'
        }
      ],
      currentTab: 0
    }
  },
  components: {
    Loading,
    instructor,
    course
  },
  mounted () {
    this.isAllDataLoaded()
  },
  methods: {
    isAllDataLoaded () {
      if ((this.isInstructorData) && (this.isCourseData)) {
        this.isDataLoaded = false
        this.isShow = true
      }
    },
    isInstructorData (msg) {
      console.log(msg)
      this.isInstructorData = msg
    },
    isCourseData (msg) {
      console.log(msg)
      this.isCourseData = msg
    },
    clickTab (e) {
      this.currentTab = e
    },
    changeTab (e) {
      this.currentTab = e.mp.detail.current
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .container
    width 100%
    position fixed
  .top
    margin px2rem(20) px2rem(40)
    width auto
    line-height px2rem(60)
    white-space nowrap
    display flex
    
    
  .tabbar
    flex 1
    text-align center
    margin-right px2rem(40)
    font-size $font-size-medium-x
    color $color-text1
    font-weight 400
    height px2rem(70)
    display inline-block
    position relative
  

  .tabbar-bottom
    font-size $font-size-large
    color: $color-text0
    font-weight 900
  
  .active-bottom
    position absolute
    bottom 0
    left 25%
    width 50%
    height px2rem(8)
    border-radius px2rem(30)
    background #2196f3
  swiper
    height 100vh
  .swiper-item
    width 100%
    height 100%
    .content
      color #000
      font-size $font-size-medium
    .time
      display flex
      justify-content flex-start
      align-items center
      margin-top px2rem(40)
      .time-item
        margin-right px2rem(10)
        color #FF9800
        background #FFF2DE
        padding px2rem(10) px2rem(20)
        font-size $font-size-small
        border-radius px2rem(30)



</style>
