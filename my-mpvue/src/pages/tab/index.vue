<template>
  <div class="container">
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
            <instructor></instructor>
          </scroll-view>
        </div>
        <div class="content" v-if="index === 1">
           <scroll-view scroll-y style="height: 92vh" >
            <course></course>
           </scroll-view>
        </div>
      </swiper-item>
      
    </swiper>
  </div>
</template>

<script>
import instructor from '@/components/instructor'
import course from '@/components/course'
export default {
  data () {
    return {
      tabBar: [
        { 'title': '教练' },
        { 'title': '课程' }
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
    instructor,
    course
  },
  methods: {
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
    margin 0 px2rem(40) px2rem(20) px2rem(40)
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
    color: $color-text0
    font-weight 900
  
  .active-bottom
    position absolute
    bottom 0
    left px2rem(4)
    width px2rem(52)
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
