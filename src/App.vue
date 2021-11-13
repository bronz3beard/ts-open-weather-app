<style src="./app.css" lang="css" scoped></style>
<template src="./appTemplate.html"></template>

<script>
  import { searchWeather } from '../api/fetchWeatherForecast'
  import WeatherContainer from './components/weatherContainer/index.vue'
  import DropDownSelect from './components/common/dropDownSelect';

  export default {
    name: 'App',
    data() {
      return {
        error: false,
        weather: {},
        citySelect: '',
        citySelectId: '',
        loadingWeather: true
      }
    },
    components: {
      WeatherContainer,
      DropDownSelect
    },
    mounted() {
      this.getLocation();
    },
    methods: {
      getLocation () {
        this.fetchWeather();

        navigator.geolocation.watchPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            const locality = {
              lat,
              lng,
            };

            this.fetchWeather(locality);
        }, (error) => {
          if (error.code == error.PERMISSION_DENIED) {
            this.fetchWeather(); // if user denies location tracking we still need to fetch the data.
            console.info('Location tracking denied by user.');
            alert(`ERROR(${error.code}): ${error.message}`);
          }
        });

        if ("geolocation" in navigator) {
          /* geolocation is available */
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            const locality = {
              lat,
              lng,
            };

            this.fetchWeather(locality);
          });
        } else {
          /* geolocation IS NOT available */
          alert(
            "geolocation IS NOT available or not supported by this browser, please select your location from the menu select list."
          );
        }
      },
      async fetchWeather (area) {
        try {
          // set default city, if user does not allow browser access to the location.
          const locality = !area ? 'Brisbane' : area;

          const weather = await searchWeather(locality);

          this.weather = weather;
          this.citySelect = typeof locality === 'object' ? 'Your Area' : locality;
          this.loadingWeather = weather.weather.length > 0;
        } catch(error) {
          this.error = true;
          console.error("🚀 ~ file: App.vue ~ line 22 ~ fetchWeather: ~ error", error);
        } finally {
          this.loadingWeather = false;
        }
      },
      handleSelectedCity (values) {
        this.citySelectId = values.id;
        this.citySelect = values.city;

        this.fetchWeather(values.city);
      }
    }
  }
</script>
