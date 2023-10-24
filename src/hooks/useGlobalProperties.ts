/**
 * @name: useGlobalProperties
 * @author: 卜启缘
 * @date: 2021/5/3 21:13
 * @description：useGlobalProperties
 * @update: 2021/5/3 21:13
 */
// getCurrentInstance 获取当前组件实例的函数，可以访问内部属性和方法
import { getCurrentInstance } from 'vue';

import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

interface GlobalProperties {
  $$refs: any;
  $route: RouteLocationNormalizedLoaded; // 已加载的路由位置信息
  $router: Router;
}

// $ref 是特殊属性，用来访问组件或者DOM元素的使用，允许通过引用名来访问组件实例或DOM元素
// 要使用，则必须在组件或DOM元素上添加ref="" 并指定名称
// 注意， $refs 只在组件渲染完成后才会填充， 当在组件created 或mounted钩子上访问$ref时，会

export const useGlobalProperties = () => {
  const globalProperties = getCurrentInstance()!.appContext.config
    .globalProperties as unknown as GlobalProperties;

  const registerRef = (el, _vid: string) => el && (globalProperties.$$refs[_vid] = el);

  // 获取 或 设置 全局属性
  return {
    globalProperties,
    registerRef,
  };
};
