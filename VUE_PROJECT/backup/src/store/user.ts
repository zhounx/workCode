import { defineStore } from 'pinia'
import {request} from "@/service/http";

export const useStore = defineStore({
    id: 'globalState',
    state: () => {
       return{
           token:'',
           userInfo:<any>{}
       }
    },
    persist: {
        enabled: true,
        strategies: [ //使用插件自定义存储
          {
            storage: localStorage,
            paths: ["token", "userInfo"],
          }
        ]
    },
    actions: {
        async verifyCode(par:any){
            let data:any = await request('get','/abroad-merchant/front/user/captcha',par)
            return data.data
        },
        async getSessCode(par:any){
            let data:any = await request('get','/abroad-merchant/front/user/sendSmsCode',par)
            return data.data
        }
    }
})
