import { reactive } from "vue"
import { Edit } from "@element-plus/icons-vue";
import YkSteps from '@/components/YkSteps.vue';
import markdown from './YkSteps.md.js'

export default {
  title: '公共组件/YkSteps',
  component: YkSteps,
  parameters: {
    notes: markdown,
  },
  argTypes: {
  },
};

const Template = (args) => ({
  components: { YkSteps },
  setup() {
    return { args };
  },
  template: `<yk-steps v-bind="args"></yk-steps>`,
});

export const Primary = Template.bind({});
Primary.storyName = '基础用法';
Primary.args = reactive({
  active: 0,
  list: [
    {
      title: "First",
      description: "First",
      // status: "process",
      icon: Edit,
      slotTitle: "slotTitle",
      slotDescription: "slotDescription",
      slotIcon: "slotIcon",
    },
    { title: "Second", description: "Second" },
    { title: "Third", description: "Third" },
  ],
  finishStatus: "success",
  space: 300,
  direction: "horizontal",
})
