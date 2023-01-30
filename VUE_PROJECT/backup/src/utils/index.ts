// 获取url参数
export function getUrlParam(name:string){
  //构造一个含有目标参数的正则表达式对象
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  //匹配目标参数
  let r;
  if (window.location.search =='') {
    r = window.location.hash.split("?")[1]?window.location.hash.split("?")[1].match(reg):"";
  } else {
    r = window.location.search.substr(1).match(reg);
  }
  if (r) {
    return unescape(r[2]);
  } else {
    return "";
  }
}
/**
 * @description 下载接口返回的文件流
 * @param {Object} obj json对象
 * @return {Object} 新的json对象
 */
export function createDownLink (data: File, fileName?: string, type = 'application/vnd.ms-excel;charset=utf-8'): void {
    const blob = new Blob([data], {type: type})
    const elink = document.createElement('a')
    if (fileName) {
        elink.download = fileName
    }
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
}
/**
 * @msg: 获取系统当前时间
 * @param {string} fmt 时间格式 具体看代码
 * @return: string
 */
export const getDate = (fmt: any) => {
    const date = new Date()
    let time = ''
    const o: any = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'H+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        time = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    } else {
        time = fmt
    }
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(time)) {
            time = time.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
    }
    return time
}

