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

//表格封装删除数据接口
export function deleteFn(params){
    console.log(params)
    return service.request({
        method: "post",
        url: requestUrl[params.url],
        data:params.data
    })
}

//获取车辆品牌接口
export function getCarsBrand(data ={}){
    return service.request({
        method: "post",
        url: '/common/getCarsBrand/',
        data
    })
}

//获取t停车场

export function getCommonParking(data ={}){
    return service.request({
        method: "post",
        url: '/common/getParking/',
        data
    })
}
