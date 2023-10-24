<!--
 * @Author: 卜启缘
 * @Date: 2021-06-24 18:36:03
 * @LastEditTime: 2022-07-02 23:13:00
 * @LastEditors: 卜启缘
 * @Description: 数据源管理
 * @FilePath: /vite-vue3-lowcode/src/visual-editor/components/left-aside/components/data-source/index.vue
-->
<template>
  <el-tabs type="border-card" stretch class="data-source">
    <el-tab-pane label="数据模型" lazy>
      <data-model />
    </el-tab-pane>
    <el-tab-pane label="数据接口" lazy>
      <data-fetch />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="tsx" name="基本组件">
  import { DataBoard } from '@element-plus/icons-vue';
  import DataModel from './data-model.vue';
  import DataFetch from './data-fetch.vue';

  // 直接在 <script setup> 中声明组件选项
  defineOptions({
    label: '数据源',
    order: 2,
    icon: DataBoard,
  });
</script>

<style lang="scss" scoped>
  .data-source :deep {
    /* :deep 伪类表示选择器内部的所有子代元素， 
      还有好多的伪类的 
    */
    .el-tabs__header {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .el-tabs__content {
      contain: layout;
      /* 内容没有进入视图区域时是不可见的 */
      content-visibility: auto;
    }
  }
</style>
