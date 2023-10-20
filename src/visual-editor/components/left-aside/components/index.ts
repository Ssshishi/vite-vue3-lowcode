// DefineComponent 提供类型推导的辅助函数
import { DefineComponent } from 'vue';

// 动态导入模块的方式
// import.meta.globEager 匹配指定模式的模块路径，并一次性将这些模块导入并返回一个对象。
const modules = import.meta.globEager('./*/index.(tsx|vue)');

const components: Record<string, DefineComponent> = {};

console.log(modules, '起航');

for (const path in modules) {
  const comp = modules[path].default;
  components[comp.name || path.split('/')[1]] = comp;
}

console.log('left-aside components:', components);

export default components;
// 挺有意思的，用这种方式一并导出组件
