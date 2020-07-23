//获取地图点标记
let marker = null;
export  function amapMarker(lonlat,map){
    if(marker){
         map.remove(marker)
         marker = null
    }
     marker = new AMap.Marker({
        position:[lonlat.lon,lonlat.lat]
    });
    map.add(marker)
    map.setFitView()
}

export  function apiClearMarker(map){
    if(marker){
         map.remove(marker)
         marker = null
    }
}

