const state = {
    parking_type_json:{
        1:{label:"室内",value:1},
        2:{label:"室外",value:2}
    },
    parking_type:[
        {label:"室内",value:1},
        {label:"室外",value:2}
    ],
    parking_status:[
        {label:'禁用',value:false},
        {label:'启用',value:true}
    ],
    //车辆品牌禁启用状态
    brand_status:[
        {label:'禁用',value:false},
        {label:'启用',value:true}
    ]
}
  
const getters = {}
const mutations ={}
const actions = {}

export default {
    namespaced: true,
    state,
};
