<template>
    <div>
        
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
import { orderWait,orderOvertime,orderOver,orderCancel,orderReturn } from '@/api/order.js'
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
                    {
                        prop:'order_no',
                        label:'订单号'
                    },
                    {
                        prop:'order_status',
                        label:'状态',
                        type:'function',
                        width:100,
                        callback:(row)=>{
                            let order_status = this.$store.state.config.order_status
                            let orderKey = order_status [row.order_status]
                            return orderKey ? orderKey.zh: ''
                        }
                    },
                    {
                        prop:'subscribe_cars_date',
                        label:'日期',
                    }, {
                        prop:'carsLeaseTypeName',
                        label:'金额',
                    },
                    {
                        prop:'',
                        type:'operation',
                        label:'操作',
                        width:550,
                        defaultBtn:{
                            deleteBtn:true,
                            editBtn:true,
                            routerLink:'CarsaddIndex',  
                            defaultClick:false,  //通关点击事件触发跳转
                            defaultParams:'id'
                        },
                        buttonGroup:[
                           {label:'待取车',type:'primary',event:'button',hander:(data)=>this.orderWaitFn(data)},
                           {label:'超时',type:'primary',event:'button',hander:(data)=>this.orderOvertimeFn(data)},
                           {label:'完成',type:'primary',event:'button',hander:(data)=>this.orderOverFn(data)},
                           {label:'取消',type:'primary',event:'button',hander:(data)=>this.orderCancelFn(data)},
                           {label:'待还车',type:'primary',event:'button',hander:(data)=>this.orderReturnFn(data)},
                        ]
                        // slotName:'operationBtn'
                    },
                ],
                checkbox:true,
                url:'orderlist',
                data:{
                    pageSize:100,
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
        orderWaitFn(data){
          orderWait({order_no:data.order_no,cars_id:data.cars_id}).then(res=>{
              this.$refs.loadTable.initTableData()
          })
        },
        orderOvertimeFn(data){
            orderOvertime({order_no:data.order_no,cars_id:data.cars_id}).then(res=>{
              this.$refs.loadTable.initTableData()
          })
        },
        orderOverFn(data){
            orderOver({order_no:data.order_no,cars_id:data.cars_id}).then(res=>{
              this.$refs.loadTable.initTableData()
          })
        },
        orderCancelFn(data){
            orderCancel({order_no:data.order_no,cars_id:data.cars_id}).then(res=>{
            this.$refs.loadTable.initTableData()
          })
        },
        orderReturnFn(data){
            orderReturn({order_no:data.order_no,cars_id:data.cars_id}).then(res=>{
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

