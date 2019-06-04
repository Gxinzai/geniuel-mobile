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
    </div>
    <my-footer></my-footer>
    <transition name="slide-fade-right">
      <div class="my-drawer df" v-if="drawer" @touchmove.prevent>
        <div style="flex: 1" @click="drawer = false"></div>
        <div class="container" style="position: relative;">
          <p class="fc666 f16 tl">筛选方式： {{ filterRseult.shouke }}</p>
          <div class="fjsb">
            <div
              class="item"
              v-for="(item, index) in shouke"
              :key="index"
              @click="
                closeOthers(shouke);
                filterRseult.shouke = item.value;
                item.checked = !item.checked;
              "
              :class="[item.checked ? 'active' : '']"
            >
              {{ item.text }}
            </div>
          </div>
          <p class="fc666 f16 tl">类型： {{ filterRseult.leixing }}</p>
          <div class="fjsb fww">
            <div
              class="item"
              v-for="(item, index) in leixing"
              :key="index"
              @click="
                closeOthers(leixing);
                filterRseult.leixing = item.value;
                item.checked = !item.checked;
              "
              :class="[item.checked ? 'active' : '']"
            >
              {{ item.text }}
            </div>
          </div>
          <p class="fc666 f16 tl">院校： {{ filterRseult.school }}</p>
          <div class="fjsb fww">
            <div
              class="item"
              v-for="(item, index) in school"
              :key="index"
              @click="
                closeOthers(school);
                filterRseult.school = item.value;
                item.checked = !item.checked;
              "
              :class="[item.checked ? 'active' : '']"
            >
              {{ item.text }}
            </div>
            <div class="item" @click="goindexlist">查看全部</div>
          </div>
          <p class="fc666 f16 tl">专业：</p>
          <p class="fc666 f16 tl">学费：</p>
          <div class="df" style="position: absolute; bottom: 0; left: 0; right: 0;border-top: 1px solid #e4e4e4;">
            <div class="btn cancel" @click="drawer=false">取消</div>
            <div class="btn confirm">确定</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";
export default {
  name: "JianZhangList",
  components: { MyFooter, MyHeader },
  data() {
    return {
      remen: false,
      up: false,
      down: false,
      drawer: false,
      filterRseult: {
        shouke: 0,
        leixing: 0,
        school: 0,
        major: 0,
        loaction: 0,
        xuefei: 0
      },
      shouke: [
        { text: "不限", value: 0, checked: true },
        { text: "面授班", value: 1, checked: false },
        { text: "网络班", value: 2, checked: false }
      ],
      leixing: [
        { text: "不限", value: 0, checked: true },
        { text: "同等学力", value: 1, checked: false },
        { text: "专业硕士", value: 2, checked: false },
        { text: "在职博士", value: 3, checked: false },
        { text: "高级研修", value: 4, checked: false },
        { text: "中外合办", value: 5, checked: false }
      ],
      school: [
        { text: "不限", value: 0, checked: true },
        { text: "面授班", value: 1, checked: false },
        { text: "面授班", value: 2, checked: false },
        { text: "面授班", value: 3, checked: false },
        { text: "网络班", value: 4, checked: false }
      ],
      major: [
        { text: "不限", value: 0 },
        { text: "面授班", value: 1 },
        { text: "网络班", value: 2 }
      ],
      location: [
        { text: "不限", value: 0 },
        { text: "面授班", value: 1 },
        { text: "网络班", value: 2 }
      ],
      xuefei: [
        { text: "不限", value: 0 },
        { text: "面授班", value: 1 },
        { text: "网络班", value: 2 }
      ]
    };
  },
  methods: {
    closeOthers(x) {
      x.map(e => (e.checked = false));
    },
    goindexlist(){
      this.$router.push('indexlist')
    }
  }
};
</script>

<style scoped>
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
  .btn{
    width: 50%;
    line-height: 12vw;
  }
  .confirm{
    background: #FFC119;
    color: white;
  }
</style>
