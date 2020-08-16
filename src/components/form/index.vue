<template>
    <div>
     <el-form ref="form"  :model="formData" label-width="120px">
        <el-form-item v-for="(item,index) in formItem" :key="index" :label="item.label" :prop="item.prop" :rules="item.rules">
            <el-input  v-if="item.type == 'input'" v-model="formData[item.prop]" :placeholder="item.placeholder" :style="{'width':item.width}" :disabled="item.disabled"></el-input>
            <slot v-if="item.type == 'solt'" :name="item.soltName"></slot>
            <el-radio-group  v-if="item.type == 'radio'"  v-model="formData[item.prop]">
                <el-radio v-for="(item,index) in item.option" :label="item.value" :key="index">{{item.label}}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button v-for="(item,index) in formBtn" :key="item.index" :type="item.type" @click="item.hander && item.hander()" >{{item.label}}</el-button>
        </el-form-item>
     </el-form>
    </div>
</template>
<script>
export default {
    props:{
       formItem:{
           type:Array,
           default:()=>[]
       },
       formBtn:{
           type:Array,
           default:()=>{}
       },
       formData:{
           type:Object,
           default:()=>{}
       }
    },
    data(){
        return{
            msg_type:{
                'input':'请输入',
                'Radio':'请选择'
            }
        }
    },
    methods:{
        fn(){
            console.log(this.form)
        },
        initFormData(){
           this.formItem.forEach((item)=>{
                if(item.prop){this.formData[item.prop] = item.value || null}
                this.rules(item)
           })
        },
        rules(item){
            if(item.required){
                 let normalRules = [{ required: true, message:`请输入${item.label}`, trigger: 'change' }]
                 if(item.rules && item.rules.length > 0){
                     item.rules = normalRules.concat(item.rules)
                     console.log(item.rules)
                 }else{
                      item.rules = normalRules
                 }
                }
            }
    },

    watch:{
        formItem:{
            handler(newValve){
                this.initFormData()
            },
            immediate:true
        }
    }
}
</script>

<style lang="scss" scoped>
</style>

