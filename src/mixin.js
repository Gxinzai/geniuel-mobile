export default {
  sayhello:{
    created: function () {
      this.hello()
    },
    methods: {
      hello: function () {
        console.log('hello from mixin!')
      },
      myToast : function (message,time=1000) {
        this.toast = this.$createToast({
          txt: message,
          time:time,
          type: "txt"
        });
        this.toast.show();
      }
    }
  }
}

