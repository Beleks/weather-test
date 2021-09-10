<template>
  <div class="block" :class="{ dark_mode: timeOfDay === 'night' }">
    <div
      class="weatherInterval"
      v-for="(weatherInterval, index) in weather"
      :key="index"
    >
      <div class="temp">
        <img
          class="picture"
          :src="`http://openweathermap.org/img/wn/${weatherInterval.weather[0].icon}@2x.png`"
        />
        <div>+{{ weatherInterval.main.temp | rounding }}</div>
      </div>
      <div class="interval">{{ weatherInterval.dt_txt | fixInterval }}</div>
    </div>
    <div class="interestingNews" v-if="interestingNews">
      <div class="title">{{ interestingNews.title }}</div>
      <div class="desc">{{ interestingNews.explanation }}</div>
      <img :src="interestingNews.hdurl" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weather: Array,
    interestingNews: Object,
    timeOfDay: String,
  },
  methods: {
    srcIcon(icon) {
      return `http://openweathermap.org/img/wn/${icon}@2x.png`;
    },
  },
  filters: {
    fixInterval: function (value) {
      return value.slice(10, 16);
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  border-radius: 20px;
  background-color: #f8f7f7;
  color: #3c4045;
  font-size: 1.125rem;
  margin: 0 auto;
  padding: 0.5em 1.2em 1em 0.2em;
}
.dark_mode {
  color: #f8f7f7;
  background-color: #292d32;
}
.weatherInterval {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1em 0;
  font-weight: bold;
}
.temp {
  display: flex;
  align-items: center;
  .picture {
    width: 60px;
    height: 60px;
  }
}
.interestingNews {
  margin-left: 1em;

  .title {
    font-size: 1.125rem;
    font-weight: bold;
  }
  .desc {
    text-align: start;
    margin: 1em 0;
  }
  img {
    border-radius: 10px;
    max-width: 100%;
    height: 100%;
  }
}
</style>