<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
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
                <el-radio v-for="(item,index) in carsType" :label="item.label" :value="item.value" :key="index" ></el-radio>
                <!-- <el-radio label="室内"></el-radio>
                <el-radio label="室外"></el-radio> -->
            </el-radio-group>
        </el-form-item>
         <el-form-item label="可停放车辆" prop="carsNumber" >
            <el-input v-model.number="form.carsNumber"></el-input>
        </el-form-item>
        <el-form-item label="禁启用">
            <el-radio-group v-model="form.status">
                 <el-radio v-for="(item,index) in carsStatus" :key="index" :value="item.value" :label="item.label"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="地图">
           <div class="allMap">
               <Amap  @showLonLat = 'getLonLatValue' ref="amap" />
           </div>
        </el-form-item>
         <el-form-item label="经纬度" prop="lnglat">
            <el-input v-model="form.lnglat"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('form')" :loading="button_status">提交</el-button>
            
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Amap from '@/views/Amap/index.vue'
import Cascader from '@c/cascader/index.vue'
import { addParking} from '@/api/parking'

export default {
    components:{Amap,Cascader},
    data() {
      return {
        button_status:false,
        carsType:[
            {label:'室内',value:1},
            {label:'室外',value:2}
            ],
        carsStatus:[
            {label:'禁用',value:1},
            {label:'启用',value:2}
        ],
        form: {
          parkingName:'',
          area: '',
          address: '',
          type: '',
          carsNumber: '',
          status: '',
          lnglat:'',
          content: '',
        },
         rules: {
          parkingName: [
            { required: true, message: '请输入停车场名称', trigger: 'change' },
          ],
          address: [
              { required: true, message: '请输入街道名称', trigger: 'change' },
          ],
          area: [
            { required: true, message: '请选择省市区', trigger: 'change' }
          ],
          lnglat: [
            {  required: true, message: '请选择经纬度', trigger: 'change' }
          ],
          carsNumber: [
            {  required: true, message: '请输入车辆数', trigger: 'change' },
            { type: 'number', message: '请输入数字'}
          ],
        }
      }
    },
    methods:{
        
        setMapCenter(data){
            this.$refs.amap.setNewMapCenter(data)
        },
        submitForm(formName){
           const _this = this
            this.$refs[formName].validate((valid) => {
            if (valid) {
                 this.button_status = true
                addParking(this.form).then(res=>{
                    if(res.resCode == 0){
                       this.$message.success(res.message);
                       this.$refs[formName].resetFields();
                       this.button_status = false
                       _this.$refs.amap.clearMarker()
                       _this.$refs.area.clearArea()
                    }
                })
               
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        //获取经纬度函数
        getLonLatValue(data){
            // console.log(data)
            this.form.lnglat = data.value
        }
    }
}
</script>
<style lang="scss" scoped>

.allMap{
    width: 100%;
    height: 500px;
}
</style>

