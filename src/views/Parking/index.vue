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
        
         <tableData  :configTable="tableConfig" ref="loadTable">
             <!-- 禁启用的插槽 -->
            <template v-slot:status = 'slotData'>
                 <el-switch v-model="slotData.data.status" active-value = "2" inactive-value="1" active-color="#13ce66"  inactive-color="#ff4949"> </el-switch>
            </template>
             <!-- 查看地图的插槽 -->
             <template v-slot:lnglat = 'slotData'>
                  <el-button size="mini" type="success" @click="openMap(slotData.data)">查看地图</el-button>
            </template>
             <!-- 操作按钮的插槽 -->
             <template v-slot:operate = 'slotData'>
                  <el-button size="mini" @click="edit(slotData.data.id)">编辑</el-button>
                  <el-button  size="mini"  type="danger" @click="delFn(slotData.data.id)">删除</el-button>
            </template>
         </tableData>
       
        <!-- 地图显示弹窗 -->
        <ShowMapModal :flagVisible.sync = "show_modal" :data= 'paramsData'/>
    </div>
</template>
<script>
import { ListParking,deleteParking } from '@/api/parking'
import Cascader from '@c/cascader/index.vue'
import ShowMapModal from '@c/dialog/showMapmodal.vue'
import tableData from '@c/tableData/index'
import {address,parkingType} from '@/utils/common.js'
export default {
    components:{Cascader,ShowMapModal,tableData},
    data() {
        return {
            tableConfig:{
                thead:[
                    {prop:'parkingName',label:'停车场名称'},
                    {
                        prop:'type',
                        label:'类型',
                        type:'function',
                        callback:(row,prop)=>{
                            return parkingType(row[prop])
                        }
                    },
                    {
                        prop:'address',
                        label:'区域',
                        type:'function',
                        callback:(row,prop)=>{ return address(row[prop])}
                    },
                    {prop:'carsNumber',label:'可停放车辆'},
                    {
                        prop:'status',
                        type:'slot',
                        label:'禁启用',
                        slotName:'status'
                    },
                    { 
                        prop:'lnglat',
                        label:'查看位置',
                        type:'slot',
                        slotName:'lnglat'
                    },
                    {
                        prop:'',
                        label:'操作',
                        type:'slot',
                        slotName:'operate'
                    },
                ],
                checkbox:true,
                url:'parking',
                data:{
                    pageSize:10,
                    pageNumber:1
                }
            },
            paramsData:{},
            show_modal:false,
            //页码总条数
            carsType:this.$store.state.config.parking_type,
            carsStatus:this.$store.state.config.parking_status,
            //停车场类型json
            parking_type_json:this.$store.state.config.parking_type_json,
            form: {
                area:'',
                type: '',
                status:'',
            },
            keyword:'',
            search_key:'',
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
                    this.$refs.loadTable.requestLoadData()
                    this.$message({
                        type: 'success',
                        message: res.message
                    });
                }
            })
            }).catch(() => { });
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
    },
}
</script>
<style lang="scss" scoped>

</style>

