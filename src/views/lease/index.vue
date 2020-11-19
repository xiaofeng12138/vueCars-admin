<template>
    <div>
         <tableData  :configTable="tableConfig" ref="loadTable"></tableData>

         <addLease :flagVisible.sync = "dialog_show" :data = "current_data" @callbackComponents = 'callbackComponents' />
    </div>
</template>
<script>
import { LeaseStatus,getLeaseList } from '@/api/lease.js'
import Cascader from '@c/cascader/index.vue'
import tableData from '@c/tableData/index'
import {address,yearCheckType,energyType} from '@/utils/common.js'
import addLease from '@c/dialog/addlease.vue'
export default {
    components:{addLease,tableData,Cascader},
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
                    {prop:'key',label:'车辆列表',width:'800px'},
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
            chooseId:'',
            //存储当前数据
            current_data:{}
        }
    },
    methods:{
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
        //点击选中按钮
        choose(item){
            this.chooseId = item.id
            this.current_data = item
            this.$refs.loadTable.requestLoadData({typeId:item.id})
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

