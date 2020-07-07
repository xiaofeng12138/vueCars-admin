//获取地图经纬度
export  function getLonLat(e){
    return {
        lon:e.lnglat.getLng(),
        lat:e.lnglat.getLat(),
        value:e.lnglat.getLng() + ',' + e.lnglat.getLat()
    }
}