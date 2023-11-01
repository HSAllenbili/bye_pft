type LatLng = {
    lat: number;
    lng: number;
    sortNum: number;
};

export function getDistance(lon1: any, lat1: any, lon2: any, lat2: any) {
    const radLat1 = lat1 * (Math.PI / 180);
    const radLat2 = lat2 * (Math.PI / 180);
    const a = radLat1 - radLat2;
    const b = lon1 * (Math.PI / 180) - lon2 * (Math.PI / 180);
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1)
        * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378137.0;
    return s;
}

export function simulateRunningPath(latlng: LatLng[], times: number, minDistance: number): LatLng[] {
    let fakelatlng: LatLng[] = [];
    let interval = Math.floor(times / (latlng.length - 1));

    for (let i = 0; i < latlng.length - 1; i++) {
        for (let j = 0; j < interval; j++) {
            let t = j / interval;
            let lat = latlng[i].lat * (1 - t) + latlng[i + 1].lat * t + Math.random() * 0.0001;
            let lng = latlng[i].lng * (1 - t) + latlng[i + 1].lng * t + Math.random() * 0.0001;
            fakelatlng.push({ lat, lng, sortNum: i * interval + j });
        }
    }

    while (fakelatlng.length < times) {
        fakelatlng.push({ ...latlng[latlng.length - 1], sortNum: fakelatlng.length });
    }

    for (let i = 0; i < fakelatlng.length; i += 10) {
        for (let j = i + 1; j < i + 10 && j < fakelatlng.length; j++) {
            fakelatlng[j] = { ...fakelatlng[i] };
        }
    }

    // Add offset to the start and end points
    fakelatlng[0].lat += Math.random() * 0.0001;
    fakelatlng[0].lng += Math.random() * 0.0001;
    fakelatlng[fakelatlng.length - 1].lat += Math.random() * 0.0001;
    fakelatlng[fakelatlng.length - 1].lng += Math.random() * 0.0001;

    // Check the total distance
    let totalDistance = 0;

    for (let i = 0; i < fakelatlng.length - interval; i += interval) {
        totalDistance = getDistance(fakelatlng[i].lat, fakelatlng[i].lat, fakelatlng[i + interval].lat, fakelatlng[i + interval].lat);

        if (totalDistance >= minDistance) break;

        // If the total distance is less than the minimum distance after adjustment, add more noise
        let adjustment = minDistance / totalDistance;

        for (let j = i; j < i + interval && j < fakelatlng.length; j++) {
            fakelatlng[j].lat += Math.random() * adjustment * minDistance / totalDistance;
            fakelatlng[j].lat += Math.random() * adjustment * minDistance / totalDistance;
        }

        totalDistance = getDistance(fakelatlng[i].lat, fakelatlng[i].lat, fakelatlng[i + interval].lat, fakelatlng[i + interval].lat);

        if (totalDistance >= minDistance) break;

        // If the total distance is still less than the minimum distance after adjustment, add more noise
        for (let j = i; j < i + interval && j < fakelatlng.length; j++) {
            fakelatlng[j].lat += Math.random() * adjustment * minDistance / totalDistance;
            fakelatlng[j].lat += Math.random() * adjustment * minDistance / totalDistance;
        }

        totalDistance = getDistance(fakelatlng[i].lat, fakelatlng[i].lat, fakelatlng[i + interval].lat, fakelatlng[i + interval].lat);

        if (totalDistance >= minDistance) break;

        // If the total distance is still less than the minimum distance after adjustment, add more noise
        for (let j = i; j < i + interval && j < fakelatlng.length; j++) {
            fakelatlng[j].lat += Math.random() * adjustment * minDistance / totalDistance;
            fakelatlng[j].lat += Math.random() * adjustment * minDistance / totalDistance;
        }
    }

    return fakelatlng;
}

