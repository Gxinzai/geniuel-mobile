<template>
  <div>
    <my-header></my-header>
    {{current}}
    <div class="fjac" style="min-height: calc(100vh - 22.5vw);" v-if="loading">
      <cube-loading class="fjac" :size="40"></cube-loading>
    </div>
    <div class="zzbs" style="height: calc(100vh - 22.5vw);" v-else>
      <cube-scroll-nav @change="changeHandler"   :current="current" ref="scroll">
        <cube-scroll-nav-panel :label="liucheng[0]">
          <div class="fjac" style="height: 15vh;">img</div>
          <div class="h1 f18 fjac">什么是{{ $route.meta.zn }}</div>
          <div class="html p3vw" v-html="project_info.content"></div>
          <div class="big-hr mt3vw"></div>
          <div class="h1 f18 fjac">{{ $route.meta.zn }}报考条件</div>
          <div class="html p3vw" v-html="project_info.baokao"></div>
          <div class="big-hr"></div>
          <div class="h1 f18 fjac">{{ $route.meta.zn }}优势</div>
          <div
            class="df fac p3vw youshi"
            v-for="(e, i) in project_info.youshi_arr"
            :key="i"
          >
            <img :src="e.url" style="" alt="" />
            <div class="">
              <p class="f14 tl">{{ e.title }}</p>
              <p class="fc666 tj">{{ e.desc }}</p>
            </div>
          </div>
          <div class="big-hr"></div>
        </cube-scroll-nav-panel>

        <cube-scroll-nav-panel :label="liucheng[1]">
          <div class="h1 f18 fjac">报名资料</div>
          <div class="html p3vw" v-html="project_info.baoming"></div>
          <div class="big-hr mt3vw"></div>
          <div class="h1 f18 fjac">考试提醒</div>
          <div class="html p3vw" v-html="project_info.kaoshi"></div>
          <div class="big-hr mt3vw"></div>
        </cube-scroll-nav-panel>

        <cube-scroll-nav-panel :label="liucheng[2]">
          <div class="h1 f18 fjac">成绩查询</div>
          <div class="html p3vw" v-html="project_info.chaxun"></div>
          <div class="big-hr mt3vw"></div>
        </cube-scroll-nav-panel>
        <cube-scroll-nav-panel :label="liucheng[3]">
          <div class="h1 f18 fjac">申请论文</div>
          <div class="html p3vw" v-html="project_info.lunwen"></div>
          <div class="big-hr mt3vw"></div>
          <div class="h1 f18 fjac">论文指导</div>
          <ul class="p3vw lunwen">
            <li class="fac" v-for="(e, i) in project_info.lunwen_list" :key="i">
              <router-link
                class="dib tl fc666 ell"
                :to="{
                  path: '/zixuncontent',
                  query: { id: e.id, type: 'kaoyan' }
                }"
              >
                {{ e.title }}
              </router-link>
            </li>
          </ul>
          <div class="big-hr mt3vw"></div>
        </cube-scroll-nav-panel>
        <cube-scroll-nav-panel :label="liucheng[4]">
          <div class="h1 f18 fjac">学位授予</div>
          <div class="html p3vw" v-html="project_info.xuewei"></div>
          <div class="big-hr mt3vw"></div>
          <div class="h1 f18 fjac">学位证书</div>
          <router-link
            :to="{
              path: 'zixuncontent',
              query: { type: 'zixun', id: project_info.xuewei_zs.zx_id }
            }"
          >
            <div class="df fac p3vw">
              <img
                style="width: 33.07vw;margin-right: 10vw;"
                :src="project_info.xuewei_zs.img_left"
                alt=""
              />
              <p class="fc666 tj lh18">{{ project_info.xuewei_zs.dec_left }}</p>
            </div>
          </router-link>

          <div class="big-hr mt3vw"></div>
          <div class="h1 f18 fjac">结业证书</div>
          <div class="df fac p3vw">
            <img
              style="width: 33.07vw;margin-right: 10vw;"
              :src="project_info.xuewei_zs.img_right"
              alt=""
            />
            <p class="fc666 tj lh18">{{ project_info.xuewei_zs.dec_right }}</p>
          </div>
          <div class="big-hr mt3vw"></div>
        </cube-scroll-nav-panel>
        <cube-scroll-nav-panel :label="liucheng[5]">
          <div class="h1 f18 fjac">推荐院校</div>
          <ul class="p3vw school fjsb fww">
            <li class="" v-for="(e, i) in project_info.hot_school" :key="i">
              <router-link
                class="dib tl fc666 df fac"
                :to="{
                  path: 'jianzhanglist',
                  query: {
                    schoolid: e.id,
                    schoolname: e.title,
                    leixingid: $route.meta.value,
                    leixingname: $route.meta.zn
                  }
                }"
              >
                <img class="thumb" :src="e.thumb" alt="" />
                <div class="font-box f14">
                  <p class="t fc333 ell ">{{ e.title }}</p>
                  <p class="grayFont ">{{ $route.meta.zn }}</p>
                </div>
              </router-link>
            </li>
          </ul>
          <div class="p3vw">
            <router-link to="">
              <div class="more">进入选择院校 >></div>
            </router-link>
          </div>
          <div class="big-hr mt3vw"></div>
        </cube-scroll-nav-panel>
        <cube-scroll-nav-panel :label="liucheng[6]">
          <div class="h1 f18 fjac">推荐专业</div>
          <ul class="p3vw major fjsb fww">
            <li class="" v-for="(e, i) in project_info.hot_zy" :key="i">
              <router-link
                class="db tl fc666 "
                :to="{
                  path: 'jianzhanglist',
                  query: {
                    majorid: e.id,
                    majorname: e.title,
                    leixingid: $route.meta.value,
                    leixingname: $route.meta.zn
                  }
                }"
              >
                <p class="t fc333 ell f14">{{ e.title }}</p>
                <p class="grayFont f14">{{ $route.meta.zn }}</p>
              </router-link>
            </li>
          </ul>
          <div class="p3vw">
            <router-link to="">
              <div class="more">进入选择专业 >></div>
            </router-link>
          </div>
          <div class="big-hr mt3vw"></div>
        </cube-scroll-nav-panel>
        <cube-scroll-nav-panel :label="liucheng[7]">
          <div class="h1 f18 fjac">推荐简章</div>
          <ul class="p3vw lunwen">
            <li class="fac" v-for="(e, i) in project_info.hot_jz" :key="i">
              <router-link
                class="dib tl fc666 ell"
                :to="{ path: '/jianzhang', query: { id: e.id } }"
              >
                {{ e.title }}
              </router-link>
            </li>
          </ul>
          <div class="p3vw mt3vw">
            <router-link to="">
              <div class="more">进入选择简章 >></div>
            </router-link>
          </div>
          <div class="big-hr mt3vw"></div>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";
export default {
  name: "zzbs",
  components: { MyFooter, MyHeader },
  data() {
    return {
      y:0,
      current:'',
      project_info: "",
      loading: true,
      liucheng: [
        "报名须知",
        "上课考试",
        "成绩查询",
        "论文指导",
        "毕业证书",
        "选择院校",
        "选择专业",
        "选择简章"
      ]
    };
  },
  mounted() {
    this.getInfo();
    // this.$refs.scroll.jumpTo(this.liucheng[0]);

  },
  activated() {
    if(this.$refs.scroll){
      this.$refs.scroll.refresh();
    }
  },
  beforeRouteLeave (to, from, next) {
    console.log(this.$refs.scroll.stickyCurrent)
    this.current =this.$refs.scroll.stickyCurrent
    next()
  },
  methods: {
    moveY(){
      if( this.y){
        this.$refs.scroll.scrollTo(0, this.y, 300);
        this.$refs.scroll.refresh()
      }
    },
    getInfo() {
      const that = this;
      let jiami = this.jiami({
        cid: this.$route.meta.cid
      });
      this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.GetItemInfo",
            key: jiami.key,
            info: jiami.value
          }
        })
        .then(function(response) {
          console.log(response.data.info);
          that.project_info = response.data.info.project_info;
          that.liucheng = response.data.info.liucheng;
          that.loading = false;
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    changeHandler(label) {
      // console.log("changed to:", label);
    }
  }
};
</script>

<style lang="scss">
.zzbs {
  .h1 {
    margin-bottom: 3vw;
  }
  .big-hr {
    /*margin-top: 3vw;*/
  }
  .html {
    p,
    span {
      font-size: 3.2vw !important;
      line-height: 4.8vw !important;
      color: #666666 !important;
      text-align: justify !important;
    }
  }
  .youshi {
    padding: 3vw 3vw;
    border-bottom: 1px solid #e4e4e4;
    img {
      width: 18.13vw;
      margin-right: 3vw;
    }
    .tl {
      margin-bottom: 1vw;
    }
  }
  .img {
    display: inline-block;
    margin: 50vh 0;
  }
  .lunwen {
    li {
      line-height: 8vw;
      border-bottom: 1px solid #e4e4e4;
      &:before {
        content: "·";
        display: inline-block;
      }
    }
  }
  .school {
    li {
      box-sizing: border-box;
      margin-bottom: 3vw;
      padding: 1vw;
      width: 48%;
      border: 1px solid #e4e4e4;
    }
    .thumb {
      margin-right: 2vw;
      width: 11.11vw;
      height: 11.11vw;
      object-fit: contain;
    }
    .font-box {
      width: calc(100% - 13.11vw);
    }
    .t {
      margin-bottom: 2vw;
    }
    .ell {
      width: 100%;
    }
  }
  .major {
    li {
      box-sizing: border-box;
      margin-bottom: 3vw;
      padding: 2vw;
      width: 30%;
      border: 1px solid #e4e4e4;
    }
    .t {
      margin-bottom: 2vw;
    }
    .ell {
      width: 100%;
    }
  }
  .more {
    width: 100%;
    line-height: 8vw;
    background: rgba(248, 248, 248, 1);
    border: 1px solid rgba(229, 229, 229, 1);
  }
}
.cube-scroll-nav-panel .cube-sticky-ele {
  height: 0;
}
h2.cube-scroll-nav-panel-title {
  display: none;
}
</style>
