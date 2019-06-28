<template>
  <div class="register">
    <div class="block fjac por">
      <div class="poa back" @click="$router.go(-1)"></div>
      <!--<div class="poa query whiteFont f14">{{ $route.meta.zn }}</div>-->
    </div>
    <my-wave></my-wave>
    <p class=" f18 b">{{title[$route.meta.type]}}</p>
    <div class="container">
      <cube-form
        :model="model"
        :options="options"
        @validate="validateHandler"
        @submit="submitHandler"
      >
        <cube-form-group>
          <cube-form-item :field="fields[0]"></cube-form-item>
          <cube-form-item :field="fields[1]"></cube-form-item>
          <div class="fjsb fac code-box">
            <cube-form-item :field="fields[2]">
              <cube-input
                v-model="model.code"
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
        <cube-form-group class="mt3vw">
          <cube-button type="submit">开启景牛</cube-button>
        </cube-form-group>
      </cube-form>
    </div>
  </div>
</template>

<script>
import MyWave from "../components/MyWave";
export default {
  name: "register",
  components: { MyWave },
  data() {
    return {
      title:['忘记密码','手机号注册'],
      api:['App.User.FindPwd','App.User.Register'],
      send: false,
      authTime: 0,
      validity: {
        phone: {
          valid: false
        }
      },
      valid: undefined,
      // validCode: undefined,
      rules: {
        required: true
      },
      model: {
        phone: "",
        password: "",
        code: ""
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
      options: {
        scrollToInvalidField: true,
        layout: "classic" // classic fresh
      }
    };
  },
  mounted() {},
  methods: {
    sendAuthCode() {
      let that = this;
      // console.log(that.$root.userID)
      if (this.validity.phone.valid) {
        let jiami = this.jiami({
          phone: that.model.phone,
          type: 0
        });
        // console.log(jiami)
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
            that.myToast(response.data.msg)

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
        that.toast = that.$createToast({
          txt: "请输入正确的手机号码",
          time:1000,
          type: "txt"
        });
        that.toast.show();
      }
    },
    submitHandler(e) {
      e.preventDefault();
      // console.log("submit", e);
      // console.log("rsult", this.model);
      const that = this;
      const { phone, password, code } = that.model;
      let jiami = this.jiami({
        phone,
        password,
        code
      });
      // console.log(jiami)
      this.axios
        .post(
          // "/phalapi/public/?service=App.User.Register",
          `/phalapi/public/?service=${that.api[that.$route.meta.type]}`,
          this.qs.stringify({
            key: jiami.key,
            info: jiami.value
          })
        )
        .then(function(response) {
          // console.log(response);
          that.myToast(response.data.msg)
          if(response.data.code){
            // console.log(response.data.info.uid)
            that.$root.userID =response.data.info.uid
            window.localStorage.setItem('userID', response.data.info.uid)
            that.$router.push('my')
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
      // console.log("validity", result.validity);
      // console.log('validity', result.validity.phone.valid)
    }
  }
};
</script>

<style scoped lang="scss">
.block {
  height: 15vh;
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
.query {
  top: 3vw;
  left: 50%;
  transform: translate(-50%, 0);
}
.container {
  width: 70vw;
  margin: 10vw auto;
}
.code-box {
  min-height: 87px;
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
.register {
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
