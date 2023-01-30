<template>
  <div class="container">
    <div class="loginContent">
      <img src="../../assets/images/login/left-bg.png" alt="bg" class="leftImg"/>
      <div class="auth-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.container{
  width: 100%;min-height: 100%;min-width:1100px;background: #F4F4F4;
  display:flex;justify-content:center;align-items:center;
  background: url(@/assets/images/login/login-bg.png) no-repeat;
  background-size: cover;overflow: hidden;
  .loginContent{
    width: 1100px;background: #fff;border-radius: 12px;
    display: flex;color: #1A263B;border-radius: 10px;position: relative;
    height: 625px;box-shadow: 0px 10px 20px 0px rgba(191, 202, 220, 0.12);
    .leftImg{
      width:660px;display: inline-block;
    }
    .auth-content{
      flex: 1;padding: 70px 54px;box-sizing: border-box;
    }
  }
}
</style>
