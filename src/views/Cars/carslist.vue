<template>
    <div>
        <!-- <el-row :gutter="10">
            <el-col :span="21">
                <el-form :inline="true" :model="form" class="demo-form-inline">
                     <el-form-item label="区域">
                        <Cascader  ref="area" :areaValue.sync = "form.area"/>
                    </el-form-item>
                     <el-form-item label="类型" > 
                        <el-select v-model="form.type" placeholder="停车场" class="w-100">
                          <el-option  v-for="(item,index) in carsType"  :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="禁启用" >
                        <el-select v-model="form.status" placeholder="请选择" class="w-100">
                          <el-option  v-for="(item,index) in carsStatus"  :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关键字" >
                        <el-select  v-model="keyword" placeholder="请选择"  class="w-100">
                            <el-option label="停车场名称" value="parkingName"></el-option>
                            <el-option label="详细地址" value="address"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item>
                       <el-input placeholder="请输入关键字" v-model="search_key"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="search" >查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        <el-col :span="3" >
            <div  class="pull-right">
                <router-link to='/carsaddIndex'> <el-button  type="danger">新增车辆</el-button></router-link>
                </div>
        </el-col>
        </el-row> -->
        
         <tableData  :configTable="tableConfig" ref="loadTable">
             <!-- 禁启用的插槽 -->
            <template v-slot:status = 'slotData'>
                 <el-switch :disabled="status_disabled" v-model="slotData.data.status" @change="changeStatus(slotData.data)"  active-color="#13ce66"  inactive-color="#ff4949"> </el-switch>
            </template>
             <!-- 操作按钮的插槽 -->
            <!-- <template v-slot:operate = 'slotData'>
                  <el-button size="mini" @click="edit(slotData.data.id)">编辑</el-button>
                  <el-button  size="mini"  type="danger" @click="delFn(slotData.data.id)">删除</el-button>
            </template> -->
             <template v-slot:operationBtn = 'slotData'>
                  <el-button size="mini" @click="edit(slotData.data.id)">修改</el-button>
            </template>
         </tableData>
       
        <!-- 地图显示弹窗 -->
        <ShowMapModal :flagVisible.sync = "show_modal" :data= 'paramsData'/>
    </div>
</template>
<script>
import { CarsDelete,CarsStatus,CarsLock } from '@/api/cars.js'
import Cascader from '@c/cascader/index.vue'
import ShowMapModal from '@c/dialog/showMapmodal.vue'
import tableData from '@c/tableData/index'
import {address,yearCheckType,energyType} from '@/utils/common.js'
export default {
    components:{Cascader,ShowMapModal,tableData},
    data() {
        return {
            tableConfig:{
                thead:[
                    {prop:'carsMode',label:'车辆型号'},
                    {prop:'nameCh',label:'车牌标识'},
                    {
                        prop:'imgUrl',
                        type:'image',
                        label:'车辆LOGO',
                    }, {
                        prop:'carsImg',
                        type:'image',
                        label:'车辆图片',
                    },
                    {
                        prop:'yearCheck',
                        label:'年检',
                        type:'function',
                        callback:(row,prop)=>{
                            return yearCheckType(row[prop])
                        }
                    },
                    {
                        prop:'order_status',
                        label:'状态',
                        type:'function',
                        width:100,
                        callback:(row)=>{
                            let order_status = this.$store.state.config.cars_status
                            let orderKey = order_status [row.carsStatus]
                            return orderKey ? orderKey.zh: ''
                        }
                    },
                    {
                        prop:'energyType',
                        label:'能源类型',
                        type:'function',
                        callback:(row,prop)=>{
                            return energyType(row[prop])
                        }
                    },
                    {prop:'parkingName',label:'停车场名称'},
                    {
                        prop:'status',
                        type:'slot',
                        label:'禁启用',
                        slotName:'status'
                    },
                     {prop:'address',label:'区域'},
                    // {
                    //     prop:'',
                    //     label:'操作',
                    //     type:'slot',
                    //     slotName:'operate'
                    // },
                    {
                        prop:'',
                        type:'operation',
                        label:'操作',
                        width:240,
                        defaultBtn:{
                            deleteBtn:true,
                            editBtn:true,
                            routerLink:'CarsaddIndex',  
                            defaultClick:false,  //通关点击事件触发跳转
                            defaultParams:'id'
                        },
                        buttonGroup:[
                           {label:'解锁',type:'primary',event:'button',hander:(data)=>this.lockCar(data)},
                           {label:'编辑',type:'success',event:'link',name:'CarsaddIndex',key:'id',value:'id'}
                        ]
                        // slotName:'operationBtn'
                    },
                ],
                checkbox:true,
                url:'carslist',
                data:{
                    pageSize:10,
                    pageNumber:1
                },
                 //搜索框传参
                form_item:[
                        { label:'城市', type:'city'},
                        { label:'类型', prop:'type' ,type:'select',width:'120px',options:"parking_type"},
                        { label:'禁启用', prop:'status' , type:'select',width:'120px',options:"brand_status"},
                        { label:'关键字',type:'keyword',width:'150px',options:['parkingName','address']},
                    ],
                form_hander:[
                        {label:'新增车辆', prop:'add',type:'success',elememt:'link',router:'/carsaddIndex'},
                        // {label:'下载', prop:'add',type:'success',elememt:'button',handler:()=>{this.aaa()}},
                ]
            },
            
            
            status_disabled:false,
            paramsData:{},
            show_modal:false,
            //页码总条数
            carsType:this.$store.state.config.parking_type,
            carsStatus:this.$store.state.config.parking_status,
            //停车场类型json
            parking_type_json:this.$store.state.config.parking_type_json,
            form: {
                area:'',
                type: '',
                status:'',
            },
            keyword:'',
            search_key:'',
        }
    },
    methods:{
        aaa(){
            alert('333')
        },
        lockCar(data){
            CarsLock({id:data.id}).then(res=>{
                this.$refs.loadTable.initTableData()
            })
        },
        //修改车辆品牌禁启用
        changeStatus(row){
            let requestData ={
                id:(row.id)*1,
                status:row.status
            }
            this.status_disabled = true
            CarsStatus(requestData).then(res=>{
                if(res.resCode == 0){
                   this.$message.success(res.message)
                   this.status_disabled = false
                }
            }).catch(err=>{
                this.status_disabled = false
            })
        },
        openMap(row){
            this.paramsData = row
            this.show_modal = true
        },
        //搜索
        search(){
             let requestData ={
                  pageSize:10,
                  pageNumber:1
            }
            let newForm = JSON.parse(JSON.stringify(this.form)) //深度拷贝form对象
            
            for(let key in newForm){
                if(newForm[key]){
                   requestData[key] = newForm[key]
                }
            }
            if(this.keyword && this.search_key){
                requestData[this.keyword] = this.search_key
            }
            this.tableConfig.data = requestData
            this.$refs.loadTable.requestLoadData(requestData)
        },
    },
}
</script>
<style lang="scss" scoped>

</style>

