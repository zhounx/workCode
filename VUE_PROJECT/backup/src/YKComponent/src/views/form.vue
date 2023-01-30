<template>
  <YkForm v-bind="ykFormProps" ref="ykFormRef">
    <!-- 自定义整个form表单项，如果配置此customForm，那么所有的下面自定义表单项将会失效，完全以此模板内内容为准 -->
    <template #customForm v-if="false">
      <el-form-item label="姓名" prop="name" :rules="customRules.rules">
        <el-input v-model="ykFormProps.formName.name" />
      </el-form-item>
    </template>
    <!-- 自定义form表单某一项，如：输入框 -->
    <template #formItemInput>
      <el-input
        v-model="ykFormProps.formName.slotInput"
        placeholder="这是自定义的输入框"
      />
    </template>
    <!-- 上传组件 -->
    <template #formItemUpload>
      <YkUpload />
    </template>
    <!-- 复合型输入框自定义元素 -->
    <!-- <template #slotInpPrepend>Http://</template> -->
    <template #slotInpAppend>.comww</template>
    <!-- Form表单内操作 -->
    <template #operationIn>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="resetForm">Reset</el-button>
      <el-button>Cancel</el-button>
    </template>
    <!-- Form表单外操作 -->
    <template #operationOut>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="resetForm">Reset</el-button>
      <el-button>Cancel</el-button>
    </template>
  </YkForm>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import YkForm from "../components/YkForm.vue";
import YkMultiCascader from "../components/YkMultiCascader.vue";
import YkUpload from "../components/YkUpload.vue";
/**
 * 通用表单使用示例
 */
// YkForm 组件实例
const ykFormRef = ref();
// YkForm 组件的 props 参数
const ykFormProps = reactive({
  // form 组件的属性(都为非必传)
  formProps: {
    labelWidth: "120px",
    inline: false,
    labelPosition: "right",
    size: "default",
    disabled: false,
  },
  // form 组件绑定name值
  formName: {
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
  },
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
      formatter: (value: string | number) =>
        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      parser: (value: string) => value.replace(/\$\s?|(,*)/g, ""),
      change: (value: string | number) => {
        console.log(value);
      },
      input: (value: string | number) => {
        console.log(value);
      },
      rules: {
        required: true,
        trigger: "blur",
        validator: (rule: any, value: number) => {
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
      change: (value: string | number) => {
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
    {
      prop: "slotInput",
      // 对于自定义的组件，tag为非必须字段
      tag: "slot",
      label: "自定义表单项",
      // 此slotName必须与slot中的slotName一致，为必填项
      slotName: "formItemInput",
      rules: {
        required: true,
        message: "这是自定义的输入框",
        trigger: "change",
      },
    },
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
});

/**
 * 当完全自定义整个表单时的验证规则
 */
const customRules = reactive({
  rules: {
    required: true,
    message: "请输入",
    trigger: "blur",
  },
});

/**
 * 提交表单
 */
const onSubmit = async () => {
  const formEl = ykFormRef.value.ykFormRef;
  const { slotInput } = ykFormProps.formName;
  console.log("submit!", slotInput);
  if (!formEl) return;
  await formEl.validate((valid: Boolean, fields: Object) => {
    if (valid) {
      // console.log("submit!");
    } else {
      // console.log("error submit!", fields);
    }
  });
};

/**
 * 重置表单
 */
const resetForm = () => {
  const formEl = ykFormRef.value.ykFormRef;
  if (!formEl) return;
  formEl.resetFields();
  // formEl.clearValidate();
};
</script>