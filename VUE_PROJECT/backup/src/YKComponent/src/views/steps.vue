<template>
  <YkStep v-bind="stepProps">
    <el-button style="margin-top: 12px" @click="next">Next step</el-button>
    <template #slotTitle>
      <div>自定义标题</div>
    </template>
    <template #slotDescription>
      <div>自定义描述</div>
    </template>
    <template #slotIcon>
      <div>自定义图标</div>
    </template>
  </YkStep>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { Edit } from "@element-plus/icons-vue";
import YkStep from "../components/YkSteps.vue";

const stepProps = reactive({
  active: 0,
  list: [
    {
      title: "First",
      description: "First",
      // status: "process",
      icon: Edit,
      slotTitle: "slotTitle",
      slotDescription: "slotDescription",
      slotIcon: "slotIcon",
    },
    { title: "Second", description: "Second" },
    { title: "Third", description: "Third" },
  ],
  finishStatus: "success",
  space: 300,
  direction: "horizontal",
});

const next = () => {
  if (stepProps.active++ > 1) {
    stepProps.active = 0;
  }
};
</script>
<style lang="scss" scoped>
</style>