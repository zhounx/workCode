<template>
  <el-form
    ref="ykFormRef"
    class="yk-form"
    :model="formName"
    :label-width="formProps.labelWidth || '110px'"
    :inline="formProps.inline || false"
    :label-position="formProps.labelPosition || 'right'"
    :size="formProps.size || 'default'"
    :disabled="formProps.disabled || false"
  >
    <!-- 完全自定义formItem占位 -->
    <slot name="customForm">
      <el-form-item
        v-for="(item, index) in formItem"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :rules="item.rules"
        v-show="item.isShow === true || item.isShow === undefined"
      >
        <!-- 自定义某个表单项 -->
        <slot :name="item.slotName"></slot>
        <!-- 输入框 -->
        <el-input
          v-if="item.tag === 'input'"
          v-model="formName[item.prop]"
          :type="item.type"
          :disabled="item.disabled"
          :input-style="item.inputStyle"
          :placeholder="item.placeholder || '请输入'"
          :suffix-icon="item.suffixIcon"
          :prefix-icon="item.prefixIcon"
          :show-password="item.showPassword"
          :clearable="item.clearable"
          :formatter="item.formatter"
          :parser="item.parser"
          :maxlength="item.maxlength"
          @blur="item.blur"
          @focus="item.focus"
          @change="item.change"
          @input="item.input"
          @clear="item.clear"
        >
          <!-- 复合型输入框前置元素 -->
          <template #prepend v-if="$slots[item.slotInpPrepend || '']">
            <slot :name="item.slotInpPrepend"></slot>
          </template>
          <!-- 复合型输入框后置元素 -->
          <template #append v-if="$slots[item.slotInpAppend || '']">
            <slot :name="item.slotInpAppend"></slot>
          </template>
        </el-input>

        <!-- 下拉框 -->
        <el-select
          v-if="item.tag === 'select'"
          v-model="formName[item.prop]"
          :disabled="item.disabled"
          :multiple="item.multiple"
          :collapse-tags="item.collapseTags"
          :filterable="item.filterable"
          :clearable="item.clearable"
          collapse-tags-tooltip
          @change="item.change"
        >
          <el-option
            v-for="subItem in item.options"
            :key="subItem.value"
            :label="subItem[item.labelName || 'label']"
            :value="subItem[item.valueName || 'value']"
            :disabled="subItem.disabled"
          />
        </el-select>
        <!-- 日期 -->
        <el-date-picker
          v-if="item.tag === 'date'"
          v-model="formName[item.prop]"
          :type="item.type"
          :disabled="item.disabled"
          :start-placeholder="item.startPlaceholder || '开始日期'"
          :end-placeholder="item.endPlaceholder || '结束日期'"
          :range-separator="item.rangeSeparator || '至'"
          :placeholder="item.placeholder || '请选择日期'"
          clearable
        />
        <!-- 日期区间 -->
        <el-date-picker
          v-if="item.tag === 'dateRange'"
          v-model="formName[item.prop]"
          :type="item.type"
          :disabled="item.disabled"
          :range-separator="item.rangeSeparator || '至'"
          :start-placeholder="item.startPlaceholder || '开始日期'"
          :end-placeholder="item.endPlaceholder || '结束日期'"
          :placeholder="item.placeholder || '请选择日期'"
          clearable
        />
        <!-- switch开关 -->
        <el-switch
          v-if="item.tag === 'switch'"
          v-model="formName[item.prop]"
          :disabled="item.disabled"
        />
        <!-- 复选框 -->
        <el-checkbox-group
          v-if="item.tag === 'checkbox'"
          v-model="formName[item.prop]"
          :disabled="item.disabled"
        >
          <el-checkbox
            v-for="subItem in item.options"
            :key="subItem.value"
            :label="subItem.value"
            :disabled="subItem.disabled"
          >
            {{ subItem.label }}
          </el-checkbox>
        </el-checkbox-group>
        <!-- 单选框 -->
        <el-radio-group
          v-if="item.tag === 'radio'"
          v-model="formName[item.prop]"
          :disabled="item.disabled"
        >
          <el-radio
            v-for="subItem in item.options"
            :key="subItem.value"
            :label="subItem.value"
            :disabled="subItem.disabled"
            >{{ subItem.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <!-- 表单内操作按钮 -->
      <el-form-item>
        <slot name="operationIn"></slot>
      </el-form-item>
    </slot>
  </el-form>
  <!-- 表单外操作按钮 -->
  <slot name="operationOut"></slot>
</template>
<script lang="ts" setup>
import { ref, PropType, Component } from "vue";
import type { FormInstance, FormItemRule } from "element-plus";

interface FormItem {
  label: string;
  prop: string;
  tag?: string;
  type?: string;
  slotName?: string;
  rules?: FormItemRule | FormItemRule[];
  disabled?: boolean;
  multiple?: boolean;
  collapseTags?: boolean;
  filterable?: boolean;
  options?: any[];
  labelName?: string;
  valueName?: string;
  inputStyle?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  rangeSeparator?: string;
  // input框特有属性
  placeholder?: string;
  suffixIcon?: string | Component;
  prefixIcon?: string | Component;
  showPassword?: boolean;
  clearable?: boolean;
  slotInpPrepend?: string;
  slotInpAppend?: string;
  maxlength?: number;
  isShow?: boolean;
  formatter?: (value: string | number) => string;
  parser?: (value: string) => string;
  blur?: (event: Event) => void;
  focus?: (event: Event) => void;
  change?: (value: string | number) => void;
  input?: (value: string | number) => void;
  clear?: () => void;
}

const ykFormRef = ref<FormInstance>();
// props属性
defineProps({
  formProps: {
    type: Object,
    default: () => ({
      labelWidth: "100px",
      inline: false,
      labelPosition: "right",
      size: "small",
      disabled: false,
    }),
  },
  formName: {
    type: Object,
    default: () => ({}),
  },
  ykFormRef: {
    type: Object,
    default: () => ref<FormInstance>(),
  },
  formItem: {
    type: Array as PropType<FormItem[]>,
    default: () => [],
  },
});
defineExpose({
  ykFormRef,
});
</script>
<style lang="scss">
.yk-form {
  .el-textarea__inner {
    width: 214px;
  }
  .el-input--default {
    width: 214px;
  }
  .el-form-item__content {
    flex: 0 0 auto;
  }
  .el-form-item,
  .el-form-item--default {
    margin-bottom: 26px;
  }
}
</style>