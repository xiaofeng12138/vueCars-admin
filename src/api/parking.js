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

//停车场详情
export function detailParking(data){
    return service.request({
        method: "post",
        url: "/parking/detailed/",
        data
    })
}

//停车场编辑
export function editParking(data){
    return service.request({
        method: "post",
        url: "/parking/edit/",
        data
    })
}

//停车场删除
export function deleteParking(data){
    return service.request({
        method: "post",
        url: "/parking/delete/",
        data
    })
}
