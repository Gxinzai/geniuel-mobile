<template>
  <div
    style="position: fixed;top: 0;right: 0;left: 0;bottom: 0;z-index: 6;background: white"
  >
    <cube-index-list
      class="tl"
      :data="indexListData"
      :title="title"
      :speed="500"
      @select="selectItem"
      @title-click="clickTitle"
    ></cube-index-list>
  </div>
</template>

<script>
export default {
  name: "IndexList",
  data() {
    return {
      title: "按专业分类"
    };
  },
  props: {
    indexListData: null
  },
  methods: {
    selectItem(item) {
      // console.log(item);
      this.$emit("update:indexList", false);
      this.$emit("updateFilter", item);
    },
    clickTitle(title) {
      console.log(title);
    }
  }
};
</script>

<style scoped></style>
