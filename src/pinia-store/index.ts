import { createPinia } from 'pinia'
import { App } from 'vue'

const pinia = createPinia()

export function setupPinia(app: App){
  // pinia.use(({ store }) => {
  //     ... 这里安装插件
  //   })
//   app.use(pinia)
}

export * from './user.store'
export * from './app.store'
