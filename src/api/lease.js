import service from "../utils/request";



/**新增租赁类型*/
export function LeaseAdd(data){
    return service.request({
        method: "post",
        url: "/lease/add/",
        data
    })
}
/**获取租赁列表*/
export function getLeaseList(data){
    return service.request({
        method: "post",
        url: "/lease/list/",
        data
    })
}
/**修改租赁状态*/
export function LeaseStatus(data){
    return service.request({
        method: "post",
        url: "/lease/status/",
        data
    })
}

/**修改租赁内容*/
export function LeaseEdit(data){
    return service.request({
        method: "post",
        url: "/lease/edit/",
        data
    })
}


//获取租赁列表（新增停车场页面）/lease/carsLeaseList/

export function getCarLeaseList(data){
    return service.request({
        method: "post",
        url: "/lease/carsLeaseList/",
        data
    })
}





