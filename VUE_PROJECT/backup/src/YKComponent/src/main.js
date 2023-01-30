import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import locale from "element-plus/lib/locale/lang/zh-cn"
import './common/scss/global.scss'
// @ts-ignore
import App from './App.vue'
const app = createApp(App)
app.use(ElementPlus, { locale })
app.mount('#app')
