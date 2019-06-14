<template>
  <div>
    <my-header></my-header>
    <div class="fjsb fac filter-container">
      <div
        class="filter-item f16"
        @click="filtersResult = 0;reGetZiXun()"
        :class="[filtersResult === 0 ? 'active' : '']"
      >
        全部
      </div>
      <div
        v-for="(e, i) in filters"
        :key="i"
        class="filter-item"
        :class="[filtersResult === e.value ? 'active' : '']"
        @click="filtersResult = e.value;reGetZiXun()"
      >
        {{ e.name }}
      </div>
    </div>
    <div class="mybody">
      <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :data="zixun"
          :options="options"
          @pulling-down="onPullingDown"
          @pulling-up="onPullingUp"
        >
          <img :src="banner.image" class="banner" alt="">
          <ul>
            <li
              v-for="(zx, index) in zixun"
              :key="index"
              class="zixun-box tl"
              @click="y=$refs.scroll.scroll.y"
            >
              <router-link :to="{ path: 'zixuncontent', query: { type: zx.type,id:zx.id }}" >
                <p class="title f14">{{zx.title| wordLimit(22) }}</p>
                <div class="df fac">
                  <img :src="zx.thumb" class="thumb" v-if="zx.thumg" alt="">
                  <div class="remark fc666 lh18 " v-html="zx.remark.slice(0,50)+'...'"></div>
                </div>
                <p class="time grayFont">{{zx.addtime}}</p>
              </router-link>
            </li>
          </ul>
        </cube-scroll>
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
      banner:'',
      zixun: [],
      filters: [],
      filtersResult: 0,
      pageno: 1,
      y:0,
      options: {
        pullDownRefresh: {
          threshold: 90,
          txt: "刷新成功"
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: "加载成功",
            noMore: "没有更多了"
          },
          visible: true
        },
        scrollbar: true
      }
    };
  },
  mounted() {
    this.getFilters();
    this.getZiXun();
  },
  activated(){
    this.moveY();
  },
  methods: {
    moveY(){
      if( this.y){
        this.$refs.scroll.scrollTo(0, this.y, 300);
        this.$refs.scroll.refresh()
      }
    },
    reGetZiXun() {
      this.y=0;
      this.$refs.scroll.scrollTo(0, 0, 300);
      this.$refs.scroll.refresh()

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
          // console.log(response.data.info);
          that.filters = response.data.info;
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    async getZiXun() {
      const that = this;
      let jiami = wjz({
        type_id: that.filtersResult,
        pageno: that.pageno,
        pagesize: 8
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
          // console.table(response.data.info.news_list);
          that.banner=response.data.info.banner[0]
          that.zixun = [...that.zixun, ...response.data.info.news_list];
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
  padding: 0 3vw ;
  height: 10.5vw;
  border-bottom: 1px solid #e4e4e4;
}
.filter-item {
  padding-bottom: 1vw;
  color: #666666;
  border-bottom: 1px solid transparent;
  transition: all 0.3s;
}
.filter-item.active {
  border-bottom: 1px solid #ffc119;
}
.banner{
  width: 100%;
}
.zixun-box{
  padding: 3vw;
  border-bottom: 1px solid #e4e4e4;
}
.title{
  margin-bottom: 2vw;
}
.remark{
  margin-bottom: 2vw;
}
.time{
  margin-bottom: 1vw;
}
.thumb{
  width: 13.07vw;
}
.scroll-list-wrap {
  height: calc(100vh - 32.5vw);
}
  .ads{}
</style>
