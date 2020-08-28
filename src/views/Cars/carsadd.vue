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
                <div v-for="(item,index) in cars_attr" :key="index" style="margin-bottom:10px;overflow:hidden">
                    <el-row :gutter="20">
                        <el-col :span="2">
                            <el-input value="100"></el-input>
                        </el-col>
                        <el-col :span="3">
                            <el-input value="100"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="primary" v-if="index == 0" @click="addAttr">+</el-button>
                            <el-button  v-else>-</el-button>
                        </el-col>
                    </el-row>
                </div>
            </template>
             <template v-slot:clEnergyType>
                    <el-radio-group v-model="form_data.energyType">
                        <el-radio v-for="(item,index) in energyTypeRadio"  :key="index" :label="item.value" >{{item.label}}</el-radio>
                    </el-radio-group>
                    <div class="energy_bar_wrap" v-if="form_data.energyType == 1">
                        <span class="label-text">电量</span>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <div class="energy_bar">
                                    <span style="width:50%">
                                        <label>90%</label>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <el-input size="small" value="100"></el-input>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="energy_bar_wrap" v-if="form_data.energyType == 2">
                        <span class="label-text">油量</span>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <div class="energy_bar">
                                    <span style="width:50%">
                                        <label>90%</label>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <el-input size="small" value="100"></el-input>
                            </el-col>
                        </el-row>
                    </div>
                     <div class="energy_bar_wrap" v-if="form_data.energyType == 3 ">
                        <span class="label-text">电量</span>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <div class="energy_bar">
                                    <span style="width:50%">
                                        <label>90%</label>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <el-input size="small" value="100"></el-input>
                            </el-col>
                        </el-row>
                        <span class="label-text">油量</span>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <div class="energy_bar">
                                    <span style="width:50%">
                                        <label>90%</label>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <el-input size="small" value="100"></el-input>
                            </el-col>
                        </el-row>
                    </div>
            </template>
            <template v-slot:clDesc = 'slotData'>
                 <div ref="editorDom" style="text-align:left"></div>
            </template>
        </FormData>

        <!-- <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="车辆品牌">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="福特" value="shanghai"></el-option>
                    <el-option label="劳斯莱斯" value="beijing"></el-option>
                    <el-option label="马自达" value="22"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车辆型号">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="福特" value="shanghai"></el-option>
                    <el-option label="劳斯莱斯" value="beijing"></el-option>
                    <el-option label="马自达" value="22"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="停车场">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="福特" value="shanghai"></el-option>
                    <el-option label="劳斯莱斯" value="beijing"></el-option>
                    <el-option label="马自达" value="22"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车牌号" >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="车架号" >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="发动机号" >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年检">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="已年检"></el-radio>
                        <el-radio label="未年检"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="保养日期" >
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div>
                                <el-input v-model="form.name"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="17">
                            <div>
                                下次保养日期：2020-12-01
                            </div>
                        </el-col>
                    </el-row>
                    
                </el-form-item>
                <el-form-item label="档位">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="手动挡"></el-radio>
                        <el-radio label="自动挡"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="能源类型">
                    <el-radio-group v-model="form.energy">
                        <el-radio :label="1">电</el-radio>
                        <el-radio :label="2">油</el-radio>
                        <el-radio :label="3">油电混合</el-radio>
                    </el-radio-group>
                    <div class="energy_bar_wrap" v-if="form.energy == 1 || form.energy == 3">
                        <span class="label-text">电量</span>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <div class="energy_bar">
                                    <span style="width:50%">
                                        <label>90%</label>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <el-input size="small" value="100"></el-input>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="energy_bar_wrap" v-if="form.energy == 2 || form.energy == 3">
                        <span class="label-text">油量</span>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <div class="energy_bar">
                                    <span style="width:50%">
                                        <label>90%</label>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <el-input size="small" value="100"></el-input>
                            </el-col>
                        </el-row>
                    </div>
                </el-form-item>
                <el-form-item label="车辆属性">
                    <div v-for="(item,index) in cars_attr" :key="index" style="margin-bottom:10px;overflow:hidden">
                        <el-row :gutter="20">
                            <el-col :span="2">
                                <el-input value="100"></el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-input value="100"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="primary" v-if="index == 0" @click="addAttr">+</el-button>
                                <el-button  v-else>-</el-button>
                            </el-col>
                        </el-row>
                    </div>
                
                </el-form-item>
                <el-form-item label="车辆描述">
                <div ref="editorDom" style="text-align:left"></div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">立即创建</el-button>
                
                </el-form-item>
        </el-form> -->
    </div>
</template>

<script>
import Editor from 'wangeditor'
import FormData from '@c/form/index'
import {getCarsBrand,getCommonParking} from '@/api/common'
export default {
    components:{FormData},
    data() {
      return {
        //车辆能源
        energyTypeRadio:this.$store.state.config.energyType,
        editor:null,//富文本对象
        cars_attr:[
            {key:100,value:100},
            {key:100,value:100},
            {key:100,value:100},
            {key:100,value:100},
            {key:100,value:100},
        ],
       
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
                required:true,
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
                required:true,
                
            },
            {
                type:'solt',
                label:'车辆属性',
                soltName:'clAttr',
                prop:'carsAttr',
            },
            {
                type:'solt',
                label:'车辆描述',
                soltName:'clDesc',
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
            gear:"1" ,//档位（1：手动，2：自动，3：人工智能）
            energyType:1, //能源类型（1：电，2：油，3：混合动力）
            electric:"", //电量
            oil:"",//油量
            carsAttr:"" ,//车辆属性（{'颜色': '红色', '驱动':'四驱'}）
            content:"" ,//内容介绍
            maintainDate:"", // 保养日期
            status:"", //状态
        },
        //提交按钮部分
        btnConfig:[
            {
                type:'primary',label:'提交',hander:()=>this.submitForm()
            }
        ],
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
        submitForm(){
            console.log(this.form_data)
        },
        addAttr(){
            this.cars_attr.push({key:100,value:100})
        },
        createEditor(){
            this.editor = new Editor(this.$refs.editorDom)
            this.editor.customConfig.onchange = html =>{}
            this.editor.create()  //创建富文本实例
        }
    },
    beforeMount(){
        this.getSelectBrand()
        this.getSelectPark()
    },
    mounted(){
        this.createEditor()
        
    }
}
</script>
<style lang="scss" >
@import './carsadd.scss';
</style>

