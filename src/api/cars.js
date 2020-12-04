import service from "../utils/request";



/**新增车辆*/
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

//新增车辆带租赁信息

export function CarsLeaseAdd(data){
    return service.request({
        method: "post",
        url: "/cars/carsInfoAdd/",
        data
    })
}

//车辆详情带租赁信息

export function CarsLeaseDetail(data){
    return service.request({
        method: "post",
        url: "/cars/carsDetailed/",
        data
    })
}
//车辆修改带租赁信息

export function CarsLeaseEdit(data){
    return service.request({
        method: "post",
        url: "/cars/carsInfoEdit/",
        data
    })
}

//车辆释放

export function CarsLock(data){
    return service.request({
        method: "post",
        url: "/cars/lock/",
        data
    })
}





