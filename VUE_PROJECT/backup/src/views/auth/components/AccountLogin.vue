<!--
    文件描述
    创建时间：2022/3/28 18:13
    创建人：yeahka
-->
<template>
  <el-form class="auth-form" ref="formAccountRef" size="large" :model="formAccount" :rules="loginRuleAccount" >
    <el-form-item prop="accountNo">
      <el-input v-model.trim="formAccount.accountNo" placeholder="请输入11位数字手机号码" maxlength="11">
        <template #prepend>
          <img src="/src/assets/images/login/account.png" alt="" />
        </template>
      </el-input>
      <p v-show="formAccount.accountNo.length>0" style="width: 60px;height: 48px;line-height: 48px;text-align: center;position: absolute;right: 0;top:3px" @click="formAccount.accountNo=''">
        <img style="width:18px;height:18px" src="/src/assets/images/login/clear.png" alt="" />
      </p>
    </el-form-item>
    <el-form-item prop="password">
      <el-input :type="passwordType" v-model.trim="formAccount.password" placeholder="请输入登录密码" minlength="8" maxlength="16">
        <template #prepend>
          <img src="/src/assets/images/login/psd.png" alt="" />
        </template>
      </el-input>
      <p @mousedown="passwordType='text'" @mouseup="passwordType='password'" style="width: 60px;height: 48px;line-height: 48px;text-align: center;position: absolute;right: 0;top:3px">
        <img style="width:18px;height:14px" :src="passwordType=='password'?getImageUrl('hide'):getImageUrl('view')" alt="" />
      </p>
    </el-form-item>
    <div v-show="passwordError" style="margin-top:-20px;font-size:13px;color:#f56c6c;text-indent:18px;">
        密码需同时包含数字、大小写字母，并且最少为8位字符
      </div>
    <el-form-item prop="captcha">
      <el-input style="width:calc(100% - 120px)" v-model.trim="formAccount.captcha" @keyup.enter.native="submitForm(formAccountRef)" placeholder="请输入图形验证码" maxlength="4">
        <template #prepend>
          <img src="/src/assets/images/login/code.png" alt="" />
        </template>
      </el-input>
      <img :src="verifyImg" alt="验证码" class="codeImg" v-loading="true" @click="getVerifyCode"/>
    </el-form-item>
      <p class="updateImg" @click="getVerifyCode">看不清？换一个<span></span></p>
    <div class="login-forget">
      <!-- <el-checkbox v-model="checked" label="下次自动登录" size="small" /> -->
      <span @click.stop="router.push({path:'/forget'})">忘记密码？</span>
    </div>
    <el-button class="auth-button" type="primary" v-debounce :disabled="disabled" @click="submitForm(formAccountRef)">登录</el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { onMounted, reactive,ref,watch } from "vue"
import { useStore } from "@/store/user";
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import md5 from 'js-md5'
const props = defineProps({
  isFreshenCode:{
    type:Boolean,
    default:false
  }
})
watch(() => props.isFreshenCode,
  (newVal, oldVal) => {
    getVerifyCode()
  },
);
const getImageUrl = (name: string) => {
  return new URL(`/src/assets/images/login/${name}.png`, import.meta.url).href;
};
const router = useRouter();
const formAccountRef = ref<FormInstance>()
let verifyImg = ref('')
let disabled = ref<boolean>(false)
let passwordType = ref('password')
let passwordError = ref<boolean>(false)
const formAccount = reactive({accountNo: '', password: '', captcha: '',sess:'',type:1})
const validatePass2 = (rule: any, value: any, callback: any) => {
  let pt = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/
  if(!pt.test(value)){
    callback(new Error(" "))
    setTimeout(()=>{
      passwordError.value=true
    },120)
  } else {
    passwordError.value=false
    callback()
  }
}
const loginRuleAccount = reactive({
  accountNo: [
    { required: true, message: '请输入11位数字手机号码', trigger: 'blur' },
    { pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/, message: '请输入11位数字手机号码', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入登录密码', trigger: 'blur' },
    {validator:validatePass2, trigger: 'blur'}
    //{ pattern:/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/,message: '密码需同时包含数字、大小写字母，并且最少为8位字符', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入图形验证码', trigger: 'blur' },
  ],
})
const store = useStore();

const getVerifyCode = async () =>{
  let data:any = await store.verifyCode({})
  verifyImg.value = data.url
  formAccount.sess = data.sess
}
getVerifyCode()
const emits = defineEmits(['login'])
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid:boolean) => {
    if (valid) {
      disabled.value=false
      emits('login',{
        ...formAccount,
        password: md5(formAccount.password)
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<style scoped lang="scss">
@import "./form.scss";
.auth-form {
  &::v-deep(.el-input__inner) {
        border-left: none;
    }
}
.codeImg {
  box-sizing: border-box;
  border: 1px solid #E1E8ED;
  border-radius: 8px;
}
.updateImg {
  text-align: right;
  top: -15px;
  right: 14px;
  color:#646A73;
  font-size: 13px;
  position: relative;
  cursor: pointer;
  &:after {
    position: absolute;
    top: 1px;
    margin-left: 2px;
    content: "";
    width: 12px;
    height: 12px;
    background: url(@/assets/images/login/refresh.png) no-repeat center/100%;

  }
}
.login-forget{
    display: flex;align-items: center;
    justify-content: space-between;
    font-size: 14px;
    // margin-top:10px;
    margin-bottom:10px;
    span{
      cursor: pointer;
      color: var(--main-color);
    }
    &::v-deep(.el-checkbox__label) {
       color: #646A73;
    }
  }
</style>
