
const md = `
### YkForm表单组件
常用的表单组件。

### 基础用法
\`\`\`vue
<YkForm v-bind="ykFormProps" ref="ykFormRef">
  // 自定义整个form表单项，如果配置此customForm，那么所有的下面自定义表单项将会失效，完全以此模板内内容为准
  <template #customForm v-if="false">
    <el-form-item label="姓名" prop="name" :rules="customRules.rules">
      <el-input v-model="ykFormProps.formName.name" />
    </el-form-item>
  </template>
  // 自定义form表单某一项，如：输入框
  <template #formItemInput>
    <el-input
      v-model="ykFormProps.formName.slotInput"
      placeholder="这是自定义的输入框"
    />
  </template>
  // 上传组件
  <template #formItemUpload>
    <YkUpload />
  </template>
  // 复合型输入框自定义元素
  <template #slotInpPrepend>Http://</template>
  <template #slotInpAppend>.comww</template>
  // Form表单内操作
  <template #operationIn>
    <el-button type="primary" @click="onSubmit">Create</el-button>
    <el-button @click="resetForm">Reset</el-button>
    <el-button>Cancel</el-button>
  </template>
  // Form表单外操作
  <template #operationOut>
    <el-button type="primary" @click="onSubmit">Create</el-button>
    <el-button @click="resetForm">Reset</el-button>
    <el-button>Cancel</el-button>
  </template>
</YkForm>
\`\`\`
### Attributes属性
|  参数 | 说明  | 类型  | 可选值  |  默认值 |
| :------------ | :------------ | :------------ | :------------ | :------------ |
| formProps | 表单Form对应的属性 | {} | - |  如下 |
| formName | form 组件绑定name字段 | {} | - |  如下 |
| formItem | 表单项的配置数据 |  [] | - |  如下 |
### formProps (具体参数说明参考ElementUI的Form组件属性)
\`\`\`vue
{
  labelWidth: "120px",
  inline: false,
  labelPosition: "right",
  size: "default",
  disabled: false,
}
\`\`\`
### formName (每个表单项绑定的name字段,与formItem中每一项的prop属性一致)
\`\`\`vue
{
  name: "",
  region: "",
  time: "",
  date: "",
  delivery: false,
  type: [1],
  resource: "",
  desc: "",
  dateRange: [],
  dateTimeRange: [],
  slotInput: "",
}
\`\`\`
### formItem(可参考ElementUI的各组件的属性)
\`\`\`vue
[
  {
    label: string;
    prop: string;
    // 元素标签名称，如（input,select,date,switch,checkbox,radio,dateRange,slot)
    tag?: string;
    type?: string;
    // 自定义组件名称，如（slotInput,slotUpload)，对应上面的template属性
    slotName?: string;
    rules?: FormItemRule | FormItemRule[];
    disabled?: boolean;
    multiple?: boolean;
    collapseTags?: boolean;
    filterable?: boolean;
    options?: any[];
    // 当为select组件时，可以设置数据源的label和value的字段名称
    labelName?: string;
    // 当为select组件时，可以设置数据源的label和value的字段名称
    valueName?: string;
    // 设置input框的样式
    inputStyle?: string;
    startPlaceholder?: string;
    endPlaceholder?: string;
    rangeSeparator?: string;
    placeholder?: string;
    suffixIcon?: string | Component;
    prefixIcon?: string | Component;
    showPassword?: boolean;
    clearable?: boolean;
    // 自定义input框的前缀template
    slotInpPrepend?: string;
    // 自定义input框的后缀template
    slotInpAppend?: string;
    maxlength?: number;
    // 用来控制是否显示某个表单项，如表单项之间需要显示控制的时候
    isShow?: boolean;
    formatter?: (value: string | number) => string;
    parser?: (value: string) => string;
    blur?: (event: Event) => void;
    focus?: (event: Event) => void;
    change?: (value: string | number) => void;
    input?: (value: string | number) => void;
    clear?: () => void;
  }
]
\`\`\`
### 获取Form表单实例
\`\`\`vue
const ykFormRef = ref();
const formEl = ykFormRef.value.ykFormRef;
formEl.resetFields();
\`\`\`
`
export default md
