import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import { Auth } from './auth'

Vue.use(Vuex) // Vuex를 설정

export default new Vuex.Store({
  modules: {
    auth: Auth,
  },
  plugins: [
    createPersistedState({
      paths: ['auth'],
    }),
  ],
})
