const md = `

### YkMultiCascader多级级联组件
常用的多级级联组件。

### 基础用法
\`\`\`vue
<YkUpload v-bind="ykUploadProps" ref="ykUploadRef">
    // 自定义上传内容
    <template #default>
      <el-button type="primary">自定义上传内容</el-button>
    </template>
</YkUpload>
\`\`\`
### Attributes属性（参考ElementUI上传组件各属性）
\`\`\`vue
{
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
}
\`\`\`
`
export default md
