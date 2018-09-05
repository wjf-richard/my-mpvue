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
        <div v-if="index < 2">
          <div class="content">
            {{item.content}}
          </div>
        </div>
        <div v-if="index === 2">
          <div class="wrapper">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
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
      tabBar: [
        { 'title': '课程介绍' },
        { 'title': '训练效果' },
        { 'title': '时间' }
      ],
      tabContent: [
        { 'content': '健身教练，分为团体操课程教练和私人教练，组织健身者做计划中的健身运动或健身操。健身教练是指在健身俱乐部中指导会员进行训练的工作人员，其作具有互动性、针对性等特点，并且是按小时收费的。',
          'isTime': true,
          'week': '星期二',
          'time': '19:00 -20:00'
        },
        { 'content': '平板支撑（plank）是一种类似于俯卧撑的肌肉训练方法，在锻炼时主要呈俯卧姿势，可以有效的锻炼腹横肌，被公认为训练核心肌群的有效方法。',
          'isTime': false
        },
        { 'content': '时间时间',
          'time': '18:00'
        }
      ],
      currentTab: 0
    }
  },
  // props: {
  //   tabBar: {
  //     type: Array,
  //     default: []
  //   },
  //   tabContent: {
  //     type: Array,
  //     default: []
  //   }
  // },
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
      .wrapper
        display grid
        display -ms-grid
        grid-template-columns: 30% 30% 30%
        -ms-grid-columns: 30% 30% 30%
        grid-template-rows: px2rem(50) px2rem(50)
        -ms-grid-rows: px2rem(50) px2rem(50)



</style>
