<template>
  <YkUpload v-bind="ykUploadProps" ref="ykUploadRef">
    <template #default>
      <el-button type="primary">自定义上传内容</el-button>
    </template>
  </YkUpload>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import type {
  UploadProps,
  UploadUserFile,
  UploadRequestOptions,
} from "element-plus";
import YkUpload from "../components/YkUpload.vue";

// upload 组件实例
const ykUploadRef = ref();

const fileList = ref<UploadUserFile[]>([
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "food2.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
]);

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  const uploadRef = ykUploadRef.value.ykUploadRef;
  // uploadRef.submit();
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  console.log(files, uploadFiles);
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
  return true;
};

const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  console.log(rawFile);
};

const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  const uploadRef = ykUploadRef.value.ykUploadRef;
  // uploadRef.submit();
  console.log(uploadFile, uploadFiles);
};

const handleError: UploadProps["onError"] = (error, uploadFiles) => {
  console.log(error, uploadFiles);
};

const httpRequest: UploadProps["httpRequest"] = (
  options: UploadRequestOptions
) => {
  const request = new XMLHttpRequest();
  return request;
};
const ykUploadProps = reactive({
  name: "",
  action: "",
  method: "post",
  headers: {},
  data: {},
  listType: "text",
  showFileList: true,
  withCredentials: false,
  multiple: false,
  autoUpload: false,
  drag: false,
  disabled: false,
  fileList: fileList,
  accept: "image/*",
  limit: 1,
  tipStyle: {},
  onPreview: handlePreview,
  onRemove: handleRemove,
  onExceed: handleExceed,
  beforeRemove: beforeRemove,
  beforeUpload: beforeUpload,
  onChange: handleChange,
  onError: handleError,
  httpRequest: httpRequest,
});
</script>