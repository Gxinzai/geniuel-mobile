<template>
  <div>
    <my-header></my-header>
    <div class="fjsb filter-container">
      <div class="filter-item f16" @click="filtersResult = 1" :class="[filtersResult === 1 ? 'active' : '']">全部</div>
      <div
        v-for="(e, i) in filters"
        :key="i"
        class="filter-item"
        :class="[filtersResult === e.value ? 'active' : '']"
        @click="filtersResult = e.value"
      >
        {{ e.name }}
      </div>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";
export default {
  name: "ZiXunList",
  components: { MyFooter, MyHeader },
  data() {
    return {
      zixun: [],
      filters: [],
      filtersResult: 1,
      pageno:1
    };
  },
  mounted() {
    this.getFilters();
    this.getZiXun();
  },
  methods: {
    reGetZiXun() {
      this.$refs.scroll.scrollTo(0, 0, 300);
      this.zixun = [];
      this.pageno = 1;
      this.getZiXun();
    },
    onPullingDown() {
      setTimeout(() => {
        this.reGetZiXun();
        this.$refs.scroll.forceUpdate();
      }, 300);
    },
    onPullingUp() {
      let that = this;
      setTimeout(() => {
        let oldno = this.zixun.length;
        this.pageno += 1;
        this.getZiXun().then(function() {
          let newno = that.zixun.length;
          if (oldno === newno) {
            that.$refs.scroll.forceUpdate();
          }
        });
      }, 300);
    },
    getFilters() {
      const that = this;
      this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.GetNewsScreen"
          }
        })
        .then(function(response) {
          console.log(response.data.info);
          that.filters = response.data.info;
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    async getZiXun() {
      const that = this;
      let jiami = wjz({
        type_id:that.filtersResult,
        pageno: that.pageno,
        pagesize: 5
      });
      await this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.GetNewsList",
            key: jiami.key,
            info: jiami.value
          }
        })
        .then(function(response) {
          console.log(response);
          that.zixun = [...that.zixun, ...response.data.info];
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.filter-container {
  padding: 3vw;
}
.filter-item {
  padding-bottom: 1vw;
  color: #666666;
  border-bottom: 1px solid transparent;
  transition: all .3s;
}
.filter-item.active {
  border-bottom: 1px solid #ffc119;
}
</style>
