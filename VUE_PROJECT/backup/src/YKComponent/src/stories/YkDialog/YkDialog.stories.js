import { reactive } from "vue"
import YkDialog from '@/components/YkDialog.vue';
import markdown from './YkDialog.md.js'

export default {
  title: '公共组件/YkDialog',
  component: YkDialog,
  parameters: {
    notes: markdown,
  },
  argTypes: {
  },
};

const Template = (args) => ({
  components: { YkDialog },
  setup() {
    return { args };
  },
  template: `<yk-dialog v-bind="args"></yk-dialog>`,
});

export const Primary = Template.bind({});

const handleBeforeClose = (done) => {
  Primary.args.dialogVisible = false;
  done();
};
Primary.storyName = '基础用法';
Primary.args = reactive({
  dialogVisible: true,
  draggable: false,
  handleBeforeClose: handleBeforeClose,
})
