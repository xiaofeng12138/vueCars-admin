<template>
    <div>
         <tableData  :configTable="tableConfig" ref="loadTable">
             <!-- 禁启用的插槽 -->
            <template v-slot:status = 'slotData'>
                 <el-switch :disabled="status_disabled" v-model="slotData.data.status" @change="changeStatus(slotData.data)"  active-color="#13ce66"  inactive-color="#ff4949"> </el-switch>
            </template>
            <!-- 属性列表的slot -->
            <template v-slot:content>
                 <div  style="margin-bottom:25px">
                     <el-button size="small" v-for="(item,index) in carsAttrListArray"  :type = "chooseId == item.id ? 'success':''" :key="index"  @click="choose(item)"> {{item.value}}</el-button>
                 </div>
            </template>
         </tableData>
         <addCarsAttr :flagVisible.sync = "dialog_show" :data = "current_data" />
    </div>
</template>
<script>
import {CarsAttr ,CarsAttrList} from '@/api/carstype.js'
import Cascader from '@c/cascader/index.vue'
import tableData from '@c/tableData/index'
import {address,yearCheckType,energyType} from '@/utils/common.js'
import addCarsAttr from '@c/dialog/addcarsAttr.vue'
export default {
    components:{Cascader,tableData,addCarsAttr},
    data() {
        return {
            tableConfig:{
                pagination:false,
                isRequest:false,
                thead:[
                    {prop:'value',label:'文本'},
                    {prop:'key',label:'字段'},
                ],
                checkbox:false,
                url:'carsAttrlist',
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
            carsAttrListArray:[],
            chooseId:'',
            //存储当前数据
            current_data:{}
        }
    },
    methods:{
        //点击新增函数
        addFn(){
            if(!this.current_data.id){
                this.$message.error('请选择车辆属性！')
                return false
            }
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
        getAttrList(){
           return CarsAttr().then(res=>{
                const data = res.data.data
                this.carsAttrListArray = res.data.data
                return data
            })
        },

        //async  await  解决异步操作

        async getCarsType(){
              const data = await this.getAttrList()
              this.chooseId = data[0].id
              this.$refs.loadTable.requestLoadData({typeId:data[0].id})
        }
    },
    mounted(){
        this.getCarsType()
    }
}
</script>
<style lang="scss" scoped>

</style>

