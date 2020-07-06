<template>
    <div>
         <el-cascader v-model="value" :props="props" @change = 'changeValue'></el-cascader>
    </div>
</template>
<script>
import { GetCity} from '@/api/parking.js'
export default {
    props:{
        areaValue:{
            type:String,
            default:""
        }
    },
    data() {
        return {
            value:'',
            props: {
                lazy: true,
                lazyLoad (node, resolve) {
                    const { level } = node;
                    let requestData={}
                    if(level === 0){
                        requestData.type = 'province'
                    }
                    if(level === 1){
                        requestData.type = 'city'
                        requestData.province_code = node.value
                    }
                    if(level === 2){
                        requestData.type = 'area'
                        requestData.city_code = node.value
                    }
                    if(level === 3){
                        requestData.type = 'street'
                        requestData.area_code = node.value
                    }


                    GetCity(requestData).then(res=>{
                        let data = res.data.data
                        if(level === 0){
                            data.forEach((item)=>{
                                item.label = item.PROVINCE_NAME
                                item.value = item.PROVINCE_CODE
                            })
                        }
                        if(level === 1){
                            data.forEach((item)=>{
                                item.label = item.CITY_NAME
                                item.value = item.CITY_CODE
                            })
                        }
                        if(level === 2){
                            data.forEach((item)=>{
                                item.label = item.AREA_NAME
                                item.value = item.AREA_CODE
                            })
                        }
                        if(level === 3){
                            data.forEach((item)=>{
                                item.label = item.STREET_NAME
                                item.value = item.STREET_CODE
                                item.leaf = level >= 3
                            })
                        }
                        resolve(res.data.data)
                    
                    })
                }
            },
        }
    },
    methods:{
        changeValue(e){
            this.$emit('update:areaValue', e.join()) //修改父组件传过来的值
        //    this.value = e.join()
        }
    }
}
</script>

