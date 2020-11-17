<template>
    <div>
         <FormData ref="vueForm" :formData="form_data" :formItem ="formConfig" :formBtn = "btnConfig">
            <template v-slot:bydate = 'slotData'>
                  <el-row :gutter="20">
                        <el-col :span="6">
                            <div><el-date-picker v-model="form_data.maintainDate" value-format = "yyyy-MM-dd" type="date" placeholder="选择日期时间"> </el-date-picker> </div>
                        </el-col>
                        <el-col :span="17">
                            <div>
                                下次保养日期：2020-12-01
                            </div>
                        </el-col>
               </el-row>
            </template>
            <template v-slot:clAttr = 'slotData'>
               <carAttrComponents  ref="carattr" :value.sync ="form_data.carsAttr" />
            </template>
             <template v-slot:clEnergyType>
                    <el-radio-group v-model="form_data.energyType" @change='changeEngertype'>
                        <el-radio v-for="(item,index) in energyTypeRadio"  :key="index" :label="item.value" >{{item.label}}</el-radio>
                    </el-radio-group>
                    <div class="energy_bar_wrap" v-if="form_data.energyType == 1">
                        <span class="label-text">电量</span>
                         <el-row >
                            <el-col :span="10">
                                   <el-slider v-model="form_data.electric" show-input></el-slider>
                            </el-col>
                        </el-row>
                    
                    </div>
                    <div class="energy_bar_wrap" v-if="form_data.energyType == 2">
                        <span class="label-text">油量</span>
                       <el-row >
                            <el-col :span="10">
                                   <el-slider v-model="form_data.oil" show-input></el-slider>
                            </el-col>
                        </el-row>
                    </div>
                     <div class="energy_bar_wrap" v-if="form_data.energyType == 3 ">
                        <span class="label-text">电量</span>
                        <el-row >
                            <el-col :span="10">
                                   <el-slider v-model="form_data.electric" show-input></el-slider>
                            </el-col>
                        </el-row>
                        <span class="label-text">油量</span>
                         <el-row >
                            <el-col :span="10">
                                   <el-slider v-model="form_data.oil" show-input></el-slider>
                            </el-col>
                        </el-row>
                    </div>
            </template>
            <!-- <template v-slot:clDesc = 'slotData'>
                 <div ref="editorDom" style="text-align:left"></div>
            </template> -->
        </FormData>
    </div>
</template>

<script>
import carAttrComponents from './components/carsAttrList'
import Editor from 'wangeditor'
import FormData from '@c/form/index'
import {getCarsBrand,getCommonParking} from '@/api/common'
import {CarsAdd,CarsDetailded,CarsEdit} from '@/api/cars.js'
export default {
    components:{FormData,carAttrComponents},
    data() {
      return {
        //车辆能源
        energyTypeRadio:this.$store.state.config.energyType,
        editor:null,//富文本对象
        cars_attr:[],
       
        //表单配置选项
        formConfig:[
            {
                type:'select',
                label:'车辆品牌',
                placeholder:'请选择车辆品牌',
                prop:'carsBrandId',
                width:'300px',
                select_value:'id',
                select_label:'nameCh',
                required:true,
                selectItem:[]
            },
            {
                type:'select',
                label:'停车场',
                placeholder:'请选择停车场',
                prop:'parkingId',
                width:'300px',
                required:true, 
                select_value:'id',
                select_label:'parkingName',
                selectItem:[]
            },
            {
                type:'input',
                label:'车辆型号',
                placeholder:'请选择车辆型号',
                prop:'carsMode',
                required:true,
            },
            {
                type:'input',
                label:'车牌号',
                placeholder:'请输入车牌号',
                prop:'carsNumber',
                required:true,
            },
            {
                type:'input',
                label:'车架号',
                placeholder:'请输入车架号',
                prop:'carsFrameNumber',
                required:true,
            },
            {
                type:'input',
                label:'发动机号',
                placeholder:'请输入发动机号',
                prop:'engineNumber',
                required:true,
            },
            {
                type:'upload',
                label:'缩略图',
                prop:'carsImg',
                required:true,
            },
            {
                type:'radio',
                label:'年检',
                prop:'yearCheck',
                required:true,
                option:this.$store.state.config.yearCheck_status
            },
            {
                type:'solt',
                label:'保养日期',
                soltName:'bydate',
                placeholder:'请输入保养日期',
                prop:'maintainDate',
            },
            {
                type:'radio',
                label:'档位',
                prop:'gear',
                required:true,
                option:this.$store.state.config.gear_status
            },
            {
                type:'solt',
                label:'能源类型',
                soltName:'clEnergyType',
                prop:'energyType',
                
            },
             {
                type:'radio',
                label:'禁启用',
                prop:'status',
                required:true,
                option:this.$store.state.config.brand_status
            },
            {
                type:'solt',
                label:'车辆属性',
                soltName:'clAttr',
                prop:'carsAttr',
            },
            {
                type:'Wangeditor',
                label:'车辆描述',
                prop:'content',
            },
        ],
        form_data:{
            parkingId:"", //停车场名称
            carsBrandId:'', //车辆品牌
            carsMode:"", //车辆型号
            carsNumber:"" , //车牌号
            carsFrameNumber:'', //车架号
            engineNumber:'', //发动机号
            yearCheck:true,  //年检（true：已年检，false：未年检）
            gear:1 ,//档位（1：手动，2：自动，3：人工智能）
            energyType:1, //能源类型（1：电，2：油，3：混合动力）
            electric:100, //电量
            oil:100,//油量
            status:true,
            carsAttr:"" ,//车辆属性（{'颜色': '红色', '驱动':'四驱'}）
            content:"" ,//内容介绍
            maintainDate:"", // 保养日期
            status:"", //状态
            carsImg:'',
        },
        //提交按钮部分
        btnConfig:[
            {
                type:'primary',label:'提交',hander:()=>this.submitForm('vueForm')
            }
        ],
        id:this.$route.query.id,
      }
    },
    methods:{
        //获取车辆品牌的接口
        getSelectBrand(){
            getCarsBrand().then(res=>{
                let data = res.data.data
                if(data){
                    const parking =  this.formConfig.filter(item=>item.prop == "carsBrandId")
                    if(parking.length > 0){
                        parking[0].selectItem = data
                    } 
                }
            })
        },
        //获取停车场
        getSelectPark(){
            getCommonParking().then(res=>{
                let data = res.data.data
                if(data){
                    const parking =  this.formConfig.filter(item=>item.prop == "parkingId")
                    if(parking.length > 0){
                        parking[0].selectItem = data
                    } 
                }
            })
        },
        submitForm(formName){
            this.formatCarAttr()
            this.$refs.vueForm.$refs.form.validate((valid) => {
                if (valid) {
                   this.id ? this.edit():this.add()
                } else {
                    console.log('error submit!!');
                    return false;
                 }
                });
        },
        add(){
             CarsAdd(this.form_data).then(res=>{
                this.$message.success(res.message)
                this.$refs.vueForm.resetForm()
                this.cars_attr = []
                this.form_data.content = ''
              })
        },
        edit(){
             CarsEdit({...this.form_data,id:this.id}).then(res=>{
                this.$message.success(res.message)
              })
        },
        addAttr(){
            this.cars_attr.push({attr_key:'',attr_value:''})
        },
        removeAttr(index){
            this.cars_attr.splice(index,1)
        },
       
        /**车辆属性格式化*/
        formatCarAttr(){
            this.$refs.carattr.callBackValue()
        },
        //修改能源切换函数
        changeEngertype(value){
         this.form_data.electric = 0
         this.form_data.oil = 0
        },
        /**获取车辆详情*/
         getDetail(){
            if(!this.id){return false}
            CarsDetailded({id:this.id}).then(res=>{
                const data = res.data
                for(let key in data){
                    if(Object.keys(this.form_data).includes(key)){
                        this.form_data[key] = data[key]
                    }
                }
                /**车辆属性还原*/
                if(data.carsAttr){
                    let carAttr = JSON.parse(data.carsAttr)
                    const arr =[]
                    for(let key in carAttr){
                        const json ={}
                        json.attr_key = key
                        json.attr_value = carAttr[key]
                        arr.push(json)
                    }
                    this.cars_attr = arr
                    }
               
            })
        },
    },
    beforeMount(){
        this.getSelectBrand()
        this.getSelectPark()
        this.getDetail()
    },
    mounted(){}
}
</script>
<style lang="scss" >
@import './carsadd.scss';
</style>

