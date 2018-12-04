<template>
  <div class="page-container md-layout-row home">
    {{fields}}
    {{data_fields}}
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
          {{name}}
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
          <b-row class="mb-2" align-h="center"><b-button @click="saveFile(row.item.pdf)">PDF</b-button></b-row>
          <form>

          </form>

          <b-button id="accept-button"size="sm" variant="success" @click="row.item.status = 1">Accept</b-button>
          <b-button id="refuse-button"size="sm" variant="danger" @click="row.item.status = 0">Refuse</b-button>
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
                @shown="clearName">
         <form @submit.stop.prevent="handleSubmit">
           <b-form-input type="text"
                         placeholder="Matrícula"
                         v-model="form.matricula"></b-form-input>
         </form>
        <!-- Insert modal content Here -->
        <!-- CREATE A FORM IN DATA ((ARRAY WITH VARIABLES TO HOLD INFO FROM THIS MODAL, use v-model )) -->

          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="exampleInputGroup1">
              <b-form-input style="margin-top:15px" id="exampleInput1"
                            type="email"
                            v-model="form.horas_info"
                            required
                            placeholder="Informe as horas estimadas!">
              </b-form-input>
            </b-form-group>
            <b-form-group id="exampleInputGroup3"
                          label="Selecione o tipo de atividade:"
                          label-for="exampleInput3">
              <b-form-select  id="exampleInput3"
                            :options="atividades"
                            required
                            v-model="form.id_atividade">
              </b-form-select>
            </b-form-group>

          </b-form>

          <div id="pdf-holder">
            <!-- Styled -->
            <b-form-file v-model="form.file" :state="Boolean(form.file)" placeholder="Choose a file..."></b-form-file>
            <div class="mt-3">Selected file: {{form.file && form.file.name}}</div>
          </div>
       </b-modal>
     </div>

     <!--On click sends changes to DB !!! -->
     <b-btn variant="primary" @click="sendRequest">Save</b-btn>
     <b-btn variant="primary" @click="saveFile(form.file)" v-bind:disabled="form.file === null">Download</b-btn>
     <b-btn variant="primary" v-b-modal.modalPrevent>NEW</b-btn>
     {{form}}
     {{form.file && form.file.name}}
     <br><br><br>
     <a :href="form.file" download>Download</a>
     {{requests[0].pdf}}
  </md-app-content>
  </md-app>

  </div>


</template>

<script>
import saveAs from 'file-saver';
import HoursService from '@/services/HoursService'

const toLower = text => {
  return text.toString().toLowerCase()
}

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)))
  }

  return items
}

export default {
  name: 'posts',
  data: () => ({
      form : new FormData(),
      show : true,
      atividades : ['Artigo', 'Bolsa - IC', 'Bolsa - Monitoria', 'Evento', 'Outro'],
      fields : ['nome_atividade', 'status', 'nome_categoria', 'data_solic', 'show_details'],
      data_fields : [],
      requests : [],
      dialog_name: '',
      names: [],
      showDialog: false,
      selectedRow: null,
    }),
  mounted () {

    this.form.append('horas_info', 0)
    this.form.append('matricula', 0)
    this.form.append('id_atividade', 0)
    var file = new File([null], "PDF_DO_VITOR.pdf", {type: 'application/pdf'})
    this.form.append('pdf', file)

    this.fetchRequests()
  },
  computed: {
  formartedItems () {
      if (!this.requests) return []
        return this.requests.map(item => {
          item._rowVariant  = this.getVariant(item.status)
          return item
      })
    }
  },
  methods: {
    saveFile(pdf_file) {
      var FileSaver = require('file-saver');
      //var data = this.requests[0].pdf
      console.log(pdf_file)
      var file = new File([pdf_file], "PDF_DO_VITOR.pdf", {type: 'application/pdf'});
      FileSaver.saveAs(file);
    },
    // -- methods regarding new request modal
    clearName () {
      this.dialog_name = ''
    },
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault()
      if (!this.form.matricula || this.form.file == null) {
        alert('Por favor, informe a sua matrícula e certifique-se de anexar o certificado!')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      this.names.push(this.dialog_name)
      this.clearName()
      this.$refs.modal.hide()
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
      this.getKeysFromRequests()
    },

    // show request details when row is clicked ---
    onRowClicked (item, index, event) {
      this.showDialog = true;
      this.selectedRow = item;
    },

    // db communication ???
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = '';
      this.form.name = '';
      this.form.food = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    },

    // Get Keys from requests
    getKeysFromRequests(){
      for(var req of this.requests){
        var tmpDic = {}
        for (var key of this.fields) {
        // check if the property/key is defined in the object itself, not in parent
          tmpDic[key] = req[key]
        }
        this.data_fields.push(tmpDic)
      }
    },

    sendRequest(){
        console.log('maoe')
        HoursService.addNewRequest(this.form)
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
