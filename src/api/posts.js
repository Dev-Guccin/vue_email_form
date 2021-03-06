import { axiosAuthService } from './index.js'

class API {
  constructor() {}
  // 학습 노트 데이티를 조회하는 API
  fetchPosts() {
    return axiosAuthService.get('/')
  }

  // 학습노트를 생성하는 API
  createPost(postData) {
    return axiosAuthService.post('/', postData)
  }

  // 유저 데이터를 모두 들고온다.
  getUserData() {
    return axiosAuthService.get('/users')
  }

  insertUserData(body) {
    // 유저데이터를 삽입한다.
    return axiosAuthService.post(`/user`, {
      company: body.company,
      username: body.username,
      email: body.email,
      phone: body.phone,
      status: body.status,
    })
  }

  updateUserData(userid, body) {
    console.log(userid, body)
    return axiosAuthService.patch(`/user/${userid}`, {
      company: body.company,
      username: body.username,
      email: body.email,
      phone: body.phone,
      status: body.status,
    })
  }
  test() {
    return axiosAuthService.post('/test')
  }
}
export default new API() // 객체 생성해서 반환
