export function formatCarAttr(val){
     if(!val){ return ''}
     return JSON.parse(val)
}

export function getCarAttrKey(params){
    if(!params.data){ return ''}
    const data = formatCarAttr(params.data)
    if(data[params.parantKey] && data[params.parantKey][params.childKey]){
        return data[params.parantKey][params.childKey]
    }
    return ''
}