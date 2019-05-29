<template>
  <div class="footer">
    <div style="background: black;color: white">
      <p class="f28">
        <router-link class="whiteFont" to="/">电脑版</router-link> &emsp;&emsp;
        <router-link class="whiteFont" to="/">网站地图</router-link>
      </p>
      <p style="padding-bottom: 4vw;">
        Copyright © 2018 景牛在线 All Rights Reserved
      </p>
    </div>
    <div class="df" style="background: #FFD019">
      <div class="fjac footer-item">
        <div>
          <img src="../assets/icon-tel.png" style="width: 4.375vw;" alt="" />
          <p>电话咨询</p>
        </div>
      </div>
      <div class="fjac footer-item">
        <div>
          <img
            src="../assets/icon-consult.png"
            style="width: 4.375vw;"
            alt=""
          />
          <p>在线咨询</p>
        </div>
      </div>
      <div class="fjac footer-item">
        <div>
          <img src="../assets/icon-write.png" style="width: 4.2775vw;" alt="" />
          <p>在线报名</p>
        </div>
      </div>
      <div class="fjac footer-item">
        <div>
          <img src="../assets/icon-share.png" style="width:3.2075vw;" alt="" />
          <p>立即分享</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyFooter"
};
</script>

<style scoped lang="scss">
.f28 {
  padding: 4vw 0;
  font-size: 4vw;
}
.footer-item {
  box-sizing: border-box;
  width: 25vw;
  height: 11.2vw;
  color: white;
  p {
    margin-top: 3px;
  }
}
.footer-item + .footer-item {
  border-left: 1px solid white;
}
</style>
