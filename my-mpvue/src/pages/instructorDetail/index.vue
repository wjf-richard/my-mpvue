<template>
  <div class="container ">
    <div class="instructor-base-msg">
      <div class="head">
        <div class="left">
          <div class="instructor-name-flag">
            <p class="name">刘美佳</p>
            <span class="flag">最强臀部</span>
            <span class="flag">马甲线</span>
          </div>
          <div class="self-introduction">从青葱到成熟，她的生命里一直有健身陪伴，每年定期外出随大师学习，不断自我成长。</div>
          <div class="type">
            <span class="type-item">塑性</span>
            <span class="type-item">减脂</span>
            <span class="type-item">塑臀</span>
          </div>
          <div class="cost"><span>300</span>元 / 小时</div>
        </div>
        <div class="right">
          <img class="instructor-heads" src="http://tc.sinaimg.cn/maxwidth.800/tc.service.weibo.com/img_mp_itc_cn/6c04a51f6d7f9fb62f288c74bd959a75.jpg" alt="">          
        </div>
      </div>
      
    </div>
    <tab></tab>
    <div class="book">预定课程</div>
  </div>
</template>

<script>
import tab from '@/components/tab'

export default {
  components: {
    tab
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .instructor-base-msg
    margin px2rem(35)
    padding px2rem(40) 0 px2rem(40) px2rem(40)
    border-radius px2rem(30)
    overflow hidden
    box-shadow  0 2px 16px 0 rgba(0,0,0,0.15)
    .head
      display flex
      .left
        flex 1
        display flex
        flex-direction column
        justify-content flex-start
        .instructor-name-flag
          display flex
          .name
            font-size $font-size-large
            font-weight bold
          .flag
            height px2rem(30)
            font-size $font-size-small-s
            padding 0 px2rem(12)
            margin-left px2rem(16)
            color $color-background
            background-image url(http://pdwhalwaj.bkt.clouddn.com/flag.png)
            background-repeat no-repeat; 
            background-size 100% 100%
            -moz-background-size 100% 100%
            display flex
            justify-content center
            align-items center
            vertical-align middle
        .self-introduction
          font-size $font-size-small
          padding px2rem(30) 0
          line-height px2rem(34)
          letter-spacing px2rem(1.6)
          color $color-text1
        .type
          .type-item
            font-size $font-size-small-s
            padding px2rem(2) px2rem(16)
            background #F2F2F2
            color $color-text1
            margin-right px2rem(20)
        .cost
          font-size $font-size-small
          color #4FBEFD
          padding px2rem(20) 0 px2rem(40) 0
      .right
        flex .235
        .instructor-heads
          height px2rem(80)
          width px2rem(80)
          border-radius 50%
   
</style>

