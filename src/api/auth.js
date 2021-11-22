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
  loginUser(id, password) {
    return axiosService.post('/login', {
      id: id,
      password: password,
    })
  }
}

export default new API()
