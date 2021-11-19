import axios from 'axios'
import { setInterceptors } from './common/interceptors'

function createAxiosService() {
  // auth가 필요없는 경우 인터셉트 없이 바로 요청하도록 axios 객체를 선언한다.
  return axios.create({
    //baseURL: process.env.VUE_APP_API_URL,
    baseURL: process.env.VUE_APP_API_URL,
  })
}

function createAxiosServiceWithAuth() {
  // auth가 필요한 요청일 경우 인터셉트를 걸어서 요청하도록 axios 객체를 선언함.
  const axiosService = axios.create({
    //    baseURL: `${process.env.VUE_APP_API_URL}/${url}`,
    baseURL: process.env.VUE_APP_API_URL,
  })

  return setInterceptors(axiosService)
}

export const axiosService = createAxiosService()
export const axiosAuthService = createAxiosServiceWithAuth()
