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
                          <el-option  v-for="(item,index) in carsType"  :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="禁启用" >
                        <el-select v-model="form.status" placeholder="请选择" class="w-100">
                          <el-option  v-for="(item,index) in carsStatus"  :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关键字" >
                        <el-select  v-model="keyword" placeholder="请选择"  class="w-100">
                            <el-option label="停车场名称" value="parkingName"></el-option>
                            <el-option label="详细地址" value="address"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item>
                       <el-input placeholder="请输入关键字" v-model="search_key"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="search" >查询</el-button>
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
            <el-table-column prop="type"  label="类型" align="center">
                <template slot-scope="scope">
                    <span>{{getType(scope.row.type)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="address"  label="区域" align="center"></el-table-column>
            <el-table-column prop="carsNumber"  label="可停放车辆" align="center"></el-table-column>
            <el-table-column prop="status"  label="禁启用" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" active-value = "2" inactive-value="1" active-color="#13ce66"  inactive-color="#ff4949"> </el-switch>
                </template>
            </el-table-column>
            <el-table-column  label="查看位置" align="center">
                <template  slot-scope="scope">
                     <el-button size="mini" type="success" @click="openMap(scope.row)">查看地图</el-button>
                </template>
            </el-table-column>
            <el-table-column  label="操作"  align="center">
                 <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
                    <el-button  size="mini"  type="danger" @click="delFn(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row class="padding-top-25">
            <el-col :span="4" ><div style="padding:5px"></div></el-col>
            <el-col :span="20">
                <el-pagination
                    class="pull-right"
                    background
                    layout="total,prev, pager, next"
                    :page-size="10"
                    :total="total">
                </el-pagination>
                <!-- <el-pagination
                   
                    background
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination> -->
            </el-col>
        </el-row>
        <!-- 地图显示弹窗 -->
        <ShowMapModal :flagVisible.sync = "show_modal" :data= 'paramsData'/>
    </div>
</template>
<script>
import { ListParking,deleteParking } from '@/api/parking'
import Cascader from '@c/cascader/index.vue'
import ShowMapModal from '@c/dialog/showMapmodal.vue'
export default {
    components:{Cascader,ShowMapModal},
    data() {
        return {
            paramsData:{},
            show_modal:false,
            //页码总条数
            carsType:this.$store.state.config.parking_type,
            carsStatus:this.$store.state.config.parking_status,
            total:0,
            currentPage:1,
            pageSize:100,
            pageNumber:1,
            form: {
                area:'',
                type: '',
                status:'',
            },
            keyword:'',
            search_key:'',
            options:[],
            tableData:[]
        }
    },
    methods:{
        //删除函数
        delFn(row){
          this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteParking({id:row}).then((res)=>{
            if(res.resCode == 0){
                this.getParkingList()
                this.$message({
                    type: 'success',
                    message: res.message
                });
            }
         })
        }).catch(() => { });
        },

        //类型转换函数
        getType(value){
            const data = this.carsType.filter((item)=> item.value == value)
            if(data && data.length > 0){
                return data[0].label
            }
        },
        //编辑
        edit(row){
            let id = (row)*1
            this.$router.push({
                name:"ParkingAdd",
                query:{
                    id
                }
            })
        },
        openMap(row){
            this.paramsData = row
            this.show_modal = true
        },
        //搜索
        search(){
            this.getParkingList()
        },
        getParkingList(){
            let requestData ={
                  pageSize:this.pageSize,
                  pageNumber:this.pageNumber
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
            ListParking(requestData).then(res=>{
                // console.log(res)
               let data = res.data
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

