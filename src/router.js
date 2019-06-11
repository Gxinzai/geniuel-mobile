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
      meta: { zn: "院校库" },
      component: () =>
        import(/* webpackChunkName: "schoollist" */ "./views/SchoolList.vue")
    },
    {
      path: "/jianzhanglist",
      name: "jianzhanglist",
      meta: { zn: "简章库" },
      component: () =>
        import(
          /* webpackChunkName: "jianzhanglist" */ "./views/JianZhangList.vue"
        )
    },
    {
      path: "/baoming",
      name: "baoming",
      meta: { zn: "在线报名" },
      component: () =>
        import(/* webpackChunkName: "baoming" */ "./views/BaoMing.vue")
    },
    {
      path: "/majorlist",
      name: "majorlist",
      meta: { zn: "专业库" },
      component: () =>
        import(/* webpackChunkName: "majorlist" */ "./views/MajorList.vue")
    },
    {
      path: "/zixunlist",
      name: "zixunlist",
      meta: { zn: "专业库" },
      component: () =>
        import(/* webpackChunkName: "zixunlist" */ "./views/ZiXunList.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
