<template>
  <YkBreadcrumb v-bind="breadcrumbData">
    <template #item>
      <a href="/">这是slot</a>
    </template>
  </YkBreadcrumb>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import YkBreadcrumb from "../components/YkBreadcrumb.vue";

const breadcrumbData = reactive({
  data: [
    {
      name: "Home",
      path: "/",
      replace: false,
      slot: "item",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ],
});
</script>
<style lang="scss" scoped>
</style>