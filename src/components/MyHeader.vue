<template>
  <div class="header fac">
    <router-link to="/">
      <img class="logo" src="../assets/logo-noword.png" alt="" />
    </router-link>
    <div class="breadcrumb ">
      <router-link to="/">
        首页
      </router-link>
      <router-link
        v-for="(e, i) in this.$route.meta.bread"
        :key="i"
        :to="e.path"
      >
        >{{ e.name }}
      </router-link>
      > {{ $route.meta.zn }}
      <!--<span @click="$router.go(-1)">>go(-1)</span>-->
    </div>
    <router-link to="/search">
      <img class="search" src="../assets/icon-search.png" alt="" />
    </router-link>
    <img class="admin" src="../assets/icon-admin.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "MyHeader",
  data() {
    return {};
  },
  mounted() {
    // console.log(this.$route.meta.zn)
    // console.log(this.$router.currentRoute.meta.zn)
  }
};
</script>

<style scoped lang="scss">
.header {
  box-sizing: border-box;
  height: 10.5vw;
  border-bottom: 1px solid #e4e4e4;
}
.logo {
  width: 7.33vw;
  padding: 0 3vw;
  border-right: 1px solid #e4e4e4;
}
.breadcrumb {
  margin: 0 auto 0 3vw;
  color: #666;
  a {
    color: #666;
  }
}
.search {
  margin-right: 4vw;
  width: 5.07vw;
}
.admin {
  margin-right: 2.67vw;
  width: 4.4vw;
}
</style>
