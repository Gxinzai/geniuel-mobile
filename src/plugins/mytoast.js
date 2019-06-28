import Vue from "vue";

let MyPlugin = {};
MyPlugin.install = function(Vue, options) {
  Vue.prototype.myGlobalMethod = function(message, time = 1000) {
    this.toast = this.$createToast({
      txt: message,
      time: time,
      type: "txt"
    });
    this.toast.show();
  };
  Vue.mixin({
    methods: {
      myToast: function(message, time = 1000) {
        this.toast = this.$createToast({
          txt: message,
          time: time,
          type: "txt"
        });
        this.toast.show();
      }
    }
  });
};

Vue.use(MyPlugin);
