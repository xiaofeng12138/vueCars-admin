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