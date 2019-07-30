<template>
  <div class="login">
    <div class="block fjac por">
      <div class="poa back" @click="$router.go(-1)"></div>
      <img src="../assets/logo-circle.png" style="width: 22.13vw;" alt="" />
    </div>
    <my-wave></my-wave>
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
        <cube-form
          :model="modelR"
          :options="options"
          @validate="validateHandlerR"
          @submit="submitHandlerR"
        >
          <cube-form-group>
            <cube-form-item :field="fields[0]"></cube-form-item>
            <div class="fjsb fac code-box">
              <cube-form-item :field="fields[1]">
                <cube-input
                  v-model="modelR.code"
                  placeholder="验证码"
                  type="number"
                ></cube-input>
              </cube-form-item>
              <div class="btn f12 code-btn">
                <span v-show="!send" @click="sendAuthCode">获取验证码</span>
                <span v-show="send">{{ authTime }}秒后重试</span>
              </div>
            </div>
          </cube-form-group>
          <cube-form-group class="login-form">
            <cube-form-item>
              <cube-button type="submit">登录</cube-button>
            </cube-form-item>
          </cube-form-group>
        </cube-form>
      </div>
      <div class="fjsb mt3vw">
        <router-link class="yellowFont" to="forget">
          忘记密码？
        </router-link>
        <router-link class="yellowFont" to="register">
          立即注册
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import MyWave from "../components/MyWave";
export default {
  name: "LogIn",
  components: { MyWave },
  data() {
    return {
      fromCollect: false,
      send: false,
      authTime: 0,
      tabBar: ["密码登录", "验证码登录"],
      currentIndex: 0,
      validity: {
        phone: {
          valid: false
        }
      },
      validityR: {
        phone: {
          valid: false
        }
      },
      valid: undefined,
      validR: undefined,
      model: {
        phone: "",
        password: ""
      },
      modelR: {
        phone: "",
        code: ""
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
                label: "登录"
              }
            ]
          }
        ]
      },
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
          modelKey: "code",
          props: {
            placeholder: "验证码"
          },
          rules: {
            required: true
          },
          trigger: "blur"
        }
      ],
      rules: {
        required: true
      },
      options: {
        scrollToInvalidField: true,
        layout: "classic" // classic fresh
      }
    };
  },

  beforeRouteEnter(to, from, next) {
    // console.log("to", to);
    // console.log("from", from);
    next(vm => {
      if (["jianzhang", "zixun"].find(x => x === from.name)) {
        vm.fromCollect = true;
      } else {
        vm.fromCollect = false;
      }
      // if (from.name === "home") {
      //   vm.filterResult = {
      //     shouke: { name: "", value: 0 },
      //     leixing: { name: "", value: 0 },
      //     school: { name: "", value: 0 },
      //     major: { name: "", value: 0 },
      //     location: { name: "", value: 0 },
      //     xuefei: { name: "", value: 0 }
      //   };
      //   vm.reGetJianZhang();
      // }
      // 通过 `vm` 访问组件实例
    });
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  mounted() {
    this.items = this.$refs.tabBar.querySelectorAll(".item");
    this.line = this.$refs.tabBar.querySelector(".yellow-line");
    this.line.style.width = `${this.items[0].clientWidth}px`;
  },
  methods: {
    sendAuthCode() {
      let that = this;
      // console.log(that.$root.userID);
      if (this.validityR.phone.valid) {
        let jiami = this.jiami({
          phone: that.modelR.phone,
          type: 0
        });
        this.axios
          .post(
            "/phalapi/public/?service=App.User.GetPhoneCode",
            this.qs.stringify({
              key: jiami.key,
              info: jiami.value
            })
          )
          .then(function(response) {
            // console.log(response);
            that.myToast(response.data.msg);
            if (response.data.code) {
              that.send = true;
              that.authTime = 60;
              let authTimetimer = setInterval(() => {
                that.authTime--;
                if (that.authTime <= 0) {
                  that.send = false;
                  clearInterval(authTimetimer);
                }
              }, 1000);
            }
          })
          .catch(function(error) {
            // console.log(error);
          });
      } else {
        that.myToast("请输入正确的手机号码");
      }
    },
    changeTabBar(i) {
      this.currentIndex = i;
      this.line.style.left = `${this.items[i].offsetLeft}px`;
    },
    submitHandler(e) {
      e.preventDefault();
      const that = this;
      const { phone, password } = that.model;
      let jiami = this.jiami({
        type: 0,
        phone,
        password
      });
      this.axios
        .post(
          "/phalapi/public/?service=App.User.Login",
          this.qs.stringify({
            key: jiami.key,
            info: jiami.value
          })
        )
        .then(function(response) {
          // console.log(response);
          that.myToast(response.data.msg);
          if (response.data.code) {
            // console.log(response.data.info.uid);
            that.$root.userID = response.data.info.uid;
            window.localStorage.setItem("userID", response.data.info.uid);
            // 未登录客户点击收藏，登录后跳回原页面
            if (that.fromCollect) {
              that.$router.go("-1");
              return;
            }
            that.$router.push("my");
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    submitHandlerR(e) {
      e.preventDefault();
      const that = this;
      const { phone, code } = that.modelR;
      let jiami = this.jiami({
        type: 1,
        phone,
        code
      });
      this.axios
        .post(
          "/phalapi/public/?service=App.User.Login",
          this.qs.stringify({
            key: jiami.key,
            info: jiami.value
          })
        )
        .then(function(response) {
          // console.log(response);
          that.myToast(response.data.msg);

          if (response.data.code) {
            // console.log(response.data.info.uid);
            that.$root.userID = response.data.info.uid;
            window.localStorage.setItem("userID", response.data.info.uid);
            that.$router.push("my");
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
    },
    validateHandlerR(result) {
      this.validityR = result.validity;
      this.validR = result.valid;
    }
  }
};
</script>

<style scoped lang="scss">
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
  width: 70vw;
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
.code-box {
  height: 85px;
  .cube-form-item {
    width: 50vw;
  }
}
.code-btn {
  width: 22.67vw;
  line-height: 35px;
  background: rgba(255, 215, 0, 1);
  border-radius: 4px;
  margin-left: 2vw;
}
</style>
