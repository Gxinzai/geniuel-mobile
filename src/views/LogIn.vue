<template>
  <div class="login">
    <div class="block fjac por">
      <div class="poa back" @click="$router.go(-1)"></div>
      <img src="../assets/logo-circle.png" style="width: 22.13vw;" alt="" />
    </div>
    <canvas id="canvas" style="width: 100vw;height: 10vh"></canvas>
    <div class="container">
      <div class="tabBar f16 df por" ref="tabBar">
        <div
          class="item"
          v-for="(e, i) in tabBar"
          :class="i === currentIndex ? 'active' : ''"
          :key="i"
          @click="changeTabBar(i)"
        >
          {{ e }}
        </div>
        <div class="gray-line poa"></div>
        <div class="yellow-line poa"></div>
      </div>
      <div class="tabContainer mt3vw" v-if="0 === currentIndex">
        <cube-form
          :model="model"
          :schema="schema"
          :immediate-validate="false"
          :options="options"
          @validate="validateHandler"
          @submit="submitHandler"
        ></cube-form>
      </div>
      <div class="tabContainer mt3vw" v-if="1 === currentIndex">
        1
      </div>
      <div class="fjsb mt3vw">
        <router-link class="yellowFont" to="">
          忘记密码？
        </router-link>
        <router-link class="yellowFont" to="">
          立即注册
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogIn",
  data() {
    return {
      tabBar: ["手机登陆", "验证码登陆"],
      currentIndex: 0,
      validity: {},
      valid: undefined,
      model: {
        phone: "",
        password: ""
      },
      schema: {
        groups: [
          {
            fields: [
              {
                type: "input",
                modelKey: "phone",
                props: {
                  clearable: true,
                  placeholder: "请输入手机号码"
                },
                rules: {
                  type: "tel",
                  required: true
                },
                trigger: "blur"
              },
              {
                type: "input",
                modelKey: "password",
                props: {
                  clearable: true,
                  type: "password",
                  eye: { open: false, reverse: false },
                  placeholder: "请输入密码"
                },
                rules: {
                  required: true
                },
                trigger: "blur"
              }
            ]
          },
          {
            fields: [
              {
                type: "submit",
                label: "登陆"
              }
            ]
          }
        ]
      },
      options: {
        scrollToInvalidField: true,
        layout: "classic" // classic fresh
      }
    };
  },
  computed: {
    classObject() {
      return {
        active: this.tabBar
      };
    }
  },
  mounted() {
    this.items = this.$refs.tabBar.querySelectorAll(".item");
    this.line = this.$refs.tabBar.querySelector(".yellow-line");
    this.line.style.width = `${this.items[0].clientWidth}px`;
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let step = 0;
    const lines = 3;
    const colorArr = [
      "rgba(256, 256, 256,.6)",
      "rgba(256, 256, 256,.4)",
      "white"
    ];
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 208, 25,1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      step++;
      for (let i = 0; i < lines; i++) {
        ctx.fillStyle = colorArr[i];
        var angle = ((step + (i * 180) / lines) * Math.PI) / 180;
        var deltaHeight = Math.sin(angle) * 50;
        var deltaHeightRight = Math.cos(angle) * 50;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2 + deltaHeight);
        ctx.bezierCurveTo(
          canvas.width / 2,
          canvas.height / 2 + deltaHeight - 50,
          canvas.width / 2,
          canvas.height / 2 + deltaHeightRight - 50,
          canvas.width,
          canvas.height / 2 + deltaHeightRight
        );
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.lineTo(0, canvas.height / 2 + deltaHeight);
        ctx.closePath();
        ctx.fill();
      }
      requestAnimationFrame(loop);
    }
    loop();
  },
  methods: {
    changeTabBar(i) {
      this.currentIndex = i;
      this.line.style.left = `${this.items[i].offsetLeft}px`;
      console.log(this.items[i].offsetLeft);
      console.log(this.items[i].clientWidth);
    },
    submitHandler(e) {
      e.preventDefault();
      // console.log("submit", e);
      // console.log("rsult", this.model);
      const that = this;
      const { phone, password } = that.model;
      let jiami = this.jiami({
        phone,
        password
      });
      // console.log(jiami)
      this.axios
        .post(
          "/phalapi/public/?service=App.Index.PostBaoMing",
          this.qs.stringify({
            key: jiami.key,
            info: jiami.value
          })
        )
        .then(function(response) {
          // console.log(response.data.msg);
          that.toast = that.$createToast({
            txt: response.data.msg,
            type: "txt"
          });
          that.toast.show();
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
    }
  }
};
</script>

<style lang="scss">
.block {
  height: 30vh;
  background: rgb(255, 208, 25);
}
.back {
  position: absolute;
  left: 3vw;
  top: 3vw;
  width: 3vw;
  height: 3vw;
  border: 1px solid;
  border-color: white white transparent transparent;
  transform: rotate(-135deg);
}
.container {
  width: 60vw;
  margin: 0 auto;
}
.tabBar {
  height: 5vh;
  .active {
    color: #ffb619;
  }
  .item {
    flex: 1;
  }
  .gray-line {
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #d7d7d7;
  }
  .yellow-line {
    bottom: 0;
    left: 0;
    height: 2px;
    background: #ffd019;
    transition: all 0.5s;
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
}
</style>
