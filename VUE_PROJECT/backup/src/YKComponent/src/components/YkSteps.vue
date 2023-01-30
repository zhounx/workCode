<template>
  <el-steps
    :space="space"
    :active="active"
    :finish-status="finishStatus"
    :direction="direction"
    :process-status="processStatus"
    :align-center="alignCenter"
    :simple="simple"
  >
    <el-step
      v-for="item in list"
      :title="item.title"
      :key="item.title"
      :description="item.description"
      :icon="item.icon"
      :status="item.status"
    >
      <template #title>
        <slot :name="item.slotTitle"></slot>
      </template>
      <template #description>
        <slot :name="item.slotDescription"></slot>
      </template>
      <template #icon>
        <slot :name="item.slotIcon"></slot>
      </template>
    </el-step>
  </el-steps>
  <slot></slot>
</template>
<script setup lang="ts">
import { Component, PropType } from "vue";

interface StepItem {
  title: string;
  description?: string;
  icon?: string | Component;
  status?: string;
  slotTitle?: string;
  slotDescription?: string;
  slotIcon?: string;
}

defineProps({
  active: {
    type: Number,
    default: 0,
  },
  list: {
    type: Array as PropType<StepItem[]>,
    default: () => [],
  },
  finishStatus: {
    type: String,
    default: "success",
  },
  space: {
    type: [String, Number],
    default: "",
  },
  direction: {
    type: String,
    default: "horizontal",
  },
  processStatus: {
    type: String,
    default: "process",
  },
  alignCenter: {
    type: Boolean,
    default: false,
  },
  simple: {
    type: Boolean,
    default: false,
  },
});
</script>
<style lang="scss" scoped>
</style>