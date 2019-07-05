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
      path: "/jianzhang",
      name: "jianzhang",
      meta: { zn: "正文", bread: [{ name: "简章", path: "jianzhanglist" }] },
      component: () =>
        import(/* webpackChunkName: "jianzhang" */ "./views/jianZhang.vue")
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
      meta: { zn: "资讯" },
      component: () =>
        import(/* webpackChunkName: "zixunlist" */ "./views/ZiXunList.vue")
    },
    {
      path: "/zixuncontent",
      name: "zixun",
      meta: { zn: "正文", bread: [{ name: "资讯", path: "zixunlist" }] },
      component: () =>
        import(/* webpackChunkName: "zixun" */ "./views/ZiXun.vue")
    },
    {
      path: "/zzbs",
      name: "zzbs",
      meta: { zn: "博士项目", cid: 1, value: 3579 },
      component: () => import(/* webpackChunkName: "zzbs" */ "./views/zzbs.vue")
    },
    {
      path: "/zzss",
      name: "zzss",
      meta: { zn: "专业硕士", cid: 6, value: 3581 },
      component: () => import(/* webpackChunkName: "zzbs" */ "./views/zzbs.vue")
    },
    {
      path: "/tdxl",
      name: "tdxl",
      meta: { zn: "同等学力", cid: 5, value: 3580 },
      component: () => import(/* webpackChunkName: "zzbs" */ "./views/zzbs.vue")
    },
    {
      path: "/hzbx",
      name: "hzbx",
      meta: { zn: "合作办学", cid: 3, value: 3582 },
      component: () => import(/* webpackChunkName: "hzbx" */ "./views/hzbx.vue")
    },
    {
      path: "/gdyx",
      name: "gdyx",
      meta: { zn: "高端研修", cid: 4, value: 3583 },
      component: () => import(/* webpackChunkName: "hzbx" */ "./views/hzbx.vue")
    },
    {
      path: "/search",
      name: "search",
      meta: { zn: "搜索" },
      component: () =>
        import(/* webpackChunkName: "search" */ "./views/Search.vue")
    },
    {
      path: "/login",
      name: "login",
      meta: { zn: "搜索" },
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/LogIn.vue")
    },
    {
      path: "/forget",
      name: "forget",
      meta: { type: 0 },
      component: () =>
        import(/* webpackChunkName: "register" */ "./views/register.vue")
    },
    {
      path: "/register",
      name: "register",
      meta: { type: 1 },
      component: () =>
        import(/* webpackChunkName: "register" */ "./views/register.vue")
    },
    {
      path: "/my",
      name: "my",
      meta: { zn: "我的" },
      component: () => import(/* webpackChunkName: "login" */ "./views/my.vue")
    },
    {
      path: "/newslist",
      name: "newslist",
      meta: { zn: "我的消息" },
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/NewsList.vue")
    },
    {
      path: "/news",
      name: "news",
      meta: { zn: "我的消息" },
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/News.vue")
    },
    {
      path: "/advise",
      name: "advise",
      meta: { zn: "建议与反馈" },
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/advise.vue")
    },
    {
      path: "/collection",
      name: "collection",
      meta: { zn: "我的收藏" },
      component: () =>
        import(/* webpackChunkName: "collection" */ "./views/collection.vue")
    },
    // {
    //   path: "/demo",
    //   name: "demo",
    //   component: () =>
    //     import(/* webpackChunkName: "search" */ "./views/Demo.vue")
    // },
    {
      path: "/about",
      name: "about",
      meta: { zn: "关于我们" },
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/zhuantilist",
      name: "zhuantilist",
      meta: { zn: "全部专题" },
      component: () =>
        import(/* webpackChunkName: "zhuanti" */ "./zhuanti/ZhuanTiList.vue")
    },
    {
      path: "/ssbktj",
      name: "ssbktj",
      meta: { zn: "正文", bread: [{ name: "专题", path: "zixunlist" }] },
      component: () =>
        import(/* webpackChunkName: "zhuanti" */ "./zhuanti/ssbktj.vue")
    },
    {
      path: "/yjsqb",
      name: "yjsqb",
      meta: { zn: "正文", bread: [{ name: "专题", path: "zixunlist" }] },
      component: () =>
        import(/* webpackChunkName: "zhuanti" */ "./zhuanti/yjsqb.vue")
    },
    {
      path: "/yjsbklc",
      name: "yjsbklc",
      meta: { zn: "正文", bread: [{ name: "专题", path: "zixunlist" }] },
      component: () =>
        import(/* webpackChunkName: "zhuanti" */ "./zhuanti/yjsbklc.vue")
    },
    {
      path: "/yjsxlxwqb",
      name: "yjsxlxwqb",
      meta: { zn: "正文", bread: [{ name: "专题", path: "zixunlist" }] },
      component: () =>
        import(/* webpackChunkName: "zhuanti" */ "./zhuanti/yjsxlxwqb.vue")
    },
    {
      path: "/zzyjs",
      name: "zzyjs",
      meta: { zn: "正文", bread: [{ name: "专题", path: "zixunlist" }] },
      component: () =>
        import(/* webpackChunkName: "zhuanti" */ "./zhuanti/zzyjs.vue")
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
