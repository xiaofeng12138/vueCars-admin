<template>
    <div>
     <el-form ref="form"  label-width="120px">
        <el-form-item v-for="(item,index) in formItem" :key="index" :label="item.label" :prop="item.prop">
            <el-input v-model="form[item.prop]" v-if="item.type == 'input'" :placeholder="item.placeholder" :style="{'width':item.width}" :disabled="item.disabled"></el-input>
            <slot v-if="item.type == 'solt'" :name="item.soltName"></slot>
            <el-radio-group  v-if="item.type == 'radio'" >
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
       }
    },
    data(){
        return{
            form:{}
        }
    },
    methods:{
        initFormData(){
            let newForm = {}
           this.formItem.forEach((item)=>{
                if(item.prop){newForm[item.prop] = item.value || null}
           })
           this.form = newForm
        }
    },

    watch:{
        formItem:{
            handler(newValve){
                console.log(newValve)
            },
            immediate:true
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

