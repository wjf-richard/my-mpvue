<template>
  <div class="container">
    <div class="header">
      <h3>{{title}}</h3>
    </div>
    <div class="content">
      <wxParse :content="articleContent" />
    </div>
    <div class="loading-container" v-if="isData">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import {ERR_OK} from '@/http/config'
import {getArticleDetail} from '@/http/articles'
import wxParse from 'mpvue-wxparse'
export default {
  data () {
    return {
      articleId: '',
      title: '',
      articleContent: '',
      isData: true
    }
  },
  onLoad (options) {
    Object.assign(this.$data, this.$options.data())
    this.articleId = options.articleId
    this.isData = options.isData
    console.log(this.articleId)
    this._getArticleDetail(this.articleId)
    // 设置时间
  },
  methods: {
    _getArticleDetail (articleId) {
      getArticleDetail(articleId).then((res) => {
        if (res.data.code === ERR_OK) {
          this.articleContent = res.data.data.content
          this.title = res.data.data.article.title
          console.log(this.articleContent)
          this.isData = false
        } else {
          this.isData = false
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