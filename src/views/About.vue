<template>
  <div>
    <white-header></white-header>
    <div class="mt3vw p3vw">
      <div class="f14 fc666  tj lh18 " v-html="info.content"></div>
      <div class="f14 fc666  tj lh18 ">地址：{{ info.address }}</div>
      <div class="f14 fc666  tj lh18 mt3vw ">联系电话：{{ info.tel }}</div>
    </div>
    <div class="fjac" style="margin: 10vw 0;">
      <div style="margin-right: 15vw;">
        <img class="qr" src="../assets/qr-weixin.png" alt="" />
        <p
          class="yellowBg whiteFont lh24 mt3vw clipboard"
          data-clipboard-text="景牛在线"
        >
          复制微信号
        </p>
      </div>
      <div>
        <img class="qr" src="../assets/qr-weibo.png" alt="" />
        <p
          class="yellowBg whiteFont lh24 mt3vw clipboard"
          data-clipboard-text="景牛在线升学历"
        >
          复制微博号
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import ClipboardJS from "clipboard";
import WhiteHeader from "../components/WhiteHeader";
// import myMixin from '../mixin'
export default {
  components: { WhiteHeader },
  // mixins:[myMixin.sayhello],
  data() {
    return {
      info: ""
    };
  },
  mounted() {
    // console.log(myMixin)
    let that = this;
    let clipboard = new ClipboardJS(".clipboard");
    clipboard.on("success", function(e) {
      that.myToast("复制成功")
      e.clearSelection();
    });
    this.getInfo();
  },
  methods: {
    getInfo() {
      const that = this;
      let jiami = this.jiami({
        cid: this.$route.meta.cid
      });
      this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.User.GetAboutUs"
          }
        })
        .then(function(response) {
          // console.log(response.data);
          that.info = response.data.info;
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.qr {
  width: 25.6vw;
}
</style>
