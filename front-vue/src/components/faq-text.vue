<template>
  <div id="content-holder">
    <md-content class="md-scrollbar">

      <ul id="example-1">
        <li v-for="question in questions">
          <span v-for="(duv,index) in question">

          <div class="question-container">
            <span v-if="index === 'perg_duv'">
              <p id="question">{{duv}}</p>
              <md-divider></md-divider>

                <p id="answer"> {{question['resp_duv']}}</p>
            </span>
          </div>

          </span>
        </li>
      </ul>

    </md-content>

  <md-dialog :md-active.sync="showDialog">
    <md-dialog-title>New Question</md-dialog-title>

    <div class="question-form">
      <md-field :class="messageClass">
      <label>Question</label>
      <md-input v-model="required" required></md-input>
      <span class="md-error">There is an error</span>
      </md-field>

      <md-field :class="messageClass">
      <label>Textarea</label>
      <md-textarea v-model="textarea" required></md-textarea>
      <span class="md-helper-text">Helper text</span>
      <span class="md-error">There is an error</span>
      </md-field>
    </div>

    <md-dialog-actions>
      <md-button class="md-primary" @click="showDialog = false">Close</md-button>
      <md-button class="md-primary" @click="handler()">Add</md-button>
    </md-dialog-actions>
   </md-dialog>

  <md-content id="add-button">
    <md-button class="md-icon-button md-primary md-raised" @click="showDialog = true">
      <md-icon>add</md-icon>
    </md-button>
  </md-content>

  <p>{{textarea}}<br><br></p>
  <p>{{required}}</p>
  </div>

</template>

<script>
import HoursService from '@/services/HoursService'

export default {
  name: 'PermanentFull',
  data () {
    return {
      showDialog: false,
      questions: [],
      noError: null,
      required: null, // <---- perg_duv      GOTTA POST IT
      textarea: null, // <---- resp_duv      GOTTA POST IT
      hasMessages: false,
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {

    async getInfo() {
      const response = await HoursService.fetchQuestions({id:0})
      this.questions = response.data
      this.name = this.activities[0].nome_aluno // ERROR CANNOT READ PROPERTY '0' OF UNDEFINED...
    },
    closeDialog:function(){
      this.showDialog = false;
    },
    postNewQuestion:function(){
        HoursService.addPost(
          0,  // id_curriculo
          this.required,  //pergunta
          this.textarea   // resposta
        );
    },
    handler:function(){
        this.postNewQuestion();
        this.closeDialog();
    }
  },
  computed: {
    messageClass () {
      return {
        'md-invalid': this.hasMessages
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#add-button{
  padding-left: 15px;
}
#content-holder{
  display: flex;
  padding: 5px;
  flex-wrap: wrap;
}
#question{

}
#answer{
  text-align: left;
  font-size: 24px;
}
.question-form{
  min-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
.question-container{
  max-height: 400px;
  padding-bottom: 30px;
}
.md-content {
  max-width: 1200px;
  max-height: 600px;
  overflow: auto;
}
.md-dialog {
  max-width: 768px;
  min-width: 600px;
}
</style>
