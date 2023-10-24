import { createApp } from 'vue';
import App from './App.vue';

import { setupElementPlus } from './plugins/element-plus';
import { setupVant } from './plugins/vant';

import 'normalize.css';
import 'virtual:windi.css';
import 'virtual:windi-devtools';
import 'animate.css';

import router from './router/';
import { setupStore } from './store/';

const app = createApp(App);

// 配置store
setupStore(app);

// 使用element-plus插件  一个Vue 3 UI 框架
setupElementPlus(app);

// 使用vant插件 移动端 Vue 组件库
setupVant(app);

app.config.globalProperties.$$refs = {};

// if (import.meta.env.DEV) {
window.$$refs = app.config.globalProperties.$$refs;
// }

// 安装插件
app.use(router);

// 路由准备完毕再挂载
router.isReady().then(() => app.mount('#app'));
