<template>
  <div>
    <my-header></my-header>
    <div class="content my-body tl">
      <p class="f16 title lh18">{{ zx_info.title }}</p>
      <div class="grayFont time fjsb fac">
        <div>
          {{ zx_info.addtime }}
          来源:{{ zx_info.cpoy }}
        </div>
        <div class="fac" @click="like">
          <i class="cubeic-like f18" :class="{ red: collected }"></i>收藏
        </div>
      </div>
      <div class="zhengwen  lh24 fc666" v-html="zx_info.content"></div>
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
      zx_info: {},
      collected: 0
    };
  },
  mounted() {
    this.getZixun();
  },
  methods: {
    getZixun() {
      const that = this;
      let jiami = this.jiami({
        uid: that.$root.userID,
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
          // console.log(response);
          that.zx_info = response.data.info.zx_info;
          that.collected = response.data.info.zx_info.is_favorite;
          that.previous_page = response.data.info.previous_page;
          that.next_page = response.data.info.next_page;
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    like() {
      let that = this;
      if (!that.$root.userID) {
        that.myToast("请先登录")
        that.toast.show();
        setTimeout(() => {
          that.$router.push("login");
        }, 800);
        return;
      }
      if (this.disable) {
        return;
      }
      this.disable = true;
      setTimeout(() => {
        that.disable = false;
      }, 1000);
      let jiami = this.jiami({
        uid: that.$root.userID,
        id: that.$route.query.id,
        type:
          ["zixun", "baokao", "kaoyan"].findIndex(
            e => e === that.$route.query.type
          ) + 2
      });
      this.axios
        .post(
          "/phalapi/public/?service=App.User.PostCollect",
          this.qs.stringify({
            key: jiami.key,
            info: jiami.value
          })
        )
        .then(function(response) {
          // console.log(response);
          that.myToast(response.data.msg)
          if(response.data.code){
            that.collected = !that.collected;
          }
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
