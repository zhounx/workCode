<script setup lang="ts">
import { ACCOUNT_APPLICATION_FORM } from "@/config/file";
</script>
<template>
  <div class="main">
    <div class="download">
      <img src="@/assets/images/icon/download.png" alt="下载文件" />
      <a
        :href="ACCOUNT_APPLICATION_FORM"
        class="link"
        target="_blank"
        download="下载开户申请表模板.docx"
        >下载开户申请表模板</a
      >
    </div>
    <p class="text">
      注意：请下载开户申请表，打印后填写相关内容、并盖上公章后拍照上传
    </p>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/css/normal.scss";

.main {
  @include flex(column, start, start);

  .link {
    width: 123px;
    height: 15px;
    font-size: 14px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #195eff;
    line-height: 20px;

    a {
      margin-left: 2px;
    }
  }

  .text {
    margin-top: 15px;
    font-size: 13px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #a3aeb4;
    line-height: 20px;
  }
}
</style>
