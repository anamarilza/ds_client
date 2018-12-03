<template>
  <div>
  {{activities}}

    <md-table v-model="requests" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <h1 class="md-title">Requesições </h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.nome_atividade }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.nome_aluno }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>
        <md-table-cell md-label="Data" md-sort-by="title">{{ item.data_solic }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import HoursService from '@/services/HoursService'

export default {
  name: 'TableFixed',
  data () {
    return {
      name: '',
      requests: []
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {

    async getInfo() {
      const response = await HoursService.getAllStudentRequests({id:0})
      this.requests = response.data
      this.name = this.activities[0].nome_aluno
    }
  }
}
</script>
