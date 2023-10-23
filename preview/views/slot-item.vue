<!--
 * @Author: 卜启缘
 * @Date: 2021-06-12 22:18:48
 * @LastEditTime: 2021-07-14 10:17:34
 * @LastEditors: 卜启缘
 * @Description:
 * @FilePath: \vite-vue3-lowcode\preview\views\slot-item.vue
-->
<template>
  <div class="__slot-item">
    <!--  v-on="events" 这个events是个包含多个事件监听的对象  v-on 可以用 @-->
    <comp-render :element="element" on-click="events">
      <template v-for="(value, key) in element.props?.slots" :key="key" #[key]>
        <template v-for="item in value?.children" :key="item._vid">
          <slot-item :element="item" :models="models" :actions="actions" />
        </template>
      </template>
    </comp-render>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, PropType } from 'vue';
  import request from '../utils/http/request';
  import { ContentTypeEnum } from '../utils/http/httpEnum';
  import CompRender from './comp-render';
  import type {
    VisualEditorBlockData,
    VisualEditorActions,
    VisualEditorModel,
    FetchApiItem,
  } from '@/visual-editor/visual-editor.utils';
  import { useAnimate } from '@/hooks/useAnimate';

  export default defineComponent({
    name: 'SlotItem',
    components: { CompRender }, // 在定义的组件内部，使用别的组件 CompRender

    props: {
      element: {
        type: [Object] as PropType<VisualEditorBlockData>,
        default: () => ({}),
      },
      actions: {
        type: Object as PropType<VisualEditorActions>,
        default: () => ({}),
      },
      models: {
        type: Object as PropType<VisualEditorModel[]>,
        default: () => ({}),
      },
    },

    setup(props) {
      // TODO 生成组件事件
      const events = props.element.actions.reduce((prev, curr) => {
        prev[curr.event] = async () => {
          for (const handle of curr.handle) {
            const [scopeType, actionType, handleKey] = handle.link;

            if (scopeType === 'global') {
              const apis: FetchApiItem[] = props.actions[actionType].apis;
              // const { data, options } = apis.find((item) => item.key == handleKey)!;
              const { options } = apis.find((item) => item.key == handleKey)!;
              // const pramsObj = {};
              await request({
                ...options,
                headers: {
                  'Content-Type': ContentTypeEnum[options.contentType],
                },
                data: {
                  username: 'admin',
                  password: '123456',
                },
              });
            } else if (scopeType === 'component') {
              console.log('scopeType', scopeType);
            }
          }
        };
        return prev;
      }, {});

      // 挂载
      onMounted(() => {
        const animations = props.element.animations;
        if (animations?.length) {
          let animateEl =
            (window.$$refs[props.element._vid]?.$el as HTMLElement) ??
            (window.$$refs[props.element._vid] as HTMLElement);

          animateEl = animateEl?.closest('.__slot-item')?.firstChild as HTMLElement;

          if (animateEl) {
            useAnimate(animateEl, animations);
          }
        }
      });

      return {
        events,
      };
    },
  });
</script>

<style scoped></style>
