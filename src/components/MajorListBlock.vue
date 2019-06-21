<template>
  <div>
    <div>
      <div
        class="fjsb fac"
        style="padding:3vw;padding-right: 8vw;background: #ECECEC;border: solid #E4E4E4;border-width: 1px 0"
      >
        <div>
          <img
            src="../assets/icon-flower.png"
            style="width: 3.73vw;margin-right: 3vw;"
            alt=""
          />
          <span class="f16 grayFont">{{ title }}</span>
        </div>
        <div class="fac">
          <span class="dib grayFont">{{ num }}个专业</span>
          <div
            class="more dib"
            :class="[filter ? 'plus' : 'minus']"
            @click="filter = !filter"
          ></div>
        </div>
      </div>
      <transition-group name="slide-fade">
        <div v-for="(item, index) in major" :key="index" v-show="!filter">
          <router-link
            class="fac major-container tl"
            :to="{
              path: 'jianzhanglist',
              query: { majorid: item.id, majorname: item.title }
            }"
          >
            <span class="fc666 name">{{ item.title }}</span>
            <span class="grayFont">{{ item.jz_num }}篇简章</span>
            <div class="arrow right dib"></div>
          </router-link>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "MajorListBlock",
  props: {
    title: String,
    num: null,
    major: null
  },
  data() {
    return {
      filter: true
    };
  }
};
</script>

<style scoped lang="scss">
.arrow {
  width: 3vw;
  height: 3vw;
  border-right: 1px solid #b0b0b0;
  border-bottom: 1px solid #b0b0b0;
  transition: all 0.3s;
}
.arrow.right {
  transform: rotate(-45deg);
  margin-left: auto;
  margin-right: 3vw;
}
.more {
  width: 4vw;
  height: 4vw;
  position: relative;
  margin-left: 4vw;
  &::before,
  &::after {
    display: inline-block;
    content: "";
    width: 100%;
    height: 1px;
    background: #999999;
    position: absolute;
    top: 50%;
    left: 0;
    transition: all 0.3s;
  }
}
.more.minus {
}
.more.plus {
  &::after {
    transform: rotate(90deg);
  }
}
.major-container {
  min-height: 10.4vw;
}
.major-container + .major-container {
  border-top: 1px solid #e4e4e4;
}
.name {
  padding-left: 9.33vw;
  padding-right: 2vw;
  width: 20vw;
  display: inline-block;
}
</style>
