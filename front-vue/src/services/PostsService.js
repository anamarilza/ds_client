import Api from '@/services/Api'

export default {
  fetchPosts () {
    return Api().get('/Activities/getAllActivities/0')
  }
}
