<template>
  <div class="container">
    <div class="header">预约信息</div>
    <div class="content" v-if="isData">
      <div class="date-book-info" v-for="(item, index) in bookContent" :key="index" >
        <div class="detail-date">{{item.detailDate}}</div>
        <div class="book-item" v-for="(detailItem, detailIndex) in item.detail" :key="detailIndex">
          <div class="left">
            <h4 class="name">{{detailItem.instructor.name}}</h4>
            <p class="time">{{detailItem.startTime}}-{{detailItem.endTime}}</p>
          </div>
          <div class="right">
            <span class="unfinished" v-if="detailItem.type === 'cancel'">已取消</span>
            <span class="finished" v-else-if="detailItem.type === 'finish'">已完成</span>
             <div class="unhandle" v-else>
              <div class="btn cancel" @click="cancelBook(index, detailIndex, detailItem.id)">取消</div>
              <div class="btn finish" @click="finishBook(index, detailIndex, detailItem.id)">完成</div>
            </div>
          </div>
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
      isData: false
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
      padding px2rem(60) px2rem(60) 0 px2rem(60)
      .date-book-info
        margin-bottom px2rem(80)
        .detail-date
          margin-bottom px2rem(20)
          font-size $font-size-medium
          color $color-text1
        .book-item
          display flex
          justify-content space-between
          align-items center
          height px2rem(130)
          border-bottom px2rem(1) solid $color-border
          .left
            .name
              color #000
              margin-bottom px2rem(20)
              font-size $font-size-medium-x
              font-weight 800
            .time
              font-size $font-size-small
              color $color-text1
          .right
            font-size $font-size-small
            .finished
              color #3EC4A4
            .unfinished
              color #808080

            .unhandle
              display flex
              justify-content flex-end
              align-items center
              .btn
                width px2rem(88)
                height px2rem(42)
                border-radius px2rem(40)
                font-size $font-size-small
                text-align center
                line-height px2rem(42)
              .cancel
                border px2rem(1) solid #ED0D0D
                color #ED0D0D
                margin-right px2rem(30)
              .finish
                border px2rem(1) solid #0299FF
                color #ffffff
                background #0299FF
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