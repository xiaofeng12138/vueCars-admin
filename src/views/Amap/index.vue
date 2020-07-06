<template>
    <div class="index">
        <el-amap vid="amapDemo"   class="amap-demo"> </el-amap>
    </div>
</template>

<script>
import {amapManager,lazyAMapApiLoaderInstance} from 'vue-amap'
export default {
    data() {
        return {
            map:null,
        }
    },
    mounted(){
        //初始化地图
        lazyAMapApiLoaderInstance.load().then(()=>{
           this.map = new AMap.Map("amapDemo",{
               resizeEnable: true, //是否监控地图容器尺寸变化
               zoom:17, //初始化地图层级
            //    center: [116.397428, 39.90923] //初始化地图中心点
           })
        })
    }
}
</script>
<style lang="scss" scoped>
.index{
    height: 100%;
}
</style>


