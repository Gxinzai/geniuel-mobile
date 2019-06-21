<template>
  <div>
    <my-header></my-header>
    <div class="big-hr"></div>
    <div class="content my-body tj">
      <p class="f16 tc fjac">
        <img
          :src="jz_info.school_logo"
          style="width: 9.33vw;margin-right: 3vw;"
          alt=""
        />
        {{ jz_info.school_name }}
      </p>
      <p class="f16 title lh18 tc mt3vw red">{{ jz_info.title }}</p>
      <p class="fjsb mt3vw desc">
        <span
          >学费：<span class="red">{{ jz_info.xuefeiid }}</span
          >万
        </span>
        <span
          >学制：<span class="red">{{ jz_info.xuezhiid }}</span
          >年
        </span>
        <span
          >方式：<span class="red">{{ jz_info.shoukeid | shoukeid }}</span>
        </span>
        <span
          >上课地点：<span class="red">{{ jz_info.area_name }}</span>
        </span>
      </p>
      <div class="zhengwen f14 lh24 fc666" v-html="jz_info.content"></div>
      <router-link
        :to="{ path: 'baoming', query: { jz: jz_info.school_name } }"
      >
        <div class="baoming f14 tc">立即报名</div>
      </router-link>
      <div class="mt3vw">
        <router-link
          :to="{ path: 'jianzhang', query: { id: previous_page.id } }"
        >
          <p class="f14 lh24 fc666 ell">上一篇：{{ previous_page.title }}</p>
        </router-link>

        <router-link :to="{ path: 'jianzhang', query: { id: next_page.id } }">
          <p class="f14 lh24 fc666 ell">下一篇：{{ next_page.title }}</p>
        </router-link>
      </div>
    </div>
    <div
      class="df"
      style="background: white;position: fixed;bottom: 0;z-index: 1;"
    >
      <div class="fjac footer-item">
        <div>
          <img
            src="../assets/icon-share-gray.png"
            style="width:3.2075vw;"
            alt=""
          />
          <p class="fc666">立即分享</p>
        </div>
      </div>

      <div class="fjac footer-item">
        <div>
          <a class="whiteFont db" href="tel:4007188018">
            <img
              src="../assets/icon-tel-gray.png"
              style="width: 4.375vw;"
              alt=""
            />
            <p class="fc666">电话咨询</p>
          </a>
        </div>
      </div>
      <div class="fjac footer-item">
        <div>
          <a
            class="dib"
            href="https://ww16.53kf.com/webCompany.php?kf_sign=TAxNzMTU0NUwOTEwMzg2NzA1MTA0MDE1&arg=10190463&style=3"
          >
            <p class="whiteFont f14">在线咨询</p>
          </a>
        </div>
      </div>
      <div class="fjac footer-item">
        <router-link to="/baoming">
          <div>
            <router-link
              :to="{ path: 'baoming', query: { jz: jz_info.school_name } }"
            >
              <p class="whiteFont f14">在线报名</p>
            </router-link>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";
export default {
  name: "jianZhang",
  components: { MyFooter, MyHeader },
  data() {
    return {
      next_page: {},
      previous_page: {},
      jz_info: {}
    };
  },
  mounted() {
    this.getJianZhang();
  },
  computed: {
    jzid() {
      return this.$route.query.id;
    }
  },
  watch: {
    jzid: function(newVal, oldVal) {
      this.getJianZhang();
    }
  },
  methods: {
    getJianZhang() {
      const that = this;
      let jiami = this.jiami({
        id: that.jzid
      });
      this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.GetJianZhangInfo",
            key: jiami.key,
            info: jiami.value
          }
        })
        .then(function(response) {
          console.log(response.data.info);
          that.jz_info = response.data.info.jz_info;
          that.jz_info.content = that.jz_info.content.replace(
            /<table/g,
            '<div class="table-responsive"> <table'
          );
          that.jz_info.content = that.jz_info.content.replace(
            /<\/table>/g,
            "</table> </div>"
          );
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
  margin-bottom: 10.5vw;
}
.title {
  margin-bottom: 2vw;
}
.red {
  color: #ff0000 !important;
}
.desc {
  padding-bottom: 2vw;
  margin-bottom: 3px;
  border-bottom: 2px solid #ff0000;
}
.baoming {
  background: #e60012;
  color: white;
  line-height: 10vw;
}
.zhengwen {
  border-top: 1px solid #ff0000;
  padding-top: 3vw;
}
.footer-item {
  box-sizing: border-box;
  width: 25vw;
  height: 12vw;
  color: white;
  border-top: 1px solid #e4e4e4;
  p {
    margin-top: 3px;
  }
  a {
    color: white !important;
  }
}
.footer-item:nth-of-type(1) {
  border-right: 1px solid #e4e4e4;
}
.footer-item:nth-of-type(3) {
  background-color: #ffaf15;
  color: white;
  border-right: 1px solid white;
}
.footer-item:nth-of-type(4) {
  background-color: #ea4245;
  color: white;
}
</style>
