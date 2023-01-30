import { reactive, ref } from "vue"
import YkUpload from '@/components/YkUpload.vue';
import markdown from './YkUpload.md.js'

export default {
	title: '公共组件/YkUpload',
	component: YkUpload,
	parameters: {
		notes: markdown,
	},
	argTypes: {
	},
};

const Template = (args) => ({
	components: { YkUpload },
	setup() {
		return { args };
	},
	template: `<yk-upload v-bind="args"></yk-upload>`,
});

export const Primary = Template.bind({});
const fileList = ref([
	{
		name: "food.jpeg",
		url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
	},
	{
		name: "food2.jpeg",
		url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
	},
]);
const handleRemove = (file, uploadFiles) => {
	const uploadRef = ykUploadRef.value.ykUploadRef;
	// uploadRef.submit();
	console.log(file, uploadFiles);
};

const handlePreview = (uploadFile) => {
	console.log(uploadFile);
};

const handleExceed = (files, uploadFiles) => {
	console.log(files, uploadFiles);
};

const beforeRemove = (uploadFile, uploadFiles) => {
	console.log(uploadFile, uploadFiles);
	return true;
};

const beforeUpload = (rawFile) => {
	console.log(rawFile);
};

const handleChange = (uploadFile, uploadFiles) => {
	const uploadRef = ykUploadRef.value.ykUploadRef;
	// uploadRef.submit();
	console.log(uploadFile, uploadFiles);
};

const handleError = (error, uploadFiles) => {
	console.log(error, uploadFiles);
};

const httpRequest = (options) => {
	const request = new XMLHttpRequest();
	return request;
};

Primary.storyName = '基础用法';
Primary.args = reactive({
	name: "",
	action: "",
	method: "post",
	headers: {},
	data: {},
	listType: "text",
	showFileList: true,
	withCredentials: false,
	multiple: false,
	autoUpload: false,
	drag: false,
	disabled: false,
	fileList: fileList,
	accept: "image/*",
	limit: 1,
	tipStyle: {},
	onPreview: handlePreview,
	onRemove: handleRemove,
	onExceed: handleExceed,
	beforeRemove: beforeRemove,
	beforeUpload: beforeUpload,
	onChange: handleChange,
	onError: handleError,
	httpRequest: httpRequest,
})
