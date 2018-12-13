<template>
  <div class="page-container md-layout-row home">
    <md-app>
  <md-app-toolbar class="md-primary">
    <span class="md-title"></span>
  </md-app-toolbar>

  <md-app-drawer md-permanent="clipped">
      <div class="userimg-container">
        <router-link v-bind:to="{ name: 'UserProfile' }">
        <md-content class="md-elevation-12 user-pic">
            <img src="https://orig00.deviantart.net/adc4/f/2018/201/f/0/profile_picture_by_dummy_doodles-dchro9m.png"></img>
        </md-content>
        <p>

        </p>
      </router-link>
      </div>
      <div class="nav-container">

        <router-link v-bind:to="{ name: 'Home' }">
          <md-button class="md-raised md-primary">HOME</md-button>
      </router-link>



        <router-link v-bind:to="{ name: 'Posts' }" >
        <md-button class="md-raised md-primary" >SOLICITAÇÕES</md-button>
      </router-link>



        <router-link v-bind:to="{ name: 'FAQ' }" >
        <md-button class="md-raised md-primary" >FAQ</md-button>
      </router-link>



        <router-link v-bind:to="{ name: 'Posts' }" class="" >
        <md-button class="md-raised md-primary">LINK --  </md-button>
      </router-link>


  </div>
  </md-app-drawer>


  <md-app-content class="main-content-holder">

    <!-- REQUEST TABLE -->
    <b-container fluid>
      <b-table hover :items="formartedItems" :fields="fields"
      @row-clicked="onRowClicked"
      >

      <template slot="show_details" slot-scope="row">
      <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
      <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
       {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
      </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <!--this template holds whats inside the Details of Rows -->
        <b-card>

          <b-row class ="mb-2" align-h="center">
            <b-col sm="3">Horas informadas</b-col>
            <b-col sm="3">
              <b-form-input type="text" placeholder="Input text" v-model="row.item.horas_info"></b-form-input>
            </b-col>
          </b-row>

          <b-row class ="mb-2" align-h="center">
            <b-col sm="3">Tipo de atividade</b-col>
            <b-col sm="3">
              <b-form-group id="exampleInputGroup3"
                            label-for="exampleInput3">
                <b-form-select  id="exampleInput3"
                              :options="atividades"
                              required
                              v-model="row.item.id_atividade">
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row align-h="center">
            <b-col sm="10">
              <b-form-textarea id="textarea1"
                               v-model="text"
                               placeholder="Comentário sobre solicitação"
                               :rows="3"
                               :max-rows="6">
              </b-form-textarea>
            </b-col>
          </b-row>
          <b-row class="mb-2" align-h="center" style="padding-top: 15px">

            <b-col sm="1"><b-button size="sm" @click="openPdf(row.item.pdf)">PDF</b-button></b-col>
            <!-- ; this.form.id_solicitacao = row.item.id_solicitacao  ON HANDLE ANSWER -->
            <b-col sm="1"><b-button id="accept-button"size="sm" variant="success" @click="row.item.status = 1 ;handleAnswer(row.item)">Accept</b-button></b-col>
            <b-col sm="1"><b-button id="refuse-button"size="sm" variant="danger" @click="row.item.status = 0; handleAnswer(row.item)">Refuse</b-button></b-col>
          </b-row>
          <form>

          </form>


        </b-card>
      </template>
      </b-table>
    </b-container>

<!-- DIALOG POPS UP WHEN ROW CLICKED -->
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Edit Request</md-dialog-title>

      <div class="dialog-container">
        <div class="dialog-inputs">
          {{selectedRow}}

        </div>
        <div class="dialog-inputs">

        </div>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="handler()">Add</md-button>
      </md-dialog-actions>
     </md-dialog>


     <!-- This modal pops up when add button clicked -->
     <div id="new-request-modal">


       <!-- Modal Component -->
       <b-modal id="modalPrevent"
                ref="modal"
                title="Submeter Nova Solicitação"
                @ok="handleOk"
                >
        <!-- Insert modal content Here -->
        <!-- CREATE A FORM IN DATA ((ARRAY WITH VARIABLES TO HOLD INFO FROM THIS MODAL, use v-model )) -->

          <b-form @submit="onSubmit" @reset="onReset" v-if="show">

            <b-form-group id="exampleInputGroup3"
                          label="Selecione o tipo de atividade:"
                          label-for="exampleInput3">
              <b-form-select  id="exampleInput3"
                            :options="atividades"

                            required
                            v-model="form.nome_atividade">
              </b-form-select>
            </b-form-group>
            <b-form-group id="exampleInputGroup1">
              <b-form-input style="margin-top:15px" id="exampleInput1"
                            type="email"
                            v-model="form.horas_info"
                            required
                            placeholder="Informe as horas estimadas!">
              </b-form-input>
            </b-form-group>
            <b-row>
              <b-col>
                <label>Inicio</label>
                <b-form-input style="" id="exampleInput1"
                              type="date"
                              v-model="form.inicio"
                              required
                              placeholder="Inicio">
                </b-form-input>
              </b-col>
              <b-col>
                <label>Fim</label>
                <b-form-input style="" id="exampleInput1"
                              type="date"
                              v-model="form.fim"
                              required
                              placeholder="Fim">
                </b-form-input>
              </b-col>
            </b-row>
          </b-form>

          <div id="pdf-holder" style="padding-top: 25px;">
            <!-- Styled -->
            <label>File<input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/> </label>
            <div class="mt-3">Selected file: {{form.file && form.file.name}}</div>
          </div>
       </b-modal>
     </div>

     <!--On click sends changes to DB !!! -->
     <b-row align-h="end" style="padding-right: 33px">
       <b-btn variant="primary" @click="handleSubmit">Submit</b-btn>
       <b-btn variant="primary" v-b-modal.modalPrevent>New</b-btn>
     </b-row>

  </md-app-content>
  </md-app>

  </div>


</template>

<script>
import saveAs from 'file-saver';
import HoursService from '@/services/HoursService'

export default {
  name: 'posts',
  data: () => ({
      form: {
        horas_info: '',
        matricula: 0,
        id_atividade: 0,
        id_solicitacao: -1,
        file: null,
        inicio: -1,
        fim: -1,
        resp_duv: ''
      },
      reviews : [], // this guy holder the changes in all requests from the table. When Save is hit, gotta send all the guys in here to DB !!!
      text : '',
      activities: [], // this guy holds all activies set in the db
      file:'',
      formData : new FormData(),
      show : true,
      atividades : [],
      fields : ['nome_aluno', 'nome_atividade', 'nome_categoria', 'data_solic', 'show_details'],
      requests : [],
      showDialog: false,
      selectedRow: null,
    }),
  mounted () {
    this.fetchRequests(),
    this.getActivityFields()
  },
  computed: {
  formartedItems () {
      if (!this.requests) return []
        return this.requests.map(item => {
          item.data_solic = item.data_solic.slice(0,10),
          item._rowVariant  = this.getVariant(item.status)
          return item
      })
    }
  },
  methods: {
    handleFileUpload(){
      this.form.file = this.$refs.file.files[0];
    },
    openPdf(pdf_file) {
      window.open('http://localhost:3000/Requests/getRequestFileById/' + pdf_file, '_blank');
    },
    // -- methods regarding new request modal
    clearForm () {
      return
    },
    handleAnswer(data){
      for (var i = 0; i < this.reviews.length; i++){
        if(this.reviews[i] === data){
          console.log("Já está na lista, e alterado :)")
          return
        }
      }
      data.resp_correcao = this.text
      this.form.resp_duv = this.text
      this.text = ''
      this.reviews.push(data)
    },
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault()
      // if (!this.form.matricula || this.form.file == null) {
      if (this.form.matricula < 0 || this.form.file == null) {
        alert('Por favor, informe a sua matrícula e certifique-se de anexar o certificado!')
      } else {
        this.$refs.modal.hide()
      }
    },
    handleSubmit () {
      //if(this.reviews.length < 1 && this.form.pdf === null){
        //alert("Nenhuma mudança foi feita..")
      //}
      //else{
      this.sendRequest()
      this.sendReview()
      //}
      //this.$router.go() //  <-- refresh page
    },
    // -=------------------=-
    // sets color to row according to status
    getVariant (status) {
      switch (status) {
        case 1:
          return 'success'
        case 0:
          return 'danger'
        default:
          return 'warning'
      }
    },
    async fetchRequests () {
      const response = await HoursService.getAllStudentRequests({id:0})
      this.requests = response.data

    },

    // show request details when row is clicked ---
    onRowClicked (item, index, event) {
      this.showDialog = true;
      this.selectedRow = item;
    },

    // db communication ???
    async getActivityFields(){
      const response = await HoursService.getActivityFields(0)
      var tmpDic = []
      for (var key of response.data) {
        tmpDic.push({
          id_atividade : key.id_atividade,
          nome_atividade : key.nome_atividade
        })
        this.atividades.push(key.nome_atividade)
      }
      this.activities = tmpDic
    },
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = '';
      this.form.name = '';
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    },
    sendReview(){
      console.log("SENDREVIEW HAS BEEN CALLED !!!!!")
      var reviewForm = new FormData()
      console.log("will print this.reviews")
      for(var i = 0; i < this.reviews.length; i++){
        console.log(this.reviews[i].resp_correcao)
        reviewForm.append('siapAdmin', 'siapExemplo')
        reviewForm.append('resp_correcao', this.reviews[i].resp_correcao)
        reviewForm.append('horas_aceitas', this.reviews[i].horas_info)
        reviewForm.append('status', this.reviews[i].status)
        reviewForm.append('id_solicitacao', this.reviews[i].id_solicitacao)
        HoursService.postReview(reviewForm)
      }
      for (var pair of reviewForm.entries()) {
          console.log(pair[0]+ ', ' + pair[1]);
      }

    },

    sendRequest(){
      /*
      * Tratar exceções do form aqui. Se não tiver pdf ou não tiver
      */
      if(this.form.pdf === null) return
      this.formData.append('horas_info', this.form.horas_info)
      this.formData.append('matricula', 0)

      for(var i=0; i < this.activities.length; i++){

        if( this.activities[i].nome_atividade === this.form.nome_atividade){

          this.form.id_atividade = this.activities[i].id_atividade
        }
      }
      this.formData.append('id_atividade', this.form.id_atividade)
      this.formData.append('pdf', this.form.file)
      this.formData.append('inicio', this.form.inicio)
      this.formData.append('fim', this.form.fim)
      HoursService.addNewRequest(this.formData)

    }

  }
}
</script>



<style type="text/css">
#modalPrevent{
  height: 100%;
  max-width: 100%;
  margin: 0;
}
.dialog-inputs{
  width: 50%;
  margin: 0 auto;
}
.dialog-container{
  min-width: 600px;
  min-height: 800px;
}
.userimg-container{
  max-height: 350px;
}
.nav-container{
  max-height: 350px;
}
.chart-holder{
  padding-top: 40px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
}
.router-link{
  width:100%;
}
.md-button{
  border: 10px solid rgba(255,255,255,.3);
  border-style: solid;
  border-width: 1px;
  width: 90%;
}
.md-app {
  min-height: 1080px;
  border: 1px solid rgba(#000, .12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
  max-height: auto;
}
.user-pic{
  border: 10px solid rgba(255,255,255,.7);
  width: 50%;
  margin-top: 35px;
  margin-bottom: 35px;
  margin-left: auto;
  margin-right: auto;
}
.md-field {
    max-width: 300px;
  }
</style>
