<template>
<div class="hello">
<login
:errorMessage="errorMessage"
v-on:loginCredentials="checkCredentials"
passwordPattern=".{2,8}"
passwordMessage="Greater than 1 and less than 9"
></login>
</div>
</template>

<script>
import Login from './Login.vue'
export default {
  name: 'hello',
  components: {
    Login,
    'login': Login
  },
  data () {
    return {
      errorMessage: ''
    }
  },
  methods: {
    checkCredentials: function (event) {
      console.log('Email is: ' + event.email)
      console.log('Password is: ' + event.password)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
