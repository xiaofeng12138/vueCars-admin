import service from "../utils/request";



/**车辆公用属性*/
export function CarsAttr(data){
    return service.request({
        method: "post",
        url: "/carsAttr/type/",
        data
    })
}

/**获取车辆属性*/
export function CarsAttrList(data){
    return service.request({
        method: "post",
        url: "/carsAttr/list/",
        data
    })
}

/**车辆自定义属性添加*/
export function CarsAttrAdd(data){
    return service.request({
        method: "post",
        url: "/carsAttr/add/",
        data
    })
}







