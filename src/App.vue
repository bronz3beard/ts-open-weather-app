<template src="./appTemplate.html"></template>

<script>
  import { searchWeather } from '../api/fetchWeatherForecast'
  import { setOnStorage, getFromStorage } from '../utils/localStorage'
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
          // adding local storage incase a user select deny on browser geo location.
          // this will prevent user needed to select a city every time the widget loads.
          const localStorageCitySelect = typeof area !== 'object' ? getFromStorage('city') : area;
          const cityPreviouslySelected = !localStorageCitySelect ? 'Brisbane' : localStorageCitySelect;

          const locality = !area ? cityPreviouslySelected : area;
          
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

        setOnStorage('city', values.city);
        this.fetchWeather(values.city);
      }
    }
  }
</script>
