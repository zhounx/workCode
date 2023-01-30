<template>
  <div>
    <el-select
      v-model="cascaderValue[0]"
      :size="cascaderConfig.size"
      :disabled="cascaderConfig.disabled"
      placeholder="请选择"
      clearable
      @change="onFirstChange"
    >
      <el-option
        v-for="item in list.firstList"
        :key="item.id"
        :label="item.name"
        :value="item"
      />
    </el-select>
    <el-select
      v-if="(cascaderConfig.level || 3) > 1"
      class="ml_10"
      v-model="cascaderValue[1]"
      :size="cascaderConfig.size"
      :disabled="cascaderConfig.disabled"
      placeholder="请选择"
      clearable
      @change="onSecondChange"
    >
      <el-option
        v-for="item in list.secondList"
        :key="item.id"
        :label="item.name"
        :value="item"
      />
    </el-select>
    <el-select
      v-if="(cascaderConfig.level || 3) > 2"
      class="ml_10"
      v-model="cascaderValue[2]"
      :size="cascaderConfig.size"
      :disabled="cascaderConfig.disabled"
      placeholder="请选择"
      clearable
      @change="onThirdChange"
    >
      <el-option
        v-for="item in list.thirdList"
        :key="item.id"
        :label="item.name"
        :value="item"
      />
    </el-select>
  </div>
</template>
<script setup lang="ts">
import { reactive, watch, PropType } from "vue";

interface ICascaderValue {
  [key: string]: any;
}
interface ICascaderConfig {
  secondLevelFieldName?: string;
  thirdLevelFieldName?: string;
  codeFieldName?: string;
  labelFieldName?: string;
  level?: number;
  size?: string;
  isRemote?: boolean;
  disabled?: boolean;
}

interface IList {
  firstList: ICascaderValue[];
  secondList: ICascaderValue[];
  thirdList: ICascaderValue[];
}

const cascaderProps = defineProps({
  modelValue: {
    type: Array as PropType<ICascaderValue[]>,
    default: [],
  },
  data: {
    type: Array as PropType<ICascaderValue[]>,
    default: [],
  },
  cascaderConfig: {
    type: Object as PropType<ICascaderConfig>,
    default: {
      secondLevelFieldName: "cityList",
      thirdLevelFieldName: "districtList",
      codeFieldName: "id",
      labelFieldName: "name",
      level: 3,
      size: "default",
      isRemote: false,
      disabled: false,
    },
  },
  firstData: {
    type: Array as PropType<ICascaderValue[]>,
    default: [],
  },
  secondData: {
    type: Array as PropType<ICascaderValue[]>,
    default: [],
  },
  thirdData: {
    type: Array as PropType<ICascaderValue[]>,
    default: [],
  },
});

const emit = defineEmits([
  "update:modelValue",
  "firstChange",
  "secondChange",
  "thirdChange",
]);

const cascaderValue = reactive([] as (ICascaderValue | string)[]);

const list: IList = reactive({
  firstList: [],
  secondList: [],
  thirdList: [],
});

/**
 * 初始化级联数据（非动态请求后两级数据情况）
 */
watch(
  () => cascaderProps.data,
  (val) => {
    list.firstList = val;
  },
  { immediate: true }
);

/**
 * 初始化第一级数据（动态请求远程数据模式）
 */
watch(
  cascaderProps.firstData,
  (val) => {
    if (cascaderProps.cascaderConfig.isRemote) {
      list.firstList = val;
    }
  },
  { immediate: true }
);

/**
 * 初始化第二级数据（动态请求远程数据模式）
 */
watch(
  cascaderProps.secondData,
  (val) => {
    if (cascaderProps.cascaderConfig.isRemote) {
      list.secondList = val;
    }
  },
  { immediate: true }
);

/**
 * 初始化第三级数据（动态请求远程数据模式）
 */
watch(
  cascaderProps.thirdData,
  (val) => {
    if (cascaderProps.cascaderConfig.isRemote) {
      list.thirdList = val;
    }
  },
  { immediate: true }
);

// code字段名称
const codeFieldName = cascaderProps.cascaderConfig?.codeFieldName || "id";
// label字段名称
const labelFieldName = cascaderProps.cascaderConfig?.labelFieldName || "name";
// 第二级label字段名称
const secondLevelFieldName =
  cascaderProps.cascaderConfig?.secondLevelFieldName || "cityList";
// 第三级label字段名称
const thirdLevelFieldName =
  cascaderProps.cascaderConfig?.thirdLevelFieldName || "districtList";

/**
 * 第一级 change
 */
const onFirstChange = (value: ICascaderValue) => {
  // 清除后两项数据
  cascaderValue[1] = cascaderValue[2] = "";
  if (!value) {
    return;
  }
  // 设置第一项选中数据
  cascaderValue[0] = {
    code: value[codeFieldName],
    name: value[labelFieldName],
  };
  emit("update:modelValue", cascaderValue);
  emit("firstChange", cascaderValue);
  if (cascaderProps.cascaderConfig?.level === 1) {
    return;
  }
  // 请求第二项数据
  list.secondList =
    cascaderProps.data.find(
      (item) => item[codeFieldName] === value[codeFieldName]
    )?.[secondLevelFieldName] || [];
  list.thirdList = [];
};

/**
 * 第二级 change
 */
const onSecondChange = (value: ICascaderValue) => {
  // 清除第三项数据
  cascaderValue[2] = "";
  if (!value) {
    return;
  }
  // 设置第二项选中数据
  cascaderValue[1] = {
    code: value[codeFieldName],
    name: value[labelFieldName],
  };
  emit("update:modelValue", cascaderValue);
  emit("secondChange", cascaderValue);
  if (cascaderProps.cascaderConfig?.level === 2) {
    return;
  }
  // 请求第三项数据
  list.thirdList =
    list.secondList.find(
      (item) => item[codeFieldName] === value[codeFieldName]
    )?.[thirdLevelFieldName] || [];
};

/**
 * 第三级 change
 */
const onThirdChange = (value: ICascaderValue) => {
  if (!value) {
    return;
  }
  // 设置第三项选中数据
  cascaderValue[2] = {
    code: value[codeFieldName],
    name: value[labelFieldName],
  };
  emit("update:modelValue", cascaderValue);
  emit("thirdChange", cascaderValue);
};
</script>
<style lang="scss" scoped>
.ml_10 {
  margin-left: 10px;
}
</style>