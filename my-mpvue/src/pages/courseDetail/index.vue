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

    <tab v-if="tabDetail" :tabBar="tabBar" :tabContent="tabDetail"></tab>
    
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
      imageUrls: [],
      tabBar: [
        { 'title': '教练介绍' },
        { 'title': '课程介绍' },
        { 'title': '训练效果' },
        { 'title': '时间' }
      ],
      tabDetail: []
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
        let instructorIntro = {instructorIntro: res.data.data.instructorIntro}
        let courseIntro = {intro: res.data.data.intro}
        let courseEffects = {effects: res.data.data.effects}
        let timeTable = {timeTable: res.data.data.timeTable}
        this.tabDetail.push(instructorIntro, courseIntro, courseEffects, timeTable)
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

