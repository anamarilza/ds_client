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
      <b-table striped hover :items="requests" :fields="fields">
      </b-table>
    </b-container>




    <!-- POST CONTENT HERE -->
    <div class="posts">
      // This is all the data being received //
      {{requests}}
      <h1>Posts</h1>
      <div v-if="requests.length > 0" class="table-wrap">
        <div>
          <router-link v-bind:to="{ name: 'NewPost' }" class="">Add Post</router-link>
        </div>
        <table>
          <tr>
            <td>Title</td>
            <td width="550">Description</td>
            <td width="100" align="center">Action</td>
          </tr>
          <tr v-for="post in requests" :key="post.id_solicitacao">
            <td>{{ post.id_solicitacao }}</td>
            <td>{{ post.data_solic }}</td>
            <td align="center">
              <router-link v-bind:to="{ name: 'EditPost', params: { id: post._id } }">Edit</router-link> |
              <a href="#" @click="deletePost(post._id)">Delete</a>
            </td>
          </tr>
        </table>
      </div>
      <div v-else>
        There are no posts.. Lets add one now <br /><br />
        <router-link v-bind:to="{ name: 'NewPost' }" class="add_post_link">Add Post</router-link>
      </div>
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
      fields : ['id_solicitacao', 'nome_aluno', 'id_atividade', 'data_solic'],
      requests : [],
      search: null,
      searched: []
    }),
  mounted () {
    this.fetchRequests()
  },
  methods: {
    async fetchRequests () {
      const response = await HoursService.fetchRequests({id:0})
      this.requests = response.data
    },
}
}
</script>



<style type="text/css">

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
