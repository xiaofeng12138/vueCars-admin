import service from "../utils/request";



/**待取车状态*/
export function orderWait(data){
    return service.request({
        method: "post",
        url: "/order/wait/",
        data
    })
}


/**超时状态*/
export function orderOvertime(data){
    return service.request({
        method: "post",
        url: "/order/overtime/",
        data
    })
}

/**完成状态*/
export function orderOver(data){
    return service.request({
        method: "post",
        url: "/order/over/",
        data
    })
}

/**取消状态*/
export function orderCancel(data){
    return service.request({
        method: "post",
        url: "/order/cancel/",
        data
    })
}

/**待还车状态*/
export function orderReturn(data){
    return service.request({
        method: "post",
        url: "/order/return/",
        data
    })
}



