<template>
    <div class="index">
        <el-amap vid="amapDemo"   class="amap-demo"> </el-amap>
    </div>
</template>

<script>
import {amapManager,lazyAMapApiLoaderInstance} from 'vue-amap'
import {getLonLat} from '../../utils/map/getLonLat.js'
import {getCode} from '../../utils/map/location.js'
export default {
    data() {
        return {
            map:null,
        }
    },
    mounted(){
        //初始化地图
        let _this = this
        lazyAMapApiLoaderInstance.load().then(()=>{
           this.map = new AMap.Map("amapDemo",{
               resizeEnable: true, //是否监控地图容器尺寸变化
               zoom:17, //初始化地图层级
               center: [116.397428, 39.90923] //初始化地图中心点
           })
           this.map.on("click",function(e){
               let lonlat = getLonLat(e)
            //    console.log(lonlat)
               _this.$emit('showLonLat',lonlat)
           })
        })

    },
    methods:{
        setNewMapCenter(data){
            getCode(data,this.map)
        }
    }
}
</script>
<style lang="scss" scoped>
.index{
    height: 100%;
}
</style>


