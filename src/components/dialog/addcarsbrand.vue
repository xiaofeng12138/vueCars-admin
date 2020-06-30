<template>
      <el-dialog title="新增品牌车辆" :visible.sync="showModal" class="cars_dialgo_center" :close-on-click-modal= false @close ='closeModal'>
        <el-form :model="form">
            <el-form-item label="车辆品牌" label-width="120px">
                <el-input v-model="form.parking_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="品牌信号" label-width="120px">
                <el-input v-model="form.parking_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="LOGO" label-width="120px">
                <div class="img_upload_wrap">
                    <div class="upload_img">
                        <img src="@/assets/iconlogo.jpg" alt="">
                    </div>
                    <div class="img_list">
                        <ul>
                            <li> <img src="@/assets/iconlogo.jpg" alt=""></li>
                            <li> <img src="@/assets/iconlogo.jpg" alt=""></li>
                            <li> <img src="@/assets/iconlogo.jpg" alt=""></li>
                            <li> <img src="@/assets/iconlogo.jpg" alt=""></li>
                            <li> <img src="@/assets/iconlogo.jpg" alt=""></li>
                            <li> <img src="@/assets/iconlogo.jpg" alt=""></li>
                            <li> <img src="@/assets/iconlogo.jpg" alt=""></li>
                            <li> <img src="@/assets/iconlogo.jpg" alt=""></li>
                        </ul>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="禁启用" label-width="120px">
                <el-radio-group v-model="form.resource">
                    <el-radio label="禁用"></el-radio>
                    <el-radio label="启用"></el-radio>
                </el-radio-group>
           </el-form-item>
            <el-form-item  label-width="120px">
                 <el-button  type="danger">提交</el-button>
           </el-form-item>
        </el-form>
        <!-- <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div> -->
        </el-dialog>
</template>

<script>
export default {
    props:{
      flagVisible:{
          type:Boolean,
          default:false
      }
    },
    data(){
        return{
            showModal:false,
            form: {
                name: '',
                type: '',
                area:''
            },
        }
    },
    methods:{
        closeModal(){
            this.$emit('update:flagVisible',false)
        }
    },
    watch:{
        flagVisible:{
            handler(newValue,oldvalue){
               this.showModal = newValue
            },
             immediate:true
        }
    }
}
</script>
