<template>
  <div>
    <white-header></white-header>
    <div class="type fjsa fac">
      <span class="f16" :class="{ active: type }" @click="type = true"
        >简章</span
      >
      <span
        class="f16"
        :class="{ active: !type }"
        @click="
          type = false;
          reGetZiXun();
        "
        >资讯</span
      >
    </div>
    <div class="scroll-list-wrap">
      <cube-scroll
        v-if="type"
        ref="scroll"
        :data="jianzhang"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
      >
        <ul>
          <li
            v-for="(jz, index) in jianzhang"
            :key="index"
            class="jianzhang-box df"
            @click="y = $refs.scroll.scroll.y"
          >
            <router-link :to="{ path: '/jianzhang', query: { id: jz.id } }">
              <div class="df">
                <div class="img-box">
                  <img v-lazy="jz.school_logo" alt="" />
                  <p>报名中</p>
                </div>
                <div>
                  <p class="title f14 fac">
                    <span
                      class="xiangmu-span"
                      :class="['xiangmu-span' + jz.xiangmuidnum]"
                    >
                      {{ jz.xiangmuid | xiangmuid }}
                    </span>
                    <span class="f14 fc333">
                        {{ jz.title | wordLimit(18) }}
                      </span>
                  </p>
                  <p class="name tl">
                    {{ jz.school_name }} / 专业: {{ jz.major_name }}
                  </p>
                  <div class="span-box tl">
                    <span class="tc">学费{{ jz.xuefeiid | delete0 }}万</span>
                    <span class="tc">{{ jz.area_id }}</span>
                    <span class="tc">{{ jz.shoukeid | shoukeid }}</span>
                    <span class="tc">学制：{{ jz.xuezhiid | delete0 }}年</span>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </cube-scroll>
      <cube-scroll
        v-else
        ref="scroll"
        :data="zixun"
        :options="options"
        @pulling-down="onPullingDownR"
        @pulling-up="onPullingUpR"
      >
        <ul>
          <li
            v-for="(zx, index) in zixun"
            :key="index"
            class="zixun-box tl"
            @click="y = $refs.scroll.scroll.yR"
          >
            <router-link
              :to="{
                path: 'zixuncontent',
                query: { type: zx.type_name, id: zx.t_id }
              }"
            >
              <p class="title f14 ell">{{ zx.title }}</p>
              <div class="df fac">
                <img :src="zx.thumb" class="thumb" v-if="zx.thumg" alt="" />
                <div
                  class="remark fc666 lh18 "
                  v-html="zx.remark.slice(0, 50) + '...'"
                ></div>
              </div>
              <p class="time grayFont">{{ zx.addtime }}</p>
            </router-link>
          </li>
        </ul>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import WhiteHeader from "../components/WhiteHeader";
export default {
  name: "collection",
  components: { WhiteHeader },
  data() {
    return {
      type: true,
      pageno: 1,
      y: 0,
      jianzhang: [],
      zixun: [],
      pagenoR: 1,
      yR: 0,

      xiangMuClassArr: [
        "同等学力硕士",
        "专业学位硕士",
        "合作办学",
        "高端研修",
        "博士项目"
      ],
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
    this.getJianZhang();
  },
  activated() {
    this.moveY();
    this.moveYR();
  },
  methods: {
    moveY() {
      if (this.y) {
        this.$refs.scroll.scrollTo(0, this.y, 300);
        this.$refs.scroll.refresh();
      }
    },
    moveYR() {
      if (this.yR) {
        this.$refs.scroll.scrollTo(0, this.yR, 300);
        this.$refs.scroll.refresh();
      }
    },
    reGetJianZhang() {
      this.y = 0;
      this.$refs.scroll.scrollTo(0, 0, 300);
      this.jianzhang = [];
      this.pageno = 1;
      this.getJianZhang();
    },
    reGetZiXun() {
      this.yR = 0;
      this.$refs.scroll.scrollTo(0, 0, 300);
      this.$refs.scroll.refresh();

      this.zixun = [];
      this.pagenoR = 1;
      this.getZiXun();
    },
    onPullingDown() {
      setTimeout(() => {
        this.reGetJianZhang();
        this.$refs.scroll.forceUpdate();
      }, 300);
    },
    onPullingDownR() {
      setTimeout(() => {
        this.reGetZiXun();
        this.$refs.scroll.forceUpdate();
      }, 300);
    },
    onPullingUpR() {
      let that = this;
      setTimeout(() => {
        let oldno = this.zixun.length;
        this.pagenoR += 1;
        this.getZiXun().then(function() {
          let newno = that.zixun.length;
          if (oldno === newno) {
            that.$refs.scroll.forceUpdate();
          }
        });
      }, 300);
    },
    onPullingUp() {
      let that = this;
      setTimeout(() => {
        let oldno = this.jianzhang.length;
        this.pageno += 1;
        this.getJianZhang().then(function() {
          let newno = that.jianzhang.length;
          if (oldno === newno) {
            that.$refs.scroll.forceUpdate();
          }
        });
      }, 300);
    },
    async getZiXun() {
      const that = this;
      let jiami = wjz({
        type: 1,
        uid: that.$root.userID,
        pageno: that.pagenoR,
        pagesize: 10
      });
      await this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.User.MyCollectList",
            key: jiami.key,
            info: jiami.value
          }
        })
        .then(function(response) {
          // console.log(response);
          // console.table(response.data.info.news_list);
          that.zixun = [...that.zixun, ...response.data.info];
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    async getJianZhang() {
      const that = this;
      let jiami = wjz({
        type: 0,
        uid: that.$root.userID,
        pageno: that.pageno,
        pagesize: 10
      });
      await this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.User.MyCollectList",
            key: jiami.key,
            info: jiami.value
          }
        })
        .then(function(response) {
          // console.log(response);
          response.data.info.forEach(v => {
            v.xiangmuidnum = String(
              that.xiangMuClassArr.findIndex(e => e === v.xiangmuid)
            );
          });
          that.jianzhang = [...that.jianzhang, ...response.data.info];
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.type {
  height: 10.5vw;
  border-bottom: 1px solid #e4e4e4;
  span {
    padding-bottom: 5px;
    border-bottom: 1px solid transparent;
  }
  span.active {
    border-bottom: 1px solid #ffd019;
  }
}
.scroll-list-wrap {
  height: calc(100vh - 21vw);
}
.jianzhang-box {
  padding: 3vw;
  border-bottom: 1px solid #e4e4e4;
  .img-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 4.8vw;
    padding-bottom: 1vw;
  }
  img {
    width: 9.6vw;
    height: 9.6vw;
  }
  .title {
    margin-bottom: 2vw;
  }
  .name {
    margin-bottom: 2vw;
  }
  .xiangmu-span {
    color: white;
    display: inline-block;
    margin-right: 1vw;
  }
  .xiangmu-span0 {
    background: #4794d9;
  }
  .xiangmu-span1 {
    background: #22ac38;
  }
  .xiangmu-span2 {
    background: #f4a930;
  }
  .xiangmu-span3 {
    background: #d01f36;
  }
  .xiangmu-span4 {
    background: #7f1fd0;
  }
  .span-box {
    span {
      box-sizing: border-box;
      display: inline-block;
      min-width: 16vw;
      line-height: 5vw;
      margin-right: 1.2vw;
      padding: 0 1vw;
    }
    span:nth-of-type(1) {
      background: #e1f2fe;
    }
    span:nth-of-type(2) {
      background: #ffebea;
    }
    span:nth-of-type(3) {
      background: #ddf5ed;
    }
    span:nth-of-type(4) {
      /*width: 20vw;*/
      background: #ffefdf;
    }
  }
}
.zixun-box {
  padding: 3vw;
  border-bottom: 1px solid #e4e4e4;
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
  }
}
</style>
