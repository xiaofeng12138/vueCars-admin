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


/**
 * formKey:需要的数据
 * requestData：请求回来的数据
 * **/
export function formatJson(formKey,requestData){
   const data ={}
    for(let key in formKey){
      if(Object.keys(requestData).includes(key)){
        data[key] = requestData[key]
      }
    }
    return data;
}