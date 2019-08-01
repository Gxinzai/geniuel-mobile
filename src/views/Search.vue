<template>
  <div>
    <my-header></my-header>
    <div class="input-box df">
      <input
        class="input f14"
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
				 class="fac school-container"
                  :to="{
                    path: 'jianzhanglist',
                    query: { schoolid: zx.id, schoolname: zx.title }
                  }"
                >
				 <img :src="zx.thumb" class="school-logo" alt="" />
				 <div class="tl">
					 <p class="fac t">
					   <span class="title f16 fc333" v-html="keywordsreg(zx.title)"></span>
					  <span
					    class="brand brand-211 whiteFont"
					    v-if="zx.school_attribute.includes('211')"
					    >211</span
					  >
					  <span
					    class="brand brand-985 whiteFont"
					    v-if="zx.school_attribute.includes('985')"
					    >985</span
					  >
					</p> 
					 <p class="grayFont">{{ zx.jz_num }}篇简章</p>
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
              <div v-else-if="zx.type === 'jianzhang'" class="jianzhang-b df">
                <router-link
				  class="df"
                  :to="{				
                    path: 'jianzhang',
                    query: { id: zx.id }
                  }"
                >
				<div class="df" style="float: left;">
					 <div class="img-box">
					  <img v-lazy="zx.school_logo" alt="" />
					  <p>报名中</p>
					</div>
				</div>
				<div style="float: right;">
					 <p class="title  fab">
					  <span
					    class="xiangmu-span f14"
					    :class="['xiangmu-span' + zx.xiangmuidnum]"
					  >
					    {{ zx.xiangmuid | xiangmuid }}
					  </span>
					  <span class="f15 fc333 tj">
					    {{ zx.yanjiuid || zx.title }}
					  </span>
					</p>
					 <p class="name tl f14">
					  {{ zx.school_name }} / 专业: {{ zx.major_name }}
					</p>
					 <div class="span-box tl">
					  <span class="tc">{{ zx.xuefeiid | delete0 }}万</span>
					  <span class="tc">{{ zx.area_name }}</span>
					  <span class="tc">{{ zx.shoukeid | shoukeid }}</span>
					  <span class="tc">{{ zx.xuezhiid | delete0 }}年</span>
					</div>
				</div>
                  <!-- <p class="title f16 fc333 ell" v-html="keywordsreg(zx.title)"></p> -->
                  <!-- <div
                    class="remark fc666 lh18 "
                    v-html="zx.remark.slice(0, 50) + '...'"
                  ></div> -->
                 <!-- <p class="time fc999">
                    <span>专业：{{ zx.major_name }}</span> &emsp;
                    <span>学费：{{ zx.xuefeiid | delete0 }}万</span> &emsp;
                    <span>学制：{{ zx.xuezhiid | delete0 }}年</span> &emsp;
                    <span
                      >地区：<span v-html="keywordsreg(zx.area_name)"></span
                    ></span>
                  </p> -->
                </router-link>
              </div>
              <div v-else>
                <router-link
                  :to="{
                    path: 'zixuncontent',
                    query: { type: zx.type, id: zx.id }
                  }"
                >
                  <p class="title f16 fc333 ell" v-html="keywordsreg(zx.title)"></p>
                  <div class="df fac">
                    <img :src="zx.thumb" class="thumb" v-if="zx.thumg" alt="" />
                    <div
                      class="remark fc666 lh18 "
                      v-html="zx.remark"
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
    <my-footer :has-black="false"></my-footer>
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
        // { value: 0, name: "综合" },
        { value: 1, name: "院校" },
        // { value: 2, name: "专业" },
        { value: 3, name: "简章" },
        { value: 4, name: "资讯" }
      ],
	   xiangMuClassArr: [
	    "同等学力硕士",
	    "专业学位硕士",
	    "合作办学",
	    "高端研修",
	    "博士项目"
	  ],
	  filterResult:{
		shouke: { name: "", value: 0 }
	  },
	   shouke: [
	    { name: "不限", value: 0 },
	    { name: "面授班", value: 1 },
	    { name: "网络班", value: 2 }
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
      // console.table({
      //   type: that.filtersResult,
      //   keywords: that.keywords,
      //   pageno: that.pageno,
      //   pagesize: 10
      // });
      let jiami = wjz({
		shoukeid: that.filterResult.shouke.value,
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
		    response.data.info.forEach(v => {
		    v.xiangmuidnum = String(
		      that.xiangMuClassArr.findIndex(e => e === v.xiangmuid)
		    );
		  });
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
  height: 16px;
  margin-bottom: 2vw;
}
.remark {
	 height: 36px;
	 margin-bottom: 2vw;
	 overflow: hidden;
	 display: -webkit-box;
	 -webkit-line-clamp: 2;
	 -webkit-box-orient: vertical;
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
 .tl {
      text-align: left;
  }
// 新改页面-院校
.school-container{
	padding: 3vw;
}
.school-logo {
  width: 9.6vw;
  height: 9.6vw;
  object-fit: contain;
  margin-right: 3vw;
}
.brand {
  display: inline-block;
  width: 7.2vw;
  line-height: 3.6vw;
  border-radius: 3px;
  text-align: center;
  margin-left: 2vw;
}
.brand-211 {
  background: #4f99dc;
}
.brand-985 {
  background: #e65757;
}
// 新改页面-简章
.jianzhang-b {
  // padding: 3vw;
  // border-bottom: 1px solid #e4e4e4;
  .img-box {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
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
      color: #679bd2;
    }
    span:nth-of-type(2) {
      background: #ffebea;
      color: #d57261;
    }
    span:nth-of-type(3) {
      background: #ddf5ed;
      color: #5eab8d;
    }
    span:nth-of-type(4) {
      /*width: 20vw;*/
      background: #ffefdf;
      color: #d6a043;
    }
  }
}



</style>
