import Vue from 'vue'


Vue.filter('wordLimit', function (content, maxLength) {
  return (content.length > maxLength) ? (content.slice(0, maxLength) + '...') : (content)
})
