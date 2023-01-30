import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import Layout from "../views/layout.vue";
import AuthLayout from "../views/auth/layout.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useStore } from "../store/user";
import { homeRoutes } from "./modules/home";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: Layout,
      redirect: "/home/index",
      meta: { title: "首页", isAuth: true, icon: "home", isMenu: false },
      children: [...homeRoutes],
    },
    {
      path: "/principal",
      component: Layout,
      redirect: "/principal/account",
      meta: {
        title: "资产管理",
        isAuth: true,
        icon: "principal",
        isMenu: true,
      },
      children: [
        {
          path: "/principal/account",
          meta: { title: "我的资产账户", isAuth: true, isMenu: true },
          component: () => import("../views/principal/account.vue"),
        },
        {
          path: "/principal/way",
          meta: { title: "选择提现方式", isAuth: true, isMenu: false },
          component: () => import("../views/withdraw/way.vue"),
        },
        {
          path: "/principal/record",
          meta: { title: "账户变动记录", isAuth: true, isMenu: true },
          component: () => import("../views/principal/record.vue"),
        },
        {
          path: "/principal/detail",
          meta: { title: "账户详情", isAuth: true, isMenu: false },
          component: () => import("../views/principal/detail.vue"),
        },
        {
          path: "/principal/accountWithdraw",
          meta: { title: "我的收款账户", isAuth: true, isMenu: true },
          component: () => import("../views/principal/accountWithdraw.vue"),
        },
      ],
    },
    {
      path: "/convert",
      component: Layout,
      redirect: "/convert/account",
      meta: { title: "外汇管理", isAuth: true, icon: "convert", isMenu: true },
      children: [
        {
          path: "/convert/record",
          meta: { title: "换汇记录", isAuth: true, isMenu: true },
          component: () => import("../views/convert/record.vue"),
        },
      ],
    },
    {
      path: "/abroad",
      component: Layout,
      redirect: "/abroad/account",
      meta: { title: "收款管理", isAuth: true, icon: "abroad", isMenu: true },
      children: [
        {
          path: "/abroad/record",
          meta: { title: "收款记录", isAuth: true, isMenu: true },
          component: () => import("@/views/abroad/record.vue"),
        },
        {
          path: "/abroad/order",
          meta: { title: "订单管理", isAuth: true, isMenu: true },
          component: () => import("@/views/abroad/order.vue"),
        },
        {
          path: "/abroad/order/apply",
          meta: { title: "订单管理", isAuth: true, isMenu: false },
          component: () => import("@/views/abroad/apply.vue"),
        },
        {
          path: "/abroad/order/details",
          meta: { title: "订单详情", isAuth: true, isMenu: false },
          component: () => import("@/views/abroad/details.vue"),
        },
      ],
    },
    {
      path: "/withdraw",
      component: Layout,
      redirect: "/withdraw/account",
      meta: { title: "提现管理", isAuth: true, icon: "withdraw", isMenu: true },
      children: [
        {
          path: "/withdraw/account",
          meta: { title: "我的提现账户", isAuth: true, isMenu: true },
          component: () => import("../views/withdraw/account.vue"),
        },
        {
          path: "/withdraw/record",
          meta: { title: "提现记录", isAuth: true, isMenu: true },
          component: () => import("../views/withdraw/record.vue"),
        },
        {
          path: "/withdraw/way",
          meta: { title: "选择提现方式", isAuth: true, isMenu: false },
          component: () => import("../views/withdraw/way.vue"),
        },
      ],
    },
    {
      path: "/",
      component: AuthLayout,
      children: [
        {
          path: "/login",
          meta: { title: "登录", isAuth: false },
          component: () => import("../views/auth/login.vue"),
        },
        {
          path: "/register",
          meta: { title: "注册", isAuth: false },
          component: () => import("../views/auth/register.vue"),
        },
        {
          path: "/forget",
          meta: { title: "忘记密码", isAuth: false },
          component: () => import("../views/auth/forget.vue"),
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  const user = useStore();
  if (to?.meta?.isAuth === false) {
    next();
  } else {
    let token = user.token;
    if (token) {
      next();
    } else {
      next("/login");
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
