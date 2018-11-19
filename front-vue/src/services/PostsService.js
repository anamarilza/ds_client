import Api from '@/services/Api'

export default {
  fetchPosts () {
    return Api().get('/Activities/getAllActivities/0')
  },
  addPost (params) {
    return Api().post('posts', params)
  },
  updatePost (params) {
    return Api().put('posts/' + params.id, params)
  },

  getPost (params) {
    return Api().get('post/' + params.id)
  },

  deletePost (id) {
    return Api().delete('posts/' + id)
  },

  // Profile Stuff

  getName (id) {
    return Api().get('/Requests/getAllStudentRequests/0')
  }

}
