<template>
  <div class="container">
    <div class="header">
      <h3>{{articleContent.article.title}}</h3>
    </div>
    <div class="content">
      {{articleContent.content}}
    </div>
    
  </div>
</template>

<script>
import {ERR_OK} from '@/http/config'
import {getArticleDetail} from '@/http/articles'
export default {
  data () {
    return {
      articleId: '',
      articleContent: ''
    }
  },
  onLoad (options) {
    this.articleId = options.articleId
    console.log(this.articleId)
    this._getArticleDetail(this.articleId)
    // 设置时间
  },
  methods: {
    _getArticleDetail (articleId) {
      getArticleDetail(articleId).then((res) => {
        if (res.data.code === ERR_OK) {
          this.articleContent = res.data.data
          console.log(res)
        } else {
          this.isData = false
        }
      })
    }
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