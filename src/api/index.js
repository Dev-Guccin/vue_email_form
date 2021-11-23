import axios from 'axios'
import { setInterceptors } from './common/interceptors'
import store from '../store'

function createAxiosService() {
  // auth가 필요없는 경우 인터셉트 없이 바로 요청하도록 axios 객체를 선언한다.
  return axios.create({
    //baseURL: process.env.VUE_APP_API_URL,
    baseURL: process.env.VUE_APP_API_URL,
  })
}

function createAxiosServiceWithAuth() {
  // auth가 필요한 요청일 경우 인터셉트를 걸어서 요청하도록 axios 객체를 선언함.
  axios.head = {}
  const axiosService = axios.create({
    //    baseURL: `${process.env.VUE_APP_API_URL}/${url}`,
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      Authorization: 'Bearer ' + store.getters.getName, // 현재는 이름으로 대체하는데 나중에 토큰으로 변경해야함.
      //Authorization: 'Bearer ' + varToken,
    },
  })
  return setInterceptors(axiosService)
}

export const axiosService = createAxiosService()
export const axiosAuthService = createAxiosServiceWithAuth()
