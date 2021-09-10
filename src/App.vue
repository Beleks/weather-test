<template>
  <div id="app">
    <div class="header">
      <div class="place"></div>
      <div class="date">{{ time.hour }}<span>:</span>{{ time.minutes }}</div>
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
      let today = new Date();
      let day = String(today.getDate()).padStart(2, "0");
      let month = String(today.getMonth() + 1).padStart(2, "0");
      let year = today.getFullYear();

      today = `${year}-${month}-${day}`;
      this.date = today;

      this.setTime();

      let currentWeatherDay = [];

      allDaysArr.forEach((element) => {
        console.log(element.dt_txt.slice(0, 10));
        if (element.dt_txt.slice(0, 10) === today) {
          currentWeatherDay.push(element);
        }
      });

      // console.log(today, "today");
      // console.log(currentWeatherDay, 'currentWeatherDay');
      // console.log(allDaysArr, "allDaysArr");
    },
    setTime() {
      let today = new Date();
      let hour = today.getHours();
      let minutes = today.getMinutes();
      let sec = today.getSeconds();

      let time = `${hour}:${minutes}:${sec}`;
      // console.log(time);

      this.time = {
        hour,
        minutes,
      };

      setInterval(() => {
        sec = sec + 1;
        if (sec == 60) {
          this.time.minutes = this.time.minutes + 1;
          sec = 0;
          if (this.time.minutes == 60) {
            this.time.minutes = 0;
            this.time.hour = this.time.hour + 1;
            if (this.time.hour == 24) {
              clearInterval();
              this.time.hour = 0;
              this.getCurrentWeatherDay();
            }
          }
        }
      }, 1000);
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
