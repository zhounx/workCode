<!-- 
  选择开户页面
 -->
<template>
  <div class="container">
    <h3>提交开户资料</h3>
    <div class="main">
      <div class="choiceReminder">
        <h2>选择注册类型</h2>
      </div>
      <!-- 4个开户选项 -->
      <div class="choices">
        <choice
          class="choice"
          v-for="(type, index) in types"
          :key="type"
          :type="type"
        >
        </choice>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import Choice from "@/components/home/choice.vue";

const types = reactive([0, 1, 2, 3]);
</script>

<style scoped lang="scss">
@import "@/assets/css/apply_from.scss";

.container {
  h3 {
    font-size: 32px;
    font-weight: bold;
    color: #25343c;
    padding-bottom: 10px;
  }
}
.main {
  background-color: white;
  min-width: 1150px;
  height: 100%;
  min-height: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-content: center;
  border-radius: 20px;
  margin-top: 10px;
  padding: 40px;
  box-shadow: 0px 10px 12px 0px rgba(167, 210, 243, 0.08);

  .choiceReminder {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 10rem;
    font-size: 26px;
    font-family: Noto Sans S Chinese;
    font-weight: bold;
    color: #25343c;
    line-height: 44px;
  }

  .choices {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 5rem;

    .choice {
      margin: 0 1rem 0 1rem;
      height: 25rem;
      width: 20rem;
      background-color: #f8fbfd;

      border: 1px solid #deebf1;
      border-radius: 16px;
    }
  }
}
</style>
