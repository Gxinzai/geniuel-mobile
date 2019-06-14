<template :key="$route.query.id">
  <div :key="$route.query.id">
    <my-header></my-header>
    <div class="content my-body tl">
      <p class="f16 title lh18">{{ zx_info.title }}</p>
      <p class="grayFont time">
        {{ zx_info.addtime }}
        来源:{{ zx_info.cpoy }}
      </p>
      <div class="zhengwen f14 lh24 fc666" v-html="zx_info.content"></div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";
export default {
  name: "ZiXun",
  components: { MyFooter, MyHeader },
  data() {
    return {
      next_page: {},
      previous_page: {},
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
        id: that.$route.query.id,
        type: that.$route.query.type
      });
      this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.GetNewsInfo",
            key: jiami.key,
            info: jiami.value
          }
        })
        .then(function(response) {
          console.log(response.data.info);
          that.zx_info = response.data.info.zx_info;
          that.previous_page = response.data.info.previous_page;
          that.next_page = response.data.info.next_page;
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
  min-height: calc(100vh - 40.5vw);
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
.zhengwen {
  padding-top: 3vw;
  border-top: 1px solid #e4e4e4;
}
</style>
