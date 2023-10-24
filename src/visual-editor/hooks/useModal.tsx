/**
 * @name: useModal
 * @author: 卜启缘
 * @date: 2021/5/7 15:26
 * @description：useModal
 * @update: 2021/5/7 15:26
 */
import {
  defineComponent,
  reactive,
  createApp, // 全局工厂函数，创建根级别的vue应用实例
  PropType, // props校验，主要来看传递给组件的props是不是正确的类型
  getCurrentInstance,
  ComponentInternalInstance, // 组件实例对象，表示内部状态与行为，提供管理和操作组件的方法与属性
  isVNode, // 检查对象是否是一个有效的虚拟节点 可以使用createVNode 创建虚拟节点
} from 'vue';
import { ElButton, ElDialog } from 'element-plus';
import { isFunction } from '@/visual-editor/utils/is';

interface ModalOptions {
  title?: string;
  footer?: null | (() => JSX.Element);
  content: ComponentInternalInstance | (() => JSX.Element);
  onConfirm?: () => void;
  onCancel?: () => void;
  props?: {
    [propName: string]: any;
  };
}

const Modal = defineComponent({
  props: {
    options: {
      type: Object as PropType<ModalOptions>,
      default: () => ({}),
    },
  },

  setup(props) {
    const instance = getCurrentInstance()!;

    const state = reactive<{
      options: ModalOptions;
      visible: boolean;
    }>({
      options: props.options,
      visible: true,
    });

    const methods = {
      service: (options) => {
        state.options = options;
        methods.show();
      },
      show: () => (state.visible = true),
      hide: () => (state.visible = false),
    };

    const handler = {
      onConfirm: async () => {
        await state.options.onConfirm?.();
        methods.hide();
      },
      onCancel: () => {
        state.options.onCancel?.();
        methods.hide();
      },
    };

    Object.assign(instance.proxy!, methods);

    return () => (
      <ElDialog
        v-model={state.visible}
        title={state.options.title}
        destroyOnClose={true}
        {...state.options.props}
        onClose={handler.onCancel}
      >
        {{
          default: () =>
            isVNode(state.options.content) ? (
              <content />
            ) : isFunction(state.options.content) ? (
              state.options.content()
            ) : null,
          footer: () =>
            state.options.footer === null ? null : (
              <div>
                <ElButton {...({ onClick: handler.onCancel } as any)}>取消</ElButton>
                <ElButton type={'primary'} {...({ onClick: handler.onConfirm } as any)}>
                  确定
                </ElButton>
              </div>
            ),
        }}
      </ElDialog>
    );
  },
});

export const useModal = (() => {
  let instance: any;
  return (options: ModalOptions) => {
    if (instance) {
      instance.service(options);
      return instance;
    }
    const div = document.createElement('div');
    document.body.appendChild(div);
    const app = createApp(Modal, { options });
    instance = app.mount(div);
    return instance;
  };
})();
