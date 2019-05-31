<template>
  <div class="school-list">
    <my-header></my-header>
    <div class="fjsa fac" style="height: 10.5vw;">
      <school-list-filter
        :modal.sync="modal"
        content="全部院校"
        :filters="filtersL"
      ></school-list-filter>
      <school-list-filter
        :modal.sync="modal"
        content="按地区查找"
        :filters="filtersR"
      ></school-list-filter>
    </div>
    <div>
      <div
        class="fjsb"
        style="padding:3vw;background: #F0F0F0;border: solid #E4E4E4;border-width: 1px 0"
      >
        <span class="grayFont">北京</span>
        <div
          class="arrow down"
          :class="[filterL ? 'up' : 'down']"
          @click="filterL = !filterL"
        ></div>
      </div>
      <transition name="slide-fade">
        <div class="fac school-container" v-show="!filterL">
          <img src="../assets/school-logo.png" class="school-logo" alt="" />
          <div class="tl">
            <p class="fac t">
              <span class="f16">中国社会科学院研究生院</span>
              <span class="brand brand-211 whiteFont">211</span>
              <span class="brand brand-985 whiteFont">985</span>
            </p>
            <p class="grayFont">159篇简章</p>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="fac school-container" v-show="!filterL">
          <img src="../assets/school-logo.png" class="school-logo" alt="" />
          <div class="tl">
            <p class="fac t">
              <span class="f16">中国社会科学院研究生院</span>
              <span class="brand brand-211 whiteFont">211</span>
              <span class="brand brand-985 whiteFont">985</span>
            </p>
            <p class="grayFont">159篇简章</p>
          </div>
        </div>
      </transition>
    </div>
    <div>
      <div
        class="fjsb"
        style="padding:3vw;background: #F0F0F0;border: solid #E4E4E4;border-width: 1px 0"
      >
        <span class="grayFont">北京</span>
        <div
          class="arrow down"
          :class="[filterR ? 'up' : 'down']"
          @click="filterR = !filterR"
        ></div>
      </div>
      <transition name="slide-fade">
        <div class="fac school-container" v-show="!filterR">
          <img src="../assets/school-logo.png" class="school-logo" alt="" />
          <div class="tl">
            <p class="fac t">
              <span class="f16">中国社会科学院研究生院</span>
              <span class="brand brand-211 whiteFont">211</span>
              <span class="brand brand-985 whiteFont">985</span>
            </p>
            <p class="grayFont">159篇简章</p>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="fac school-container" v-show="!filterR">
          <img src="../assets/school-logo.png" class="school-logo" alt="" />
          <div class="tl">
            <p class="fac t">
              <span class="f16">中国社会科学院研究生院</span>
              <span class="brand brand-211 whiteFont">211</span>
              <span class="brand brand-985 whiteFont">985</span>
            </p>
            <p class="grayFont">159篇简章</p>
          </div>
        </div>
      </transition>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from "../components/MyHeader";
import SchoolListFilter from "../components/SchoolListFilter";
import MyFooter from "../components/MyFooter";
export default {
  name: "SchoolList",
  components: { MyFooter, SchoolListFilter, MyHeader },
  data() {
    return {
      modal: false,
      filterL: false,
      filterR: false,
      filtersL: [
        { text: "全部院校", value: 0 },
        { text: "在职博士", value: 1 },
        { text: "同等学力", value: 2 },
        { text: "专业硕士", value: 3 },
        { text: "高级研修", value: 4 },
        { text: "中外合办", value: 5 }
      ],
      filtersR: [
        { text: "不限", value: 0 },
        { text: "北京", value: 1 },
        { text: "上海", value: 2 },
        { text: "广州", value: 3 },
        { text: "河南", value: 4 },
        { text: "陕西", value: 5 },
        { text: "陕西", value: 6 },
        { text: "陕西", value: 7 }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.school-list {
  /*min-height: 100vh;*/
}
.arrow {
  width: 3vw;
  height: 3vw;
  border-right: 1px solid #b0b0b0;
  border-bottom: 1px solid #b0b0b0;
  transition: all 0.3s;
}
.arrow.down {
  transform: rotate(45deg);
}
.arrow.up {
  transform: rotate(-135deg);
  /*transform: rotate(225deg);*/
}
.school-container {
  padding: 3vw;
  .t {
    margin-bottom: 1vw;
  }
}
.school-container + .school-container {
  border-top: 1px solid #e4e4e4;
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
.s {
}
</style>
