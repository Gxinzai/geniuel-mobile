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
import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";
export default {
  name: "BaoMing",
  components: { MyFooter, MyHeader },
  data() {
    return {
      validity: {},
      valid: undefined,
      model: {
        school: "",
        name: "",
        sex: "",
        tel: "",
        email: "",
        education: "",
        location: "",
        tips: ""
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
                modelKey: "name",
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
                modelKey: "tel",
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
                modelKey: "education",
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
                modelKey: "location",
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
                modelKey: "tips",
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
      console.log("submit", e);
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
      console.log(
        "validity",
        result.validity,
        result.valid,
        result.dirty,
        result.firstInvalidFieldIndex
      );
    }
  }
};
</script>

<style scoped>
.cube-form-group-legend {
  background: white !important;
}
.cube-btn {
  background: #ffd019;
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
