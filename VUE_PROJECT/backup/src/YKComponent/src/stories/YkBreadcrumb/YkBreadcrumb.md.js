
const md = `

### YkBreadcrumb面包屑组件
常用的面包屑组件。

### 基础用法
\`\`\`vue
<YkBreadcrumb v-bind="breadcrumbData">
  // 可以自定义面包屑某一项的内容
  <template #item>
    <a href="/">这是slot</a>
  </template>
</YkBreadcrumb>
\`\`\`
### Attributes属性
|  参数 | 说明  | 类型  | 可选值  |  默认值 |
| :------------ | :------------ | :------------ | :------------ | :------------ |
| data | 面包屑组件数据源配置 | [] | - |  如下 |
### data
\`\`\`vue
[
  {
    name: string;
    path?: string;
    replace?: boolean;
    slot?: string;
  }
]
\`\`\`
`
export default md
