<template>
  <div>
    <p class="h1 f16 fjac">热门院校</p>
    <router-link to="schoollist" class="fc666">查看更多热门院校</router-link>
    <div class="fjsb fww p3vw mt3vw">
      <div v-for="(item, i) in school" :key="i">
        <router-link
          class="db  school-container"
          :to="{
            path: 'jianzhanglist',
            query: { schoolid: item.id, schoolname: item.title }
          }"
        >
          <img
            v-lazy="item.thumb"
            :key="item.thumb"
            class="school-logo"
            alt=""
          />
          <p class="fc666  tc ell">{{ item.title }}</p>
        </router-link>
      </div>
      <div class="school-container h0"></div>
      <div class="school-container h0"></div>
      <div class="school-container h0"></div>
    </div>
    <p class="h1 f16 fjac">热门专业</p>
    <router-link to="majorlist" class="fc666">查看更多热门专业</router-link>
    <div class="fjsb fww p3vw mt3vw">
      <div v-for="(item, i) in major" :key="i">
        <router-link
          class="db major-container tc fc666  ell"
          :to="{
            path: 'jianzhanglist',
            query: { majorid: item.id, majorname: item.title }
          }"
        >
          {{ item.title }}
        </router-link>
      </div>
      <div class="major-container h0"></div>
      <div class="major-container h0"></div>
    </div>

    <p class="h1 f16 fjac">热门简章</p>
    <router-link to="jianzhanglist" class="fc666">查看更多热门简章</router-link>
    <ul class="p3vw lunwen mt3vw">
      <li class="fac" v-for="(e, i) in jianzhang" :key="i">
        <router-link
          class="dib tl fc666 ell "
          :to="{ path: '/jianzhang', query: { id: e.id } }"
        >
          {{ e.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ZhuantiTuijian",
  props: {
    id: {
      type: Number,
      default: 1,
      required: true
    }
  },
  data() {
    return {
      school: [],
      jianzhang: [],
      major: []
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      const that = this;
      let jiami = this.jiami({
        id: that.id
      });
      this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.GetSubjectInfo",
            key: jiami.key,
            info: jiami.value
          }
        })
        .then(function(response) {
          // console.log(response.data.info);
          that.school = response.data.info.yuanxi_list;
          that.major = response.data.info.zhuanye_list;
          that.jianzhang = response.data.info.jianzhang_list;
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.school-container {
  width: 23vw;
  margin-bottom: 3vw;
}
.school-logo {
  width: 12vw;
  height: 12vw;
  object-fit: contain;
  margin-bottom: 2vw;
}
.major-container {
  width: 29.73vw;
  margin-bottom: 3vw;
  border-radius: 14px;
  background: rgba(229, 229, 229, .35);
  border: 1px solid rgba(85, 85, 85, 1);
  line-height: 7.5vw;
}
.lunwen {
  margin-bottom: 3vw;
  li {
    line-height: 8vw;
    border-bottom: 1px solid #e4e4e4;
    &:before {
      content: "·";
      display: inline-block;
    }
  }
  .ell {
    padding-left: 1vw;
  }
}
</style>
