<template>
  <div id="app" :class="timeOfDay">
    <div class="header">
      <div class="place">
        <LocationSvg />
        <div>Томск</div>
      </div>
      <div class="date">
        <div>{{ date }}</div>
      </div>
    </div>
    <div class="current_info">
      <div class="current_info_weather">
        <div>
          {{ time.hour }}
          <span class="colon">:</span>
          {{ time.minutes | fixMinutes }}
        </div>
        <div v-if="weather">+{{ weather[0].main.temp | rounding }}</div>
      </div>
      <div class="greeting">{{ greeting }}</div>
    </div>
    <WeatherForTheDay :weather="weather" :interestingNews="interestingNews"/>
  </div>
</template>

<script>
const axios = require("axios").default;

import LocationSvg from "./components/svg/LocationSVG.vue";
import WeatherForTheDay from "./components/WeatherForTheDay.vue";

export default {
  components: {
    WeatherForTheDay,
    LocationSvg,
  },
  name: "App",
  data: () => {
    return {
      date: null,
      time: {
        hour: null,
        minutes: null,
      },
      weather: null,
      interestingNews: null,
    };
  },
  computed: {
    timeOfDay() {
      let hour = this.time.hour;
      if (hour > 5 && hour < 12) {
        return "morning";
      } else if (hour > 12 && hour < 17) {
        return "afternoon";
      } else if (hour > 17 && hour < 24) {
        return "evening";
      } else if (hour > 0 && hour < 5) {
        return "night";
      }
    },
    greeting() {
      let hour = this.time.hour;
      if (hour > 5 && hour < 12) {
        return "Доброе утро!";
      } else if (hour > 12 && hour < 17) {
        return "Добрый день!";
      } else if (hour > 17 && hour < 24) {
        return "Добрый вечер!";
      } else if (hour > 0 && hour < 5) {
        return "Доброй ночи!";
      }
    },
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

      this.weather = currentWeatherDay;
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

      let timer = setInterval(() => {
        sec = sec + 1;
        if (sec == 60) {
          this.time.minutes = this.time.minutes + 1;
          sec = 0;
          if (this.time.minutes == 60) {
            this.time.minutes = 0;
            this.time.hour = this.time.hour + 1;
            if (this.time.hour == 24) {
              clearInterval(timer);
              this.time.hour = 0;
              this.getCurrentWeatherDay(this.weather);
            }
          }
        }
      }, 1000);
    },
  },
  filters: {
    fixMinutes: function (value) {
      if (value < 10) {
        return `0${value}`;
      }
      return value;
    },
  },
  created() {
    axios
      .get("https://api.openweathermap.org/data/2.5/forecast?", {
        params: {
          q: "tomsk",
          appid: "27966056cc44b7aa53d432d46ad371ed",
          units: "metric",
        },
      })
      .then((response) => this.getCurrentWeatherDay(response.data.list));
    axios
      .get("https://api.nasa.gov/planetary/apod?", {
        params: {
          api_key: "DEMO_KEY",
        },
      })
      .then((response) => this.interestingNews = response.data);
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.morning {
  background: linear-gradient(
    359.86deg,
    #ffffff -36.17%,
    rgba(253, 203, 110, 0.7) 66.77%,
    rgba(9, 132, 227, 0.84) 98.79%
  );
}
.afternoon {
  background: linear-gradient(
    359.86deg,
    #ffffff 14.74%,
    rgba(116, 185, 255, 0.8) 79.58%,
    #0984e3 104.4%
  );
}
.evening {
  background: linear-gradient(
    359.86deg,
    rgba(253, 203, 110, 0.7) 31.49%,
    rgba(253, 121, 168, 0.8) 82.78%,
    rgba(232, 67, 147, 1) 104.4%
  );
}
.night {
  background: linear-gradient(
    359.86deg,
    #ffffff -25.28%,
    #636e72 71.58%,
    #292d32 93.19%
  );
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .place {
    display: flex;
    align-items: center;
    div:first-child {
      height: 21px;
      margin-right: 0.2em;
    }
  }
}

.colon {
  transition: opacity 1s linear;
  animation: rotate 1.5s linear infinite;
}

@keyframes rotate {
  25% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  75% {
    opacity: 1;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  padding: 1em;
}
.current_info {
  padding: 0 4em;
  margin-top: 2em;
  .current_info_weather {
    display: flex;
    justify-content: space-between;
    font-size: 2.25rem;
  }
}
.greeting {
  text-align: center;
  margin: 1em 0 0.5em 0;
}
</style>
