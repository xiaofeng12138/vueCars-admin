<template>
    <div class="index">
        <el-amap vid="amapDemo"   class="amap-demo"> </el-amap>
    </div>
</template>

<script>
import {amapManager,lazyAMapApiLoaderInstance} from 'vue-amap'
import {getLonLat} from '../../utils/map/getLonLat.js'
import {getCode} from '../../utils/map/location.js'
import {amapMarker,apiClearMarker} from '../../utils/map/marker.js'
export default {
    props:{
        options:{
            type:Object,
            default:()=>{}
        }
    },
    data() {
        return {
            map:null,
            lonlat:{}, //声明经纬度对象
        }
    },
    mounted(){
        //初始化地图
        let _this = this
        //lazyAMapApiLoaderInstance 为了加载高德地图的api
        lazyAMapApiLoaderInstance.load().then(()=>{
           this.mapCreate()
           this.map.on("click",function(e){
                _this.lonlat = getLonLat(e)
               _this.$emit('showLonLat', _this.lonlat)
               _this.setMarker()
           })
        })

    },
    methods:{
        //创建地图
        mapCreate(){
             this.map = new AMap.Map("amapDemo",{
               resizeEnable: true, //是否监控地图容器尺寸变化
               zoom:15, //初始化地图层级
            //    center: [116.397428, 39.90923] //初始化地图中心点
           })
           this.map.on("complete",()=>{
               this.mapLoad()
           })
        },
        //地图加载完成的方法
        mapLoad(){
            if(this.options.mapload){
                  this.$emit('callback')
            }
        },
        //销毁地图函数
        Destory(){
          this.map && this.map.destroy()
        },
        setNewMapCenter(data){
            getCode(data,this.map)
        },
        clearMarker(){
            apiClearMarker(this.map)
        },
        setMarker(lnglat){
            amapMarker( lnglat || this.lonlat,this.map)
        }
    },
}
</script>
<style lang="scss" scoped>
.index{
    height: 100%;
}
</style>


