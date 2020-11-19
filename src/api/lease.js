import service from "../utils/request";



/**新增租赁类型*/
export function LeaseAdd(data){
    return service.request({
        method: "post",
        url: "/lease/add/",
        data
    })
}
/**新增租赁类型*/
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








