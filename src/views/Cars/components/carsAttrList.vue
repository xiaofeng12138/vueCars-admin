<template>
    <div>
        <carsAttrCom @getAttrList = "getAttrList" />
        {{ countNum }}
        <el-row :gutter="20">
            <el-col :span ='4' v-for="(item,index) in cars_attr_data " :key="index">
                  {{item.value}}
                <template v-if="item.key"> 
                    <el-input v-model="attr_item[car_basis_data.key][item.key]" :placeholder="item.value" />
                </template>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import carsAttrCom from './carsAttrComponents'
export default {
    components:{carsAttrCom},
    data() {
        return {
            cars_attr_data:[],
            car_basis_data:{},
            attr_item:{}
        }
    },
     computed:{
        countNum(){
            if(!this.attr_item.basics || !this.attr_item.basics.oil_wear ||  !this.attr_item.carsBody ||  !this.attr_item.carsBody.tank_capacity   ){
                return ''
            }
            //剩余油量
            const surplusOil = this.oil * this.attr_item.carsBody.tank_capacity  / 100

            //计算公里数
            const KM = (surplusOil/this.attr_item.basics.oil_wear *100).toFixed(2)
            this.$emit('update:ValueKm',KM)
        }
    },
    methods:{
        getAttrList(data){
            this.cars_attr_data = data.attr_data
            this.car_basis_data = data.attr_basis_attr
            this.dataFormat()
        },
        //数据格式化函数
        dataFormat(){
            //自定义属性为空时 不执行
            if(this.cars_attr_data.length == 0){ return false}
            const attrBasisKey = this.car_basis_data.key
            //判断属性集合是否存在 ，公用属性的key存在  则不执行
            if(this.attr_item[attrBasisKey]){ return false}
            //处理自定义属性
            const attrJson = {}
            this.cars_attr_data.forEach((item)=>{
                if(item.key){
                    attrJson[item.key] =''
                }
            })
            //更新属性集合
            this.$set(this.attr_item,attrBasisKey,attrJson)

            /*
             典型问题 动态绑定 视图不渲染   
              this.$set(this.attr_item,attrBasisKey,attrJson) 更新指定对象中 某一个key的数值
            **/
         
        },
        callBackValue(){
            this.$emit('update:value',JSON.stringify(this.attr_item))
        }
        
    },
    mounted(){
    },
    props:{
        initValue:{
            type:String,
            default:''
        },
        oil:{
            type:Number,
            default:0
        },
    },
    watch:{
        initValue:{
            handler(newValue){
                if(newValue){
                  this.attr_item = JSON.parse(newValue)
                }
            },
            immediate:true
        },
        oil:{
            handler(newValue){
               console.log(newValue)
            },
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
