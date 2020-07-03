<template>
    <div>
        <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="车辆品牌">
            <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="福特" value="shanghai"></el-option>
            <el-option label="劳斯莱斯" value="beijing"></el-option>
            <el-option label="马自达" value="22"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="车辆型号">
            <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="福特" value="shanghai"></el-option>
            <el-option label="劳斯莱斯" value="beijing"></el-option>
            <el-option label="马自达" value="22"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="停车场">
            <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="福特" value="shanghai"></el-option>
            <el-option label="劳斯莱斯" value="beijing"></el-option>
            <el-option label="马自达" value="22"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="车牌号" >
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="车架号" >
            <el-input v-model="form.name"></el-input>
        </el-form-item>
         <el-form-item label="发动机号" >
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年检">
            <el-radio-group v-model="form.resource">
                <el-radio label="已年检"></el-radio>
                <el-radio label="未年检"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="保养日期" >
            <el-row :gutter="20">
                <el-col :span="6">
                    <div>
                        <el-input v-model="form.name"></el-input>
                    </div>
                </el-col>
                <el-col :span="17">
                     <div>
                         下次保养日期：2020-12-01
                     </div>
                </el-col>
            </el-row>
            
        </el-form-item>
        <el-form-item label="档位">
            <el-radio-group v-model="form.resource">
                <el-radio label="手动挡"></el-radio>
                <el-radio label="自动挡"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="能源类型">
            <el-radio-group v-model="form.energy">
                <el-radio :label="1">电</el-radio>
                <el-radio :label="2">油</el-radio>
                <el-radio :label="3">油电混合</el-radio>
            </el-radio-group>
             <div class="energy_bar_wrap" v-if="form.energy == 1 || form.energy == 3">
                <span class="label-text">电量</span>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="energy_bar">
                            <span style="width:50%">
                                <label>90%</label>
                            </span>
                        </div>
                    </el-col>
                     <el-col :span="2">
                        <el-input size="small" value="100"></el-input>
                    </el-col>
                </el-row>
            </div>
            <div class="energy_bar_wrap" v-if="form.energy == 2 || form.energy == 3">
                <span class="label-text">油量</span>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="energy_bar">
                            <span style="width:50%">
                                <label>90%</label>
                            </span>
                        </div>
                    </el-col>
                     <el-col :span="2">
                        <el-input size="small" value="100"></el-input>
                    </el-col>
                </el-row>
            </div>
        </el-form-item>
        <el-form-item label="车辆属性">
            <div v-for="(item,index) in cars_attr" :key="index" style="margin-bottom:10px">
                <el-row :gutter="20">
                    <el-col :span="2">
                        <el-input value="100"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-input value="100"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" v-if="index == 0" @click="addAttr">+</el-button>
                        <el-button  v-else>-</el-button>
                    </el-col>
                </el-row>
            </div>
           
        </el-form-item>
        <el-form-item label="车辆描述">
          <div ref="editorDom" style="text-align:left"></div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">立即创建</el-button>
           
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Editor from 'wangeditor'
export default {
    data() {
      return {
        editor:null,//富文本对象
        cars_attr:[
            {key:100,value:100},
            {key:100,value:100},
            {key:100,value:100},
            {key:100,value:100},
            {key:100,value:100},
        ],
        form: {
          energy:1,
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
        addAttr(){
            this.cars_attr.push({key:100,value:100})
        },
        createEditor(){
            this.editor = new Editor(this.$refs.editorDom)
            this.editor.customConfig.onchange = html =>{}
            this.editor.create()  //创建富文本实例
        }
    },
    mounted(){
        this.createEditor()
    }
}
</script>
<style lang="scss" scoped>
@import './carsadd.scss';
</style>

