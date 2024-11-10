import { createRouter, createWebHistory } from "vue-router";
import Index from "@/view/index/Index.vue";
import Home from "@/view/home/Home.vue";
import Life from "@/view/life/Life.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Index,
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/login",
      component: import("@/view/login/Login.vue"),
    },

    {
      path: "/life/:id",
      component: () => import("@/view/life/Life.vue"),
    },

    {
      path: "/life/edit",
      component: () => import("../view/edit/Edit.vue"),
    },
  ],
  // scrollBehavior(to, from, savedPosition) {
  //   return {
  //     top: 0,
  //     behavior: "instant", // 立即滚动，不使用平滑效果
  //   };
  // },
});

// 添加全局前置守卫
// router.beforeEach((to, from, next) => {
//   // 强制滚动到顶部
//   window.scrollTo(0, 0);
//   next();
// });

export default router;
