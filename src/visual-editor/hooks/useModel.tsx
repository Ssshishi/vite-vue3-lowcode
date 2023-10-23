import { ref, watch, defineComponent } from 'vue';

// 模型
export function useModel<T>(getter: () => T, emitter: (val: T) => void) {
  const state = ref(getter()) as { value: T };

  // watch作为监听方法， 监听getter返回值， 进行数据比较
  watch(getter, (val) => {
    if (val !== state.value) {
      state.value = val;
    }
  });

  // 返回 一个名为value的getter setter方法
  // get set 是js的特殊方法，用于获取或者修改对象
  return {
    get value() {
      return state.value;
    },
    set value(val: T) {
      if (state.value !== val) {
        state.value = val;
        emitter(val);
      }
    },
  };
}

export const TestUseModel = defineComponent({
  props: {
    modelValue: { type: String },
  },
  // emits 用来放置组件可以触发的自定义事件
  emits: ['update:modelValue'],

  setup(props, ctx) {
    // 组件中的方法触发事件update:modelValue
    const model = useModel(
      () => props.modelValue, // getter
      (val) => ctx.emit('update:modelValue', val), // setter
    );
    return () => (
      <div>
        自定义的输入框
        <input type="text" v-model={model.value} />
        {/*  v-model 表单元素与数据的双向绑定 */}
      </div>
    );
  },
});
