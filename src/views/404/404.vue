<template>
  <div class="wrap">
    <h1 class="">404</h1>
    <p>哎呀，您要查找的页面不存在。</p>
    <div>
      <el-button type="primary" @click="goHome"> 返 回 </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
  router.push('/home')
}
</script>

<style lang="scss" scoped>
.wrap {
  text-align: center;
  background-color: $error;
  padding: 40px 0;
  min-height: 100vh;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    width: inherit;
    top: 0;
    bottom: 0;
    background-color: inherit;
    border: inherit;
  }

  h1 {
    font-size: 8em;
    color: #fff;
    margin-bottom: 0;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  }

  p {
    color: #fff;
    margin: 50px 0;
    font-size: 1.55rem;
    font-family: cursive;
    font-weight: 600;
  }
}

.el-button {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  padding: 12px 40px;
  transform: translate3d(0, 0, 0);
  background-color: $primary;
  transition: box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    background-color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    transform: translate3d(0, -1px, 0);
    background-color: $primary;
    border-color: $primary;
  }
}
</style>
