<template>
  <div class="container">
    <div class="header">
      <h3>{{baseMsg.name}}</h3>
    </div>
    <div class="content">
      <wxParse :content="content" />
    </div>
    <div class="loading-container" v-if="content === ' '">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import {ERR_OK} from '@/http/config'
import {getApparatusDetail} from '@/http/apparatus'
import wxParse from 'mpvue-wxparse'
export default {
  data () {
    return {
      articleId: '',
      articleContent: '',
      baseMsg: '',
      content: '',
      isData: true
    }
  },
  onLoad (options) {
    Object.assign(this.$data, this.$options.data())
    this.apparatusId = options.apparatusId
    this._getApparatusDetail(this.apparatusId)
    // 设置时间
  },
  methods: {
    _getApparatusDetail (articleId) {
      getApparatusDetail(articleId).then((res) => {
        if (res.data.code === ERR_OK) {
          console.log('详情', res)
          this.content = res.data.data.content
          this.baseMsg = res.data.data.apparatus
        }
      })
    }
  },
  components: {
    Loading,
    wxParse
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  
  .container
    padding px2rem(40)
    .header
     font-weight 700
     text-align center
     margin-bottom px2rem(20)
    .content
      padding px2rem(20)
      letter-spacing px2rem(10)
      line-height px2rem(40)
      overflow auto
</style>