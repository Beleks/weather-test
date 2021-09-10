import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.filter('rounding', function (value) {
  return Math.round(value);
})

new Vue({
  render: h => h(App),
}).$mount('#app')
