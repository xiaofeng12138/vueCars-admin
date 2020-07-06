<template>
    <div>
        <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="停车场名称" >
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="区域" >
            <Cascader :areaValue.sync = "form.area"/>
        </el-form-item>
         <el-form-item label="区域">
            <el-radio-group v-model="form.resource">
                <el-radio label="室内"></el-radio>
                <el-radio label="室外"></el-radio>
            </el-radio-group>
        </el-form-item>
         <el-form-item label="可停放车辆">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="禁启用">
            <el-radio-group v-model="form.resource">
                <el-radio label="禁用"></el-radio>
                <el-radio label="启用"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="地图">
           <div class="allMap">
               <Amap />
           </div>
        </el-form-item>
         <el-form-item label="经纬度" >
            <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="go">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Amap from '@/views/Amap/index.vue'
import Cascader from '@c/cascader/index.vue'

export default {
    components:{Amap,Cascader},
    data() {
      return {
        form: {
          area:'',
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods:{
        go(){
            console.log(this.form.area)
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

