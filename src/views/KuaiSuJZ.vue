<template>
  <div>
    <my-header></my-header>
    <div class="p3vw mt3vw">
      <p class="f16 tl lh24">
        {{ $route.query.schoolname }}
        <span class="f14 fc999"> | {{ $route.query.type | kuaisujz }}</span>
      </p>
      <div class="table-responsive">
        <table class="mt3vw pct100 f14" style="margin-bottom:20vw;">
          <thead>
          <tr>
            <th>专业方向</th>
            <th>学费</th>
            <th>学制</th>
            <th>查看</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(e, i) in jz" :key="i">
            <td class="tl ell">{{ e.yanjiuid }}</td>
            <td>{{ e.xuefeiid }}W</td>
            <td>{{ e.xuezhiid }}年</td>
            <td>
              <router-link
                  class="more fc333"
                  :to="{ path: '/jianzhang', query: { id: e.id } }"
              >
                查看
              </router-link>
            </td>
          </tr>
          </tbody>
        </table>

      </div>
    </div>
    <my-footer :has-black="false"></my-footer>
  </div>
</template>

<script>
import MyFooter from "../components/MyFooter";
import MyHeader from "../components/MyHeader";
export default {
  name: "KuaiSuJZ",
  components: { MyHeader, MyFooter },
  data() {
    return {
      jz: "",
      id:''
    };
  },
  mounted() {
  },
  activated() {
    if (this.id !== this.$route.query.id) {
      this.getJZ();
    }
    this.id = this.$route.query.id;
  },
  methods: {
    getJZ() {
      let jiami = wjz({
        type: 1,
        project_type: this.$route.query.type,
        id: this.$route.query.id,
        pagesize: 999
      });
      console.log(jiami);
      const that = this;
      this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.GetFastJzList",
            key: jiami.key,
            info: jiami.value
          }
        })
        .then(function(response) {
          console.log(response.data.info);
          that.jz = response.data.info;
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  }
};
</script>

<style scoped>
thead {
  background: rgba(243, 243, 243, 1);
}
th {
  line-height: 10vw;
}
td {
  padding: 1vw;
  line-height: 12vw;
}
.more {
  display: inline-block;
  width: 11vw;
  line-height: 5vw;
  background: rgba(255, 247, 235, 1);
  border: 1px solid rgba(255, 216, 158, 1);
}
</style>
