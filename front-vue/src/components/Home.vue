<template>
  <div class="home">
  <p>
    {{name}}
  </p>
  <div class="dropdown-menu">
    <router-link v-bind:to="{ name: 'Posts' }" class="">
      <a class="dropdown-item">Solicitações</a>
    </router-link>
    <a class="dropdown-item" href="#">FAQ</a>
    <a class="dropdown-item" href="#">Sair</a>
    <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="#">Separated link</a>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'home',
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
</style>
