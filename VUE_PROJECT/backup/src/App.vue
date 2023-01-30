<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
@import "./assets/css/common.scss";
:root {
  --main-color: #195EFF;
  --min-width: 1200px;
  --el-color-primary: #195EFF!important;
  --el-border-radius-base:8px!important;
}
.el-button.is-plain:hover{
  background: rgba(#195EFF,0.3);
  border: 1px solid rgba(#195EFF,0.3);
  color:var(--el-color-primary);
}
* {
  --el-menu-hover-bg-color:#27354C;
}
</style>