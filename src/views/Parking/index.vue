<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="21">
                <el-form :inline="true" :model="form" class="demo-form-inline">
                     <el-form-item label="区域">
                        <Cascader  ref="area" :areaValue.sync = "form.area"/>
                    </el-form-item>
                     <el-form-item label="类型" >
                        <el-select v-model="form.type" placeholder="停车场" class="w-100">
                        <el-option label="室内" value="shanghai"></el-option>
                        <el-option label="室外" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="禁启用" >
                        <el-select v-model="form.status" placeholder="请选择" class="w-100">
                        <el-option label="禁用" value="shanghai"></el-option>
                        <el-option label="启用" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关键字" >
                        <el-select  v-model="form.status" placeholder="请选择"  class="w-100">
                        <el-option label="停车场名称" value="shanghai"></el-option>
                        <el-option label="详细地址" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item>
                       <el-input placeholder="请输入关键字"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" >查询</el-button>
                    </el-form-item>
                </el-form>
        </el-col>
        <el-col :span="3" >
            <div  class="pull-right">
                <router-link to='/parkingAdd'> <el-button  type="danger">添加停车场</el-button></router-link>
                </div>
        </el-col>
        </el-row>
        

        <!--数据表格部分内容-->
        <el-table :data="tableData"  border style="width: 100%">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="parkingName"  label=" 停车场名称" align="center"></el-table-column>
            <el-table-column prop="type"  label="类型" align="center"></el-table-column>
            <el-table-column prop="address"  label="区域" align="center"></el-table-column>
            <el-table-column prop="carsNumber"  label="可停放车辆" align="center"></el-table-column>
            <el-table-column prop="status"  label="禁启用" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" active-value = "2" inactive-value="1" active-color="#13ce66"  inactive-color="#ff4949"> </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="lnglat"  label="查看位置" align="center"></el-table-column>
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
        <el-row class="padding-top-25">
            <el-col :span="4" ><div style="padding:5px"></div></el-col>
            <el-col :span="20">
                <el-pagination
                    class="pull-right"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </el-col>
        </el-row>
        
    </div>
</template>
<script>
import { ListParking } from '@/api/parking'
import Cascader from '@c/cascader/index.vue'
export default {
    components:{Cascader},
    data() {
        return {
            //页码总条数
            total:0,
            currentPage:1,
            pageSize:10,
            pageNumber:1,
            form: {
                name: '',
                type: '',
                area:'',
                status:''
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
            tableData:[]
        }
    },
    methods:{
        getParkingList(){
            let requestData ={
                  pageSize:this.pageSize,
                  pageNumber:this.pageNumber
            }
           ListParking(requestData).then(res=>{
               let data = res.data
               console.log(data.data)
               if(res.data.data){this.tableData = data.data}
               if(res.data.total){this.total = data.total}
                
           })
        },
        //选择每页条数
        handleSizeChange(value){
            this.pageSize = value
            this.getParkingList()
        },
        handleCurrentChange(){}
    },
    beforeMount(){
        this.getParkingList()
    }

    
}
</script>
<style lang="scss" scoped>

</style>

