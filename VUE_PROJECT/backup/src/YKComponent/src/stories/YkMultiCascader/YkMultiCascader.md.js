const md = `

### YkMultiCascader多级级联组件
常用的多级级联组件。

### 基础用法
\`\`\`vue
<YkMultiCascader
  v-bind="cascaderProps"
  v-model="cascaderValue"
  @first-change="onFirstChange"
  @second-change="onSecondChange"
  @third-change="onThirdChange"
>
</YkMultiCascader>
\`\`\`
### Attributes属性
|  参数 | 说明  | 类型  | 可选值  |  默认值 |
| :------------ | :------------ | :------------ | :------------ | :------------ |
| data | 级联组件数据源 | [] | - |  如下 |
| cascaderConfig | 级联组件配置 | {} | - |  如下 |
| firstData | 级联第一级数据源（动态请求数据时需要） | [{ id: "140000", name: "山西省" }] | - |  [] |
| secondData | 级联第二级数据源（动态请求数据时需要） | [{ id: "140000", name: "山西省" }] | - |  [] |
| thirdData | 级联第三级数据源（动态请求数据时需要） | [{ id: "140000", name: "山西省" }] | - |  [] |
### data
\`\`\`vue
[
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
]
\`\`\`
### cascaderConfig
\`\`\`vue
{
    // 数据源字段名称自定义配置，默认为：secondLevelFieldName："cityList", thirdLevelFieldName："districtList", codeFieldName："id", labelFieldName："name"
    secondLevelFieldName: "",
    thirdLevelFieldName: "",
    codeFieldName: "",
    labelFieldName: "",
    // 级联级别（1、2、3）
    level: 3,
    // 级联组件尺寸
    size: "default",
    // 是否远程动态请求数据源
    isRemote: false,
    disabled: false,
}
\`\`\`
`
export default md
