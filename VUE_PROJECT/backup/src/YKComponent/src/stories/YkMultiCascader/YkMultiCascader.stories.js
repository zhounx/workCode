import { reactive } from "vue"
import YkMultiCascader from '@/components/YkMultiCascader.vue';
import markdown from './YkMultiCascader.md.js'

export default {
  title: '公共组件/YkMultiCascader',
  component: YkMultiCascader,
  parameters: {
    notes: markdown,
  },
  argTypes: {
  },
};

const Template = (args) => ({
  components: { YkMultiCascader },
  setup() {
    return { args };
  },
  template: `<yk-multiCascader v-bind="args"></yk-multiCascader>`,
});

export const Primary = Template.bind({});

Primary.storyName = '基础用法';
Primary.args = reactive({
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
