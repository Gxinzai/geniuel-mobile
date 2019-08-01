<template>
  <div class="footer">
    <div style="background: black;color: white;margin-bottom: 12vw;">
      <div v-if="hasBlack">
        <div class="f14 fjac">
          <a class="whiteFont dib" href="http://www.geniuel.com/?fromMobile=true"
            >电脑版</a
          >
          <!--&emsp;&emsp;-->
          <!--<router-link class="whiteFont" to="">网站地图</router-link>-->
        </div>
        <p class="copy">
          Copyright © 2018 景牛在线 All Rights Reserved
        </p>
      </div>
    </div>
    <transition>
      <div
        class="df"
        style="background: #FFD019;position: fixed;bottom: 0;z-index: 2;"
      >
        <div class="fjac footer-item">
          <div>
            <a class="whiteFont db" href="tel:4007188018">
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
            <a
              class="dib"
              href="https://ww16.53kf.com/webCompany.php?kf_sign=TAxNzMTU0NUwOTEwMzg2NzA1MTA0MDE1&arg=10190463&style=3"
            >
              <img
                src="../assets/icon-consult.png"
                style="width: 4.375vw;"
                alt=""
              />
              <p>在线咨询</p>
            </a>
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
              <p class="">在线报名</p>
            </div>
          </router-link>
        </div>

        <div class="fjac footer-item">
          <div
            class="clipboardFooter"
            data-clipboard-text="http://m.geniuel.com/"
          >
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
import ClipboardJS from "clipboard";

export default {
  name: "MyFooter",
  props: {
    hasBlack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goPC: function() {
      // console.log(1)
      // window.localStorage.setItem("fromMobile", true);
    }
  },
  mounted() {
    let that = this;
    let clipboard = new ClipboardJS(".clipboardFooter");
    clipboard.on("success", function(e) {
      that.myToast("已复制网址链接到粘贴板");
      e.clearSelection();
    });
  }
};
</script>

<style scoped lang="scss">
.f14 {
  line-height: 10vw;
}
.copy {
  height: 8vw;
}
.footer-item {
  box-sizing: border-box;
  width: 25vw;
  height: 12vw;
  p {
    margin-top: 3px;
  }
  a {
    color: #261E00;
  }
}
.footer-item:nth-child(2):hover,.footer-item:nth-child(3):hover{
	 transform: scale(1.25, 1.25);
    -webkit-transform: scale(1.25, 1.25);
    -moz-transform: scale(1.25, 1.25);
    -o-transform: scale(1.25, 1.25);
	
}	
.footer-item + .footer-item {
  border-left: 1px solid white;
}
</style>
