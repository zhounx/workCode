import Element from 'element-plus'
import locale from "element-plus/lib/locale/lang/zh-cn"
import 'element-plus/dist/index.css'
import { storybookApp } from '@storybook/vue3/dist/esm/client/preview/render';
storybookApp.use(Element, { locale })
export const parameters = {
  actions: { argTypesRegex: "^on.*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}