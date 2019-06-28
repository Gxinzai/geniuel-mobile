import Vue from "vue";
import "./plugins/axios";
import "./plugins/cube-ui";
// import "./plugins/mytoast";
import "./filter";
// import "./lib/aes/components/pad-zeropadding-min";
// import "./lib/aes/function";
import App from "./App.vue";
import router from "./router";
import Qs from "qs";

import VueLazyload from "vue-lazyload";

Vue.prototype.jiami = wjz;

Vue.use(VueLazyload, {
  error: "./favicon.ico"
});
Vue.prototype.qs = Qs;

Vue.prototype.myToast = function(message, time = 1000) {
  this.toast = this.$createToast({
    txt: message,
    time: time,
    type: "txt"
  });
  this.toast.show();
};

Vue.config.productionTip = false;

new Vue({
  router,
  data: {
    userID: localStorage.getItem("userID")
  },
  render: h => h(App)
}).$mount("#app");
