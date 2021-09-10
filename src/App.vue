<template>
  <div id="app">
    <div class="header">
      <div class="place"></div>
      <div class="date"></div>
    </div>
    <div class="current_weather"></div>
    <WeatherForTheDay />
  </div>
</template>

<script>
const axios = require("axios").default;
import WeatherForTheDay from "./components/WeatherForTheDay.vue";

export default {
  name: "App",
  data: () => {
    return {
      date: null,
      time: {
        hour: null,
        minutes: null,
      },
      weather: null,
    };
  },
  methods: {
    getCurrentWeatherDay(allDaysArr) {
      console.log(allDaysArr)
    },
  },
  components: {
    WeatherForTheDay,
  },
  created() {
    axios
      .get("https://api.openweathermap.org/data/2.5/forecast?", {
        params: {
          q: "tomsk",
          appid: "27966056cc44b7aa53d432d46ad371ed",
        },
      })
      .then((response) => this.getCurrentWeatherDay(response.data.list));
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
