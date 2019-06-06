<template>
  <div class="jianzhang" style="position: relative;">
    <my-header></my-header>
    <div style="min-height: 100vh;">
      <div class="fjsb bb1" style="padding: 3vw;">
        <span
          class="fc666 f16"
          @click="remen = !remen"
          :class="[remen ? 'active' : '']"
          >热门简章</span
        >
        <span
          class="fc666 f16 triangle up"
          @click="
            up = !up;
            down = false;
          "
          :class="[up ? 'active' : '']"
          >学费高</span
        >
        <span
          class="fc666 f16 triangle down"
          @click="
            down = !down;
            up = false;
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
      <div>
        <div v-for="(jz,index) in jianzhang" :key="index" class="jianzhang-box df">
          <div class="img-box">
            <img v-lazy="jz.school_logo" alt="">
            <p>报名中</p>
          </div>
          <div>
            <p class="title f14 tl">{{jz.title | wordLimit(20)}}</p>
            <p class="name tl"> {{jz.school_name}} / 专业: {{jz.major_name}}</p>
            <div class="span-box tl">
              <span class="tc">学费{{jz.xuefeiid | delete0}}万</span>
              <span class="tc">{{jz.area_id}}</span>
              <span class="tc">{{jz.shoukeid}}</span>
              <span class="tc">学制：{{jz.xuezhiid | delete0}}年</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
    <transition name="slide-fade-right">
      <div class="my-drawer df" v-if="drawer">
        <div style="flex: 1" @click="drawer = false" @touchmove.prevent></div>
        <div class="container" style="overflow: scroll" @touchmove.self.stop>
          <p class="fc666 fjsb">
            <span>授课形式：</span>
            <span class="yellowFont">{{ filterRseult.shouke.name }}</span>
          </p>
          <div class="fjsb">
            <div
              class="item"
              v-for="(item, index) in shouke"
              :key="index"
              @click="
                closeOthers(shouke);
                filterRseult.shouke = item;
                item.checked = !item.checked;
              "
              :class="[item.checked ? 'active' : '']"
            >
              {{ item.name }}
            </div>
          </div>
          <p class="fc666 fjsb">
            <span>类型：</span>
            <span class="yellowFont">{{ filterRseult.leixing.name }}</span>
          </p>
          <div class="fjsb fww">
            <div
              class="item"
              v-for="(item, index) in leixing"
              :key="index"
              @click="
                closeOthers(leixing);
                filterRseult.leixing = item;
                item.checked = !item.checked;
              "
              :class="[item.checked ? 'active' : '']"
            >
              {{ item.name }}
            </div>
          </div>
          <p class="fc666 fjsb">
            <span>院校：</span>
            <span class="yellowFont">{{ filterRseult.school.name }}</span>
          </p>
          <div class="fjsb fww">
            <div
              class="item"
              v-for="(item, index) in school"
              :key="index"
              @click="
                closeOthers(school);
                filterRseult.school = item;
                item.checked = !item.checked;
              "
              :class="[item.checked ? 'active' : '']"
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
            <span class="yellowFont">{{ filterRseult.major.name }}</span>
          </p>
          <div class="fjsb fww">
            <div
              class="item"
              v-for="(item, index) in major"
              :key="index"
              @click="
                closeOthers(major);
                filterRseult.major = item;
                item.checked = !item.checked;
              "
              :class="[item.checked ? 'active' : '']"
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
            <span class="yellowFont">{{ filterRseult.location.name }}</span>
          </p>
          <div class="fjsb fww">
            <div
              class="item"
              v-for="(item, index) in location"
              :key="index"
              @click="
                closeOthers(location);
                filterRseult.location = item;
                item.checked = !item.checked;
              "
              :class="[item.checked ? 'active' : '']"
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
            <span class="yellowFont">{{ filterRseult.xuefei.name }}</span>
          </p>
          <div class="fjsb fww">
            <div
              class="item"
              v-for="(item, index) in xuefei"
              :key="index"
              @click="
                closeOthers(xuefei);
                filterRseult.xuefei = item;
                item.checked = !item.checked;
              "
              :class="[item.checked ? 'active' : '']"
            >
              {{ item.name }}
            </div>
          </div>
          <div
            class="df"
            style="position: absolute; bottom: 0; left: 10vw; right: 0;border-top: 1px solid #e4e4e4;"
          >
            <div class="btn cancel" @click="drawer = false">取消</div>
            <div class="btn confirm">确定</div>
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
      jianzhang: [],
      updateKey: "",
      filterRseult: {
        shouke: { name: "", value: 0 },
        leixing: { name: "", value: 0 },
        school: { name: "", value: 0 },
        major: { name: "", value: 0 },
        location: { name: "", value: 0 },
        xuefei: { name: "", value: 0 }
      },
      shouke: [
        { name: "不限", value: 0, checked: true },
        { name: "面授班", value: 1, checked: false },
        { name: "网络班", value: 2, checked: false }
      ],
      leixing: [
        { name: "不限", value: 0, checked: true },
        { name: "博士项目", value: 3579, checked: false },
        { name: "同等学力", value: 3580, checked: false },
        { name: "专业硕士", value: 3581, checked: false },
        { name: "合作办学", value: 3583, checked: false },
        { name: "高端研修", value: 3583, checked: false }
      ],
      school: [
        { name: "不限", value: 0, checked: true },
        { name: "中国社会科学院", value: 33, checked: false },
        { name: "北京师范大学", value: 7, checked: false },
        { name: "菲律宾国父大学", value: 161, checked: false },
        { name: "德拉萨大学", value: 164, checked: false }
      ],
      major: [
        { name: "不限", value: 0, checked: true },
        { name: "马克思主义理论", value: 135, checked: false },
        { name: "工商管理", value: 103, checked: false },
        { name: "教育学", value: 145, checked: false },
        { name: "金融学", value: 42, checked: false }
      ],
      location: [
        { name: "不限", value: 0, checked: true },
        { name: "北京", value: 2, checked: false },
        { name: "浙江省", value: 13, checked: false },
        { name: "广东省", value: 21, checked: false },
        { name: "国外", value: 3644, checked: false }
      ],
      xuefei: [
        { name: "不限", value: 0, checked: true },
        { name: "1000~10000", value: 1, checked: false },
        { name: "10001~15000", value: 2, checked: false },
        { name: "15001~20000", value: 3, checked: false },
        { name: "20001~30000", value: 4, checked: false },
        { name: "30001~40000", value: 5, checked: false },
        { name: "40001~50000", value: 6, checked: false },
        { name: "50001~80000", value: 7, checked: false },
        { name: "150000元以上", value: 8, checked: false }
      ]
    };
  },
  mounted() {
    this.getFilters();
    this.getJianZhang();
  },
  watch: {
    drawer: function(newVal, oldVal) {
      let body =document.querySelector('body');
      // console.log(body)
      if (newVal) {
        body.classList.add('noscroll');
      }else {
        body.classList.remove('noscroll');
      }
    }
  },
  methods: {
    getFilters() {
      const that = this;
      this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.GetJianZhangScreen"
          }
        })
        .then(function(response) {
          console.log(response.data.info);
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
    getJianZhang() {
      const that = this;
      let jiami = wjz({
        shoukeid: 0,
        xiangmuid: 0,
        schoolid: 0,
        majorid: 0,
        area_id: 0,
        xuefeiid: 0,
        order_type: 0,
        pageno: 1,
        pagesize: 10
      });
      this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.GetJianZhangList",
            key: jiami.key,
            info: jiami.value
          }
        })
        .then(function(response) {
          console.log(response.data.info);
          that.jianzhang = response.data.info
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    closeOthers(x) {
      x.map(e => (e.checked = false));
    },
    updateFilter($event) {
      // console.log($event)
      this.filterRseult[this.updateKey] = $event;
      this.closeOthers(this[this.updateKey])
    }
  }
};
</script>

<style scoped lang="scss">
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
.jianzhang-box{
  padding: 3vw;
  border-bottom: 1px solid #e4e4e4;
  .img-box{
    margin-right: 4.8vw;
  }
  img{
    width: 9.6vw;
    height: 9.6vw;
  }
  .title{
    margin-bottom: 1vw;
  }
  .name{
    margin-bottom: 1vw;
  }
  .span-box{
    span{
      box-sizing: border-box;
      display: inline-block;
      min-width: 16vw;
      line-height: 5vw;
      margin-right: 1.2vw;
      padding: 0 1vw;
    }
    span:nth-of-type(1){
      background: #E1F2FE;
    }
    span:nth-of-type(2){
      background: #FFEBEA;
    }
    span:nth-of-type(3){
      background: #DDF5ED;
    }
    span:nth-of-type(4){
      /*width: 20vw;*/
      background: #FFEFDF;
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
