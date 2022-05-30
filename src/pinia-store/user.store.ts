import { defineStore } from 'pinia'

export interface UserState {
  userId: string
  userName: string
  phone: string
  company: string
}
export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    userId: '007',
    userName: '勒布朗·詹姆斯',
    phone: '8008208820',
    company: '移卡科技有限公司'
  }),
  getters: {

  },
  actions: {
    // updateUserInfo({ userId, userName, phone, company }){
    //   this.userId = userId
    //   this.userName = userName
    //   this.phone = phone
    //   this.company = company
    // }
  }
})
