import Vue from 'vue'
import VueRouter from 'vue-router'
// 컴포넌트 불러오기

import Main from '@/views/Main'
import SendMessage from '@/views/SendMessage'
import CreateUser from '@/views/CreateUser'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
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
