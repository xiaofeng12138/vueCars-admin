<template>
    <div>
         <el-button size="small" v-for="(item,index) in carsAttrListArray"  :type = "chooseId == item.id ? 'success':''" :key="index"  @click="choose(item)"> {{item.value}}</el-button>
    </div>
</template>
<script>
import {CarsAttr ,CarsAttrList} from '@/api/carstype.js'
export default {
    data() {
        return {
            carsAttrListArray:[],
            chooseId:'',
            current_data:{},
            attr_item:[],
            attr_basis_value:''
        }
    },
    methods:{
         choose(item){
            this.chooseId = item.id
            this.current_data = item
            this.attr_basis_value = item

            //获取自定义属性
            CarsAttrList({typeId:this.chooseId}).then(res=>{
                this.$emit('getAttrList',{
                    attr_data:res.data.data,
                    attr_basis_attr:this.attr_basis_value
                })
            })
        }, 

        //获取公共属性列表
        getAttrList(){
           return CarsAttr().then(res=>{
                const data = res.data.data
                this.carsAttrListArray = res.data.data
                return data
            })
        },
        async getCarsType(){
              const data = await this.getAttrList()
        }
    },
    mounted(){
       this.getCarsType()
    }
}
</script>
<style lang="scss" scoped>

</style>
