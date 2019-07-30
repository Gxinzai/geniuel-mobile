<template>
  <div>
    <my-header></my-header>
    <div class="h1 f18 fjac">类型</div>
    <div class="p3vw fjsb fww" style="margin-top: 8vw;">
      <router-link
        class="db leixing por tl"
        :to="{
          path: 'kuaisuschool',
          query: { type: 1 }
        }"
      >
        <p class="f16 fc333">博士项目</p>
        <p class="fc666 en">Doctoral Program</p>
        <img class="img poa" src="../assets/kuaisu1.png" alt="" />
      </router-link>

      <router-link
        class="db leixing por tl"
        :to="{
          path: 'kuaisuschool',
          query: { type: 2 }
        }"
      >
        <p class="f16 fc333">在职硕士</p>
        <p class="fc666 en">On-the-job Master's Degree</p>
        <img class="img poa" src="../assets/kuaisu2.png" alt="" />
      </router-link>
      <router-link
        class="db leixing por tl"
        :to="{
          path: 'kuaisuschool',
          query: { type: 3 }
        }"
      >
        <p class="f16 fc333">研修班</p>
        <p class="fc666 en">Advanced seminar</p>
        <img class="img poa" src="../assets/kuaisu3.png" alt="" />
      </router-link>
      <router-link
        class="db leixing por tl"
        :to="{
          path: 'kuaisuchuguo'
        }"
      >
        <p class="f16 fc333">出国留学</p>
        <p class="fc666 en">Overseas Studies</p>
        <img class="img poa" src="../assets/kuaisu4.png" alt="" />
      </router-link>
    </div>
    <div class="big-hr" style="margin-top: 5vw;"></div>
    <div class="h1 f18 fjac">专业</div>
    <div class="recommend fjsb fww" style="padding: 3vw;">
      <div v-for="(item, index) in recommend" :key="index">
        <router-link
          class="dib recommend-item ell"
          :to="{
            path: 'jianzhanglist',
            query: { majorid: item.id, majorname: item.title }
          }"
        >
          {{ item.title }}
        </router-link>
      </div>
    </div>
    <my-footer :has-black="false"></my-footer>
  </div>
</template>

<script>
import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";
export default {
  name: "KuaiSu",
  components: { MyFooter, MyHeader },
  data() {
    return {
      recommend: []
    };
  },
  created() {},
  mounted() {
    this.getMajor();
  },
  methods: {
    getMajor() {
      const that = this;
      this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.GetFastNavMajor"
          }
        })
        .then(function(response) {
          console.log(response.data.info);
          that.recommend = response.data.info;
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.leixing {
  box-sizing: border-box;
  padding: 5vw;
  width: 44.6vw;
  height: 22vw;
  .img {
    right: 10px;
    bottom: 0;
  }
  .en {
    transform: scale(0.5) translate(-47%);
  }
}
.leixing:nth-of-type(1) {
  margin-bottom: 12vw;
  background: #ffdfdf;
  img {
    width: 19.07vw;
  }
}
.leixing:nth-of-type(2) {
  background: #ffecc7;
  img {
    width: 16.93vw;
  }
}
.leixing:nth-of-type(3) {
  background: #d0dff9;
  img {
    width: 18.4vw;
  }
}
.leixing:nth-of-type(4) {
  background: #d2f9f6;
  img {
    width: 16.4vw;
  }
}
.recommend-item {
  box-sizing: border-box;
  width: 29.6vw;
  border: 1px solid #e4e4e4;
  color: #666666;
  padding: 3vw 0;
  margin-bottom: 3vw;
  border-radius: 1vw;
}
</style>
