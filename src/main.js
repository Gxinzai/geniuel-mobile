import Vue from "vue";
import './plugins/axios'
import './plugins/cube-ui'
import './filter'
import App from "./App.vue";
import router from './router'
import Qs from "qs";

Vue.prototype.qs = Qs;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
