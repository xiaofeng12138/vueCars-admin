<template>
    <div>
        <el-row>
            <el-col :span="18">
                <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px">
                    <el-form-item label="品牌型号">
                        <el-input v-model="form.name" placeholder="请输入车辆品牌型号"></el-input>
                    </el-form-item>
                    <el-form-item label="车辆品牌">
                        <el-select v-model="form.type" placeholder="请选择车辆品牌">
                        <el-option label="室内" value="shanghai"></el-option>
                        <el-option label="室外" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" >查询</el-button>
                    </el-form-item>
                </el-form>
        </el-col>
        <el-col :span="6" >
            <div  class="pull-right">
                 <el-button  type="danger" @click="dialog_show = true ">新增车辆品牌</el-button>
            </div>
        </el-col>
        </el-row>
        

        <!--数据表格部分内容-->
        <el-table :data="tableData"  border style="width: 100%">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="parking_name"  label=" LOGO" align="center"></el-table-column>
            <el-table-column prop="parking_type"  label="车辆品牌" align="center"></el-table-column>
            <el-table-column prop="parking_area"  label="品牌型号" align="center"></el-table-column>
            <el-table-column prop="startUsing"  label="禁启用" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.startUsing" active-color="#13ce66"  inactive-color="#ff4949"> </el-switch>
                </template>
            </el-table-column>
           
            <el-table-column  label="操作"  align="center">
                 <template slot-scope="scope">
                    <el-button
                    size="mini"
                  >编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
         <AddCarsBrand :flagVisible.sync = "dialog_show" />
        <!--弹出框部分内容-->
       

    </div>
</template>
<script>
import AddCarsBrand from '@/components/dialog/addcarsbrand.vue'
export default {
    components:{AddCarsBrand},
    data() {
    return {
        //弹出框部分
        dialog_show:false,
        form: {
          name: '',
          type: '',
          area:''
        },
        options:[
            {
                value:'111',
                label:'上海市',
                children:[
                    {
                      value:'22',
                      label:'杨浦区',  
                      children:[
                            {
                                 value:'33',
                                 label:'五角场街道',  
                            },
                            {
                                 value:'33',
                                 label:'新江湾城街道',  
                            }
                          ]
                    },
                    {
                      value:'22',
                      label:'徐汇区',  
                    }
                ]

            }
        ],
        tableData:[
            {
              parking_name:'上海市杨浦区政仁路81号',
              parking_type:'室外',
              parking_area:'上海市杨浦区',
              parking_num:'50',
              startUsing:1,
              parking_location:'123455,,56978',
            }
            ]
      }
    },
    
}
</script>
<style lang="scss" scoped>

</style>

