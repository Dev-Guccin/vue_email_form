import Vue from 'vue'
import VueRouter from 'vue-router'

// store 불러오기
import store from '../store'

// 컴포넌트 불러오기
import Main from '@/views/Main'
import Login from '@/views/Login'
import SendMessage from '@/views/SendMessage'
import CreateUser from '@/views/CreateUser'

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
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
      meta: { authRequired: true }, // 로그인이 필요하다는 의미를 meta 데이터로 삽입해준다.
    },
    {
      path: '/send-message',
      name: 'SendMessage',
      component: SendMessage,
      props: true,
      meta: { authRequired: true }, // 로그인이 필요하다는 의미를 meta 데이터로 삽입해준다.
    },
    {
      path: '/create-user',
      name: 'CreateUser',
      component: CreateUser,
      props: true,
      meta: { authRequired: true }, // 로그인이 필요하다는 의미를 meta 데이터로 삽입해준다.
    },
    {
      path: '/*',
      redirect: '/',
    },
  ],
})
router.beforeEach((to, from, next) => {
  // 라우터로 이동하려고 할때 토큰이 없다면 새롭게 토큰을 받아서 진행해야한다. 이때 필요한것은 이전 토큰을 비교해보는것.
  // to: 대상 Routee 객체로 이동
  // from: 현재 라우트로 오기전 라우트
  // next: 훅을 해결하기 위해 호출 되어야함.
  /*if (
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
  }*/
  if (
    to.matched.some(function (routeInfo) {
      return routeInfo.meta.authRequired
    })
  ) {
    // 로그인이 되어있는지 확인한다.
    console.log(store.getters.getName)
    if (store.getters.getName == '') {
      alert('로그인이 필요합니다.')
      next('/login')
    } else {
      // alert('이미 로그인 되어있습니다.')
      next()
    }
  } else {
    console.log("routing succss: '" + to.path + "'")
    next()
  }
})
export default router
