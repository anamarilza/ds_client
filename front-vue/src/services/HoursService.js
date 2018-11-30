import Api from '@/services/Api'

export default {

  // Activities stuff
  fetchActivities(params) {
    return Api().get('/Activities/getAllActivities/'+params.id)
  },

  // Requests Stuff

  fetchRequests(params) {
    return Api().get('/Requests/getAllStudentRequests/'+params.id)
  },

  // FAQ Stuff

  fetchQuestions(params) {
    return Api().get("/Questions/getAllQuestionsFromCurriculum/"+params.id)
  },
  addPost(params) {
    return Api().post('/Questions/addNewQuestion/', params)
  },




}
