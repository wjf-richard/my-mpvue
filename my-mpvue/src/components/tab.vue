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
        <div class="content">
            {{item.content}}
        </div>
        <div class="time" v-show="item.isTime">
          <span class="time-item">{{item.week}}</span>
          <span class="time-item">{{item.time}}</span>
        </div>
      </swiper-item>
      
    </swiper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabBar: [
        { 'title': '课程介绍' },
        { 'title': '训练效果' }
      ],
      tabContent: [
        { 'content': '健身教练，分为团体操课程教练和私人教练，组织健身者做计划中的健身运动或健身操。健身教练是指在健身俱乐部中指导会员进行训练的工作人员，其作具有互动性、针对性等特点，并且是按小时收费的。',
          'isTime': true,
          'week': '星期二',
          'time': '19:00 -20:00'
        },
        { 'content': '平板支撑（plank）是一种类似于俯卧撑的肌肉训练方法，在锻炼时主要呈俯卧姿势，可以有效的锻炼腹横肌，被公认为训练核心肌群的有效方法。',
          'isTime': false
        }
      ],
      currentTab: 0
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
      margin-right px2rem(40)
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
      left px2rem(38)
      width px2rem(52)
      height px2rem(8)
      border-radius px2rem(30)
      background #2196f3
    
    .swiper-item
      .content
        color $color-text3
        letter-spacing px2rem(1.8)
        line-height px2rem(40)
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
