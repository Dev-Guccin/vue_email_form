import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import router from './router'

import { store } from './store/store'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  vuetify,
  router,
  store, // Vuex의 저장소를 저장한다.
  render: (h) => h(App),
}).$mount('#app')
