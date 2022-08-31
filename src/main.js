require('./bootstrap');
require('./plugins');

import Vue from 'vue';
import BaseTemplate from './layouts/BaseTemplate';
import router from './routes/router';
import store from './store';

/**
 * global components
 */

Vue.component('preloader-component', () => import('./components/Preloader/PreloaderComponent'))

Vue.config.productionTip = false

new Vue({
  render: h => h(BaseTemplate),
  router,
  store
}).$mount('#app')
