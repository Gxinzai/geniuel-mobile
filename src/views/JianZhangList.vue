<template>
  <div class="jianzhang" style="position: relative;">
    <my-header></my-header>
    <div class="mybody">
      <div class="fjsb bb1" style="padding: 3vw;">
        <span
          class="fc666 f16"
          @click="
            remen = !remen;
            order_type = remen ? 3 : 0;
            reGetJianZhang();
          "
          :class="[remen ? 'active' : '']"
          >热门简章</span
        >
        <span
          class="fc666 f16 triangle up"
          @click="
            up = !up;
            down = false;
            order_type = up ? 1 : 0;
            reGetJianZhang();
          "
          :class="[up ? 'active' : '']"
          >学费高</span
        >
        <span
          class="fc666 f16 triangle down"
          @click="
            down = !down;
            up = false;
            order_type = down ? 2 : 0;
            reGetJianZhang();
          "
          :class="[down ? 'active' : '']"
          >学费低</span
        >
        <span class="fc666 f16 fac" @click="drawer = !drawer"
          >筛选<img
            src="../assets/icon-filter.png"
            style="width: 4.27vw;"
            alt=""
          />
        </span>
      </div>
      <div class="df close-box" v-if="closeBox">
        <div
          class="close-item"
          v-for="(e, i) in filterResult"
          :key="i"
          v-show="e.value"
          @click="
            filterResult[i] = { name: '', value: 0 };
            reGetJianZhang();
          "
        >
          {{ e.name }} <i class="cubeic-close"></i>
        </div>
      </div>
      <div class="scroll-list-wrap">
        <cube-scroll
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
            >
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
                  {{ jz.title | wordLimit(18) }}
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
            </li>
          </ul>
        </cube-scroll>
      </div>
    </div>
    <my-footer></my-footer>
    <transition name="slide-fade-right">
      <div class="my-drawer df" v-if="drawer">
        <div style="flex: 1" @click="drawer = false" @touchmove.prevent></div>
        <div class="container" style="overflow: scroll" @touchmove.self.stop>
          <p class="fc666 fjsb">
            <span>授课形式：</span>
            <span class="yellowFont">{{ filterResult.shouke.name }}</span>
          </p>
          <div class="fjsb">
            <div
              class="item"
              v-for="(item, index) in shouke"
              :key="index"
              @click="filterResult.shouke = item"
              :class="[
                filterResult.shouke.value === item.value ? 'active' : ''
              ]"
            >
              {{ item.name }}
            </div>
          </div>
          <p class="fc666 fjsb">
            <span>类型：</span>
            <span class="yellowFont">{{ filterResult.leixing.name }}</span>
          </p>
          <div class="fjsb fww">
            <div
              class="item"
              v-for="(item, index) in leixing"
              :key="index"
              @click="filterResult.leixing = item"
              :class="[
                filterResult.leixing.value === item.value ? 'active' : ''
              ]"
            >
              {{ item.name }}
            </div>
          </div>
          <p class="fc666 fjsb">
            <span>院校：</span>
            <span class="yellowFont">{{ filterResult.school.name }}</span>
          </p>
          <div class="fjsb fww">
            <div
              class="item"
              v-for="(item, index) in school"
              :key="index"
              @click="filterResult.school = item"
              :class="[filterResult.school.value == item.value ? 'active' : '']"
            >
              {{ item.name }}
            </div>
            <div
              class="item all"
              @click="
                indexList = true;
                indexListData = indexListDataSchool;
                updateKey = 'school';
              "
            >
              查看全部
            </div>
          </div>
          <p class="fc666 fjsb">
            <span>专业：</span>
            <span class="yellowFont">{{ filterResult.major.name }}</span>
          </p>
          <div class="fjsb fww">
            <div
              class="item"
              v-for="(item, index) in major"
              :key="index"
              @click="filterResult.major = item"
              :class="[filterResult.major.value == item.value ? 'active' : '']"
            >
              {{ item.name }}
            </div>
            <div
              class="item all"
              @click="
                indexList = true;
                indexListData = indexListDataMajor;
                updateKey = 'major';
              "
            >
              查看全部
            </div>
          </div>
          <p class="fc666 fjsb">
            <span>地点：</span>
            <span class="yellowFont">{{ filterResult.location.name }}</span>
          </p>
          <div class="fjsb fww">
            <div
              class="item"
              v-for="(item, index) in location"
              :key="index"
              @click="filterResult.location = item"
              :class="[
                filterResult.location.value == item.value ? 'active' : ''
              ]"
            >
              {{ item.name }}
            </div>
            <div
              class="item all"
              @click="
                indexList = true;
                indexListData = indexListDataLocation;
                updateKey = 'location';
              "
            >
              查看全部
            </div>
          </div>
          <p class="fc666 fjsb">
            <span>学费：</span>
            <span class="yellowFont">{{ filterResult.xuefei.name }}</span>
          </p>
          <div class="fjsb fww">
            <div
              class="item"
              v-for="(item, index) in xuefei"
              :key="index"
              @click="filterResult.xuefei = item"
              :class="[
                filterResult.xuefei.value === item.value ? 'active' : ''
              ]"
            >
              {{ item.name }}
            </div>
          </div>
          <div
            class="df"
            style="position: absolute; bottom: 0; left: 10vw; right: 0;border-top: 1px solid #e4e4e4;"
          >
            <div
              class="btn cancel"
              @click="filterResult = { ...filterResultInitial }"
            >
              重置
            </div>
            <div
              class="btn confirm"
              @click="
                drawer = false;
                reGetJianZhang();
              "
            >
              确定
            </div>
          </div>
        </div>
      </div>
    </transition>
    <index-list
      :index-list-data="indexListData"
      :indexList.sync="indexList"
      @updateFilter="updateFilter($event)"
      v-if="indexList"
    ></index-list>
  </div>
</template>

<script>
import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";
import IndexList from "../components/IndexList";
export default {
  name: "JianZhangList",
  components: { IndexList, MyFooter, MyHeader },
  data() {
    return {
      remen: false,
      up: false,
      down: false,
      drawer: false,
      indexList: false,
      indexListData: [],
      indexListDataSchool: [],
      indexListDataMajor: [],
      indexListDataLocation: [],
      xiangmuclassarr: [
        "博士项目",
        "同等学力",
        "专业学位硕士",
        "合作办学",
        "高端研修"
      ],
      jianzhang: [],
      updateKey: "",
      order_type: 0,
      pageno: 1,
      filterResult: {
        shouke: { name: "", value: 0 },
        leixing: { name: "", value: 0 },
        school: { name: "", value: 0 },
        major: { name: "", value: 0 },
        location: { name: "", value: 0 },
        xuefei: { name: "", value: 0 }
      },
      filterResultInitial: {
        shouke: { name: "", value: 0 },
        leixing: { name: "", value: 0 },
        school: { name: "", value: 0 },
        major: { name: "", value: 0 },
        location: { name: "", value: 0 },
        xuefei: { name: "", value: 0 }
      },
      shouke: [
        { name: "不限", value: 0 },
        { name: "面授班", value: 1 },
        { name: "网络班", value: 2 }
      ],
      leixing: [
        { name: "不限", value: 0 },
        { name: "博士项目", value: 3579 },
        { name: "同等学力", value: 3580 },
        { name: "专业硕士", value: 3581 },
        { name: "合作办学", value: 3582 },
        { name: "高端研修", value: 3583 }
      ],
      school: [
        { name: "不限", value: 0 },
        { name: "中国社会科学院", value: 33 },
        { name: "北京师范大学", value: 7 },
        { name: "菲律宾国父大学", value: 161 },
        { name: "德拉萨大学", value: 164 }
      ],
      major: [
        { name: "不限", value: 0 },
        { name: "马克思主义理论", value: 135 },
        { name: "工商管理", value: 103 },
        { name: "教育学", value: 145 },
        { name: "金融学", value: 42 }
      ],
      location: [
        { name: "不限", value: 0 },
        { name: "北京", value: 2 },
        { name: "浙江省", value: 13 },
        { name: "广东省", value: 21 },
        { name: "国外", value: 3644 }
      ],
      xuefei: [
        { name: "不限", value: 0 },
        { name: "1000~10000", value: 1 },
        { name: "10001~15000", value: 2 },
        { name: "15001~20000", value: 3 },
        { name: "20001~30000", value: 4 },
        { name: "30001~40000", value: 5 },
        { name: "40001~50000", value: 6 },
        { name: "50001~80000", value: 7 },
        { name: "150000元以上", value: 8 }
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
    this.getFilters();
    this.getJianZhang();
  },
  computed: {
    closeBox() {
      let close = false;
      for (let k in this.filterResult) {
        let val = this.filterResult[k];
        if (val.value) {
          close = true;
        }
      }
      return close;
    }
  },
  watch: {
    drawer: function(newVal, oldVal) {
      let body = document.querySelector("body");
      // console.log(body)
      if (newVal) {
        body.classList.add("noscroll");
      } else {
        body.classList.remove("noscroll");
      }
    }
  },
  methods: {
    reGetJianZhang() {
      this.$refs.scroll.scrollTo(0, 0, 300);
      this.jianzhang = [];
      this.pageno = 1;
      this.getJianZhang();
    },
    onPullingDown() {
      setTimeout(() => {
        this.reGetJianZhang();
        this.$refs.scroll.forceUpdate();
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
    getFilters() {
      const that = this;
      this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.GetJianZhangScreen"
          }
        })
        .then(function(response) {
          // console.log(response.data.info);
          for (let key in response.data.info[2].setting) {
            let val = response.data.info[2].setting[key];
            that.indexListDataSchool.push({
              name: key,
              items: val
            });
          }
          for (let key in response.data.info[3].setting) {
            let val = response.data.info[3].setting[key];
            that.indexListDataMajor.push({
              name: key,
              items: val
            });
          }
          for (let key in response.data.info[4].setting) {
            let val = response.data.info[4].setting[key];
            that.indexListDataLocation.push({
              name: key,
              items: val
            });
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    async getJianZhang() {
      const that = this;
      let jiami = wjz({
        shoukeid: that.filterResult.shouke.value,
        xiangmuid: that.filterResult.leixing.value,
        schoolid: that.filterResult.school.value,
        majorid: that.filterResult.major.value,
        area_id: that.filterResult.location.value,
        xuefeiid: that.filterResult.xuefei.value,
        order_type: that.order_type,
        pageno: that.pageno,
        pagesize: 10
      });
      await this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.GetJianZhangList",
            key: jiami.key,
            info: jiami.value
          }
        })
        .then(function(response) {
          response.data.info.forEach(v => {
            v.xiangmuidnum = String(
              that.xiangmuclassarr.findIndex(e => e === v.xiangmuid)
            );
          });
          console.log(response.data.info);
          that.jianzhang = [...that.jianzhang, ...response.data.info];
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    updateFilter($event) {
      console.log($event);
      this.filterResult[this.updateKey] = $event;
    }
  }
};
</script>

<style scoped lang="scss">
.mybody {
  /*height: calc(100vh - 10.5vw);*/
}
.scroll-list-wrap {
  height: calc(100vh - 32.5vw);
  /*height: 600px;*/
  /*margin-bottom: 12vw;*/
}
.triangle::after {
  display: inline-block;
  content: "";
  width: 0;
  height: 0;
  border: solid transparent;
  border-width: 2vw;
}
.down::after {
  border-top-color: #b0b0b0;
  margin-bottom: -2vw;
  margin-left: 1vw;
}
.up::after {
  border-bottom-color: #b0b0b0;
  margin-top: -2vw;
  margin-left: 1vw;
}
.active {
  color: #ffd019 !important;
}
.active.up::after {
  border-bottom-color: #ffd019 !important;
}
.active.down::after {
  border-top-color: #ffd019 !important;
}
.close-box {
  padding: 3vw;
  border-bottom: 1px solid #e4e4e4;
  overflow: scroll;
}
.close-box::-webkit-scrollbar {
  display: none;
}
.close-item {
  padding: 0 2vw;
  margin-right: 3vw;
  line-height: 6vw;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(229, 229, 229, 1);
  border-radius: 3px;
  white-space: nowrap;
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
  .xiangmu-span1 {
    background: #4794d9;
  }
  .xiangmu-span2 {
    background: #22ac38;
  }
  .xiangmu-span3 {
    background: #f4a930;
  }
  .xiangmu-span4 {
    background: #d01f36;
  }
  .xiangmu-span5 {
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
.my-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 4;
}
.container {
  box-sizing: border-box;
  padding: 3vw;
  padding-bottom: 12vw;
  width: 90vw;
  background: white;
}
.item {
  box-sizing: border-box;
  width: 29.38%;
  background: #e5e5e5;
  color: #666;
  margin: 3vw 0;
  line-height: 8vw;
  border: 1px solid transparent;
}
.item.active {
  color: #ffd019;
  background: white;
  border: 1px solid #ffd019;
}
.item.all {
  color: white;
  background: #626262;
}
.btn {
  width: 50%;
  line-height: 12vw;
}
.cancel {
  background: white;
}
.confirm {
  background: #ffc119;
  color: white;
}
</style>
