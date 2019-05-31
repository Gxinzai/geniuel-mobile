import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  // base: '/mobile',
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/schoollist",
      name: "schoollist",
      component: () =>
        import(/* webpackChunkName: "schoollist" */ "./views/SchoolList.vue")
    },
    {
      path: "/baoming",
      name: "baoming",
      component: () =>
        import(/* webpackChunkName: "baoming" */ "./views/BaoMing.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
