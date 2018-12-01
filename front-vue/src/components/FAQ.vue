<template>
  <div class="page-container md-layout-row home">

    <md-app>
  <md-app-toolbar class="md-primary">
    <span class="md-title">Header</span>
  </md-app-toolbar>

  <md-app-drawer md-permanent="clipped">
      <div class="centered-container">
        <router-link v-bind:to="{ name: 'UserProfile' }">
        <md-content class="md-elevation-12 user-pic">
            <img src="https://orig00.deviantart.net/adc4/f/2018/201/f/0/profile_picture_by_dummy_doodles-dchro9m.png"></img>
        </md-content>
      </router-link>
      </div>
      <div class="centered-container">

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
    <span class="md-display-2">

    <faq-text></faq-text>
  </span>
  </md-app-content>
</md-app>

  </div>
</template>

<script>
import HoursService from '@/services/HoursService'
export default {
  name: 'PermanentFull',
  data () {
    return {
      name: 'None',
      questions: []
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {

    async getInfo() {
      const response = await HoursService.fetchQuestions({id:0})
      this.questions = response.data
      this.name = this.activities[0].nome_aluno
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
