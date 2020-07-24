<template>
    <div>
          <el-table :data="tableData"  border style="width: 100%">
            <el-table-column v-if="table_config.checkbox" type="selection" width="55" align="center"></el-table-column>
            <template v-for="(item,index) in table_config.thead" >
                 <el-table-column v-if="item.type == 'function'" :prop="item.prop"  :label="item.label" align="center">
                     <template slot-scope="scope">
                         <span v-html="item.callback && item.callback(scope.row,item.prop)"></span>
                     </template>
                 </el-table-column>

                 <el-table-column v-else :prop="item.prop"  :label="item.label" align="center"> </el-table-column>
            </template>
           
        </el-table>
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
            tableData:[],
            table_config:{
                thead:[],
                checkbox:true,
                url:""
            }
        }
    },
    methods:{
        initTableData(){
            let requsetData ={
                url:this.table_config.url,
                data:{
                    pageSize:10,
                    pageNumber:1
                }
            }
          tableLoad(requsetData).then(res=>{
              let data = res.data
              if(res.data.data){this.tableData = data.data}
          })
        },
        initConfigData(){
          for(let key in this.configTable){
              if(Object.keys(this.table_config).includes(key)){
                  this.table_config[key] = this.configTable[key]
              }
          }
          this.initTableData()
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


