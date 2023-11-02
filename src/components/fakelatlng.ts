//由new bing生成
interface LatLng {
    lat: string;
    lng: string;
    sortNum: number;
}

export function simulateRunningPath(latlng: LatLng[], times: number, minDistance: number): { fakelatlng: LatLng[], totaldistance: number } {
    let fakelatlng: LatLng[] = [];
    let totaldistance = 0;

    // 计算总距离
    let totalDist = 0;
    for (let i = 0; i < latlng.length - 1; i++) {
        totalDist += getDistance(latlng[i].lng, latlng[i].lat, latlng[i + 1].lng, latlng[i + 1].lat);
    }

    // 贝塞尔曲线插值和平均分配点
    let tempArray: LatLng[] = [];
    for (let i = 0; i < latlng.length - 1; i++) {
        let start = latlng[i];
        let end = latlng[i + 1];
        let segmentDist = getDistance(start.lng, start.lat, end.lng, end.lat);
        let segmentTimes = Math.round(times * segmentDist / totalDist);
        for (let j = 1; j < segmentTimes - 1; j++) { // 跳过第一个和最后一个点
            let t = j / segmentTimes;
            // 添加8米左右的扰动
            let latOffset = (Math.random() - 0.5) * (8 / 111000); // 纬度上1度约等于111千米
            let lngOffset = (Math.random() - 0.5) * (8 / (111000 * Math.cos(parseFloat(start.lat) + t * (parseFloat(end.lat) - parseFloat(start.lat)))));
            // 贝塞尔曲线插值
            t = t * t * (3 - 2 * t); // 使用三次平滑步骤函数进行插值
            tempArray.push({
                lat: ((parseFloat(start.lat) + t * (parseFloat(end.lat) - parseFloat(start.lat))) + latOffset).toFixed(15),
                lng: ((parseFloat(start.lng) + t * (parseFloat(end.lng) - parseFloat(start.lng))) + lngOffset).toFixed(15),
                sortNum: tempArray.length + 1
            });
        }
    }

    // 每十个取一个坐标并存储10个相同的坐标
    for (let i = 0; i < tempArray.length; i += 10) {
        for(let j = 0; j < 10; j++) {
            fakelatlng.push({lat: tempArray[i].lat, lng: tempArray[i].lng, sortNum: fakelatlng.length + 1});
        }
        if (i > 0) {
            totaldistance += getDistance(tempArray[i - 10].lng, tempArray[i - 10].lat, tempArray[i].lng, tempArray[i].lat);
        }
    }

    // 如果总里程小于minDistance，添加与最后一项相同的坐标，直到总里程不小于minDistance
    while(totaldistance < minDistance) {
        if(fakelatlng.length % 10 === 0) {
            // 如果添加前fakelatlng取模等于0，则添加的坐标需要和最后一项不同，加上50米的偏差
            let lastItem = fakelatlng[fakelatlng.length - 1];
            let latOffset = (Math.random() - 0.5) * (50 / 111000); // 纬度上1度约等于111千米
            let lngOffset = (Math.random() - 0.5) * (50 / (111000 * Math.cos(parseFloat(lastItem.lat))));
            fakelatlng.push({lat: (parseFloat(lastItem.lat) + latOffset).toFixed(15), lng: (parseFloat(lastItem.lng) + lngOffset).toFixed(15), sortNum: fakelatlng.length + 1});
        } else {
            // 添加与最后一项相同的坐标
            let lastItem = fakelatlng[fakelatlng.length - 1];
            fakelatlng.push({lat: lastItem.lat, lng: lastItem.lng, sortNum: fakelatlng.length + 1});
        }
        totaldistance += getDistance(fakelatlng[fakelatlng.length - 2].lng, fakelatlng[fakelatlng.length - 2].lat, fakelatlng[fakelatlng.length - 1].lng, fakelatlng[fakelatlng.length - 1].lat);
    }

    // 转换成千米并保留两位小数
    totaldistance = parseFloat((totaldistance / 1000).toFixed(2));

    return { fakelatlng, totaldistance };
}

function getDistance(lng1: string, lat1: string, lng2: string, lat2: string): number {
    const radLat1 = parseFloat(lat1) * (Math.PI / 180);
    const radLat2 = parseFloat(lat2) * (Math.PI / 180);
    const a = radLat1 - radLat2;
    const b = parseFloat(lng1) * (Math.PI / 180) - parseFloat(lng2) * (Math.PI / 180);
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1)
        * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378137.0;
    return s;
}
