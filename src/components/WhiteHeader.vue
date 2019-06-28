<template>
  <div>
    <div class="white-header fjac p3vw por" @click="$router.go(-1)">
      <div class="arrow left poa"></div>
      <span class="f14 fc666">
        {{ $route.meta.zn }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "WhiteHeader",
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.white-header {
  border-bottom: 1px solid #e4e4e4;
  height: 10.5vw;
}
.arrow {
  width: 3vw;
  height: 3vw;
  border-right: 1px solid #b0b0b0;
  border-bottom: 1px solid #b0b0b0;
  transition: all 0.3s;
}
.arrow.left {
  left: 3vw;
  transform: rotate(-225deg);
}
</style>
