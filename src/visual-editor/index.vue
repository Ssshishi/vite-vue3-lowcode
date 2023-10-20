<!--
 * @Author: 卜启缘
 * @Date: 2021-06-24 00:35:17
 * @LastEditTime: 2021-06-27 14:31:28
 * @LastEditors: 卜启缘
 * @Description: 可视化编辑器 组件式写入
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\index.vue
-->
<template>
  <el-container>
    <el-header height="80px" class="flex items-center shadow-md">
      <!-- 顶部start -->
      <Header />
      <!-- 顶部end -->
    </el-header>
    
    <el-container class="layout-container">
      
      <el-aside class="shadow-sm" width="380px">
        <!-- 左侧组件start -->
        <left-aside />
        <!-- 左侧组件end -->
      </el-aside>
      
      <el-main>
        <!-- 中间编辑区域start -->
        <simulator-editor />
        <!-- 中间编辑区域end -->

        <!-- 右侧属性面板start -->
        <right-attribute-panel />
        <!-- 右侧属性面板end -->
      </el-main>
      
    </el-container>
    
  </el-container>
</template>

<script setup lang="ts">
  import Header from './components/header/index.vue';
  // js导入驼峰， 但是html里面用 横杠， 这种差异是为了遵循HTML规范，因为在HTML中标签和属性名通常使用短横线分隔的方式，如<my-component>。
  // 为了方便开发者在模板中使用组件，允许使用短横线分隔的方式命名组件，同时在JavaScript中仍然使用驼峰命名法导入和注册组件
  import LeftAside from './components/left-aside/index.vue';
  import RightAttributePanel from './components/right-attribute-panel';
  import SimulatorEditor from './components/simulator-editor/simulator-editor.vue';
</script>

<style lang="scss">
  .el-header,
  .el-footer {
    position: relative;
    z-index: 99;
    background-color: white;
  }

  .el-aside {
    background-color: white;
  }

  .layout-container {
    height: calc(100vh - 80px);
  }

  .el-main {
    position: relative;
    padding: 12px;
    background-color: #f5f5f5;
    @media (min-width: 1111px) {
      overflow-x: hidden;
    }
  }
</style>
