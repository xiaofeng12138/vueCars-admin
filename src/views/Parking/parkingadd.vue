<template>
    <div>
        <FormData ref="vueForm" :formData="form_data" :formItem ="formConfig" :formBtn = "btnConfig">
           <template v-slot:city = 'slotData'>
                <Cascader  ref="area" :areaValue.sync = "form_data.area" @callback = "setMapCenter" :mapLocation = "true"/>
            </template>
             <template v-slot:map = 'slotData'>
                <div class="allMap">
                    <Amap  :options="options_map" @showLonLat ='getLonLatValue' ref="amap" @callback='mapLoad'/>
                </div>
            </template>
        </FormData>



        <!-- <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="停车场名称" prop="parkingName">
                <el-input v-model="form.parkingName"></el-input>
            </el-form-item>
            <el-form-item label="区域" prop="area" >
                <Cascader  ref="area" :areaValue.sync = "form.area" @callback = "setMapCenter" :mapLocation = "true"/>
            </el-form-item>
            <el-form-item label="街道名称" prop="address"  >
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-radio-group v-model="form.type">
                    <el-radio v-for="(item,index) in carsType" :label="item.value" :key="index">{{item.label}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="可停放车辆" prop="carsNumber" >
                <el-input v-model.number="form.carsNumber"></el-input>
            </el-form-item>
            <el-form-item label="禁启用">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(item,index) in carsStatus" :key="index"  :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="经纬度" prop="lnglat">
                <el-input v-model="form.lnglat"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')" :loading="button_status">提交</el-button>
            </el-form-item>
        </el-form> -->
    </div>
</template>

<script>
import Amap from '@/views/Amap/index.vue'
import Cascader from '@c/cascader/index.vue'
import FormData from '@c/form/index'
import { addParking,detailParking,editParking} from '@/api/parking'
import { constants } from 'zlib';

export default {
    components:{Amap,Cascader,FormData},
    data() {
        //自定义正则
      let validatePass =(rule, value,callback)=>{
           console.log(value)
           if(value === ''){
               callback (new Error('请输入停车场名称'))
           }else{
               callback()
           }
      }
       let validateNumber =(rule, value,callback)=>{
           console.log(value)
           let regNum = /^[0-9]*$/
           if(value === ''){
               callback (new Error('请输入可停放车辆'))
           }else if(!regNum.test(value)){
                 callback (new Error('请输入数字'))
           }else{
               callback()
           }
      }
      return {
        //表单数据配置
        form_data:{
            parkingName:'',
            area:'',
            address:'',
            type:'',
            carsNumber:'',
            status:'',
            lnglat:''

        },
        //表单配置
        formConfig:[
            {
                type:'input' ,label:'停车场名称',placeholder:'请输入停车场名称',prop:'parkingName',width:'300px',
                required:true,
                
            },
            {type:'solt' , soltName:'city', label:'区域', prop:'area'},
            {type:'input' ,label:'街道名称',placeholder:'请输入街道名称',prop:'address',width:'300px',  required:true,},
            {type:'radio' ,label:'类型',prop:'type',option:this.$store.state.config.parking_type,},
            {type:'input' ,label:'可停放车辆',placeholder:'请输入车辆数目',prop:'carsNumber',width:'300px'},
            {type:'radio' ,label:'禁启用',prop:'status',option:this.$store.state.config.parking_status,},
            {type:'solt' , soltName:'map', label:'地图'},
            {type:'input' ,label:'经纬度',placeholder:'请选择经纬度',prop:'lnglat',width:'300px',disabled:true},
        ],
        btnConfig:[
            {
                type:'primary',label:'提交',hander:()=>this.submitForm()
            }
        ],
        //地图回调配置
        options_map:{
            mapload:true
        },
        id:this.$route.query.id,
        button_status:false,
      }
    },
    methods:{
        //表单回调函数
        submitForm(){
            this.$refs.vueForm.$refs.form.validate((valid)=>{
                if (valid) {
                    this.button_status = true
                    if(this.id){
                        this.submitEdit()
                    }else{
                        addParking(this.form_data).then(res=>{
                            if(res.resCode == 0){
                            this.$message.success(res.message);
                            this.$refs[formName].resetFields();
                            this.button_status = false
                            _this.$refs.amap.clearMarker()
                            _this.$refs.area.clearArea()
                            this.$router.push({name:'ParkingIndex'})
                            }
                        })
                }
               
            } else {
                console.log('error submit!!');
                return false;
            }
            })
        },
        //地图加载完成
        mapLoad(){
           if(!this.id){ return false}
           this.getDetail()
        },
        //获取详情
        getDetail(){
            detailParking({id:this.id}).then(res=>{
                //数据还原
                const data = res.data
                for(let key in data){
                    if(Object.keys(this.form_data).includes(key)){
                        this.form_data[key] = data[key]
                    }
                }

                // 还原覆盖物
                let lnglatArray = data.lnglat.split(',')
                let lnglat = {
                    lon:lnglatArray[0],
                    lat:lnglatArray[1],
                }
               this.$refs.amap.setMarker(lnglat)
               this.$refs.area.initDefault(data.region)

            })
        },
        //修改提交函数
        submitEdit(){
            let requestData = JSON.parse(JSON.stringify(this.form_data))
            requestData.id = this.id
             editParking(requestData).then(res=>{
                    if(res.resCode == 0){
                       this.$message.success(res.message);
                       this.button_status = false
                       this.$router.push({name:'ParkingIndex'})
                    }
                })
        },
        setMapCenter(data){
            this.$refs.amap.setNewMapCenter(data)
        },
        //获取经纬度函数
        getLonLatValue(data){
            // console.log(data)
            this.form_data.lnglat = data.value
        }
    },
}
</script>
<style lang="scss" scoped>

.allMap{
    width: 100%;
    height: 500px;
}
</style>

