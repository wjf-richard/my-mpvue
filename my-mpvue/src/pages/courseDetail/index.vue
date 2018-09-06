<template>
  <div class="container ">
    <div class="course-base-msg">
      <div class="main">
        <div class="couser-des">
          <div class="tag">{{courseDetail.subTitle}}</div>
          <div class="course-name">{{courseDetail.name}}</div>
        </div>
        <div class="course-photos" >
          <img v-for="(item, index) in imageUrls" :key="index" :src="item" alt="">
        </div>
      </div>
      
    </div>

    <tab :tabBar="tabBar" :tabContent="tabContent"></tab>
    
    <!-- <div class="book">预定课程</div> -->
    <div class="loading-container" v-if="isData">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import {getCourseDetail} from '@/http/course'
import tab from '@/components/tab'

export default {
  data () {
    return {
      isData: true,
      courseDetail: [],
      imageUrls: []
      // tabBar: [
      //   { 'title': '课程介绍' },
      //   { 'title': '训练效果' },
      //   { 'title': '时22间' }
      // ],
      // tabContent: [
      //   { 'content': '健身教练，分为团体操课程教练和私人教练，组织健身者做计划中的健身运动或健身操。健身教练是指在健身俱乐部中指导会员进行训练的工作人员，其作具有互动性、针对性等特点，并且是按小时收费的。',
      //     'isTime': true,
      //     'week': '星期二',
      //     'time': '19:00 -20:00'
      //   },
      //   { 'content': '平板支撑（plank）是一种类似于俯卧撑的肌肉训练方法，在锻炼时主要呈俯卧姿势，可以有效的锻炼腹横肌，被公认为训练核心肌群的有效方法。',
      //     'isTime': false
      //   },
      //   { 'content': '时间时间',
      //     'isTime': false
      //   }
      // ]
    }
  },
  mounted () {
    // 获取courseId
    this.courseDetail.courseId = this.courseId
    this._getCourseDetail(this.courseDetail.courseId)
  },
  onLoad (options) {
    this.courseId = options.courseId
    console.log('courseId', this.courseId)
  },
  methods: {
    _getCourseDetail (courseId) {
      getCourseDetail(courseId).then((res) => {
        this.courseDetail = res.data.data.course
        this.imageUrls = res.data.data.imageUrls
        console.log(res)
        this.isData = false
      })
    }
  },
  components: {
    Loading,
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

