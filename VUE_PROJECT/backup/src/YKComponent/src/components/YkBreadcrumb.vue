<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="item in data" :key="item.path" :to="item.path">
      <slot :name="item.slot">{{ item.name }}</slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { PropType } from "vue";
interface BreadcrumbItem {
  name: string;
  path?: string;
  replace?: boolean;
  slot?: string;
}
defineProps({
  data: {
    type: Array as PropType<BreadcrumbItem[]>,
    default: () => [],
  },
});
</script>
<style lang="scss" scoped>
</style>