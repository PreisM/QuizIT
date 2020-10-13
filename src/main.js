import Vue from 'vue'
import  BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

export const EventBus = new Vue();
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
