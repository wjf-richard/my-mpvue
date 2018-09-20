import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'
import store from './stores'
import 'common/stylus/index.styl'
import Tips from './config/tip'

Vue.prototype.$tips = Tips

Vue.prototype.$store = store
Vue.use(MpvueRouterPatch)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
