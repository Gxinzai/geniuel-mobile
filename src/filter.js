import Vue from "vue";

Vue.filter("wordLimit", function(content, maxLength) {
  return content.length > maxLength
    ? content.slice(0, maxLength) + "..."
    : content;
});
Vue.filter("delete0", function(str) {
  return Number(str.charAt(str.length - 1)) === 0
    ? str.slice(0, str.length - 2)
    : str;
});
Vue.filter("shoukeid", function(arr) {
  let target = ["", "面授班", "网络班"];
  if (Array.isArray(arr)) {
    return arr.length === 1 ? target[arr[0]] : "不限";
  }
});
Vue.filter("xiangmuid", function(str) {
  return str === "高端研修" ? "研" : str.slice(0, 1);
});
