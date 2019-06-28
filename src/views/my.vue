<template>
  <div class="my">
    <div class="block fjac por">
      <div class="poa back" @click="$router.push('/')"></div>
      <div class="poa query whiteFont f14">{{ $route.meta.zn }}</div>
      <img src="../assets/logo-circle.png" style="width: 22.13vw;" alt="" />
    </div>
    <my-wave></my-wave>
    <div class="fjsb" style="padding: 5vw 10vw;">
      <a class="db" href="tel:4007188018">
        <div class="img-box img-box1 fjac">
          <img src="../assets/icon-tel.png" alt="" />
        </div>
        <p class="f14 mt3vw fc333">电话咨询</p>
      </a>
      <a
        class="db"
        href="https://ww16.53kf.com/webCompany.php?kf_sign=TAxNzMTU0NUwOTEwMzg2NzA1MTA0MDE1&arg=10190463&style=3"
      >
        <div class="img-box img-box2 fjac">
          <img src="../assets/icon-consult.png" alt="" />
        </div>
        <p class="f14 mt3vw fc333">在线客服</p>
      </a>
      <router-link calss="db" to="baoming">
        <div class="img-box img-box3 fjac">
          <img src="../assets/icon-write.png" alt="" />
        </div>
        <p class="f14 mt3vw fc333">在线报名</p>
      </router-link>
    </div>
    <div class="big-hr mt3vw"></div>
    <router-link to="newslist">
      <div class="message-box fac p3vw">
        <img src="../assets/icon-message.png" style="width: 3.2vw;" alt="" />
        <span class="fc666">我的消息</span>
        <div class="arrow right"></div>
      </div>
    </router-link>
    <router-link to="collection">
      <div class="message-box fac p3vw">
        <img src="../assets/icon-star.png" style="width: 3.47vw;" alt="" />
        <span class="fc666">我的收藏</span>
        <div class="arrow right"></div>
      </div>
    </router-link>
    <!--<router-link to="">-->
    <!--<div class="message-box fac p3vw">-->
    <!--<img-->
    <!--src="../assets/icon-share-gray.png"-->
    <!--style="width: 2.27vw;"-->
    <!--alt=""-->
    <!--/>-->
    <!--<span class="fc666">分享好友</span>-->
    <!--<div class="arrow right"></div>-->
    <!--</div>-->
    <!--</router-link>-->
    <div class="big-hr "></div>
    <router-link to="advise">
      <div class="message-box fac p3vw">
        <img src="../assets/icon-advice.png" style="width: 3.2vw;" alt="" />
        <span class="fc666">反馈与建议</span>
        <div class="arrow right"></div>
      </div>
    </router-link>
    <router-link to="about">
      <div class="message-box fac p3vw">
        <img src="../assets/icon-admin.png" style="width: 2.67vw;" alt="" />
        <span class="fc666">关于我们</span>
        <div class="arrow right"></div>
      </div>
    </router-link>
  </div>
</template>

<script>
import MyWave from "../components/MyWave";
export default {
  name: "my",
  components: { MyWave },
  data() {
    return {};
  },
  computed: {
    classObject() {
      return {
        active: this.tabBar
      };
    }
  },
  mounted() {},
  methods: {
    submitHandler(e) {
      e.preventDefault();
      // console.log("submit", e);
      // console.log("rsult", this.model);
      const that = this;
      const { phone, password } = that.model;
      let jiami = this.jiami({
        phone,
        password
      });
      // console.log(jiami)
      this.axios
        .post(
          "/phalapi/public/?service=App.Index.PostBaoMing",
          this.qs.stringify({
            key: jiami.key,
            info: jiami.value
          })
        )
        .then(function(response) {
          // console.log(response.data.msg);
          that.myToast(response.data.msg)
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
    }
  }
};
</script>

<style scoped lang="scss">
.block {
  height: 30vh;
  background: rgb(255, 208, 25);
}
.back {
  position: absolute;
  left: 3vw;
  top: 3vw;
  width: 3vw;
  height: 3vw;
  border: 1px solid;
  border-color: white white transparent transparent;
  transform: rotate(-135deg);
}
.query {
  top: 3vw;
  left: 50%;
  transform: translate(-50%, 0);
}
.container {
  width: 60vw;
  margin: 0 auto;
}
.img-box {
  width: 18.67vw;
  height: 18.67vw;
  border-radius: 50%;
  img {
    width: 47.86%;
  }
}
.message-box {
  height: 10.6vw;
  border-bottom: 1px solid #e4e4e4;
  img {
    margin-right: 2vw;
  }
}
.arrow {
  width: 3vw;
  height: 3vw;
  border-right: 1px solid #b0b0b0;
  border-bottom: 1px solid #b0b0b0;
  transition: all 0.3s;
}
.arrow.right {
  transform: rotate(-45deg);
  margin-left: auto;
}
.img-box1 {
  background: #f29c5c;
}
.img-box2 {
  background: #65a0f6;
}
.img-box3 {
  background: #bbd875;
}
</style>
