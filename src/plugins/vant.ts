import { Lazyload } from 'vant';
import type { App } from 'vue';
import '@vant/touch-emulator';
import 'vant/lib/index.css';

// 使用 懒加载插件
export const setupVant = (app: App) => {
  app.use(Lazyload);
};
