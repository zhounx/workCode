<template>
  <YkMultiCascader
    v-bind="cascaderProps"
    v-model="cascaderValue"
    @first-change="onFirstChange"
    @second-change="onSecondChange"
    @third-change="onThirdChange"
  ></YkMultiCascader>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import YkMultiCascader from "../components/YkMultiCascader.vue";

interface ICascaderProps {
  [key: string]: any;
}
interface ICascaderValue {
  id: number | string;
  name: string;
}

const cascaderProps: ICascaderProps = reactive({
  // 级联数据源
  data: [
    {
      id: "140000",
      name: "山西省",
      cityList: [
        {
          id: "140100",
          name: "太原市",
          districtList: [
            {
              id: "140105",
              name: "小店区",
            },
          ],
        },
      ],
    },
  ],
  // 数据源字段名称自定义配置，默认为：secondLevelFieldName："cityList", thirdLevelFieldName："districtList", codeFieldName："id", labelFieldName："name"
  cascaderConfig: {
    secondLevelFieldName: "",
    thirdLevelFieldName: "",
    codeFieldName: "",
    labelFieldName: "",
    level: 3,
    size: "default",
    isRemote: false,
    disabled: false,
  },
  // 如果各级联数据源为动态请求时需要配置此三个字段
  firstData: [{ id: "140000", name: "山西省" }],
  secondData: [],
  thirdData: [],
});

// 选择后的绑定值
const cascaderValue = reactive([]);

/**
 * 第一级联变化时触发
 */
const onFirstChange = (value: ICascaderValue) => {
  console.log("first change", cascaderProps.secondData);
  cascaderProps.secondData[0] = {
    id: "140100",
    name: "太原市",
  };
};

/**
 * 第一级联变化时触发
 */
const onSecondChange = (value: ICascaderValue) => {
  console.log("second change", value);
  cascaderProps.thirdData[0] = {
    id: "140105",
    name: "小店区",
  };
};

/**
 * 第三级联变化时触发
 */
const onThirdChange = (value: ICascaderValue) => {
  console.log("third change", value);
};
</script>
<style lang="scss" scoped>
</style>