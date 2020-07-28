import service from "../utils/request";
import requestUrl from './requestUrl'


//表格封装获取数据公共接口
export function tableLoad(params){
    return service.request({
        method: "post",
        url: requestUrl[params.url],
        data:params.data
    })
}
