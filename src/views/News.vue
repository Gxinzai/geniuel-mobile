<template>
  <div>
    <white-header></white-header>
    <div class="content my-body tl">
      <p class="f16 title lh18">{{ zx_info.title }}</p>
      <p class="grayFont time fjsb">
        来源：景牛在线
        <span>{{ zx_info.addtime }}</span>
      </p>
      <div class="zhengwen f14 lh24 fc666" v-html="zx_info.content"></div>
    </div>
  </div>
</template>

<script>
import WhiteHeader from "../components/WhiteHeader";
export default {
  name: "News",
  components: {WhiteHeader},
  data() {
    return {
      zx_info: {}
    };
  },
  mounted() {
    this.getZixun();
  },
  methods: {
    getZixun() {
      const that = this;
      let jiami = this.jiami({
        id: that.$route.query.id
      });
      this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.User.MyNewsInfo",
            key: jiami.key,
            info: jiami.value
          }
        })
        .then(function(response) {
          // console.log(response.data.info);
          that.zx_info = response.data.info;
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.my-body {
  box-sizing: border-box;
  min-height: calc(100vh - 10.5vw);
}
.content {
  padding: 3vw;
}
.title {
  margin-bottom: 2vw;
}
.time {
  margin-bottom: 2vw;
}
.span{
  margin-left: auto ;
}
.zhengwen {
  padding-top: 3vw;
  border-top: 1px solid #e4e4e4;
}
</style>
