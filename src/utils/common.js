import store from '@/store/index.js'
//地址处理函数
export function address(value){
    let addressInfo  = ''
    if(value){
        let split = value.split(',')
        addressInfo += split
        if(split[1]){
            addressInfo += `<br /> ${split[1]}`
        }
    }
    return addressInfo
}

//停车场类型处理函数
export function parkingType(value){
    let data = store.state.config.parking_type_json[value]
    if(data) return data.label
}


