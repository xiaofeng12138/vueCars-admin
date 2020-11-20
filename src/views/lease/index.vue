<template>
    <div>
         <tableData  :configTable="tableConfig" ref="loadTable"></tableData>
         <addLease :flagVisible.sync = "dialog_show" :data="current_data" @callbackComponents = 'callbackComponents' />
    </div>
</template>
<script>
import { LeaseStatus,getLeaseList } from '@/api/lease.js'
import tableData from '@c/tableData/index'
import {address,yearCheckType,energyType} from '@/utils/common.js'
import addLease from '@c/dialog/addlease.vue'
export default {
    components:{addLease,tableData},
    data() {
        return {
            tableConfig:{
                pagination:false,
                isRequest:false,
                thead:[
                    {prop:'carsLeaseTypeName',label:'租赁类型'},
                    {prop:'carsLeaseStatus',
                        label:'禁启用状态',
                        type:'switch',
                        hander:(val)=>{this.changeStatus(val)}
                    },
                    {prop:'carsLeaseDesc',label:'描述'},
                    {prop:'key',label:'车辆列表',width:'800px'},
                    {
                        prop:'',
                        type:'operation',
                        label:'操作',
                        defaultBtn:{
                            deleteBtn:true,
                            defaultParams:'id',
                            deleteParams:'carsLeaseTypeId'
                        },
                        buttonGroup:[
                            {label:'编辑',type:'success',event:'button',hander:(val)=>this.editFn(val)},
                            // {label:'查看',type:'primary',event:'link',name:'CarsbrandIndex',key:'id',value:'carsLeaseTypeId'}
                        ]
                        // slotName:'operationBtn'
                    },
                ],
                checkbox:false,
                url:'leaselist',
                 //搜索框传参
                form_item:[
                        { label:'关键字',type:'keyword',width:'150px',options:['key','value']},
                    ],
                form_hander:[
                        {label:'新增属性', prop:'add',type:'success',elememt:'button',handler:() => this.addFn()},
                ]
            },
            //弹出框部分
            dialog_show:false,
            status_disabled:false,
            paramsData:{},
            show_modal:false,
            //页码总条数
            form: {
                area:'',
                type: '',
                status:'',
            },
            keyword:'',
            search_key:'',
            //存储当前数据
            current_data:{}
        }
    },
    methods:{
        editFn(data){
            console.log(data)
            let copyData = Object.assign({},data)
            this.current_data = copyData
            this.dialog_show = true
        },
        //修改状态函数
        changeStatus(val){
            if(val){
                let requsetData ={
                id:val.carsLeaseTypeId,
                status:val.carsLeaseStatus
              }
                LeaseStatus(requsetData).then(res=>{
                   this.$message.success(res.message)
                })
            }
           
        },
        callbackComponents(params){
            if(params.function){
                this[params.function]()
            }
        },
        loadData(){
            this.$refs.loadTable.requestLoadData()
        },
        //点击新增函数
        addFn(){
          this.dialog_show = true
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
        getList(){
            this.$refs.loadTable.requestLoadData()
        }
       
    },
    mounted(){
        this.getList()
    }
}
</script>
<style lang="scss" scoped>

</style>

