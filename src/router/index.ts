import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress'; // progress bar 进度条
import 'nprogress/css/nprogress.css'; // 进度条样式

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/visual-editor/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // createWebHashHistory 创建一个 hash 模式的历史。在没有主机的 web 应用 (如 file://) 或无法通过配置服务器来处理任意 URL 的时候非常有用
  routes,
});

// 添加一个导航钩子，它会在每次导航之前被执行。返回一个用来移除该钩子的函数。
router.beforeEach(() => {
  NProgress.start(); // start progress bar
  return true;
});

// 添加一个导航钩子，它会在每次导航之后被执行。返回一个用来移除该钩子的函数
router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

export default router;
