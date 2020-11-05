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
/**车辆年检判断 */
export function yearCheckType(value){
    let data = store.state.config.yearCheck_status
    let filterData = data.filter(item=> item.value == value)
    if(filterData.length > 0){
        return filterData[0].label
    }
    return ''
}

/**能源类型判断 */
export function energyType(value){
    let data = store.state.config.energyType
    let filterData = data.filter(item=> item.value == value)
    if(filterData.length > 0){
        return filterData[0].label
    }
    return ''
}


