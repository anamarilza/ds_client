<template>
  <div class="page-container md-layout-row home">

    <md-app>
  <md-app-toolbar class="md-primary">
    <span class="md-title">Header</span>
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
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Info 1:</b></b-col>
            <b-col>{{ row.item.horas_info }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Info 2:</b></b-col>
            <b-col>{{ row.item.pdf }}</b-col>
          </b-row>
          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
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

     <!--On click sends changes to DB !!! -->
     <b-button variant="primary">Save</b-button>


    <!-- POST CONTENT HERE -->
    <div class="posts">
      <br><br><br><br>
      // This is all the data being received //
      {{requests}}
    </div>

  </md-app-content>
  </md-app>

  </div>











</template>

<script>
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
      fields : ['nome_atividade', 'status', 'nome_categoria', 'data_solic', 'show_details'],
      requests : [],
      search: null,
      searched: [],
      showDialog: false,
      selectedRow: null,
      form: {
      email: '',
      name: '',
      food: null,
      checked: []
    },
    foods: [
      { text: 'Select One', value: null },
      'Carrots', 'Beans', 'Tomatoes', 'Corn'
    ],
    show: true
    }),
  mounted () {
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
    onRowClicked (item, index, event) {
      this.showDialog = true;
      this.selectedRow = item;
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
      this.form.food = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }
  }
}
</script>



<style type="text/css">
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
  min-height: 350px;
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
