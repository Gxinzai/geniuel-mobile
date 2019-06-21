import Vue from "vue";
import "./plugins/axios";
import "./plugins/cube-ui";
import "./filter";
// import "./lib/aes/components/pad-zeropadding-min";
// import "./lib/aes/function";
import App from "./App.vue";
import router from "./router";
import Qs from "qs";
// import api from "./api";
import VueLazyload from "vue-lazyload";

Vue.prototype.jiami = wjz;

Vue.use(VueLazyload, {
  error: './favicon.ico',
});
Vue.prototype.qs = Qs;
// Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
