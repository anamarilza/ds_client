import Api from '@/services/Api'
import qs from 'qs'

export default {

  //""" Activities stuff """//

  // Params.id  --- is curriculo_id::int

  getAllActivities(params) {
    return Api().get('/Activities/getAllActivities/'+params.id)
  },

  // Params.id  --- is activity_id::int
  getActivityById(params){
      return Api().get('/Activities/getActivityById/'+params.id)
  },

  //""" Requests Stuff """//

  // Params.id  --- is matricula::int
  getAllStudentRequests(params) {
    return Api().get('/Requests/getAllStudentRequests/'+params.id)
  },

  // Params.pdf  --- is pdf_name::string
  getRequestFileById(params) {
    return Api().get('/Requests/getRequestFileById/'+params.pdf)
  },

  // Colocar no body utilizando o padrão x-www-form-urlenconded os seguintes parametros:
	// 	- matricula; // matricula do aluno
	// 	- id_atividade; // id da atividade que o aluno informou
	// 	- horas_info; // número de horas informadas pelo aluno
	// 	- pdf // arquivo pdf

  addNewRequest(params) {
    console.log("WHYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
    return Api().post('/Requests/addNewRequest/', params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  },

  // FAQ Stuff

  // Params.id --- is id_curriculo::int
  getAllQuestionsFromCurriculum(params) {
    return Api().get("/Questions/getAllQuestionsFromCurriculum/"+params.id)
  },

  // Params.id --- is id_perg::int
  getQuestionById(params) {
    return Api().get("/Questions/getQuestionById"+params.id)
  },

  // Colocar no body utilizando o padrão x-www-form-urlenconded os seguintes parametros:
	// 	- matricula; // matricula do aluno
	// 	- id_atividade; // id da atividade que o aluno informou
	// 	- horas_info; // número de horas informadas pelo aluno
	// 	- pdf // arquivo pdf

  addNewQuestion(params) {
    return Api().post('/Questions/addNewQuestion/', params)
  },


  // Funçãozinha pra pegar todas as Atividades setadas estaticamente no banco
  getActivityFields(params){
    return Api().get('/Activities/getAllActivities/' + params)
  },

  postReview(params){
    return Api().post('/Reviews/addNewReview/', params)
  }
}
