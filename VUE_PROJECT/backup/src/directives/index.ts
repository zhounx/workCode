//自定义指令集
export default (app:any) => {
    /***
    * 输入框小数位限制
    * isImplement  是否启用 true:启用  false:不执行
    * limitNumber  小数位数
    */
    app.directive('LimitInputNumber', (el:any, binding:any) => {
        let {isImplement=true,limitNumber=2} = binding.value
        el.addEventListener('input', (event:any) => {
            if(isImplement){
                let val = event.target.value;
                let RegNum = limitNumber == 0 ? `^[\\+\\-]?\\d+\\d{0,0}` : `^[\\+\\-]?\\d+\\.?\\d{0,${limitNumber}}`;
                val = val.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
                val = val.replace(/^\./g, ""); //验证第一个字符是数字
                val = val.replace(/\.{2,}/g, ".");//只保留第一个, 清除多余的
                val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                val = val.match(new RegExp(RegNum, 'g'));
                if(val != event.target.value) {// 跳出循环
                    event.target.value = val;
                    event.target.dispatchEvent(new Event("input"));//调用input事件使vue v-model绑定更新
                }
            }  
        })
    }),
    app.directive('debounce',(el:any, binding:any) => { 
        el.addEventListener('click', (event:any) => {
            if (!el.disabled) {
                el.disabled = true
                setTimeout(() => {
                    el.disabled = false
                }, binding.value ||1000)
            }
        })
    })
}

