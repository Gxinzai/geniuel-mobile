<template>
  <div>
    <my-header></my-header>
    <div class="grayBg">
      <div class="fjsb fww p3vw mt3vw">
        <router-link class="db box" :to="e.view" v-for="(e, i) in list" :key="i">
          <img :src="e.thumb" alt="" />
          <p class="fc666 lh24 ell f12">{{ e.title }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../components/MyHeader";
export default {
  name: "ZhuanTiList",
  components: { MyHeader },
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      const that = this;

      this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.GetSubjectList"
          }
        })
        .then(function(response) {
          console.log(response.data.info);
          that.list = response.data.info.reverse();
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.grayBg {
  padding-top: 1px;
  min-height: calc(100vh - 10.5vw);
  background: #f6f6f6;
}
.box {
  width: 45%;
  margin-bottom: 3vw;
  font-size: 0;
}
img {
  width: 100%;
}
.fc666 {
  box-sizing: border-box;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(235, 235, 235, 1);
}
</style>
