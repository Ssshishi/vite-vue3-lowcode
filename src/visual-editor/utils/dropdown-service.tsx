import {
  defineComponent,
  PropType,
  reactive,
  computed,
  getCurrentInstance,
  createApp,
  onMounted,
  onBeforeUnmount,
  ref,
  provide,
  inject,
} from 'vue';
import './dropdown-service.scss';
import { defer } from './defer';

interface DropdownServiceOption {
  reference: MouseEvent | HTMLElement;
  content: () => JSX.Element;
}

// 高阶函数
// provide 向子组件提供属性或者方法
// 在子组件中通过inject() 将数据或方法注入和访问
const DropdownServiceProvider = (() => {
  const DROPDOWN_SERVICE_PROVIDER = '@@DROPDOWN_SERVICE_PROVIDER';
  return {
    provide: (handler: { onClick: () => void }) => provide(DROPDOWN_SERVICE_PROVIDER, handler),
    inject: () => inject(DROPDOWN_SERVICE_PROVIDER) as { onClick: () => void },
  };
})();

const ServiceComponent = defineComponent({
  props: { option: { type: Object as PropType<DropdownServiceOption>, required: true } },
  setup(props) {
    const ctx = getCurrentInstance()!;
    const el = ref<InstanceType<typeof HTMLDivElement>>();

    // reactive 则是创建响应式数据对象， 追踪其属性的读取与修改，在变化时触发主动更新。用于追踪数据变化的场景
    const state = reactive({
      option: props.option,
      showFlag: false,
      top: 0,
      left: 0,
      mounted: (() => {
        const dfd = defer();
        onMounted(() => setTimeout(() => dfd.resolve(), 0));
        return dfd.promise;
      })(),
    });

    const service = (option: DropdownServiceOption) => {
      state.option = option;

      if ('addEventListener' in option.reference) {
        const { top, left, height } = option.reference.getBoundingClientRect()!;
        state.top = top + height;
        state.left = left;
      } else {
        const { clientX, clientY } = option.reference;
        state.left = clientX;
        state.top = clientY;
      }

      methods.show();
    };

    const methods = {
      show: async () => {
        await state.mounted;
        state.showFlag = true;
      },
      hide: () => {
        state.showFlag = false;
      },
    };

    // computed 用于计算属性，提供自动缓存与自动更新的功能，适用于需要基于其他数据进行计算的属性
    const classes = computed(() => [
      'dropdown-service',
      {
        'dropdown-service-show': state.showFlag,
      },
    ]);

    const styles = computed(() => ({
      top: `${state.top}px`,
      left: `${state.left}px`,
    }));

    Object.assign(ctx.proxy!, { service });

    const onMousedownDocument = (e: MouseEvent) => {
      if (!el.value?.contains(e.target as HTMLElement)) {
        methods.hide();
      }
    };

    onMounted(() => document.body.addEventListener('mousedown', onMousedownDocument, true));

    onBeforeUnmount(() =>
      document.body.removeEventListener('mousedown', onMousedownDocument, true),
    );

    DropdownServiceProvider.provide({ onClick: methods.hide });

    return () => (
      <div class={classes.value} style={styles.value} ref={el}>
        {state.option.content()}
      </div>
    );
  },
});

export const DropdownOption = defineComponent({
  props: {
    label: { type: String },
    icon: { type: String },
  },
  emits: ['click'],
  setup(props, ctx) {
    const { onClick: dropdownClickHandler } = DropdownServiceProvider.inject();

    const handler = {
      onClick: (e: MouseEvent) => {
        ctx.emit('click', e);
        dropdownClickHandler();
      },
    };

    return () => (
      <div class="dropdown-option" onClick={handler.onClick}>
        <i class={props.icon} />
        <span>{props.label}</span>
      </div>
    );
  },
});

export const $$dropdown = (() => {
  let ins: any;
  return (option: DropdownServiceOption) => {
    if (!ins) {
      const el = document.createElement('div');
      document.body.appendChild(el);
      const app = createApp(ServiceComponent, { option });
      ins = app.mount(el);
    }
    ins.service(option);
  };
})();
