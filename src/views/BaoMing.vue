<template>
  <div class="baoming">
    <my-header></my-header>
    <p class="h1 f18 fjac">在线报名</p>
    <cube-form
      :model="model"
      :schema="schema"
      :immediate-validate="false"
      :options="options"
      @validate="validateHandler"
      @submit="submitHandler"
    ></cube-form>
    <div class="big-hr"></div>
    <div class="tishi">
      <div class="fac title">
        <img
          src="../assets/icon-laba.png"
          style="width: 3.6vw;margin-right: 5vw;margin-left: 3vw;"
          alt=""
        />
        <span class="f16 fc333">温馨提示</span>
      </div>
      <div class="content tj fc333">
        <p>
          1.请按以下报名表各项信息如实填写，方便老师审核，报名成功后，相关老师24小时内会与您联系。
        </p>
        <p>2.如有任何问题，请拨打电话：400-718-8018。</p>
        <p>3.我们非常重视对您的信息保护，信息只用于报考使用。</p>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyFooter from "../components/MyFooter";
import MyHeader from "../components/MyHeader";
export default {
  name: "BaoMing",
  components: { MyHeader, MyFooter },
  data() {
    return {
      validity: {},
      valid: undefined,
      model: {
        school: this.$route.query.jz,
        username: "",
        sex: "",
        phone: "",
        email: "",
        xueli: "",
        area: "",
        beizhu: ""
      },
      schema: {
        groups: [
          {
            fields: [
              {
                type: "input",
                modelKey: "school",
                label: "院校",
                props: {
                  placeholder: "请输入"
                },
                rules: {
                  required: true
                },
                trigger: "blur"
              },
              {
                type: "input",
                modelKey: "username",
                label: "姓名",
                props: {
                  placeholder: "请输入姓名"
                },
                rules: {
                  required: true
                },
                trigger: "blur"
              },
              {
                type: "radio-group",
                modelKey: "sex",
                label: "性别",
                props: {
                  options: ["男", "女"],
                  horizontal: true
                },
                rules: {
                  required: true
                }
              },
              {
                type: "input",
                modelKey: "phone",
                label: "手机",
                props: {
                  placeholder: "请输入手机"
                },
                rules: {
                  type: "tel",
                  required: true
                },
                trigger: "blur"
              },
              {
                type: "input",
                modelKey: "email",
                label: "邮箱",
                props: {
                  placeholder: "请输入邮箱"
                },
                rules: {
                  type: "email"
                },
                trigger: "blur"
              },
              {
                type: "select",
                modelKey: "xueli",
                label: "学历",
                props: {
                  options: ["高中", "大专", "本科", "硕士", "博士"]
                },
                rules: {
                  required: true
                }
              },
              {
                type: "input",
                modelKey: "area",
                label: "所在地",
                props: {
                  placeholder: "请输入所在地"
                },
                rules: {
                  required: true
                },
                trigger: "blur"
              },
              {
                type: "textarea",
                modelKey: "beizhu",
                label: "备注",
                props: {
                  placeholder: "留下您的问题、我们会及时帮您解决.....",
                  maxlength: 80
                },
                // debounce validate
                // if set to true, the default debounce time will be 200(ms)
                debounce: 100
              }
            ]
          },
          {
            fields: [
              {
                type: "submit",
                label: "我要报名"
              }
            ]
          }
        ]
      },
      options: {
        scrollToInvalidField: true,
        layout: "fresh" // classic fresh
      }
    };
  },
  methods: {
    submitHandler(e) {
      e.preventDefault();
      // console.log("submit", e);
      // console.log("rsult", this.model);
      const that = this;
      const {
        school,
        username,
        sex,
        phone,
        email,
        xueli,
        area,
        beizhu
      } = that.model;
      let jiami = this.jiami({
        school,
        username,
        sex,
        phone,
        email,
        xueli,
        area,
        beizhu
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
          that.myToast(response.data.msg);
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
      // console.log(
      //   "validity",
      //   result.validity,
      //   result.valid,
      //   result.dirty,
      //   result.firstInvalidFieldIndex
      // );
    }
  }
};
</script>

<style scoped>
.h1 {
  margin-bottom: 6vw;
}
.cube-form-group-legend {
  background: white !important;
}
.cube-btn {
  background: #ffd019 !important;
}
.tishi {
}
.content {
  padding: 3vw;
  line-height: 6.7vw;
}
.title {
  padding: 3vw 0;
  border-bottom: 1px solid #e4e4e4;
}
</style>
