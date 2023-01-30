const md = `

### YkSteps步骤条组件
常用的步骤条组件。

### 基础用法
\`\`\`vue
<YkStep v-bind="stepProps">
    // 步骤条内容
    <el-button style="margin-top: 12px" @click="next">Next step</el-button>
    // 自定义标题
    <template #slotTitle>
      <div>自定义标题</div>
    </template>
    // 自定义描述
    <template #slotDescription>
      <div>自定义描述</div>
    </template>
    // 自定义图标
    <template #slotIcon>
      <div>自定义图标</div>
    </template>
</YkStep>
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
