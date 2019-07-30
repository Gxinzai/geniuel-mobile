<template>
  <div class="school-list">
    <my-header></my-header>
    <div class="fjac" style="min-height: calc(100vh - 22.5vw);" v-if="loading">
      <cube-loading class="fjac" :size="40"></cube-loading>
    </div>
    <div v-else>
      <p v-show="false">{{ filtersValue }}</p>
      <div class="fjsa fac" v-if="$route.query.type!==4" style="height: 10.5vw;">
        <school-list-filter
          content="全部院校"
          :enable="false"
        ></school-list-filter>
        <school-list-filter
          :modal.sync="modal"
          :filterValue.sync="filterValueR"
          content="按地区查找"
          :filters="filtersR"
          :key="type"
        ></school-list-filter>
      </div>

      <div style="min-height: calc(100vh - 22.5vw) ;">
        <school-list-block
          v-for="(val, name, index) in school"
          :key="index"
          :location="name"
          :school="val"
          :type="$route.query.type"
        >
        </school-list-block>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from "../components/MyHeader";
import SchoolListFilter from "../components/SchoolListFilter";
import MyFooter from "../components/MyFooter";
import SchoolListBlock from "../components/SchoolListBlock";
export default {
  name: "KuaiSuSchool",
  components: { SchoolListBlock, MyFooter, SchoolListFilter, MyHeader },
  data() {
    return {
      loading: true,
      school: "",
      schoolCopy: "",
      modal: false,
      filterValueR: 0,
      type: 1,
      lid: "",
      filtersR: [{ name: "不限", value: 0 }]
    };
  },
  computed: {
    //筛选
    filtersValue: function() {
      let that = this;
      function filterR(num, x) {
        return num ? x.area_name === that.filterValueR : true;
      }
      for (let [key, val] of Object.entries(this.schoolCopy)) {
        let result = val.filter(x => filterR(this.filterValueR, x));
        this.school[key] = result;
        // console.log(result);
        if (result.length === 0) {
          // console.log(key);
          delete this.school[key]; //删除属性
        }
      }
      return [this.filterValueL, this.filterValueR];
    }
  },
  mounted() {
    // this.getSchool();
  },
  activated() {
    if (this.type !== this.$route.query.type) {
      this.getSchool();
      this.filterValueR = 0;
    }
    this.type = this.$route.query.type;
    if (this.lid !== this.$route.query.lid) {
      this.getSchool();
    }
    this.lid = this.$route.query.lid;
  },
  methods: {
    getSchool() {
      let jiami = wjz({
        type: this.$route.query.type,
        lid: this.$route.query.lid
      });
      // console.log(jiami);
      const that = this;
      this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.GetSchoolBytype",
            key: jiami.key,
            info: jiami.value
          }
        })
        .then(function(response) {
          console.log(response);
          that.school = response.data.info.yuanxi_list;
          let result = response.data.info.area_list.map(e => {
            return { name: e, value: e };
          });
          that.filtersR = [{ name: "不限", value: 0 }, ...result];
          that.schoolCopy = { ...that.school };
          that.loading = false;
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  }
};
</script>

<style scoped></style>
