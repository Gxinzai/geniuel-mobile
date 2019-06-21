<template>
  <div class="home">
    <div class="header">
      <img class="loaction" src="../assets/icon-loaction.png" />
      <span class="loaction-word grayFont">位置</span>
      <img class="logo" alt="logo" src="../assets/logo.png" />
      <router-link to="/search">
        <img class="search" src="../assets/icon-search.png" />
      </router-link>
      <router-link to="/login">
        <img class="admin" src="../assets/icon-admin.png" />
      </router-link>
    </div>
    <cube-slide :showDots="false" :data="banner"></cube-slide>
    <div class="nav">
      <div class="nav-container">
        <div class="nav-item fjac">
          <router-link to="/zzbs">
            <img src="../assets/index-icon-1.png" style="width: 7.33vw;" />
            <p>博士项目</p>
          </router-link>
        </div>
        <div class="nav-item fjac">
          <router-link to="/tdxl">
            <img src="../assets/index-icon-4.png" style="width: 6.4vw;" />
            <p>同等学力</p>
          </router-link>
        </div>
        <div class="nav-item fjac">
          <router-link to="/zzss">
            <img src="../assets/index-icon-2.png" style="width: 6.53vw;" />
            <p>专业硕士</p>
          </router-link>
        </div>

        <div class="nav-item fjac">
          <router-link to="/hzbx">
            <img src="../assets/index-icon-5.png" style="width: 8.67vw;" />
            <p>合作办学</p>
          </router-link>
        </div>
        <div class="nav-item fjac">
          <router-link to="/gdyx">
            <img src="../assets/index-icon-3.png" style="width: 6.8vw;" />
            <p>高端研修</p>
          </router-link>
        </div>

        <div class="nav-item fjac">
          <router-link to="/schoollist">
            <img src="../assets/index-icon-6.png" style="width: 7.2vw;" />
            <p>院校选择</p>
          </router-link>
        </div>
        <div class="nav-item fjac">
          <router-link to="/majorlist">
            <img src="../assets/index-icon-7.png" style="width: 5.87vw;" />
            <p>专业选择</p>
          </router-link>
        </div>
        <div class="nav-item fjac">
          <router-link to="/jianzhanglist">
            <img src="../assets/index-icon-8.png" style="width:8.8vw;" />
            <p>简章选择</p>
          </router-link>
        </div>
        <div class="nav-item fjac">
          <router-link to="/baoming">
            <img src="../assets/index-icon-9.png" style="width: 8vw;" />
            <p>报名入口</p>
          </router-link>
        </div>
        <div class="nav-item fjac">
          <router-link to="/zixunlist">
            <img src="../assets/index-icon-10.png" style="width: 10.13vw;" />
            <p>资讯</p>
          </router-link>
        </div>
      </div>
    </div>
    <div class="message-container fac" @touchmove.prevent @mousemove.prevent>
      <div class="message-left">消息</div>
      <cube-slide
        class="message-right"
        ref="slide"
        :data="message"
        :showDots="false"
        :loop="true"
        direction="vertical"
        @touchmove.prevent
        @mousemove.prevent
      >
        <cube-slide-item
          v-for="(item, index) in message"
          :key="index"
          @touchmove.prevent
          @mousemove.prevent
        >
          <p @touchmove.prevent>{{ item }}</p>
        </cube-slide-item>
      </cube-slide>
    </div>
    <div class="big-hr"></div>
    <div>
      <p class="h1 f18 fjac">在职研究生·专题推荐</p>
      <p class="grayFont h2">
        国内报考 在职研究生、高级课程班项目， 符合条件即可申请博士项目
      </p>
      <div class="fjsa fac" style="padding-bottom: 4vw;">
        <div v-for="(n, index) in zhuanti" :key="index">
          <a class="db" :href="n.url">
            <img v-lazy="n.thumb" style="width: 30.27vw" />
          </a>
        </div>
      </div>
    </div>
    <div class="big-hr"></div>
    <div>
      <p class="h1 f18 fjac">国外留学</p>
      <p class="grayFont">
        在职研究生/博士留学项目
      </p>
      <router-link to="/">
        <p class="grayFont h2">
          << 点击查看更多
        </p>
      </router-link>
      <div class="fjsa fac" style="padding-bottom: 4vw;">
        <img
          src="../assets/菲律宾德拉萨-阿拉内塔大学.png"
          style="width: 30.67vw"
        />
        <img src="../assets/菲律宾法蒂玛大学.png" style="width: 30.67vw" />
        <img src="../assets/菲律宾国父大学.png" style="width: 30.67vw" />
      </div>
    </div>
    <div class="big-hr"></div>
    <div>
      <p class="h1 f18 fjac">高端研修班</p>
      <p class="grayFont h2">
        << 点击查看更多
      </p>
      <div class="fjsa fac" style="padding-bottom: 4vw;">
        <div v-for="(n, index) in yanxiu" :key="index">
          <a class="db" :href="n.url">
            <img v-lazy="n.img" style="width: 30.67vw" />
          </a>
        </div>
      </div>
    </div>

    <div class="big-hr"></div>
    <div>
      <p class="h1 f18 fjac">报考指南</p>
      <p class="grayFont h2">
        << 点击查看更多
      </p>
      <div style="padding-bottom: 2vw;">
        <div class=" guide-item" v-for="(n, index) in baokao" :key="index">
          <a class="fac" :href="n.url">
            <img src="../assets/ztad01.png" />
            <div>
              <p class="tl">{{ n.title }}</p>
              <p class="tj">
                {{ n.remark | wordLimit(43) }}
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="big-hr"></div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyFooter from "../components/MyFooter";

export default {
  name: "home",
  components: {
    MyFooter
  },
  data() {
    return {
      banner: [
        // {
        //   url: "http://www.didichuxing.com/",
        //   image:
        //     "http://www.geniuel.com/uploadfile/2019/05/28/20190528154759u2qxV7.png"
        // },
        // {
        //   url: "http://www.didichuxing.com/",
        //   image:
        //     "http://www.geniuel.com/uploadfile/2019/05/28/20190528154759u2qxV7.png"
        // },
        // {
        //   url: "http://www.didichuxing.com/",
        //   image:
        //     "http://www.geniuel.com/uploadfile/2019/05/28/20190528154759u2qxV7.png"
        // }
      ],
      message: [
        "刚刚138****8909报考清华大学在职博士课程",
        "刚刚138****8909报考清华大学在职博士课程",
        "刚刚138****8909报考清华大学在职博士课程"
      ],
      guide: [
        {
          img: "",
          title: "",
          desc:
            "在职研究生是国家计划内，以在职人员的身份，半脱产，部分时间在职工作，部分时间在校学习的研究生学历教育的一种类型。"
        }
      ],
      yanxiu: "",
      zhuanti: "",
      baokao: ""
    };
  },
  mounted() {
    this.getBanner();
  },
  methods: {
    getBanner() {
      const that = this;
      this.axios
        .get(
          "/phalapi/public/",
          { params: { service: "App.Index.GetIndexInfo" } }
          // this.qs.stringify(data)
        )
        .then(function(response) {
          console.log(response.data);
          that.banner = response.data.info.banner;
          that.yanxiu = response.data.info.yanxiu;
          that.zhuanti = response.data.info.project_list;
          that.baokao = response.data.info.baokao_list;
          console.log(that.banner);
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  }
};
</script>
<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2vw 0;
  .loaction {
    margin-left: 2.8vw;
    width: 2.53vw;
  }
  .loaction-word {
    margin-left: 1vw;
  }
  .logo {
    margin: 0 auto;
    width: 26.53vw;
  }
  .search {
    margin-right: 4vw;
    width: 3.33vw;
  }
  .admin {
    margin-right: 2.67vw;
    width: 2.93vw;
  }
}
.nav-container {
  display: flex;
  flex-wrap: wrap;
  .nav-item {
    box-sizing: border-box;
    width: 20vw;
    height: 20vw;
    border-bottom: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    img {
      margin-bottom: 1vw;
    }
  }
  .nav-item:nth-of-type(5n + 5) {
    border-right: none;
  }
  p {
    color: #666666;
  }
}
.message-left {
  padding: 3px 0;
  margin: 0 5vw;
  width: 10vw;
  background: rgba(255, 208, 25, 1);
  border-radius: 3vw;
  color: white;
}
.message-right {
  width: 80vw;
  text-align: left;
  height: 10vw;
  overflow: hidden;
  .cube-slide-item {
    line-height: 10vw;
  }
}
.guide-item:nth-of-type(1) {
  padding-top: 0;
}
.guide-item {
  padding: 3vw 0;
  img {
    margin: 0 3vw;
    width: 18.67vw;
  }
  .tl {
    margin-bottom: 5px;
  }
  .tj {
    color: #666666;
    padding-right: 3vw;
  }
}
.guide-item + .guide-item {
  border-top: 1px solid #eeeeee;
}
</style>
