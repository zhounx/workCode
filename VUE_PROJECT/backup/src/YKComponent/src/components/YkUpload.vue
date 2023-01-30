<template>
  <el-upload
    ref="ykUploadRef"
    :class="{ 'yk-upload': disabled }"
    :name="name"
    :action="action"
    :method="method"
    :headers="headers"
    v-model:file-list="fileList"
    :limit="3"
    :auto-upload="autoUpload"
    :list-type="listType"
    :show-file-list="showFileList"
    :with-credentials="withCredentials"
    :multiple="multiple"
    :drag="drag"
    :accept="accept"
    :disabled="disabled"
    :on-preview="onPreview"
    :on-remove="onRemove"
    :before-remove="beforeRemove"
    :before-upload="beforeUpload"
    :on-exceed="onExceed"
    :on-change="onChange"
    :on-error="onError"
    :http-request="httpRequest"
  >
    <template #default>
      <el-icon v-if="!$slots.default && listType === 'picture-card'">
        <Plus />
      </el-icon>
      <slot name="default">
        <el-button
          v-if="listType !== 'picture-card'"
          type="primary"
          :disabled="disabled"
        >
          点击上传<el-icon class="el-icon--right"><Upload /></el-icon>
        </el-button>
      </slot>
    </template>
    <template #tip>
      <!-- 上传提示 -->
      <slot name="tip"></slot>
    </template>
  </el-upload>
</template>
<script setup lang="ts">
import { PropType, ref } from "vue";
import { Plus, Upload } from "@element-plus/icons-vue";
import type {
  UploadProps,
  UploadInstance,
  UploadUserFile,
  UploadFile,
  UploadFiles,
  UploadRawFile,
  UploadRequestOptions,
} from "element-plus";

const ykUploadRef = ref<UploadInstance>();
defineProps({
  name: {
    type: String,
    default: "file",
  },
  action: {
    type: String,
    default: "",
  },
  method: {
    type: String,
    default: "post",
  },
  headers: {
    type: Object as PropType<Headers | Record<string, any>>,
    default: () => ({}),
  },
  listType: {
    type: String,
    default: "text",
  },
  showFileList: {
    type: Boolean,
    default: true,
  },
  withCredentials: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  drag: {
    type: Boolean,
    default: false,
  },
  fileList: {
    type: Array as PropType<UploadUserFile[]>,
    default: () => [],
  },
  accept: {
    type: String,
    default: "",
  },
  limit: {
    type: Number,
    default: 10,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  onPreview: {
    type: Function as PropType<UploadProps["onPreview"]>,
    default: (uploadFile: UploadFile): void => {},
  },
  onRemove: {
    type: Function as PropType<UploadProps["onRemove"]>,
    default: (uploadFile: UploadFile, uploadFiles: UploadFiles): void => {},
  },
  onExceed: {
    type: Function as PropType<UploadProps["onExceed"]>,
    default: (files: File[], uploadFiles: UploadFiles): void => {},
  },
  beforeRemove: {
    type: Function as PropType<UploadProps["beforeRemove"]>,
    default: (uploadFile: UploadFile, uploadFiles: UploadFiles): any => {},
  },
  beforeUpload: {
    type: Function as PropType<UploadProps["beforeUpload"]>,
    default: (
      rawFile: UploadRawFile
    ): void | undefined | null | boolean | File | Blob => {},
  },
  onChange: {
    type: Function as PropType<UploadProps["onChange"]>,
    default: (uploadFile: UploadFile, uploadFiles: UploadFiles): void => {},
  },
  onError: {
    type: Function as PropType<UploadProps["onError"]>,
    default: (
      error: Error,
      uploadFile: UploadFile,
      uploadFiles: UploadFiles
    ): void => {},
  },
  httpRequest: {
    type: Function as PropType<UploadProps["httpRequest"]>,
    default: (options: UploadRequestOptions) => {},
  },
});
defineExpose({
  ykUploadRef,
});
</script>
<style lang="scss">
.yk-upload {
  .el-upload {
    cursor: no-drop !important;
  }
}
</style>