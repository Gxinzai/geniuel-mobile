<template>
  <div class="footer">
    <div style="background: black;color: white;margin-bottom: 12vw;">
      <p class="f14">
        <router-link class="whiteFont" to="/">电脑版</router-link> &emsp;&emsp;
        <router-link class="whiteFont" to="/">网站地图</router-link>
      </p>
      <p style="padding-bottom: 4vw;">
        Copyright © 2018 景牛在线 All Rights Reserved
      </p>
    </div>
    <transition>
      <div class="df" style="background: #FFD019;position: fixed;bottom: 0;z-index: 1;">
        <div class="fjac footer-item">
          <div>
            <a class="whiteFont db" href="tel:13828172679">
              <img
                src="../assets/icon-tel.png"
                style="width: 4.375vw;"
                alt=""
              />
              <p>电话咨询</p>
            </a>
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
          <router-link to="/baoming">
            <div>
              <img
                src="../assets/icon-write.png"
                style="width: 4.2775vw;"
                alt=""
              />
              <p class="whiteFont">在线报名</p>
            </div>
          </router-link>
        </div>

        <div class="fjac footer-item">
          <div>
            <img
              src="../assets/icon-share.png"
              style="width:3.2075vw;"
              alt=""
            />
            <p>立即分享</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "MyFooter"
};
</script>

<style scoped lang="scss">
.f14 {
  padding: 4vw 0;
}
.footer-item {
  box-sizing: border-box;
  width: 25vw;
  height: 12vw;
  color: white;
  p {
    margin-top: 3px;
  }
}
.footer-item + .footer-item {
  border-left: 1px solid white;
}
</style>
