<template>
  <div class="loading">
    <img class="loadingImg" src="./loading.gif">
    <p class="desc">正在载入...</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  @import '~common/stylus/mixin.styl'

  .loading
    width: 100%
    display flex
    margin-top px2rem(100)
    justify-content center
    align-items center
    flex-direction column
    .loadingImg
      width px2rem(48)
      height px2rem(48)
    .desc
      width px2rem(118)
      height px2rem(40)
      line-height: px2rem(40)
      font-size: $font-size-small
      color: $color-text2
</style>
