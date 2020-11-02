import service from "../utils/request";


/**获取logo*/
export function GetBrandLogo(data){
    return service.request({
        method: "post",
        url: "/brand/logo/",
        data
    })
}


/**新增车辆品牌*/
export function CarsAdd(data){
    return service.request({
        method: "post",
        url: "/cars/add/",
        data
    })
}

/**删除车辆品牌*/
export function BrandDelete(data){
    return service.request({
        method: "post",
        url: "/brand/delete/",
        data
    })
}

/**禁启用状态*/
export function BrandStatus(data){
    return service.request({
        method: "post",
        url: "/brand/status/",
        data
    })
}

/**详情*/
export function BrandDetailded(data){
    return service.request({
        method: "post",
        url: "/brand/detailed/",
        data
    })
}

/**编辑*/
export function BrandEdit(data){
    return service.request({
        method: "post",
        url: "/brand/edit/",
        data
    })
}








