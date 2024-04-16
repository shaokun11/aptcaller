import { createRouter, createWebHashHistory } from "vue-router";

export const constantRoutes = [
  {
    path: "/",
    component: () => import("@/views/home/index.vue"),
    meta: {
      isParentView: true,
    },
  },
  
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
