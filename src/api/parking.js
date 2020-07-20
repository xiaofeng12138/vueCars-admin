import service from "../utils/request";
/**
 * 省市区联动接口
 */
export function GetCity(data){
    return service.request({
        method: "post",
        url: "/cityPicker/",
        data
    })
}

export function addParking(data){
    return service.request({
        method: "post",
        url: "/parking/add/",
        data
    })
}

export function ListParking(data){
    return service.request({
        method: "post",
        url: "/parking/list/",
        data
    })
}

