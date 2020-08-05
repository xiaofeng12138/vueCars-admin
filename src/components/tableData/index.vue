<template>
    <div>
          <el-table :data="tableData"  border style="width: 100%"   v-loading="tableLoading"  element-loading-text="数据加载中">
            <el-table-column v-if="table_config.checkbox" type="selection" width="55" align="center"></el-table-column>
            <template v-for="(item,index) in table_config.thead" >
                 <el-table-column v-if="item.type == 'function'" :prop="item.prop"  :label="item.label" align="center">
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
                         <img :src="scope.row.imgUrl" :width = 'item.imgWidth'  alt="">
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
import { tableLoad } from '@/api/common.js'
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


