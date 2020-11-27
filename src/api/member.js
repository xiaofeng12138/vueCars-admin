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








