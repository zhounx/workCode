export const homeRoutes = [
  {
    path: "choseType",
    props: true,
    component: () => import("@/views/home/choseType.vue"),
  },
  {
    path: "index",
    props: true,
    component: () => import("@/views/home/index.vue"),
  },
  //#region 个人开户路由
  {
    path: "personFirst",
    props: true,
    component: () => import("@/views/home/person/first.vue"),
    meta: { title: "个人开户第一步", isAuth: false },
  },
  {
    path: "personSecond",
    props: true,
    component: () => import("@/views/home/person/second.vue"),
    meta: { title: "个人开户第二步", isAuth: false },
  },
  {
    path: "personThird",
    props: true,
    component: () => import("@/views/home/person/third.vue"),
    meta: { title: "个人开户第三步", isAuth: false },
  },
  //#endregion

  //#region 个体商户开户路由
  {
    path: "individualFirst",
    props: true,
    component: () => import("@/views/home/individual/first.vue"),
  },
  {
    path: "individualSecond",
    props: true,
    component: () => import("@/views/home/individual/second.vue"),
  },
  {
    path: "individualThird",
    props: true,
    component: () => import("@/views/home/individual/third.vue"),
  },
  //#endregion

  //#region 大陆企业开户路由
  {
    path: "mainlandFirst",
    props: true,
    component: () => import("@/views/home/mainland/first.vue"),
  },
  {
    path: "mainlandSecond",
    props: true,
    component: () => import("@/views/home/mainland/second.vue"),
  },
  {
    path: "mainlandThird",
    props: true,
    component: () => import("@/views/home/mainland/third.vue"),
  },
  ///
  //#endregion

  //#region 香港地区企业开卡路由
  {
    path: "hongkongFirst",
    props: true,
    component: () => import("@/views/home/hongkong/first.vue"),
  },
  {
    path: "hongkongSecond",
    props: true,
    component: () => import("@/views/home/hongkong/second.vue"),
  },
  {
    path: "hongkongThird",
    props: true,
    component: () => import("@/views/home/hongkong/third.vue"),
  },
  //#endregion
];
