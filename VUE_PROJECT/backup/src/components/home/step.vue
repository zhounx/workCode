<template>
  <div class="steps">
    <div style="max-width: 1100px">
      <el-steps :active="stepActive" align-center>
        <el-step v-for="item in stepList" :title="item.title" :key="item.img">
          <template #icon>
            <img
              :src="getImageUrl(item.img, stepActive)"
              alt=""
              width="64"
              height="64"
            />
          </template>
        </el-step>
      </el-steps>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  stepActive: {
    type: Number,
    default: 1,
  },
  stepList: {
    type: Array,
    default: [
      { title: "1.填写注册基本信息和法人信息", img: "first" },
      { title: "2.填写结算账户信息", img: "second" },
      { title: "3.填写店铺信息", img: "third" },
    ],
  },
});
const getImageUrl = (name: string, step: number) => {
  if (step >= 2 && name === "second") {
    return new URL(`/src/assets/images/${name}_active.png`, import.meta.url)
      .href;
  }
  if (step >= 3 && name === "third") {
    return new URL(`/src/assets/images/${name}_active.png`, import.meta.url)
      .href;
  }
  return new URL(`/src/assets/images/${name}.png`, import.meta.url).href;
};
</script>

<style scoped lang="scss">
.steps {
  width: 100%;
  height: 140px;
  padding-top: 40px;
  background: #ffffff;
  box-shadow: 0px 10px 12px 0px rgba(167, 210, 243, 0.08);
  border-radius: 20px;
  box-sizing: border-box;
}
</style>
