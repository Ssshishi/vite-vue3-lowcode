import { createPinia } from 'pinia';
import type { App } from 'vue';

const store = createPinia();
// 使用pinia 状态管理
export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
