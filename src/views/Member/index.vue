<template>
    <div>
        <!--数据表格部分内容-->
         <tableData  :configTable="tableConfig" ref="loadTable">
            <!-- <template v-slot:operation = 'slotData'>
                  <el-button type="danger" :disabled="slotData.data.blacklist" size="mini">黑名单</el-button> 
            </template> -->
            <template v-slot:realName ='slotData'>
                <img :src="imgSrc" class="imgsrc" @click="showImg(slotData)">
            </template>
         </tableData>
       
         <PhoneList :flagVisible.sync = "dialog_show" :title="paramsTitle" :data="photoArray" />
        <!--弹出框部分内容-->
    </div>
</template>
<script>
import tableData from '@c/tableData/index'
import AddCarsBrand from '@/components/dialog/addcarsbrand.vue'
import { updateRealName,updateBlacklist,CheckPhoto,AmountClear} from '@/api/member'
import PhoneList from '@c/dialog/phonelist'
export default {
    components:{AddCarsBrand,tableData,PhoneList},
    data() {
    return {
        dialog_show:false,
        photoArray:[],
        paramsTitle:'',
        imgSrc:require('@/assets/logo.png'),
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
                        prop:'gilding',
                        label:'押金',
                    },
                    {
                        prop:'amount',
                        label:'余额',
                    },
                    {
                        prop:'illegalAmount',
                        label:'违章预存金',
                    },
                    {
                        prop:'check_real_name',
                        label:'实名认证',
                        type:'switch',
                        hander:(status,data,type)=>this.handerRealName(status,data,'identity'),
                        slotName:'realName'
                    },
                    {
                        prop:'check_cars',
                        label:'驾驶证',
                        type:'switch',
                        hander:(status,data,type)=>this.handerRealName(status,data,'drive'),
                        slotName:'realName'
                    },
                    {
                        prop:'blacklist',
                        label:'黑名单',
                        type:'function',
                        type:'switch',
                        hander:(status,data)=>this.handerUpdateBlacklist(status,data,)
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
                            {label:'清空',type:'primary',event:'button',hander:(data)=>{this.clearAmount(data)}},
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
        //清空
        clearAmount(data){
           AmountClear({member_id:data.memberId}).then(res=>{
               this.$refs.loadTable.initTableData()
           })
        },
        //打开图片弹窗
        showImg(slotData){
            this.paramsTitle = slotData.type == 'check_cars' ? '驾驶证':"实名认证"
            this.dialog_show = true
            let requestData ={
                id:slotData.data.memberId,
                type:slotData.type == 'check_cars' ? 'drive':"identity"
            }
            let newArray = []
            CheckPhoto(requestData).then(res=>{
                if(res.data){
                    for(let key in res.data){
                       newArray.push(res.data[key])
                    }
                }
                this.photoArray = newArray
            })
        },
        //修改实名认证
        handerRealName(status,data,type){
            let requsetData ={
                id:data.memberId,
                status,
                type
            }
            updateRealName(requsetData).then(res=>{
                this.$message.success(res.message)
            })
        },
         //黑名单
        handerUpdateBlacklist(status,data){
            let requsetData ={
                id:data.memberId,
                status,
            }
            updateBlacklist(requsetData).then(res=>{
                this.$message.success(res.message)
            })
        },
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
.imgsrc{
    display: inline-block;
    vertical-align: middle;
    width:40px;
    margin-left: 10px;
    cursor: pointer;
}
</style>

