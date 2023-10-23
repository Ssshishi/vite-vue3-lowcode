<template>
  <router-view #="{ Component, route }">
    <keep-alive ref="keepAliveRef">
      <component :is="Component" :key="route.path" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { CacheEnum } from '@/enums';
  import { VisualEditorModelValue } from '@/visual-editor/visual-editor.utils';

  export default defineComponent({
    name: 'App',
    setup() {
      const keepAliveRef = ref(); // 创建响应式变量
      const route = useRoute(); // 当前路由
      const jsonData: VisualEditorModelValue = JSON.parse(
        localStorage.getItem(CacheEnum.PAGE_DATA_KEY) as string,
      );

      // 不需要缓存的页面  配置keepAlive为false
      const notNeedcachePages = Object.keys(jsonData.pages).filter(
        (key) => !jsonData.pages[key].config.keepAlive,
      );

      console.log('notNeedcachePages:', notNeedcachePages);

      // 监听路由，如果在不需要缓存的页面数组中，则删除缓存路由
      watch(
        () => route.path,
        (path) => {
          if (notNeedcachePages.includes(path)) {
            // 获取keep-alive缓存
            const routeCaches = keepAliveRef.value?.$?.__v_cache;
            console.log('keep-alive cache', path, routeCaches);
            // 从keep-alive的缓存中删除不需要缓存的路由
            routeCaches.delete(path);
          }
        },
      );

      return { keepAliveRef };
    },
  });
</script>

<style>
  body::-webkit-scrollbar {
    width: 0;
  }
</style>
