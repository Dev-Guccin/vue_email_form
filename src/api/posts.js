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

  test() {
    return axiosAuthService.post('/test')
  }
}
export default new API() // 객체 생성해서 반환
