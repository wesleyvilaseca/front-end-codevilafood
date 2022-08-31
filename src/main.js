require('./bootstrap')

import Vue from 'vue';
import BaseTemplate from './layouts/BaseTemplate';
import router from './routes/router';
import store from './store';

Vue.config.productionTip = false

new Vue({
  render: h => h(BaseTemplate),
  router,
  store
}).$mount('#app')
