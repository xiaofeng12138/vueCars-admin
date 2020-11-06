<template>
  <el-row :gutter="20">
      <el-col :span="8">
          <el-select  v-model="search_key" placeholder="请选择" >
                    <el-option v-for="(item,index) in select_Value" :label="item.label" :value="item.value" :key="index"></el-option>
          </el-select>
      </el-col>
      <el-col :span="16">
           <el-input  placeholder="请输入关键字" v-model="search_value"></el-input>
      </el-col>
  </el-row>
</template>

<script>
export default {
    props:{
        options:{
            type:Array,
            default:[]
        }
    },
    data() {
        return {
            search_key:'',
            search_value:'',
            select_Value:[],
            config_options:this.$store.state.config.keyWord_options
        }
    },
    methods:{
        initOptions(){
              let optinonsItem = []
              this.options.forEach((item)=>{
                const data =  this.config_options.filter(ele => ele.value == item)
                console.log(data)
                optinonsItem = optinonsItem.concat(data)
              })
              console.log(optinonsItem)

              this.select_Value = optinonsItem
        }
    },
    watch:{
        options:{
            handler(newValue){
                console.log(newValue)
                this.initOptions()
            },
            immediate:true
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
