<template>
    <div style="line-height:50px">
        <el-row>
            <el-col :span='4'>
                用户名：
            </el-col>
             <el-col :span='20'>
                {{data.username}}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='4'>
               真实姓名：
            </el-col>
             <el-col :span='20'>
                {{data.truename}}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='4'>
                身份证：
            </el-col>
             <el-col :span='20'>
                {{data.cardId}}
                </el-col>
        </el-row>
        <el-row>
            <el-col :span='4'>
                性别：
            </el-col>
             <el-col :span='20'>
                {{data.gender == 1 ? '男':'女'}}
                </el-col>
        </el-row>
        <el-row>
            <el-col :span='4'>
                违章预存金：
            </el-col>
             <el-col :span='20'>
                 {{data.illegalAmount}}
                </el-col>
        </el-row>
    </div>
</template>
<script>
import { GetMemberDetailed} from '@/api/member.js'
export default {
    data() {
        return {
             id:this.$route.query.id,
             data:{}
        }
    },
    beforeMount() {
        this.getDetailedFn()
    },
    methods:{
       getDetailedFn(){
           if(!this.id){return false}
            GetMemberDetailed({id:this.id}).then(res=>{
                   console.log(res)
                   this.data = res.data
               })
       }
    }
}
</script>

<style lang="scss" scoped>
.el-row{
    border-left: 1px solid #000;
    border-right: 1px solid #000;
    border-top: 1px solid #000;
    text-align: center;
    .el-col:nth-child(odd) {
        border-right: 1px solid #000;
    }
}
.el-row:last-child{
    border-bottom:  1px solid #000;
}
</style>


