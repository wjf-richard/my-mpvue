<template>
  <div class="container ">
    <div class="apparatus-list">
      <div class="apparatus-item" v-for="(item, index) in apparatusList" :key="index" @click="toApparatusDetail(item.id)">
        <div class="left">
          <img :src="item.cover" alt="器械图片">
        </div>
        <div class="right">
          <h3 class="apparatus-name">{{item.name}}</h3>
          <p class="apparatus-dec">{{item.description}}</p>
          <div class="type">
            <span class="type-item" 
              v-for="(tagsItem, tagsIndex) in item.tags" 
              :key="tagsIndex"
            >{{tagsItem}}</span>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getApparatusList} from '@/http/apparatus'
// import {ERR_OK} from '@/http/config'

export default {
  data () {
    return {
      apparatusList: []
    }
  },
  onLoad () {
    this._getApparatusList()
  },
  methods: {
    _getApparatusList () {
      getApparatusList().then((res) => {
        console.log('器械', res)
        this.apparatusList = res.data.data
      })
    },
    toApparatusDetail (apparatusId) {
      const url = '/pages/apparatusDetail/main?apparatusId=' + apparatusId
      wx.navigateTo({ url })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .apparatus-list
    margin px2rem(20) px2rem(30)
    .apparatus-item
      margin-bottom px2rem(50)
      display flex
      .left
        flex .2
        img
          width px2rem(150)
          height px2rem(150)
          border-radius px2rem(20)
      .right
        flex .8
        display flex
        flex-direction column
        margin-left px2rem(20)
        .apparatus-name
          font-size px2rem(30)
          font-weight 900
        .apparatus-dec
          margin px2rem(23) 0
          no-wrap-more(2)
          line-height px2rem(35)
          font-size px2rem(24)
          color $color-text1
          font-weight 100
        .type
          .type-item
            font-size $font-size-small-s
            padding px2rem(2) px2rem(16)
            background #F2F2F2
            color $color-text1
            margin-right px2rem(20)
</style>
