<template>
  <div class="majorlist">
    <my-header></my-header>
    <div class="fjac" style="min-height: calc(100vh - 22.5vw);" v-if="loading">
      <cube-loading class="fjac" :size="40"></cube-loading>
    </div>
    <div v-else>
      <p class="h1 f18 fjac">热门专业</p>
      <div class="recommend fjsb fww" style="padding: 3vw;">
        <div v-for="(item, index) in recommend" :key="index">
          <router-link
            class="dib recommend-item"
            :to="{
              path: 'jianzhanglist',
              query: { majorid: item.id, majorname: item.title }
            }"
          >
            {{ item.title }}
          </router-link>
        </div>
      </div>
      <div class="big-hr"></div>
      <p class="h1 f18 fjac" style="padding-bottom: 3vw;">全部专业</p>
      <major-list-block
        v-for="(val, name, index) in major"
        :key="index"
        :title="name"
        :num="val.num"
        :major="val.value"
      ></major-list-block>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";
import MajorListBlock from "../components/MajorListBlock";
export default {
  name: "MajorList",
  components: { MajorListBlock, MyFooter, MyHeader },
  data() {
    return {
      loading: true,
      recommend: "",
      major: ""
    };
  },
  mounted() {
    this.getMajor();
  },
  methods: {
    getMajor() {
      const that = this;
      console.time(1);
      this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.GetMajorList"
          }
        })
        .then(function(response) {
          // console.log(response.data.info)
          that.loading = false;
          that.recommend = response.data.info.recommond;
          that.major = response.data.info.major_list;
          // console.log(that.recommend);
          console.timeEnd(1);
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  }
};
</script>

<style scoped>
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
