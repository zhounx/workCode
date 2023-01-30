<template>
  <div class="main">
    <el-upload
      class="avatar-uploader"
      ref="upload"
      :accept="accept"
      :limit="limit"
      :action="baseURL[mode] + action"
      :show-file-list="showFileList"
      :list-type="listType"
      :file-list="previews"
      :headers="{ Authorization: 'Bearer ' + user.token }"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-exceed="onExceed"
      :on-remove="onRemove"
      :on-preview="handlePictureCardPreview"
    >
      <div v-loading="loading" element-loading-text="图片上传中">
        <div v-if="prop" class="avatar">
          <img :src="preview" alt="" />
          <p>重新上传</p>
        </div>
        <div class="upload-logo" v-else>
          <img
            src="../assets/images/upload.png"
            width="46"
            height="46"
            alt=""
          />
          <span>{{ placeholder || "上传照片" }}</span>
        </div>
      </div>
    </el-upload>
    <div class="tip">
      <p>{{ props.tip }}</p>
    </div>
    <el-dialog v-model="dialogVisible" class="dialog">
      <div class="dialog-images">
        <img w-full :src="dialogImageUrl" alt="Preview Image" class="img" />
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import baseURL from "@/service/env";
import { request } from "@/service/http";
import { useStore } from "@/store/user";
import { ElMessage } from "element-plus";
import { ref, onMounted } from "vue";
import type { UploadProps, UploadUserFile } from "element-plus";
import { pressImg } from "@/utils/images";

const loading = ref(false);

const mode = import.meta.env.MODE;
const user = useStore();
const props = defineProps({
  //接口地址
  action: {
    type: String,
    default: "/abroad-merchant/front/file/upload",
  },
  limit: {
    type: Number,
    default: 100,
  },
  accept: {
    type: String,
    default: "image/*",
  },
  //上传图片地址
  prop: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  showFileList: {
    type: Boolean,
    default: false,
  },
  listType: {
    type: String,
    default: "picture",
  },
  fileList: {
    type: Array,
    default: () => [],
  },
  ocrType: {
    type: String,
    default: "", //7：ocr身份证国徽面，8：ocr身份证肖像面，9：ocr银行卡正面图片，10：ocr营业执照
  },
  valueName: {
    type: String,
    default: "",
  },
  //底部文字提示
  tip: {
    type: String,
    default: "",
  },
  files: {
    type: Array,
    default: [],
  },
  show: {
    type: String,
  },
});
const picUrl = ref();
const upload = ref();
const result = ref();

function beforeUpload(file) {
  if (!file.type.includes("image")) {
    ElMessage.error("只允许上传图片格式文件");
    return false;
  } else if (file.size / 1024 / 1024 > 30) {
    ElMessage.error("最大只能上传30MB的图片!");
    return false;
  }

  pressImg({
    file: file,
    quality: 0,
    succ: function (resultFile) {
      //如果不是null就是压缩成功
      if (resultFile) {
        loading.value = true;
        return new Promise((resolve, reject) => {
          resolve(resultFile);
        });
      } else {
        return false;
      }
    },
  });
}

const emits = defineEmits(["on-success", "on-remove", "submit"]);

const preview = ref("");
const previews = ref<any[]>([]);
const onSuccess = async (res: any, file: any, files: any) => {
  loading.value = false;
  if (res.code === 200) {
    picUrl.value = res.data;
    preview.value = file.url;
    previews.value = [];
    const fs = new FileReader();

    files.forEach((e: any) => {
      previews.value.push({
        url: e.url,
      });
    });

    if (props.ocrType) {
      OCRSubmit();
    }

    fs.readAsDataURL(file.raw);
    fs.onload = (e: any) => {
      let base64 = e.target.result;
      emits("on-success", { ...res, name: file.name, showUrl: base64 });
    };
  } else {
    ElMessage.error("图片上传失败，请稍后重试");
    upload.value.handleRemove();
  }
};

const OCRSubmit = async () => {
  let ocrRes: any = await request(
    "GET",
    "/abroad-merchant/front/baseweb/thirdpart/ocr/check",
    { picType: props.ocrType, picUr: picUrl.value }
  );
  if (ocrRes?.code === 200) {
    result.value = true;
  } else {
    result.value = false;
  }

  setTimeout(function () {
    // 判断是否识别成功
    if (result.value == false) {
      ElMessage({
        type: "warning",
        message: "OCR识别失败，请检查照片上传是否正确且清晰！",
      });
      emits("submit", {
        valueName: props.valueName,
        path: picUrl.value,
        success: false,
      });
    } else {
      const data = Object.assign({}, ocrRes.data, {
        valueName: props.valueName,
        path: picUrl.value,
        success: true,
      });
      ElMessage({
        type: "success",
        message: "OCR识别成功，请核对信息是否正确，若有误可自行修改！",
      });
      emits("submit", data);
    }
  }, 1000);
};

const onRemove: UploadProps["onRemove"] = (
  uploadFile: any,
  uploadFiles: any
) => {
  emits("on-remove", uploadFiles);
};
const onExceed = (files: any, uploadFiles: any) => {
  ElMessage.error(`最多只允许上次${props.limit}张图片`);
};
function getFileList(fileList: Array<any>) {
  if (!fileList?.length) return;
  let list = [];
  for (let item of fileList) {
    if (item?.fileAddress) {
      list.push({
        name: item?.fileName,
        url: item?.fileAddress,
        ...item,
      });
    } else {
      list.push(item);
    }
  }
  return list;
}
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
function handlePictureCardPreview(uploadFile: any) {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
}

onMounted(() => {
  preview.value = props.show ? props.show : props.prop;

  previews.value = props.files.map((e: any) => {
    return {
      url: e.fileAddressShow,
    };
  });
});
</script>
<style scoped lang="scss">
.main {
  .tip {
    display: flex;
    flex-direction: row;
    justify-content: center;
    p {
      color: rgb(199, 199, 199);
    }
  }

  .dialog-images {
    width: 100%;
    height: 100%;
    .img {
      width: 90%;
      height: 90%;
    }
  }
}
.avatar-uploader {
  line-height: normal;

  &::v-deep(.el-upload) {
    width: 160px;
    height: 90px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    background: #f5f9fb;
    border: 1px solid #195eff;
    border-radius: 10px;

    &:hover {
      border-color: var(--el-color-primary);
    }

    .avatar {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;

      img {
        width: 100%;
        height: 90px;
        display: block;
      }

      p {
        position: absolute;
        z-index: 2;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 30px;
        line-height: 30px;
        background-color: rgba(8, 32, 44, 0.6);
        color: #ffffff;
        border-radius: 0px 0px 10px 10px;
        font-size: 12px;
      }
    }

    .upload-logo {
      padding-top: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      span {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #195eff;
      }
    }
  }

  &::v-deep(.el-upload-list--picture-card) {
    .el-upload-list__item {
      width: 160px;
      height: 90px;
      margin: 0 8px 0px 0;
    }
  }
}
</style>
