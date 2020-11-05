<template>
    <div>
     <el-form ref="form"  :model="formData" label-width="120px">
            <el-form-item v-for="(item,index) in formItem" :key="index" :label="item.label" :prop="item.prop" :rules="item.rules">
             <!-- input -->
            <el-input  v-if="item.type === 'input'" v-model="formData[item.prop]" :placeholder="item.placeholder" :style="{'width':item.width}" :disabled="item.disabled"></el-input>
              <!-- select -->
            <el-select  v-if="item.type === 'select'" v-model="formData[item.prop]" :placeholder="item.placeholder" :style="{'width':item.width}">
               <el-option v-for="(tt,index) in item.selectItem" :key="index" :label="tt.leabl || tt[item.select_label] " :value="tt.value ||tt[item.select_value]"></el-option>
            </el-select>
             <!-- slot -->
            <slot v-if="item.type == 'solt'" :name="item.soltName"></slot>
            <!-- radio禁启用 -->
            <el-radio-group  v-if="item.type == 'disabledRadio'"  v-model="formData[item.prop]">
                <el-radio v-for="(item,index) in disabled_radio" :label="item.value" :key="index">{{item.label}}</el-radio>
            </el-radio-group>
            <!-- radio -->
            <el-radio-group  v-if="item.type == 'radio'"  v-model="formData[item.prop]">
                <el-radio v-for="(item,index) in item.option" :label="item.value" :key="index">{{item.label}}</el-radio>
            </el-radio-group>

            <!-- 富文本编辑器 -->
            <template  v-if="item.type == 'Wangeditor'">
                <Wangeditor  :isClear="wangeditorClear" ref="wangeditor" :value="formData[item.prop]"  :content.sync ="formData[item.prop]" />
            </template>
             
        </el-form-item>
        <!-- 按钮部分 -->
        <el-form-item>
            <el-button v-for="(item,index) in formBtn" :key="item.index" :type="item.type" @click="item.hander && item.hander()" >{{item.label}}</el-button>
        </el-form-item>
     </el-form>
    </div>
</template>
<script>
import Wangeditor from '@c/wangeditor/index'
export default {
  components:{Wangeditor},
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
          wangeditorClear:false,
          disabled_radio:this.$store.state.config.brand_status,
            msg_type:{
                'input':'请输入',
                'radio':'请选择',
                'select':'请选择'
            }
        }
    },
    methods:{
        fn(){
            console.log(this.form)
        },
        resetForm(){
          this.$refs.form.resetFields()
          //清除富文本内容
          if(this.$refs.wangeditor){
            this.wangeditorClear = !this.wangeditorClear
          }
        },
        initFormData(){
           this.formItem.forEach((item)=>{
                if(item.prop){this.formData[item.prop] = item.value || null}
                this.rules(item)
           })
        },
         rules(item) {
          if (item.required) {
            let normalRules = [{required: true, message: item.requiredMsg || `${this.msg_type[item.type]}${item.label}`, trigger: "change"}];
            if (item.rules && item.rules.length > 0) {
              item.rules = normalRules.concat(item.rules);
              // console.log(item.rules);
            } else {
              item.rules = normalRules;
            }
          }
        }
    },

  watch: {
    formItem: {
      handler(newValve) {
        console.log(newValve)
        this.initFormData();
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

