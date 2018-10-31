<template>
  <div class="container">
    <div class="header">我的消息</div>
    <div class="content" v-if="isData">
      <div class="msg-item" @click="toMsgDetail()">
        <div class="left">
          <div class="msg-title">
            <div class="title">
              <span class="sign system">系统</span>
              <h4>关于我公司元旦放假时间安排</h4>
            </div>
            <span class="time">昨天</span>
          </div>
          <div class="msg-main">
            我公司拟定于10月1日到10月7日放假，符合国家我公司拟定于10月1日到10月7日放假，符合国家我公司拟定于10月1日到10月7日放假，符合国家...
          </div>
        </div>
        <div class="right right-arrow">
          <span class="num">
            <img src="../../common/images/back.png" alt="">
          </span>
        </div>
      </div>
      <div class="msg-item">
        <div class="left">
          <div class="msg-title">
            <div class="title">
              <span class="sign notice">公告</span>
              <h4>林健取消预约</h4>
            </div>
            <span class="time">14:28</span>
          </div>
          <div class="msg-main">
            原预约时间 2018-10-28 14:00-15:00
          </div>
        </div>
        <div class="right right-arrow">
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
import {ERR_OK} from '@/http/config'
import {getMemberBook, isOperate} from '@/http/book'
export default {
  data () {
    return {
      memberId: '',
      bookContent: [],
      instructorBookingId: '',
      isData: true
    }
  },
  onLoad (options) {
    this.memberId = options.id
    console.log('member', this.memberId)
  },
  mounted () {
    this.bookContent = [ ]
    this._getMemberBook()
  },
  methods: {
    toMsgDetail () {
      const url = '../../base/msgDetail/main'
      wx.navigateTo({ url })
    },
    _getMemberBook () {
      getMemberBook(this.memberId).then((res) => {
        console.log('数据', this.bookContent)
        let _this = this
        if (res.data.code === ERR_OK) {
          console.log('总时间', res.data.data)
          for (let name in res.data.data) {
            let detailTime = res.data.data[name]
            console.log('长度', detailTime)
            // 获取具体时间，重新截取相应的时间节点
            for (let i = 0; i < detailTime.length; i++) {
              let startTime = _this.getDetailTime(detailTime[i].startTime)
              let endTime = _this.getDetailTime(detailTime[i].endTime)
              detailTime[i].startTime = startTime
              detailTime[i].endTime = endTime
              _this.isData = true
            }
            _this.bookContent.push({
              detailDate: name,
              detail: res.data.data[name]
            })
            console.log('局部', _this.bookContent)
          }
        } else {
          _this.isData = false
        }
      })
    },
    cancelBook (index, itemIndex, instructorBookingId) {
      this.$tips.confirm('确认取消预约么？若确认请您跟教练吱一声哦！').then((res) => {
        console.log('用户点了 确认')
        let type = 'cancel'
        isOperate(this.memberId, instructorBookingId, type).then((res) => {
          console.log(this.memberId, instructorBookingId, type, res)
          if (res.data.code === ERR_OK) {
            Object.assign(this.$data)
            this.bookContent = [ ]
            this._getMemberBook()
          } else {
            console.log('服务器问题，请稍后在试')
          }
        })
      })
    },
    finishBook (index, itemIndex, instructorBookingId) {
      this.$tips.success('很棒！完成了')
      console.log(index, itemIndex)
      let type = 'finish'
      isOperate(this.memberId, instructorBookingId, type).then((res) => {
        console.log(res)
        if (res.data.code === ERR_OK) {
          Object.assign(this.$data)
          this.bookContent = [ ]
          this._getMemberBook()
        } else {
          console.log('服务器问题，请稍后在试')
        }
      })
    },
    // 截取字符串方法
    getDetailTime (str) {
      let timeArray = str.split(' ')
      let detailTime = timeArray[1]
      return detailTime
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
            color $color-text1
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
