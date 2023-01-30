<template>
  <el-button @click="dialogProps.dialogVisible = true">点击打开弹窗</el-button>
  <YkDialog
    v-bind="dialogProps"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleClose"
    @closed="handleClosed"
    @open-auto-focus="handleOpenAutoFocus"
    @close-auto-focus="handleCloseAutoFocus"
  >
    <template #header>
      <span>标题</span>
    </template>
    <span>这是消息内容</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogProps.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogProps.dialogVisible = false"
          >确认</el-button
        >
      </span>
    </template>
  </YkDialog>
</template>
<script setup lang="ts">
import YkDialog from "../components/YkDialog.vue";
import { reactive } from "vue";

// 关闭前的回调，会暂停 Dialog 的关闭
const handleBeforeClose = (done: () => void) => {
  dialogProps.dialogVisible = false;
  done();
};
const dialogProps = reactive({
  dialogVisible: false,
  draggable: false,
  handleBeforeClose: handleBeforeClose,
});

/**
 * 关闭前的回调，会暂停 Dialog 的关闭
 */
const handleOpen = () => {
  console.log("handleOpen");
};

/**
 * Dialog 打开动画结束时的回调
 */
const handleOpened = () => {
  console.log("handleOpened");
};

/**
 * Dialog 关闭的回调
 */
const handleClose = () => {
  console.log("handleClose");
};

/**
 * Dialog 关闭动画结束时的回调
 */
const handleClosed = () => {
  console.log("handleClosed");
};

/**
 * 输入焦点聚焦在 Dialog 内容时的回调
 */
const handleOpenAutoFocus = () => {
  console.log("handleOpenAutoFocus");
};

/**
 * 输入焦点从 Dialog 内容失焦时的回调
 */
const handleCloseAutoFocus = () => {
  console.log("handleCloseAutoFocus");
};
</script>
<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>