<template>
    <div>
        <!-- <el-row>
            <el-col :span="18">
                <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px">
                    <el-form-item label="车辆品牌">
                        <el-input v-model="form.name" placeholder="请输入车辆品牌型号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="search">查询</el-button>
                    </el-form-item>
                </el-form>
        </el-col>
        <el-col :span="6" >
            <div  class="pull-right">
                 <el-button  type="danger" @click="dialog_show = true ">新增车辆品牌</el-button>
            </div>
        </el-col>
        </el-row> -->
        

        <!--数据表格部分内容-->
         <tableData  :configTable="tableConfig" ref="loadTable">
             <!-- 禁启用的插槽 -->
            <template v-slot:status = 'slotData'>
                <el-switch :disabled="status_disabled" v-model="slotData.data.status"  @change="changeStatus(slotData.data)" active-color="#13ce66"  inactive-color="#ff4949"> </el-switch>
            </template>
             <!-- 查看地图的插槽 -->
          
             <!-- 操作按钮的插槽 -->
             <template v-slot:operate = 'slotData'>
                  <el-button size="mini" @click="edit(slotData.data.id)">编辑</el-button>
                  <el-button  size="mini"  type="danger" @click="delFn(slotData.data.id)">删除</el-button>
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
                        prop:'imgUrl',
                        label:'LOGO',
                        type:'image',
                        slotName:'imgSrc',
                        imgWidth:50,
                        width:100,
                    },
                    {
                        prop:'type',
                        label:'车辆品牌',
                        type:'function', 
                        callback:(row,prop)=>{return row.nameCh + '--'+ row.nameEn}
                    },
                    
                    {
                        prop:'status',
                        type:'slot',
                        label:'禁启用',
                        slotName:'status'
                    },
                    {
                        prop:'',
                        label:'操作',
                        type:'slot',
                        slotName:'operate'
                    },
                ],
                checkbox:true,
                url:'brand',
                data:{
                    pageSize:10,
                    pageNumber:1
                },
                form_item:[
                        { label:'车辆品牌', prop:'brand',type:'input',placeholder:'请输入车辆品牌',width:'200px'},
                    ],
                    button_config:{
                        resetButton:false
                    },
                    form_hander:[
                        {label:'新增车辆品牌', prop:'add',type:'success',elememt:'button',handler:()=>{this.dialog_show = true}},
                    ]
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
        //删除函数
        delFn(row){
            this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            BrandDelete({id:row}).then((res)=>{
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
        //修改禁启用状态
        changeStatus(row){
            let requestData ={
                id:(row.id)*1,
                status:row.status
            }
            this.status_disabled = true
            BrandStatus(requestData).then(res=>{
                if(res.resCode == 0){
                   this.$message.success(res.message)
                   this.status_disabled = false
                }
            }).catch(err=>{
                this.status_disabled = false
            })
        },
         //编辑
        edit(row){
           this.row_id = row
           this.dialog_show = true
        },
    }
    
}
</script>
<style lang="scss" scoped>

</style>

