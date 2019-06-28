<template>
  <div class="school-list">
    <my-header></my-header>
    <div class="fjac" style="min-height: calc(100vh - 22.5vw);" v-if="loading">
      <cube-loading class="fjac" :size="40"></cube-loading>
    </div>
    <div v-else>
      <p v-show="false">{{ filtersValue }}</p>
      <div class="fjsa fac" style="height: 10.5vw;">
        <school-list-filter
          :modal.sync="modal"
          :filterValue.sync="filterValueL"
          content="全部院校"
          :filters="filtersL"
        ></school-list-filter>
        <school-list-filter
          :modal.sync="modal"
          :filterValue.sync="filterValueR"
          content="按地区查找"
          :filters="filtersR"
        ></school-list-filter>
      </div>

      <div style="min-height: calc(100vh - 22.5vw) ;">
        <school-list-block
          v-for="(val, name, index) in school"
          :key="index"
          :location="name"
          :school="val"
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
  name: "SchoolList",
  components: { SchoolListBlock, MyFooter, SchoolListFilter, MyHeader },
  data() {
    return {
      loading: true,
      school: "",
      schoolCopy: "",
      modal: false,
      filterValueL: 0,
      filterValueR: 0,
      filtersL: [{ name: "全部院校", value: 0 }],
      filtersR: [{ name: "不限", value: 0 }]
    };
  },
  computed: {
    //筛选
    filtersValue: function() {
      let that = this;
      function filterL(num, x) {
        return num ? x.project_type.includes(that.filterValueL) : true;
      }
      function filterR(num, x) {
        return num ? x.area_id_1 === that.filterValueR : true;
      }
      for (let [key, val] of Object.entries(this.schoolCopy)) {
        let result = val.filter(
          x => filterL(this.filterValueL, x) && filterR(this.filterValueR, x)
        );
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
    this.getSchool();
    this.getFilters();
  },
  methods: {
    getSchool() {
      let jiami = wjz({
        project_type: 0,
        area_id: 0,
        pageno: 1,
        pagesize: 999
      });
      // console.log(jiami);
      const that = this;
      console.time(1)
      this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.GetSchoolList",
            key: jiami.key,
            info: jiami.value
          }
        })
        .then(function(response) {
          // console.log(response.data.info);
          that.school = response.data.info;
          that.schoolCopy = { ...that.school };
          that.loading = false;
          console.timeEnd(1)

        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    getFilters() {
      const that = this;
      this.axios
        .get("/phalapi/public/", {
          params: {
            service: "App.Index.GetSchoolScreen"
          }
        })
        .then(function(response) {
          // console.log('response.data.info',response.data.info)
          // console.log('response.data.info.project_type',response.data.info.project_type)
          that.filtersL = [
            ...that.filtersL,
            ...response.data.info.project_type[0].setting
          ];
          that.filtersR = [
            ...that.filtersR,
            ...response.data.info.area_list.setting
          ];
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  },
  watch: {
    // filterValueL: function(newVal, oldVal) {
    // if (newVal === 0) {
    //   this.school = { ...this.schoolCopy };
    // } else {
    //   for (let [key, val] of Object.entries(this.schoolCopy)) {
    //     this.school[key] = val.filter(x => x.project_type.includes(newVal));
    //   }
    // }
    // },
    // filterValueR: function(newVal, oldVal) {
    // if (newVal === 0) {
    //   this.school = { ...this.schoolCopy };
    // } else {
    //   for (let [key, val] of Object.entries(this.schoolCopy)) {
    //     // console.log(val);
    //     this.school[key] = val.filter(x => x.area_id_1 === newVal);
    //     // console.log(val);
    //     // console.log(test);
    //   }
    // }
    // }
  }
};
</script>

<style scoped lang="scss">
.s {
}
</style>
