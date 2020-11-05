import service from "../utils/request";



/**新增车辆品牌*/
export function CarsAdd(data){
    return service.request({
        method: "post",
        url: "/cars/add/",
        data
    })
}

/**删除车辆*/
export function CarsDelete(data){
    return service.request({
        method: "post",
        url: "/cars/delete/",
        data
    })
}

/**禁启用状态*/
export function CarsStatus(data){
    return service.request({
        method: "post",
        url: "/cars/status/",
        data
    })
}

/**详情*/
export function CarsDetailded(data){
    return service.request({
        method: "post",
        url: "/cars/detailed/",
        data
    })
}

/**编辑*/
export function CarsEdit(data){
    return service.request({
        method: "post",
        url: "/cars/edit/",
        data
    })
}








