<template>
    <div>
        <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="停车场名称" >
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="区域">
            <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
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
           <div class="allMap"></div>
        </el-form-item>
         <el-form-item label="经纬度" >
            <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
      return {
        form: {
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
}
</script>
<style lang="scss" scoped>
.allMap{
    width: 100%;
    height: 220px;
    border: 1px solid #000;
}
</style>

