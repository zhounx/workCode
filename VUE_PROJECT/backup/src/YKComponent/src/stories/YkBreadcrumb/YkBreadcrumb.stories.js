import { reactive } from "vue"
import YkBreadcrumb from '@/components/YkBreadcrumb.vue';
import markdown from './YkBreadcrumb.md.js'

export default {
  title: '公共组件/YkBreadcrumb',
  component: YkBreadcrumb,
  parameters: {
    notes: markdown,
  },
  argTypes: {
  },
};

const Template = (args) => ({
  components: { YkBreadcrumb },
  setup() {
    return { args };
  },
  template: `<yk-breadcrumb v-bind="args"></yk-breadcrumb>`,
});

export const Primary = Template.bind({});
Primary.storyName = '基础用法';
Primary.args = reactive({
  data: [
    {
      name: "Home",
      path: "/",
      replace: false,
      slot: "item",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ],
})
