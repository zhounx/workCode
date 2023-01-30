const md = `

### YkDialog弹窗组件
常用的弹窗组件。

### 基础用法
\`\`\`vue
<YkDialog
  v-bind="dialogProps"
  @open="handleOpen"
  @opened="handleOpened"
  @close="handleClose"
  @closed="handleClosed"
  @open-auto-focus="handleOpenAutoFocus"
  @close-auto-focus="handleCloseAutoFocus"
>
    // 自定义弹窗标题
    <template #header>
      <span>标题</span>
    </template>
    // 弹窗内容
    <span>这是消息内容</span>
    // 自定义弹窗底部按钮
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogProps.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogProps.dialogVisible = false"
          >确认</el-button
        >
      </span>
    </template>
</YkDialog>
\`\`\`
### Attributes属性（参考ElementUI）
|  参数 | 说明  | 类型  | 可选值  |  默认值 |
| :------------ | :------------ | :------------ | :------------ | :------------ |
| dialogVisible | 展示/隐藏 | boolean | - | true |
| draggable | 是否可拖拽 | boolean | - |  false |
| top | 距离顶部距离 | string | - |  15vh |
| modal | - | boolean | - |  false |
| appendToBody | - | boolean | - |  false |
| lockScroll | - | boolean | - |  false |
| openDelay | - | number | - |  0 |
| customClass | 自定义类名 | string | - | '' |
| closeDelay | - | number | - |  0 |
| closeOnClickModal | - | boolean | - |  false |
| closeOnPressEscape | - | boolean | - |  false |
| showClose | - | boolean | - |  true |
| center | - | boolean | - | false |
| destroyOnClose | - | boolean | - |  false |
| handleBeforeClose | 关闭之前回调 | Function | - | - |
### 事件（参考ElementUI）
\`\`\`vue
const emit = defineEmits([
  "open",
  "opened",
  "close",
  "closed",
  "open-auto-focus",
  "close-auto-focus",
]);
\`\`\`
`
export default md