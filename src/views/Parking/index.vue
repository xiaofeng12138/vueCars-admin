<template>
    <div>
         <tableData  :configTable="tableConfig" ref="loadTable">
             <!-- 禁启用的插槽 -->
            <template v-slot:status = 'slotData'>
                 <el-switch :disabled="status_disabled" v-model="slotData.data.status" @change="changeStatus(slotData.data)"  active-color="#13ce66"  inactive-color="#ff4949"> </el-switch>
            </template>
             <!-- 查看地图的插槽 -->
             <template v-slot:lnglat = 'slotData'>
                  <el-button size="mini" type="success" @click="openMap(slotData.data)">查看地图</el-button>
            </template>
             <!-- 操作按钮的插槽 -->
             <template v-slot:operate = 'slotData'>
                  <el-button size="mini" @click="edit(slotData.data.id)">编辑</el-button>
                  <el-button  size="mini"  type="danger" @click="delFn(slotData.data.id)">删除</el-button>
            </template>
         </tableData>
       
        <!-- 地图显示弹窗 -->
        <ShowMapModal :flagVisible.sync = "show_modal" :data= 'paramsData'/>
    </div>
</template>
<script>
import { ListParking,deleteParking,statusParking } from '@/api/parking'
import Cascader from '@c/cascader/index.vue'
import ShowMapModal from '@c/dialog/showMapmodal.vue'
import tableData from '@c/tableData/index'
import {address,parkingType} from '@/utils/common.js'
export default {
    components:{Cascader,ShowMapModal,tableData},
    data() {
        return {
            tableConfig:{
                thead:[
                    {prop:'parkingName',label:'停车场名称'},
                    {
                        prop:'type',
                        label:'类型',
                        type:'function',
                        callback:(row,prop)=>{
                            return parkingType(row[prop])
                        }
                    },
                    {
                        prop:'address',
                        label:'区域',
                        type:'function',
                        callback:(row,prop)=>{ return address(row[prop])}
                    },
                    {prop:'carsNumber',label:'可停放车辆'},
                    {
                        prop:'status',
                        type:'slot',
                        label:'禁启用',
                        slotName:'status'
                    },
                    { 
                        prop:'lnglat',
                        label:'查看位置',
                        type:'slot',
                        slotName:'lnglat'
                    },
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
                        defaultBtn:{
                            deleteBtn:true,
                            editBtn:true,
                            routerLink:'ParkingAdd',  
                            defaultClick:false,  //通关点击事件触发跳转
                            defaultParams:'id'
                        },
                        buttonGroup:[
                           {label:'编辑',type:'success',event:'link',name:'ParkingAdd',key:'id',value:'id'}
                        ]
                        // slotN ame:'operationBtn'
                    },
                ],
                checkbox:true,
                url:'parking',
                data:{
                    pageSize:10,
                    pageNumber:1
                },
                 form_item:[
                        { label:'城市', type:'city'},
                        { label:'类型', prop:'type' ,type:'select',width:'120px',options:"parking_type"},
                        { label:'禁启用', prop:'status' , type:'select',width:'120px',options:"brand_status"},
                        { label:'关键字',type:'keyword',width:'150px',options:['parkingName','address']},
                    ],
                    form_hander:[
                        {label:'新增停车场', prop:'add',type:'success',elememt:'link',router:'/parkingAdd'},
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
        //修改车辆品牌禁启用
        changeStatus(row){
            let requestData ={
                id:(row.id)*1,
                status:row.status
            }
            this.status_disabled = true
            statusParking(requestData).then(res=>{
                if(res.resCode == 0){
                   this.$message.success(res.message)
                   this.status_disabled = false
                }
            }).catch(err=>{
                this.status_disabled = false
            })
        },
        //删除函数
        delFn(row){
            this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            deleteParking({id:row}).then((res)=>{
                if(res.resCode == 0){
                    this.$refs.loadTable.requestLoadData()
                    this.$message({
                        type: 'success',
                        message: res.message
                    });
                }
            })
            }).catch(() => { });
        },
        //编辑
        edit(row){
            let id = (row)*1
            this.$router.push({
                name:"ParkingAdd",
                query:{
                    id
                }
            })
        },
        openMap(row){
            this.paramsData = row
            this.show_modal = true
        },
    },
}
</script>
<style lang="scss" scoped>

</style>

