<template>
  <div class="contain">
    <scroll-view scroll-x class="top">
      <div class="tabbar" :class="{'tabbar-bottom':currentTab==index}" v-for="(item,index) in tabBar" :key="index" @click="clickTab(index)">
        {{item.title}}
        <span :class="{'active-bottom':currentTab==index}" ></span>
      </div>
    </scroll-view>
    <swiper :current="currentTab" @change="changeTab">
      <swiper-item class="swiper-item" v-for="(item, index) in tabContent" :key="index" >
        <div v-if="item.instructorIntro">
          <div class="content">
            {{item.instructorIntro}}
          </div>
        </div>
        <div v-if="item.intro">
          <div class="content">
            {{item.intro}}
          </div>
        </div>
        <div v-else-if="item.effects">
          <div class="content">
            {{item.effects}}
          </div>
        </div>
        <div class="tiem-wrapper" >
          <div class="time" v-if="item.timeTable" v-for="(timeTableItem, timeIndex) in item.timeTable" :key="timeIndex">
            <span class="time-item">{{timeTableItem.day}}</span>
            <span class="time-item">{{timeTableItem.startTime}}-{{timeTableItem.endTime}}</span>
          </div>
        </div>
      </swiper-item>
      
    </swiper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabBar: [],
      currentTab: 0
    }
  },
  props: {
    tabBar: {
      type: Array,
      default: () => []
    },
    tabContent: {
      type: Array,
      default: () => []
    }
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
  .contain
    margin px2rem(35)
    .top
      margin px2rem(35) 0
      width auto
      line-height px2rem(60)
      white-space nowrap
      display flex
      justify-content flex-start
      align-items center
    .tabbar 
      margin 0 px2rem(20)
      font-size $font-size-medium-x
      color $color-text1
      font-weight 400
      height px2rem(70)
      display inline-block
      position relative
    .tabbar-bottom 
      color #000000
      font-weight 900
    .active-bottom
      position absolute
      bottom 0
      left 33%
      width 50%
      height px2rem(8)
      border-radius px2rem(30)
      background #2196f3
    swiper
      height px2rem(550)
      .swiper-item
        height 100%
        .content
          height 100%
          color $color-text3
          letter-spacing px2rem(1.8)
          line-height px2rem(40)
          font-size $font-size-medium
        .tiem-wrapper
          display flex
          flex-wrap wrap
          justify-content space-between
          .time
            display flex
            justify-content flex-start
            align-items center
            margin-bottom px2rem(40)
            .time-item
              margin-right px2rem(10)
              color #FF9800
              background #FFF2DE
              padding px2rem(10) px2rem(20)
              font-size $font-size-small
              border-radius px2rem(30)



</style>
