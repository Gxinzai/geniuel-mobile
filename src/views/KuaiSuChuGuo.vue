<template>
  <div>
    <my-header></my-header>
    <div class="df fww">
      <router-link
        v-for="(e, i) in country"
        :key="i"
        :to="{
          path: 'kuaisuschool',
          query: { type: 4, lid: e.lid }
        }"
        class="box db fac fc666 f14"
      >
        <img :src="e.thumb" class="img" style="" alt="" />
        {{ e.name }}
      </router-link>
    </div>
    <my-footer :has-black="false"></my-footer>
  </div>
</template>

<script>
import MyFooter from "../components/MyFooter";
import MyHeader from "../components/MyHeader";
export default {
  name: "KuaiSuChuGuo",
  components: { MyHeader, MyFooter },
  data() {
    return {
      country: []
    };
  },
  mounted() {
    this.getCountry();
  },
  methods: {
    getCountry() {
      const that = this;
      this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.GetForeignCountry"
          }
        })
        .then(function(response) {
          console.log(response.data.info);
          that.country = response.data.info;
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.box {
  box-sizing: border-box;
  width: 50%;
  height: 16vw;
  border-bottom: 1px solid #ececec;
}
.box:nth-of-type(odd) {
  border-right: 1px solid #ececec;
}
.img {
  width: 10.93vw;
  margin-left: 10vw;
  margin-right: 3vw;
}
</style>
