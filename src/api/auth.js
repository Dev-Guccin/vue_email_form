import { axiosService } from './index.js'

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
  loginUser(userData) {
    console.log(userData)
    return axiosService.post('/login', userData)
  }
}

export default new API()
