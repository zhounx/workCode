const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk')
const log = console.log;
const secretKey = 'Bearer 233E7C7D006B8944A4791E7FDA051309'
// 项目名称，为gitlab上项目名称，为唯一，对用数据库中的projectId字段
const projectName = JSON.parse(fs.readFileSync('package.json', 'utf8')).name;
// 组件库版本号
const version = JSON.parse(fs.readFileSync('./src/YKComponent/package.json', 'utf8')).version;
// 项目引用的组件库组件名称, ID
// @ts-ignore
/**
 * @type {string[]}
 */
const libraryNameArr = [];


// 创建axios的实例
// @ts-ignore
const request = axios.create({
  baseURL: 'http://10.8.17.39:3001/api/',
  timeout:5000, // 超时时间
  headers: {'authorization': secretKey}
});

/**
 * 
 * @param mode 当前模式 只有mode为stat时才进行组件数据的上报
 * @returns null
 */
// @ts-ignore
function libraryStat (mode) {
  return {
    name: 'libraryStat',
    // @ts-ignore
    load ( id ) {
      switch (true) {
        case id.includes('YkBreadcrumb'):
          if (!libraryNameArr.includes('YkBreadcrumb')) libraryNameArr.push('YkBreadcrumb')
          break;
        case id.includes('YkDialog'):
          if (!libraryNameArr.includes('YkDialog')) libraryNameArr.push('YkDialog')
          break;
        case id.includes('YkForm'):
          if (!libraryNameArr.includes('YkForm')) libraryNameArr.push('YkForm')
          break;
        case id.includes('YkMultiCascader'):
          if (!libraryNameArr.includes('YkMultiCascader')) libraryNameArr.push('YkMultiCascader')
          break;
        case id.includes('YkSteps'):
          if (!libraryNameArr.includes('YkSteps')) libraryNameArr.push('YkSteps')
          break;
        case id.includes('YkTable'):
          if (!libraryNameArr.includes('YkTable')) libraryNameArr.push('YkTable')
          break;
        case id.includes('YkUpload'):
          if (!libraryNameArr.includes('YkUpload')) libraryNameArr.push('YkUpload')
          break;
      }
    },
    
    async buildEnd() {
      if (mode != 'stat') {
        return
      }
      // @ts-ignore
      let params = {
        projectId: 0,
        libraryId: [],
        version
      }
      try{
        const res = await Promise.all([request.get('project/allList'), request.get('onlineLibrary/allList')]);
        if (res[0].data.code === 0) {
            // @ts-ignore
            params.projectId = (res[0].data.data.find(item => {
              return item.projectName.toLowerCase() === projectName.toLowerCase()
            }) || {id: ''}).id
        }
        if (res[1].data.code === 0) {
            libraryNameArr.map(item => {
              // @ts-ignore
              const libraryId = (res[1].data.data.find(subItem => subItem.libraryName === item) || {id: ''}).id
              if (libraryId) {
                // @ts-ignore
                params.libraryId.push(libraryId)
              }
            })
        }
        const result = await request.post('libRelationalPro/save', params)
        if (result.data.code === 0) {
          // @ts-ignore
          log(chalk.green('---组件库数据统计成功---'))
        } else {
          // @ts-ignore
          log(chalk.red('---组件库数据统计失败---'))
        }
      }catch(error) {
        // @ts-ignore
        log(chalk.red('---组件库统计失败, 请开启VPN---'), error)
      }
    }
  }
}
module.exports = libraryStat