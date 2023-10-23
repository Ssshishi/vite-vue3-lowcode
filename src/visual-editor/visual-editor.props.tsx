// 编辑器属性

// 虚拟编辑器 属性类型
export enum VisualEditorPropsType {
  /** 输入框 */
  input = 'input',
  /** 数字输入框 */
  inputNumber = 'InputNumber',
  /** 颜色选择器 */
  color = 'color',
  /** 下拉选择器 */
  select = 'select',
  /** 表格 */
  table = 'table',
  /** 开关 */
  switch = 'switch',
  /** 模型绑定选择器 */
  modelBind = 'ModelBind',
  /** 可拖拽项 */
  crossSortable = 'CrossSortable',
}

// 编辑器 属性
export type VisualEditorProps = {
  type: VisualEditorPropsType;
  /** 表单项标签名称 */
  label: string;
  /** 表单项提示说明 */
  tips?: string;
  /** 表单域标签的位置 */
  labelPosition?: string;
  /** 表单项默认值 */
  defaultValue?: any;
} & {
  /** 可选项 */
  options?: VisualEditorSelectOptions;
  /** 是否可以多选 */
  multiple?: boolean;
  /** 项属性配置 */
  showItemPropsConfig?: boolean;
} & {
  max?: number;
  min?: number;
} & {
  table?: VisualEditorTableOption;
};

/*---------------------------------------modelBind-------------------------------------------*/
// 编辑器模型绑定属性
interface EditorModelBindProp {
  label: string;
  defaultValue?: any;
  tips?: string;
}

// 创建编辑器模型
export function createEditorModelBindProp({
  label = '字段绑定',
  defaultValue,
  tips,
}: EditorModelBindProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.modelBind,
    label,
    tips,
    defaultValue,
  };
}

/*---------------------------------------switch-------------------------------------------*/
// 编辑器开关
interface EditorSwitchProp {
  label: string;
  defaultValue?: boolean;
  tips?: string;
}

// 编辑器开关属性
export function createEditorSwitchProp({
  label,
  defaultValue,
  tips,
}: EditorSwitchProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.switch,
    label,
    tips,
    defaultValue,
  };
}

/*---------------------------------------input-------------------------------------------*/
// 编辑器输入框
interface EditorInputProp {
  label: string;
  defaultValue?: any;
  tips?: string;
}

// 创建
export function createEditorInputProp({
  label,
  defaultValue,
  tips,
}: EditorInputProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.input,
    label,
    tips,
    defaultValue,
  };
}
/*---------------------------------------InputNumber -------------------------------------------*/

interface EditorInputNumberProp {
  label: string;
  defaultValue?: any;
  tips?: string;
  max?: number;
  min?: number;
}

export function createEditorInputNumberProp({
  label,
  defaultValue,
  max,
  min,
  tips,
}: EditorInputNumberProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.inputNumber,
    label,
    tips,
    max,
    min,
    defaultValue,
  };
}

/*---------------------------------------color-------------------------------------------*/
// 颜色
interface EditorColorProp {
  label: string;
  defaultValue?: string;
}

export function createEditorColorProp({ label, defaultValue }: EditorColorProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.color,
    label,
    defaultValue,
  };
}

/*---------------------------------------select-------------------------------------------*/
// 选择
export type VisualEditorSelectOptions = {
  label: string;
  value: string | number | boolean | object;
  [prop: string]: any;
}[];

interface EditorSelectProp {
  label: string;
  options: VisualEditorSelectOptions;
  defaultValue?: any;
  multiple?: boolean;
  tips?: string;
}

export function createEditorSelectProp({
  label,
  options,
  defaultValue,
  tips,
  multiple,
}: EditorSelectProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.select,
    label,
    defaultValue,
    tips,
    options,
    multiple,
  };
}

/*---------------------------------------table-------------------------------------------*/
// 表格
export type VisualEditorTableOption = {
  options: {
    label: string; // 列显示文本
    field: string; // 列绑定的字段
  }[];
  showKey: string;
};

interface EditorTableProp {
  label: string;
  option: VisualEditorTableOption;
  defaultValue?: { label: string; value: string }[];
}

export function createEditorTableProp({
  label,
  option,
  defaultValue,
}: EditorTableProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.table,
    label,
    table: option,
    defaultValue,
  };
}

/*---------------------------------------CrossSortableOptions-------------------------------------------*/
// 可交叉排序
interface EditorCrossSortableProp {
  label: string;
  labelPosition: 'top' | '';
  multiple?: boolean;
  showItemPropsConfig?: boolean;
  defaultValue?: string[] | VisualEditorSelectOptions;
}

export function createEditorCrossSortableProp({
  label,
  labelPosition,
  multiple,
  showItemPropsConfig,
  defaultValue,
}: EditorCrossSortableProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.crossSortable,
    label,
    multiple,
    showItemPropsConfig,
    labelPosition,
    defaultValue,
  };
}
