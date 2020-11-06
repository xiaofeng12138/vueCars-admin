<template>
    <div>
     <el-form  inline ref="form"  :model="form_data" >
            <el-form-item v-for="(item,index) in formItem" :key="index" :label="item.label" :prop="item.prop" :rules="item.rules">
             <!-- input -->
            <el-input  v-if="item.type === 'input'" v-model="form_data[item.prop]" :placeholder="item.placeholder" :style="{'width':item.width}" :disabled="item.disabled"></el-input>
              <!-- select -->
            <el-select  v-if="item.type === 'select'" v-model="form_data[item.prop]" :style="{'width':item.width}">
               <el-option v-for="(tt,index) in item.options" :key="index" :label="tt.label" :value="tt.value"></el-option>
            </el-select>

            <!-- 省市区 -->
            <div v-if="item.type === 'city'">
                <CityArea />
            </div>
            <!-- 关键字 -->
            <div v-if="item.type === 'keyword'">
                <KeyWord :options="['parkingName']" />
            </div>
             <!-- slot -->
            <slot v-if="item.type == 'solt'" :name="item.soltName"></slot>
        </el-form-item>
        <!-- 按钮部分 -->
        <el-form-item>
          <el-button type="danger" @click="search">搜索</el-button>
            <el-button v-for="(item,index) in formBtn" :key="item.index" :type="item.type" @click="item.hander && item.hander()" >{{item.label}}</el-button>
        </el-form-item>
     </el-form>
    </div>
</template>
<script>
import CityArea from '../cascader/index'
import KeyWord from '../keyword/index'
export default {
  components:{CityArea,KeyWord},
    props:{
       formItem:{
           type:Array,
           default:()=>[]
       },
       formBtn:{
           type:Array,
           default:()=>{}
       },
    },
    data(){
        return{
          form_data:{}
        }
    },
    methods:{
      //搜索
        search(){
          console.log(this.form_data)
        },
      //重置表单
        resetForm(){
          this.$refs.form.resetFields()
          //清除富文本内容
          if(this.$refs.wangeditor){
            this.wangeditorClear = !this.wangeditorClear
          }
        },
        initFormData(){
           this.formItem.forEach((item)=>{
                if(item.type === 'select'){this.selectOption(item)}
           })
        },
        //字段初始化
        initFormFeild(){
          let newobj = {}
           this.formItem.forEach((item)=>{
                if(item.prop){
                  newobj[item.prop] = ''
                }
           })
           this.form_data = newobj
        },
        //下拉选项
        selectOption(data){
          const options = this.$store.state.config[data.options]
          if(options){
             data.options = options
          }
        }
    },

  watch: {
    formItem: {
      handler(newValve) {
        this.initFormData();
        this.initFormFeild()
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

