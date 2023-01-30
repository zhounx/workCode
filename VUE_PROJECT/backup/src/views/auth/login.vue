<template>
  <div class="login-page">
    <div class="title">
      欢迎使用 <br> {{TRADE_MARKET}}
    </div>
    <keep-alive>
      <account-login @login="userLogin" :isFreshenCode="freshenCode"></account-login>
    </keep-alive>
    <p class="forget">还没有账号？ <span @click.stop="router.push({path:'/register'})">立即注册</span></p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import {request} from "@/service/http";
import AccountLogin from './components/AccountLogin.vue'
import { ElMessage } from "element-plus";
import { useStore } from '../../store/user'
import { useRouter } from 'vue-router'
import { TRADE_MARKET } from "@/config/brand";


const router = useRouter();
const user = useStore();
const freshenCode = ref(false)
async function userLogin(info:object){
  let res:any = await request('POST','/abroad-merchant/front/user/login',info)
  if(res.code===200){
    let {token,...obj} = res.data
    user.$patch((state)=>{
      {
        state.userInfo = obj,
        state.token = token
      }
    })
    router.push({path:'/'})
  }else{
    freshenCode.value = !freshenCode.value
    ElMessage({
        message:res.message,
        type: "error",
        duration: 5 * 1000,
    });
  }
}

</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  .title {
    display: flex;
    margin-bottom:60px;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 32px;
    font-weight: bold;
    color: #2C333F;
    line-height: 44px;
  }
  .forget{
    font-size: 14px;
    text-align: center;
    line-height: 14px;
    margin-top: 20px;
    color: #646A73;
    span{
      cursor: pointer;
      color: var(--main-color);
    }
  }
}
</style>
