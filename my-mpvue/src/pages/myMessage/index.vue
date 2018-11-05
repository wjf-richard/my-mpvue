<template>
  <div class="container">
    <div class="header">我的消息</div>
    <div class="content" v-if="msgList">
      <div class="msg-item" @click="toMsgDetail()" v-for="(item, index) in msgList" :key="item.updatedAt">
        <div class="left">
          <div class="msg-title">
            <div class="title">
              <span class="sign " :class="[item.type === '公告' ? 'notice' : 'system']">{{item.type}}</span>
              <h4>{{item.title}}</h4>
            </div>
            <span class="time">{{item.createdAt}}</span>
          </div>
          <div class="msg-main" :class="[item.type === '公告' ? 'msg-system-main' : ' ']">{{item.content}}</div>
        </div>
        <div class="right right-arrow" v-show="item.type === '公告'">
          <span class="num">
            <img src="../../common/images/back.png" alt="">
          </span>
        </div>
      </div>
    </div>
    <div class="no-data-content" v-else>
      <div class="move cell">您还没有预约哦！赶紧去预约吧！(*^▽^*)</div>
    </div>
    <!-- <div class="move-data-content">
      <div class="move cell">加载更多数据...</div>
    </div> -->
  </div>
</template>

<script>
// import {ERR_OK} from '@/http/config'
import {getMessage} from '@/http/member'

export default {
  data () {
    return {
      memberId: '',
      msgList: []
    }
  },
  onLoad (options) {
    this.memberId = options.id
    console.log('member', this.memberId)
  },
  mounted () {
    this._getMessage()
    this.getDateStr(-1)
  },
  methods: {
    _getMessage () {
      getMessage(this.memberId).then((res) => {
        this.msgList = res.data.data.content
        this.getDateDay()
      })
    },
    toMsgDetail () {
      const url = '../../base/msgDetail/main'
      wx.navigateTo({ url })
    },
    getDateDay () {
      this.msgList.forEach((item, index, arr) => {
        console.log('值', item)
        let itemDate = this.isYesterday(item.createdAt)
        item.createdAt = itemDate
      })
    },
    getDateStr (dayCount) {
      if (dayCount === '') {
        dayCount = 0
      }
      let dd = new Date()
      dd.setDate(dd.getDate() + dayCount) // 设置日期
      let y = dd.getFullYear()
      let m = dd.getMonth() + 1
      let d = dd.getDate()
      if (d >= 1 && d <= 9) {
        d = '0' + d
      }
      return y + '-' + m + '-' + d
    },
    isYesterday (dateStr) {
      let showDate = ''
      let _this = this
      let day = dateStr.substring(0, 10)
      let time = dateStr.substring(11, 16)
      if (day === _this.getDateStr(0)) {
        showDate = time
      } else if (day === _this.getDateStr(-1)) {
        showDate = '昨天'
      } else {
        showDate = day
      }
      console.log(showDate)
      return showDate
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'

  .container
    .header
      font-size $font-size-large-lg
      font-weight 900
      color #000
      padding px2rem(20) px2rem(60)
      background #FFFFFF
      box-shadow 0 px2rem(6) px2rem(26) 0 rgba(0,0,0,0.10)
    .content
      box-sizing border-box
      padding px2rem(40) px2rem(40) 0 px2rem(40)
      .msg-item
        height px2rem(200)
        border-bottom px2rem(1) solid #e6e6e6
        display flex
        align-items center
        .left
          width 95%
          .msg-title
            display flex
            justify-content space-between
            align-items center
            .title
              display flex
              justify-content flex-start
              .sign
                width px2rem(60)
                height px2rem(32)
                color #fff
                background #ED0D0D
                font-size px2rem(20)
                display flex
                justify-content center
                align-items center
                border-radius px2rem(10)
                margin-right px2rem(6)
              .system
                color #fff
                background #ED0D0D
              .notice
                color #fff
                background #0299FF
              h4
                font-weight bold
                font-size px2rem(34)
            .time
              font-size px2rem(28)
              color $color-text1
          .msg-main
            margin-top px2rem(20)
            font-size px2rem(28)
            font-weight 100
            line-height px2rem(34)
            letter-spacing px2rem(2)
            color $color-text1
          .msg-system-main
            no-wrap(1)

        .right
          width 5%
        .right-arrow
          height px2rem(26)
          width px2rem(15)
          margin-left px2rem(6)
          .num
            height 100%
            width 100%
            img
              width 100%
              height 100%
    .no-data-content
      .cell
        padding px2rem(60) 0
        height px2rem(40)
      .move
        font-size $font-size-medium
        color $color-text1
        display flex
        justify-content center
        align-items center
</style>
