<template>
  <div>
    <white-header></white-header>
    <div class="p3vw">
      <textarea
        v-model="advice"
        class="textarea f14 fc666"
        placeholder="快来给景牛说说你的想法吧~"
      ></textarea>
      <input
        type="text"
        class="input"
        v-model="contact"
        placeholder="QQ号/微信号/邮箱~"
      />
      <div
        class="yellowBg whiteFont"
        style="margin-top: 15vw;line-height: 10vw;"
        @click="submitHandler()"
      >
        提 交
      </div>
    </div>
  </div>
</template>

<script>
import WhiteHeader from "../components/WhiteHeader";
export default {
  name: "advise",
  components: { WhiteHeader },
  data() {
    return {
      advice: "",
      contact: ""
    };
  },
  mounted() {},
  methods: {
    submitHandler() {
      const that = this;
      let jiami = this.jiami({
        content:that.advice,
        phone:that.contact
      });
      // console.log(jiami)
      this.axios
        .post(
          "/phalapi/public/?service=App.User.MyFeedback",
          this.qs.stringify({
            key: jiami.key,
            info: jiami.value
          })
        )
        .then(function(response) {
          // console.log(response.data);
          that.myToast(response.data.msg)
        })
        .catch(function(error) {
          // console.log(error);
        });
    },

  }
};
</script>

<style scoped>
.textarea {
  box-sizing: border-box;
  width: 100%;
  height: 30vh;
  margin-top: 8vw;
  padding: 3vw;
  border: 1px solid #e4e4e4;
}
.input {
  box-sizing: border-box;
  width: 100%;
  height: 10vw;
  margin-top: 8vw;
  padding: 3vw;
  border: 1px solid #e4e4e4;
}
</style>
