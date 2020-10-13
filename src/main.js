import Vue from 'vue'
import  BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import i18n from './i18n'

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let language = to.params.lang;
  if (!language) {
    language = 'en'
  }

  i18n.locale = language
  next()
})

export const EventBus = new Vue();
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
