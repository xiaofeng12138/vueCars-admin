import service from "../utils/request";


/**获取会员详情的接口*/
export function GetMemberDetailed(data){
    return service.request({
        method: "post",
        url: "/member/detailed/",
        data
    })
}


/**获取会员编辑*/
export function EditMember(data){
    return service.request({
        method: "post",
        url: "/member/edit/",
        data
    })
}


/**更新认证*/
export function updateRealName(data){
    return service.request({
        method: "post",
        url: "/member/updateRealName/",
        data
    })
}


/**黑名单*/
export function updateBlacklist(data){
    return service.request({
        method: "post",
        url: "/member/blacklist/",
        data
    })
}

/**认证图片*/
export function CheckPhoto(data){
    return service.request({
        method: "post",
        url: "/member/photo/",
        data
    })
}


/**清空金额*/
export function AmountClear(data){
    return service.request({
        method: "post",
        url: "/member/amountClear/",
        data
    })
}















