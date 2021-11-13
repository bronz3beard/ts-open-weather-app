<style src="./weatherContainer.css" lang="css" scoped></style>
<template src="./template.html"></template>

<script>
import WeatherWidget from '../weatherWidget';
import DropDownSelect from '../common/dropDownSelect';

export default {
  name: 'WeatherContainer',
  props: {
    error: {
      type: Boolean
    },
    citySelect: {
      type: String,
    },
    citySelectId: {
      type: String,
    },
    weather: {
      type: Object,
      required: true,
      default() {
        return {
          weather: {
            type: Array,
            required: true,
          },
          main: {
            type: Object,
            required: true,
          }
        }
      },
    },
    loadingWeather: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  components: {
    WeatherWidget,
    DropDownSelect
  },
  methods: {
    handleSelectChange (values) {
      this.$emit('selected-city', values);
    }
  }
}
</script>
