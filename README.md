# vue3.0 + vite + ts + element-plus + pinia
> element-plus基础模板例子，element递归菜单，二次封装了弹框（拖动）、表格、分页、上传、进度条等组件，并在列表页组合搜索、分页和表格等功能为一体。另：项目中集成eslint、prettier、lodash-es、dayjs等工具。

# 说明
1. 项目是我个人通过真实业务整理出来的，所以可能整体并不适用于你，希望有部分地方能够帮到你；
2. 路由通过指定文件夹自动导入`import.meta.globEager('./modules/*.ts')`,如果需要添加不使用布局组件的路由请自行编辑routes.ts
3. 公共样式变量在assets/styles/var.scss下面，引入全局
# 安装项目依赖

> cd `<app-name>` && yarn install

# 本地运行
> yarn dev
