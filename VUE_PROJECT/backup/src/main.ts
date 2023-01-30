import { createApp } from "vue";
import store from "./store/index";
import Element from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import App from "./App.vue";
import directives from "./directives/index";
import router from "./router";
import * as ElIconModules from '@element-plus/icons-vue'

const app = createApp(App);
app.config.warnHandler = () => null;
app
  .use(store)
  .use(router)
  .use(Element, { locale })
  .use(directives)
  .mount("#app");
// 统一注册Icon图标
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName]
    app.component(iconName, item)
  }
}