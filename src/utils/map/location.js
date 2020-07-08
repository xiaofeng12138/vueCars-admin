//获取地图经纬度
export  function getCode(address,map){
    let geocoder = new AMap.Geocoder();
    
    geocoder.getLocation(address, function(status, result) {
        if (status === 'complete'&&result.info === 'OK') {
            //获取经纬度
            let  lat = result.geocodes[0].location.lat
            let  lng = result.geocodes[0].location.lng
            map.panTo([lng,lat])
        }else{
            log.error('根据地址查询位置失败');
        }
    });
}