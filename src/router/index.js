import Vue from 'vue'
import VueRouter from 'vue-router'
// 컴포넌트 불러오기

import Main from '@/views/Main'
import Login from '@/views/Login'
import SendMessage from '@/views/SendMessage'
import CreateUser from '@/views/CreateUser'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      props: true,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: true,
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      props: true,
    },
    {
      path: '/send-message',
      name: 'SendMessage',
      component: SendMessage,
      props: true,
    },
    {
      path: '/create-user',
      name: 'CreateUser',
      component: CreateUser,
      props: true,
    },
    {
      path: '/*',
      redirect: '/',
    },
  ],
})
/*.beforeEach(async (to, from, next) => { // 라우터로 이동하려고 할때 토큰이 없다면 새롭게 토큰을 받아서 진행해야한다. 이때 필요한것은 이전 토큰을 비교해보는것.
  // to: 대상 Routee 객체로 이동
  // from: 현재 라우트로 오기전 라우트
  // next: 훅을 해결하기 위해 호출 되어야함.
  if (
    VueCookie.get('token') === null &&
    VueCookie.get(refresh_token) !== null
  ) {
    await refresh_token() // 토큰을 받아오기
  }
  if (
    to.matched.some((record) => record.meta.unauthorized) ||
    VueCookie.get('token')
  ) {
    return next()
  }
  alert('로그인 해주세요.')
  return next('/login')
})
*/
