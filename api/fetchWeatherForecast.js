import axios from 'axios';

export const searchWeather = async (location) => {
  const isLatLng = typeof location === "object";

  const urlCurrentTemp = !isLatLng
    ? `https://api.openweathermap.org/data/2.5/weather?q=${location},au&units=metric&appid=${process.env.VUE_APP_OPEN_WEATHER_KEY}`
    : `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&units=metric&appid=${process.env.VUE_APP_OPEN_WEATHER_KEY}`;

  const requestTemp = axios.post(urlCurrentTemp).then(responses => {
    const tempNow = responses.data;

    return tempNow;
  }).catch((error) => {
    console.error("🚀 ~ file: fetchWeatherForecast.js ~ line 31 ~ searchWeather ~ error", error);
  });

  return requestTemp;
};
