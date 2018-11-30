<template>
  <div>
    <md-content class="md-scrollbar">
      <p>
        {{questions}}
      </p>
      <p>
        Necessitatibus aut cumque sit ad. Tempora perferendis nostrum, in
        assumenda accusantium vitae vero pariatur sapiente nam quisquam, ducimus
        distinctio quae nisi.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed
        perspiciatis sit quaerat molestiae iusto adipisci possimus cum modi quam
        qui esse vero provident, ad, deserunt laborum quas eligendi beatae
        quibusdam.
      </p>
    </md-content>
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
<style lang="scss" scoped>
.md-content {
  max-width: 1200px;
  max-height: 600px;
  overflow: auto;
}
</style>
