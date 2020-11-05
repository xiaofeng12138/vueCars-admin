<template>
    <div>
          <el-table :data="tableData"  border style="width: 100%"   v-loading="tableLoading"  element-loading-text="数据加载中">
            <el-table-column v-if="table_config.checkbox" type="selection" width="55" align="center"></el-table-column>
            <template v-for="(item,index) in table_config.thead" >
                 <el-table-column v-if="item.type == 'function'" :prop="item.prop"  :label="item.label" align="center" :width="item.width">
                     <template slot-scope="scope">
                         <span v-html="item.callback && item.callback(scope.row,item.prop)"></span>
                     </template>
                 </el-table-column>
                 <el-table-column v-else-if ="item.type == 'slot'" :prop="item.prop"  :label="item.label" align="center">
                     <template slot-scope="scope">
                         <slot :name = 'item.slotName' :data = 'scope.row'></slot>
                     </template>
                 </el-table-column>
                  <el-table-column v-else-if ="item.type == 'image'" :prop="item.prop"  :label="item.label" align="center" :width="item.width">
                     <template slot-scope="scope">
                         <img :src="scope.row[item.prop]" :width = 'item.imgWidth || 50'  alt="">
                     </template>
                 </el-table-column>
                 <el-table-column v-else-if ="item.type == 'operation'" :prop="item.prop"  :label="item.label" align="center" :width="item.width">
                      <template slot-scope="scope">
                         <el-button  size="mini"  type="danger" v-if="item.defaultBtn && item.defaultBtn.deleteBtn" @click="delFn(scope.row.id)">删除</el-button>
                      </template>
                 </el-table-column>
                 <el-table-column v-else :prop="item.prop"  :label="item.label" align="center"> </el-table-column>
            </template>
           
        </el-table>
        <el-row class="padding-top-25">
            <el-col :span="4" ><div style="padding:5px"></div></el-col>
            <el-col :span="20">
                <el-pagination
                    v-if="table_config.pagination"
                    class="pull-right"
                    background
                    layout="total,prev, pager, next"
                     @current-change="handleCurrentChange"
                    :page-size="10"
                    :total="total">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { tableLoad,deleteFn } from '@/api/common.js'
export default {
    props:{
        configTable:{
            type:Object,
            default:()=>{}
        }
    },
    data() {
        return {
            tableLoading:true, //表格加载loading
            tableData:[],
            table_config:{
                thead:[],
                checkbox:true,
                url:"",
                pagination:true,
                data:{},  
            },
            total:0,
        }
    },
    methods:{
        handleCurrentChange(){},
        initTableData(){
            let requsetData ={
                url:this.table_config.url,
                data:this.table_config.data
            }
          tableLoad(requsetData).then(res=>{
              let data = res.data
              if(res.data.data){
                  this.tableLoading = false
                  this.tableData = data.data
                  this.total = data.total
                }
            
          })
        },
        initConfigData(){
          for(let key in this.configTable){
              if(Object.keys(this.table_config).includes(key)){
                  this.table_config[key] = this.configTable[key]
              }
          }
          this.initTableData()
        },
        //数据请求函数
        requestLoadData(params){
            if(params){
                this.table_config.data = params
                this.initTableData()
            }else{
              this.initTableData()
           } 
        },
        //删除函数
        delFn(row){
           this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning' 
            }).then(() => {
                console.log(3333)
                let requset = {
                     url:this.table_config.url,
                     data:{id:row}
                }
                deleteFn(requset).then((res)=>{
                    if(res.resCode == 0){
                        this.$message({
                            type: 'success',
                            message: res.message
                        });
                        this.initTableData()
                    }
            })
            }).catch(() => { 
                console.log(7777)});
        }
    },
    watch:{
        configTable:{
            handler(newValue){
                this.initConfigData()
            },
            immediate:true
        }
    }
}
</script>
<style lang="scss" scoped>

</style>


