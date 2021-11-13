<style src="./weatherWidget.css" lang="css" scoped></style>
<template src="./template.html"></template>

<script>
  export default {
    name: 'WeatherWidget',
    data() {
      return {
        imgUrl: ''
      }
    },
    props: {
      item: {
        type: Object,
        required: true,
      },
      weather: {
        type: Object,
        required: true,
      }
    },
    mounted() {
      this.setIcon();
    },
    methods: {
      setIcon () {
        this.imgUrl = `https://openweathermap.org/img/w/${this.item.icon}.png`;
      }
    }
  }
</script>
