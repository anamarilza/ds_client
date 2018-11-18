<template>
  <div class="posts">
    <h1>Posts</h1>
    This file will list all the posts.

    <div v-for="(post, id_atividade) in posts" :key="id_atividade" >

      <p>
        <span><b>{{ post.nome_atividade }}</b></span><br />
        <span>{{ post.max_horas }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'posts',
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.posts = response.data
    }
  }
}
</script>
