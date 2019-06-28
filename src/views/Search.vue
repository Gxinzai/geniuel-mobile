<template>
  <div>
    <my-header></my-header>
    <div class="input-box df">
      <input
        class="input f16"
        v-model="keywords"
        placeholder="输入搜索关键词"
        type="text"
      />
      <div class="icon fjac" @click="reGetZiXun()">
        <img class="search" src="../assets/icon-search.png" alt="" />
      </div>
    </div>
    <div class="fjsb fac filter-container">
      <div
        v-for="(e, i) in filters"
        :key="i"
        class="filter-item f16"
        :class="[filtersResult === e.value ? 'active' : '']"
        @click="
          filtersResult = e.value;
          reGetZiXun();
        "
      >
        {{ e.name }}
      </div>
    </div>
    <div class="mybody">
      <div class="scroll-list-wrap">
        <div v-if="!keywords">
          <div class="big-hr"></div>
          <div class="p3vw mt3vw">
            <p class="fc999 f16 tl">大家都在搜：</p>
            <div class="fjsb fww mt3vw">
              <div
                class="remen-item fjac"
                v-for="(e, i) in remen"
                :key="i"
                @click="
                  keywords = e.name;
                  reGetZiXun();
                "
              >
                <img src="../assets/icon-fire.png" v-if="e.fire" alt="" />
                <span class="dib ell"> {{ e.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <cube-scroll
          v-else
          ref="scroll"
          :data="zixun"
          :options="options"
          @pulling-down="onPullingDown"
          @pulling-up="onPullingUp"
        >
          <div v-if="noresult" class="f14" style="line-height: 10vw">
            未查询到相关数据
          </div>
          <ul>
            <li
              v-for="(zx, index) in zixun"
              :key="index"
              class="zixun-box tl"
              @click="y = $refs.scroll.scroll.y"
              :class="zx.type"
            >
              <div v-if="zx.type === 'yuanxi'">
                <router-link
                  :to="{
                    path: 'jianzhanglist',
                    query: { schoolid: zx.id, schoolname: zx.title }
                  }"
                >
                  <p class="title f16 fc333" v-html="keywordsreg(zx.title)"></p>
                  <div class="df fac">
                    <img :src="zx.thumb" class="thumb" alt="" />
                    <div class="fc666 lh24 ">
                      <p>
                        <span
                          >学费：<span class="red">{{ zx.price }}</span></span
                        >
                        &emsp;&emsp;
                        <span
                          >简章：<span class="red">{{ zx.jz_num }}</span
                          >篇</span
                        >
                      </p>
                      <p class=" ">
                        地址：<span v-html="keywordsreg(zx.address)"></span>
                      </p>
                    </div>
                  </div>
                </router-link>
              </div>
              <div v-else-if="zx.type === 'zhuanye'">
                <router-link
                  :to="{
                    path: 'jianzhanglist',
                    query: { majorname: zx.title, majorid: zx.id }
                  }"
                >
                  <p class="title f16 fc333" v-html="keywordsreg(zx.title)"></p>
                  <div
                    class="remark fc666 lh18 "
                    v-html="zx.remark.slice(0, 50) + '...'"
                  ></div>
                </router-link>
                <p>
                  <span class="dib pct50 fc999">
                    院校<span class="red">{{ zx.school_num }}</span
                    >所
                  </span>
                  <span class="dib pct50 fc999">
                    简章<span class="red">{{ zx.jz_num }}</span> 篇</span
                  >
                </p>
              </div>
              <div v-else-if="zx.type === 'jianzhang'">
                <router-link
                  :to="{
                    path: 'jianzhang',
                    query: { id: zx.id }
                  }"
                >
                  <p class="title f16 fc333" v-html="keywordsreg(zx.title)"></p>
                  <div
                    class="remark fc666 lh18 "
                    v-html="zx.remark.slice(0, 50) + '...'"
                  ></div>
                  <p class="time fc999">
                    <span>专业：{{ zx.major_name }}</span> &emsp;
                    <span>学费：{{ zx.xuefeiid | delete0 }}万</span> &emsp;
                    <span>学制：{{ zx.xuezhiid | delete0 }}年</span> &emsp;
                    <span
                      >地区：<span v-html="keywordsreg(zx.area_name)"></span
                    ></span>
                  </p>
                </router-link>
              </div>
              <div v-else>
                <router-link
                  :to="{
                    path: 'zixuncontent',
                    query: { type: zx.type, id: zx.id }
                  }"
                >
                  <p class="title f16 fc333" v-html="keywordsreg(zx.title)"></p>
                  <div class="df fac">
                    <img :src="zx.thumb" class="thumb" v-if="zx.thumg" alt="" />
                    <div
                      class="remark fc666 lh18 "
                      v-html="zx.remark.slice(0, 50) + '...'"
                    ></div>
                  </div>
                  <p class="time grayFont">{{ zx.addtime }}</p>
                </router-link>
              </div>
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
  name: "Search",
  components: { MyFooter, MyHeader },
  data() {
    return {
      keywords: "",
      noresult: false,
      zixun: [],
      remen: [
        { name: "社会科学院", fire: true },
        { name: "菲律宾国父大学", fire: true },
        { name: "UMT大学", fire: true },
        { name: "经济学", fire: false },
        { name: "马克思主义理论", fire: false },
        { name: "金融学", fire: false }
      ],
      filters: [
        { value: 0, name: "综合" },
        { value: 1, name: "院校" },
        { value: 2, name: "专业" },
        { value: 3, name: "简章" },
        { value: 4, name: "资讯" }
      ],
      filtersResult: 0,
      pageno: 1,
      y: 0,
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
    this.getZiXun();
  },
  activated() {
    this.moveY();
  },
  methods: {
    keywordsreg(x) {
      let that = this;
      let reg = new RegExp(that.keywords, "g");
      return that.keywords
        ? x.replace(reg, '<span class="red">' + that.keywords + "</span>")
        : x;
    },
    moveY() {
      if (this.y) {
        this.$refs.scroll.scrollTo(0, this.y, 300);
        this.$refs.scroll.refresh();
      }
    },
    reGetZiXun() {
      let that = this;
      this.zixun = [];
      this.pageno = 1;
      this.getZiXun();
      // console.log(that.$refs);
      that.y = 0;
      that.$refs.scroll.scrollTo(0, 0, 300);
      that.$refs.scroll.refresh();
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
    async getZiXun() {
      const that = this;
      console.table({
        type: that.filtersResult,
        keywords: that.keywords,
        pageno: that.pageno,
        pagesize: 10
      });
      let jiami = wjz({
        type: that.filtersResult,
        keywords: that.keywords,
        pageno: that.pageno,
        pagesize: 10
      });
      // console.log(jiami)
      await this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.SearchResult",
            key: jiami.key,
            info: jiami.value
          }
        })
        .then(function(response) {
          // console.log(response.data);
          // console.table(response.data.info);
          that.zixun = [...that.zixun, ...response.data.info];
          that.noresult = !that.zixun.length;
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.input-box {
  margin: 3vw 0;
  padding: 0 3vw;
  .input {
    padding-left: 1em;
    width: 81vw;
    height: 10.9vw;
    background: rgba(244, 244, 244, 1);
    border-radius: 3px 0px 0px 3px;
    outline: none;
  }
  .icon {
    width: 13.33vw;
    height: 10.9vw;
    background: rgba(255, 208, 25, 1);
    border-radius: 0px 3px 3px 0px;
    img {
      width: 5.07vw;
    }
  }
}
.filter-container {
  padding: 0 3vw;
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
.zixun-box {
  padding: 3vw;
  border-bottom: 1px solid #e4e4e4;
}
.title {
  margin-bottom: 2vw;
}
.remark {
  margin-bottom: 2vw;
}
.time {
  margin-bottom: 1vw;
}
.thumb {
  width: 13.07vw;
  margin-right: 4.6vw;
}
.scroll-list-wrap {
  height: calc(100vh - 32.5vw);
}
.remen-item {
  box-sizing: border-box;
  width: 29vw;
  padding: 3vw 0;
  border: 1px solid #e4e4e4;
  margin: 3vw 0;
  border-radius: 3px;
  img {
    width: 11%;
    margin-right: 1vw;
  }
  .ell {
    max-width: 80%;
  }
}
.ads {
}
</style>
