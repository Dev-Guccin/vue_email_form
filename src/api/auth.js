import { axiosService } from './index.js'
import store from '../store'
class API {
  constructor() {}
  // 회원가입 API
  registerUser(userData) {
    console.log(userData)
    return axiosService.post('/signup', userData)
  }
  test() {
    console.log('test')
    return axiosService.get('/test')
  }

  // 로그인 API
  loginUser(id, password) {
    return axiosService.post('/login', {
      id: id,
      password: password,
    })
  }
  // 로그아웃 API
  logoutUser(id) {
    // 사용자 데이터 초기화
    store.commit('RESET_USER')
    return axiosService.post('/logout', {
      id: id,
    })
  }
}

export default new API()
