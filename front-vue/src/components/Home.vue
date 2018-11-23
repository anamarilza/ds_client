<template>
  <div class="page-container md-layout-row home">

    <md-app>
  <md-app-toolbar class="md-primary">
    <span class="md-title">Header</span>
  </md-app-toolbar>

  <md-app-drawer md-permanent="full">
      <div class="centered-container">
        <md-content class="md-elevation-12 user-pic">
            <img src="https://orig00.deviantart.net/adc4/f/2018/201/f/0/profile_picture_by_dummy_doodles-dchro9m.png"></img>
        </md-content>
      </div>

    <md-list>

      <md-list-item>
        <router-link v-bind:to="{ name: 'Posts' }" class="" style="width:100%">
        <md-button class="md-raised md-primary" style="width:100%">HOME</md-button>
      </router-link>
      </md-list-item>

      <md-list-item>
        <router-link v-bind:to="{ name: 'Posts' }" class="" style="width:100%">
        <md-button class="md-raised md-primary" style="width:100%">SOLICITAÇÕES</md-button>
      </router-link>
      </md-list-item>

      <md-list-item>
        <router-link v-bind:to="{ name: 'Posts' }" class="" style="width:100%">
        <md-button class="md-raised md-primary" style="width:100%">FAQ</md-button>
      </router-link>
      </md-list-item>

      <md-list-item>
        <router-link v-bind:to="{ name: 'Posts' }" class="" style="width:100%">
        <md-button class="md-raised md-primary" style="width:100%">LINK --  </md-button>
      </router-link>
      </md-list-item>

    </md-list>
  </md-app-drawer>

  <md-app-content>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.
  </md-app-content>
</md-app>

  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'PermanentFull',
  data () {
    return {
      name: 'None',
      activities: []
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {

    async getInfo() {
      const response = await PostsService.getName()
      this.activities = response.data
      this.name = this.activities[0].nome_aluno
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.md-app {
  min-height: 350px;
  border: 1px solid rgba(#000, .12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
.user-pic{
  width: 50%;
  margin-top: 35px;
  margin-bottom: 35px;
  margin-left: auto;
  margin-right: auto;
}
</style>
