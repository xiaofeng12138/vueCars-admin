<template>
    <div>
        <FormData ref="vueForm" :formData="form_data" :formItem ="formConfig" :formBtn = "btnConfig" :LBwidth = "150" >
           <template v-slot:city = 'slotData'>
                <Cascader  ref="area" :areaValue.sync = "form_data.area" @callback = "setMapCenter" :mapLocation = "true"/>
            </template>
             <template v-slot:map = 'slotData'>
                <div class="allMap">
                    <Amap  :options="options_map" @showLonLat ='getLonLatValue' ref="amap" @callback='mapLoad'/>
                </div>
            </template>
        </FormData>
       
    </div>
</template>

<script>
import FormData from '@c/form/index'
import { GetMemberDetailed,EditMember} from '@/api/member.js'
import { formatJson } from '@/utils/format.js'
export default {
    components:{FormData},
    data() {
      return {
          id:this.$route.query.id,
        //表单数据配置
        form_data:{
            username:'',
            truename:'',
            cardId:'',
            gender:'',
            illegalAmount:'',
            cardPhotoFace:'',
            cardPhotoBareheaded:'',
            carsPhotoFace:'',
            carsPhotoBack:'',
            blacklist:''
        },
        //表单配置
        formConfig:[
            {type:'input' ,label:'用户名',placeholder:'请输入用户名',prop:'username',width:'300px',required:true,},
            {type:'input' ,label:'真实姓名',placeholder:'请输入真实姓名',prop:'truename',width:'300px',required:true,},
            {type:'input' ,label:'身份证',placeholder:'请输入身份证',prop:'cardId',width:'300px',required:true,},
            {type:'radio' ,label:'性别',prop:'gender',option:this.$store.state.config.sexType,required:true,},
            {type:'inputNumber' ,label:'违章预存金',prop:'illegalAmount',min:1,max:500,required:true,},
            {type:'upload' ,label:'身份证（正面）', prop:'cardPhotoFace',required:true,},
            {type:'upload' ,label:'身份证（反面）', prop:'cardPhotoBack',required:true,},
            {type:'upload' ,label:'身份证（免冠）', prop:'cardPhotoBareheaded',required:true,},
            {type:'upload' ,label:'身份证（正面）', prop:'carsPhotoFace',required:true,},
            {type:'upload' ,label:'身份证（反面）', prop:'carsPhotoBack',required:true,},
            {type:'radio' ,label:'黑名单',prop:'blacklist',option:this.$store.state.config.HMDType,required:true,},
           
        ],
        btnConfig:[
            {
                type:'primary',label:'提交',hander:()=>this.submitForm()
            }
        ],
      }
    },
    methods:{
        //表单回调函数
        submitForm(){
            this.$refs.vueForm.$refs.form.validate((valid)=>{
                if (valid) {
                   EditMember({...this.form_data,id:this.id}).then(res=>{
                       this.$message.success(res.message)
                       this.$refs.vueForm.resetForm()
                   })
               
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
         getDetailedFn(){
           if(!this.id){return false}
            GetMemberDetailed({id:this.id}).then(res=>{
                this.form_data = formatJson(this.form_data,res.data)
            })
       }
    },
     beforeMount() {
        this.getDetailedFn()
    },
}
</script>
<style lang="scss" scoped>

.allMap{
    width: 100%;
    height: 500px;
}
</style>

