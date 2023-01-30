<template>
  <el-dialog
    v-model="dialogVisible"
    title="标题"
    width="800px"
    :draggable="draggable"
    :fullscreen="false"
    :top="top"
    :modal="modal"
    :append-to-body="appendToBody"
    :lock-scroll="lockScroll"
    :open-delay="openDelay"
    :custom-class="customClass"
    :close-delay="closeDelay"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    :center="center"
    :destroy-on-close="destroyOnClose"
    :before-close="handleBeforeClose"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleClose"
    @closed="handleClosed"
    @open-auto-focus="handleOpenAutoFocus"
    @close-auto-focus="handleCloseAutoFocus"
  >
    <!-- 头部栏 -->
    <template #header>
      <slot name="header"></slot>
    </template>
    <!-- 弹窗内容 -->
    <slot></slot>
    <!-- 底部栏 -->
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { getCurrentInstance } from "vue";

const instance = getCurrentInstance();

defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  handleBeforeClose: {
    type: Function,
    default: (done: () => void) => {},
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  top: {
    type: String,
    default: "15vh",
  },
  modal: {
    type: Boolean,
    default: true,
  },
  appendToBody: {
    type: Boolean,
    default: false,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  openDelay: {
    type: Number,
    default: 0,
  },
  customClass: {
    type: String,
    default: "",
  },
  closeDelay: {
    type: Number,
    default: 0,
  },
  closeOnClickModal: {
    type: Boolean,
    default: false,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  center: {
    type: Boolean,
    default: false,
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "open",
  "opened",
  "close",
  "closed",
  "open-auto-focus",
  "close-auto-focus",
]);

/**
 * 关闭前的回调，会暂停 Dialog 的关闭
 */
const handleOpen = () => {
  instance.appContext.app.config.globalProperties.$message({
    message: "this is a message.",
    grouping: true,
    type: "success",
  });
  emit("open");
};

/**
 * Dialog 打开动画结束时的回调
 */
const handleOpened = () => {
  emit("opened");
};

/**
 * Dialog 关闭的回调
 */
const handleClose = () => {
  emit("close");
};

/**
 * Dialog 关闭动画结束时的回调
 */
const handleClosed = () => {
  emit("closed");
};

/**
 * 输入焦点聚焦在 Dialog 内容时的回调
 */
const handleOpenAutoFocus = () => {
  emit("open-auto-focus");
};

/**
 * 输入焦点从 Dialog 内容失焦时的回调
 */
const handleCloseAutoFocus = () => {
  emit("close-auto-focus");
};
</script>
<style lang="scss" scoped></style>
