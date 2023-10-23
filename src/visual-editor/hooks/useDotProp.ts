/**
 * @name: useDotProp
 * @author: 卜启缘
 * @date: 2021/5/2 19:54
 * @description：useDotProp
 * @update: 2021/5/2 19:54
 */
export const useDotProp = (originObj, propName) => {
  const props: string[] = propName.split('.');

  const isDotProp = props.length > 1;

  // ！非空断言符号 一定要谨慎使用 在表达式后面加！这样就是表示props.pop() 返回的不会是null 或者undefined
  const prop = props.pop()!;

  // '??=' 空值合并操作符 prev[curr]??= {}  在 prev[curr]不存在时 赋值为空对象
  // reduce(callback, 初始值)
  const propObj = props.reduce((prev, curr) => (prev[curr] ??= {}), originObj);

  return {
    prop,
    propObj,
    isDotProp,
  };
};
