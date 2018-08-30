<template>
  <div class="container ">
    <div class="course-base-msg">
      <div class="main">
        <div class="couser-des">
          <div class="tag">高贵</div>
          <div class="course-name">芭蕾舞</div>
        </div>
        <div class="course-photos">
          <img src="http://pdwhalwaj.bkt.clouddn.com/Bitmap.png" alt="">
          <img src="http://pdwhalwaj.bkt.clouddn.com/Bitmap1.png" alt="">
          <img src="http://pdwhalwaj.bkt.clouddn.com/Bitmap2.png" alt="">
        </div>
      </div>
      
    </div>

    <tab></tab>
    
    <!-- <div class="book">预定课程</div> -->
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
  .course-base-msg
    margin px2rem(35)
    
    border-radius px2rem(30)
    box-shadow  0 px2rem(10) px2rem(20) 0 rgba(0,0,0,0.20);
    position relative
    z-index 100
    .main
      .couser-des
        padding px2rem(50) px2rem(35)
        .tag
          margin-bottom px2rem(14)
          font-size $font-size-medium
        .course-name
          font-size $font-size-large
          font-weight 900
      .course-photos
        z-index 10
        display flex
        justify-content space-between
        border-bottom-right-radius px2rem(30)
        border-bottom-left-radius px2rem(30)
        overflow hidden
        img
          height px2rem(243)
          width px2rem(226)

</style>

