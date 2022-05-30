import { defineStore } from 'pinia'

export interface AppState {
  isCollapse: boolean
}
export const useAppStore = defineStore('appStore', {
  state: (): AppState => ({
    // 导航栏菜单是否隐藏
    isCollapse: false
  }),
  getters: {

  },
  actions: {
    updateCollapse(flag: boolean){
      this.isCollapse = flag
    }
  }
})
