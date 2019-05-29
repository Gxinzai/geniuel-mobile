<template>
  <div id="app">
    <!--<div id="nav">-->
    <!--<router-link to="/">Home</router-link> |-->
    <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Microsoft YaHei", "PingFangSC-Regular", "黑体", "宋体",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 3.2vw;
}
.df {
  display: flex !important;
}
.fjac {
  display: flex !important;
  justify-content: center;
  align-items: center;
}
.fjc {
  display: flex;
  justify-content: center;
}
.fac {
  display: flex;
  align-items: center;
}
.facsb {
  display: flex;
  align-content: space-between;
}
.fjlac {
  display: flex;
  justify-content: left;
  align-items: center;
}
.fjsa {
  display: flex;
  justify-content: space-around;
}
.fjsb {
  display: flex;
  justify-content: space-between;
}
.flexN {
  flex: none;
}
.fww {
  flex-wrap: wrap;
}
.b {
  font-weight: bold;
}
.tl{
  text-align: left;
}
.tc{
  text-align: center;
}
.tj{
  text-align: justify;
}
.whiteFont {
  color: white;
}
.grayFont {
  color: #b7b7b7;
}
.cube-slide-item {
  img {
    width: 100vw;
  }
}
</style>
<script>
export default {
  methods: {}
};
</script>
