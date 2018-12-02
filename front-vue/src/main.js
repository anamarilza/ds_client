// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// IMPORT VUE MATERIAL
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

// IMPORT BOOTSTRAPVUE
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// IMPORT CHART MODELS
import VCharts from 'v-charts'
import VueGoogleCharts from 'vue-google-charts'

// IMPORT GLOBAL COMPONENTS HERE
import UserChart from './components/myChart'
import RequestTable from './components/RequestTable'
import FAQText from './components/faq-text'

Vue.component('faq-text', FAQText)
Vue.component('user-table', RequestTable)
Vue.component('user-chart', UserChart)

Vue.use(VCharts)
Vue.use(VueGoogleCharts)
Vue.use(VueMaterial)
Vue.use(BootstrapVue);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
