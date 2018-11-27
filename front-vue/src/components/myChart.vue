<template>
  <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
</template>

<script>
  export default {
    data () {
      this.chartSettings = {
        metrics: ['aprovadas', 'requeridas'],
        stack: { 'sales': ['aprovadas', 'requeridas'] }
      }
      return {
        chartData: {
          columns: ['type', 'aprovadas', 'requeridas', 'growthRate', 'people'],
          rows: [
            { 'type': 'Pesquisa', 'aprovadas': 50, 'requeridas': 220, 'growthRate': 0.1, 'people': 1 },
            { 'type': 'Ensino', 'aprovadas': 22, 'requeridas': 50, 'growthRate': 0.345, 'people': 100 },
            { 'type': 'Extensão', 'aprovadas': 50, 'requeridas': 50, 'growthRate': 0.7, 'people': 100 },
            { 'type': 'Livres', 'aprovadas': 100, 'requeridas': 0, 'growthRate': 0.31, 'people': 100 }
          ]
        }
      }
    }
  }
</script>
