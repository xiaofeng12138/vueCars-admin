<template>
    <div>
        <!--数据表格部分内容-->
         <tableData  :configTable="tableConfig" ref="loadTable">
            <template v-slot:operation = 'slotData'>
                  <el-button type="danger" :disabled="slotData.data.blacklist" size="mini">黑名单</el-button>
                 
            </template>
         </tableData>
       
         <AddCarsBrand :flagVisible.sync = "dialog_show" :configId = 'row_id' @tt = 'fn' />
        <!--弹出框部分内容-->
       

    </div>
</template>
<script>
import tableData from '@c/tableData/index'
import AddCarsBrand from '@/components/dialog/addcarsbrand.vue'
import { BrandDelete,BrandStatus} from '@/api/brand'
export default {
    components:{AddCarsBrand,tableData},
    data() {
    return {
        tableConfig:{
                thead:[
                    {
                        prop:'username',
                        label:'用户名',
                        width:100,
                    },
                    {
                        prop:'truename',
                        label:'真实姓名',
                        width:100,
                    },
                    {
                        prop:'gender',
                        label:'性别',
                        type:'function',
                        callback:(row)=>{
                            return row.gender == 1 ? '男':'女'
                        },
                        width:100,
                    },
                    {
                        prop:'order',
                        label:'租车订单',
                        width:100,
                    },
                    {
                        prop:'illegalAmount',
                        label:'违章预存金',
                        width:100,
                    },
                    {
                        prop:'check_real_name',
                        label:'实名认证',
                        type:'function',
                        callback:(row)=>{
                            return row.check_real_name ? '已认证':'--'
                        },
                    },
                    {
                        prop:'check_cars',
                        label:'驾驶证',
                        type:'function',
                        callback:(row)=>{
                            return row.check_cars ? '已认证':'--'
                        },
                    },
                    {
                        prop:'blacklist',
                        label:'黑名单',
                        type:'function',
                        callback:(row)=>{
                            return row.blacklist ? '是':'否'
                        },
                    },
                     {
                        prop:'',
                        type:'operation',
                        label:'操作',
                        width:400,
                        defaultBtn:{
                            deleteBtn:true,
                            defaultParams:'id',
                            deleteParams:'memberId'
                        },
                        buttonGroup:[
                            {label:'编辑',type:'primary',event:'link',name:'Memberinfo',key:'id',value:'memberId'},
                            {label:'详情',type:'primary',event:'link',name:'Memberdetailed',key:'id',value:'memberId'},
                            // {label:'黑名单',type:'danger',event:'link',name:'Memberdetailed',key:'id',value:'memberId'}
                        ],
                        slotName:'operation'
                    },
                ],
                checkbox:false,
                url:'memberlist',
                data:{
                    pageSize:10,
                    pageNumber:1
                },
                form_item:[
                          { label:'关键字',type:'keyword',width:'150px',options:['username','truename','card_id']},
                    ],
                    button_config:{
                        resetButton:false
                    },
                    // form_hander:[
                    //     {label:'新增车辆品牌', prop:'add',type:'success',elememt:'button',handler:()=>{this.dialog_show = true}},
                    // ]
            },
            
        //弹出框部分
        dialog_show:false,
        form: {
          name: '',
        },
         status_disabled:false,
         row_id:''
      }
    },
    methods:{
        fn(){
           this.search()
        },
        //搜索函数
        search(){
             let requestData ={
                  pageSize:10,
                  pageNumber:1
            }
            if(this.form.name){
                requestData['brand'] = this.form.name
            }
            this.$refs.loadTable.requestLoadData(requestData)
        },
    }
    
}
</script>
<style lang="scss" scoped>

</style>

