import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Regist from "../views/Regist";
import Login from "../views/Login";
import AuthorInfo from "../views/AuthorInfo";
import TopDetails from "../views/TopDetails";
import BookDetails from "../views/BookDetails";
import ReadDetails from "../views/ReadDetails";
import Commentall from "../views/Commentall";
import Admin from "../views/Admin";

Vue.use(VueRouter);

const routes = [
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "Admin" */ "../views/Admin.vue"),
  },
  {
    path: "/commentall",
    name: "Commentall",
    component: () =>
      import(/* webpackChunkName: "Commentall" */ "../views/Commentall.vue"),
  },
  {
    path: "/readdetails",
    name: "ReadDetails",
    component: () =>
      import(/* webpackChunkName: "ReadDetails" */ "../views/ReadDetails.vue"),
  },
  {
    path: "/bookdetails",
    name: "BookDetails",
    component: () =>
      import(/* webpackChunkName: "BookDetails" */ "../views/BookDetails.vue"),
  },
  {
    path: "/topdetails",
    name: "TopDetails",
    component: () =>
      import(/* webpackChunkName: "TopDetails" */ "../views/TopDetails.vue"),
  },
  {
    path: "/authorinfo",
    name: "AuthorInfo",
    component: () =>
      import(/* webpackChunkName: "AuthorInfo" */ "../views/AuthorInfo.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
  },
  {
    path: "/regist",
    name: "Regist",
    component: () =>
      import(/* webpackChunkName: "Regist" */ "../views/Regist.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  //保证每次跳转后都是在页头位置
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
router.beforeEach((to, from, next) => {
  let statelogin = sessionStorage.getItem("statelogin"); //验证登录状态
  if (statelogin) {
    //判断是否登录
    next();
  } else {
    if (to.path !== "/login") {
      alert("请先登录");
      next({ path: "/login" });
    } else {
      next();
    }
  }
});

// router.beforeEach((to, from, next) => {});

export default router;
