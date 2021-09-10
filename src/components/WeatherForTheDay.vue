<template>
  <div class="block">
    <div
      class="weatherInterval"
      v-for="(weatherInterval, index) in weather"
      :key="index"
    >
      <div class="temp">
        <img
          class="picture"
          :src="srcIcon(weatherInterval.weather[0].icon)"
        ></img>
        <div>+{{ weatherInterval.main.temp | rounding }}</div>
      </div>
      <div class="interval">{{ weatherInterval.dt_txt | fixInterval }}</div>
    </div>
    <div class="interestingNews">
      <div class="title"></div>
      <div class="desc"></div>
      <img src="" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weather: Array,
    interestingNews: Object,
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
  background-color: antiquewhite;
  margin: 0 auto;
  padding: 0.5em 1.2em 1em 0.2em;
}
.weatherInterval {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1em 0;
}
.temp {
  display: flex;
  align-items: center;
  .picture {
    width: 60px;
    height: 60px;
  }
}
</style>