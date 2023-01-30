import { reactive, ref } from "vue"
import YkForm from '@/components/YkForm.vue';
import YkUpload from '@/components/YkUpload.vue';
import markdown from './YkForm.md.js'

export default {
  title: '公共组件/YkForm',
  component: YkForm,
  parameters: {
    notes: markdown,
  },
  argTypes: {
  },
};

const Template = (args) => ({
  components: { YkForm, YkUpload },
  setup() {
    const ykFormRef = ref();
    const onSubmit = async () => {
      const formEl = ykFormRef.value.ykFormRef;
      if (!formEl) return;
      await formEl.validate((valid, fields) => {});
    };
    return { args, onSubmit, ykFormRef };
  },
  template: `<yk-form v-bind="args" ref="ykFormRef"> 
              <template #formItemUpload>
                <YkUpload />
              </template>
              <template #operationOut>
                <el-button type="primary" @click="onSubmit">Create</el-button>
                <el-button @click="resetForm">Reset</el-button>
                <el-button>Cancel</el-button>
              </template>
            </yk-form>`,
});

export const Primary = Template.bind({});
Primary.storyName = '基础用法';
Primary.args = {
  formProps: {
    labelWidth: "120px",
    inline: false,
    labelPosition: "right",
    size: "default",
    disabled: false,
  },
  // form 组件绑定name值
  formName: reactive({
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
  }),
  // 表单项
  formItem: [
    {
      prop: "name",
      tag: "input",
      label: "姓名",
      type: "text",
      inputStyle: "width: 192px;",
      disabled: false,
      showPassword: false,
      clearable: false,
      slotInpPrepend: "slotInpPrepend",
      slotInpAppend: "slotInpAppend",
      maxlength: 10,
      isShow: true,
      formatter: (value) =>
        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
      change: (value) => {
        console.log(value);
      },
      input: (value) => {
        console.log(value);
      },
      rules: {
        required: true,
        trigger: "blur",
        validator: (rule, value) => {
          if (value < 18) {
            return new Error(`${value} is not equal to 'test'.`);
          }
        },
      },
    },
    {
      prop: "region",
      tag: "select",
      label: "地区",
      multiple: false,
      collapseTags: false,
      filterable: false,
      labelName: "label",
      valueName: "value",
      options: [
        {
          label: "北京",
          value: "beijing",
          disabled: false,
        },
        {
          label: "深圳",
          value: "shenzhen",
        },
      ],
      change: (value) => {
        console.log(value);
      },
      rules: {
        required: true,
        message: "Please select Activity zone",
        trigger: "change",
      },
    },
    {
      prop: "time",
      tag: "date",
      label: "时间",
      type: "datetime",
      rules: {
        required: true,
        message: "Please select Activity time",
        trigger: "change",
      },
    },
    {
      prop: "date",
      tag: "date",
      label: "日期",
      type: "date",
      rules: {
        required: true,
        message: "Please select Activity date",
        trigger: "change",
      },
    },
    {
      prop: "delivery",
      tag: "switch",
      label: "开关",
      disabled: false,
    },
    {
      prop: "type",
      tag: "checkbox",
      label: "爱好",
      options: [
        {
          value: 1,
          label: "冰淇淋",
          disabled: false,
        },
        {
          value: 2,
          label: "小龙虾",
          disabled: true,
        },
      ],
      rules: {
        required: true,
        message: "Please select Activity date",
        trigger: "change",
      },
    },
    {
      prop: "resource",
      tag: "radio",
      label: "性别",
      options: [
        {
          value: 1,
          label: "冰淇淋",
          disabled: false,
        },
        {
          value: 2,
          label: "小龙虾",
          disabled: false,
        },
      ],
    },
    {
      prop: "desc",
      tag: "input",
      label: "文本框",
      type: "textarea",
    },
    // {
    //   prop: "slotInput",
    //   // 对于自定义的组件，tag为非必须字段
    //   tag: "slot",
    //   label: "自定义表单项",
    //   // 此slotName必须与slot中的slotName一致，为必填项
    //   slotName: "formItemInput",
    //   rules: {
    //     required: true,
    //     message: "这是自定义的输入框",
    //     trigger: "change",
    //   },
    // },
    {
      prop: "dateTimeRange",
      tag: "dateRange",
      label: "日期时间区间",
      type: "datetimerange",
      startPlaceholder: "开始日期",
      endPlaceholder: "结束日期",
    },
    {
      prop: "dateRange",
      tag: "dateRange",
      label: "日期区间",
      type: "daterange",
      startPlaceholder: "开始日期",
      endPlaceholder: "结束日期",
    },
    {
      prop: "slotUpload",
      // 对于自定义的组件，tag为非必须字段
      tag: "slot",
      label: "自定义表单项",
      // 此slotName必须与slot中的slotName一致，为必填项
      slotName: "formItemUpload",
    },
  ],
};
