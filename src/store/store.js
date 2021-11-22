import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // Vuex를 설정

export const store = new Vuex.Store({
  state: {
    products: {},
    counter: 2,
    name: '',
    token: '',
  },
  mutations: {
    // 동기적 로직을 정의한다는 특징. 순차적으로 변이가 진행
    SET_STORE(state, products) {
      state.products = products
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_NAME(state, name) {
      state.name = name
    },
  },
  actions: {
    // 비동기 코드를 위해 액션 객체를 사용합니다.
    initStore: ({ commit }) => {
      // 뮤테이션을 커밋한다.???
      axios.get('static/products.json').then((response) => {
        console.log(response.data.products)
        commit('SET_STORE', response.data.products)
      })
    },
  },
  getters: {
    // 반환값이 필수이다. 그런데 전달인자를 받을 수 없다. 따라서 전달인자가 필요한 경우 함수를 반환하여 사용가능하다.
    // Vuex에서 연산을 진행하도록 하여 가독성과 성능상 이점을 가져간다.
    // 상품 게터는 상품 저장소를 반환한다.
    products: (state) => state.products,
    doubleCounter: function (state) {
      return state.counter * 2
    },
    getToken: (state) => state.token,
    getName: (state) => state.name,
  },
})
