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
