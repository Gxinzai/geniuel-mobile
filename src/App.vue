<template>
  <div id="app">
    <keep-alive exclude="ZiXun,zzbs,hzbx,jianZhang,BaoMing,register">
      <router-view />
    </keep-alive>
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
  background: white;
}
body.noscroll {
  overflow: hidden;
  position: relative;
}
.f12 {
  font-size: 3.2vw;
}
.f14 {
  font-size: 3.73vw;
}
.f15 {
  font-size: 4vw;
}
.f16 {
  font-size: 4.26vw;
}
.f18 {
  font-size: 4.8vw;
}
.lh18 {
  line-height: 4.8vw;
}
.lh20 {
  line-height: 5.33vw;
}
.lh24 {
  line-height: 6.4vw;
}
.por {
  position: relative;
}
.poa {
  position: absolute;
}
.db {
  display: block;
}
.dib {
  display: inline-block;
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
.fab {
  display: flex;
  align-items: baseline;
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
.fdc {
  flex-direction: column;
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
.tl {
  text-align: left;
}
.tc {
  text-align: center;
}
.tj {
  text-align: justify;
}
.whiteFont {
  color: white;
}
.grayFont {
  color: #b7b7b7;
}
.yellowFont {
  color: #ffc119;
}
.yellowBg {
  background: #ffd019;
}
.red {
  color: #dd0000 !important;
}
.fc333 {
  color: #333;
}
.fc666 {
  color: #666;
}
.fc999 {
  color: #999;
}
.pct50 {
  width: 50%;
}
.pct100 {
  width: 100%;
}
.ti2 {
  text-indent: 2em;
}
.bb1 {
  border-bottom: 1px solid #e4e4e4;
}
.ell {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.h0 {
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  outline: none !important;
}
.h1 {
  margin-top: 6vw;
  margin-bottom: 2vw;
  font-weight: bold;
  &::before,
  &::after {
    display: inline-block;
    content: "";
    width: 10vw;
    height: 0;
    margin: 0 10px;
    border-top: 1px solid #b5b5b5;
  }
}
.h2 {
  width: 60vw;
  padding-bottom: 3vw;
  margin: 0 auto;
  line-height: 5vw;
}
.big-hr {
  background: #eeeeee;
  height: 2vw;
}
.p3vw {
  padding: 0 3vw;
}
.mt3vw {
  margin-top: 3vw;
}
.cube-slide-item {
  img {
    width: 100vw;
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-50vw);
  opacity: 0;
}

.slide-fade-right-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-right-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-right-enter,
.slide-fade-right-leave-to {
  transform: translateX(50vw);
  opacity: 0;
}
.cube-btn {
  background: #ffd019 !important;
}
.cube-form-group-legend {
  display: none;
}
.table-responsive {
  width: 100% !important;
  height: auto !important;
  overflow-x: auto;
  overflow-y: hidden;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
table,
table tr th,
table tr td {
  border: 1px solid #eee;
} /*设置边框*/
table {
  td {
    /*white-space: nowrap;*/
  }
}
.zhengwen {
  a {
    color: #666 !important;
  }
  p {
    margin-bottom: 2vw;
  }
  img {
    max-width: 100%;
    height: auto !important;
    object-fit: contain;
  }
  strong {
    display: block;
    color: rgba(255, 12, 12, 1);
  }
}
.login {
  .cube-form_classic .cube-form-item {
    padding-left: 0;
    padding-right: 0;
  }
  .cube-btn {
    line-height: 8vw;
    background: #ffd019;
    border-radius: 20px;
    padding: 0;
  }
  .login-form {
    .cube-form-item:last-child {
      padding-bottom: 15px !important;
    }
  }
}
.cube-scroll-nav-bar_horizontal .cube-scroll-nav-bar-items {
  background: rgba(0, 0, 0, 0.6);
}
.cube-scroll-nav-bar-item {
  color: white;
  padding: 15px;
}
.cube-scroll-nav-bar-item_active {
  color: #ffcc01;
}
</style>
<script>
export default {
  methods: {}
};
</script>
