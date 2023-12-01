import { simulateRunningPath } from './fakelatlng.ts'

function sec2ms(sec: number) {
    sec = parseInt(sec.toFixed(0))
    var s = sec % 60;
    var m = Math.floor(sec / 60);
    return m + "'" + s + "''"
}

function sec2hhmmss(timestamp: number) {
    const date = new Date(timestamp);
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${hour}:${minute}:${second}`;
}

function sec2day(timestamp: number) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function secTotime(s: number) {
    var t = '';
    if (s > -1) {
        var hour = Math.floor(s / 3600)
        var min = Math.floor(s / 60) % 60
        var sec = s % 60
        if (hour < 10) {
            t = '0' + hour + ":"
        } else {
            t = hour + ":"
        }
        if (min < 10) {
            t += "0"
        }
        t += min + ":"
        if (sec < 10) {
            t += "0"
        }
        t += sec.toFixed(0)
    }
    return t
}


export function fakeRecord(record: any, rule: any, selectarr: any,selecttime:any) {
    var maxTime = 60 * rule[selectarr[0]]["plans"][selectarr[1]]["maxTime"];
    record["exerciseTimes"] = parseInt(((maxTime - 180) + 180 * Math.random()).toFixed(0));
    var fakelatlngresult = simulateRunningPath(rule[selectarr[0]]["plans"][selectarr[1]]["latlngs"], record["exerciseTimes"], rule[selectarr[0]]["plans"][selectarr[1]]["routeKilometre"]*1000);
    var km = fakelatlngresult.totaldistance;
    var calorie = parseInt((62 * km).toFixed(0));
    let time = new Date(selecttime).getTime() + Math.round(100 * Math.random());
    var recordTime = sec2day(time);
    var endTime = sec2hhmmss(time);
    var speed = sec2ms(record["exerciseTimes"] / km);
    var dispTimeText = secTotime(record["exerciseTimes"]);
    var localId = time - record["exerciseTimes"] * 1000;
    var startTime = sec2hhmmss(localId);
    record["routeName"] = rule[selectarr[0]]["plans"][selectarr[1]]["routeName"];
    record["ruleId"] = rule[selectarr[0]]["ruleId"];
    record["planId"] = rule[selectarr[0]]["plans"][selectarr[1]]["planId"];
    record["recordTime"] = recordTime;
    record["startTime"] = startTime;
    record["endTime"] = endTime;
    record["routeKilometre"] = km;
    record["strLatitudeLongitude"] = JSON.stringify(fakelatlngresult.fakelatlng);
    record["routeRule"] = rule[selectarr[0]]["routeRule"];
    record["maxTime"] = rule[selectarr[0]]["plans"][selectarr[1]]["maxTime"];
    record["minTime"] = rule[selectarr[0]]["plans"][selectarr[1]]["minTime"];
    record["orouteKilometre"] = rule[selectarr[0]]["plans"][selectarr[1]]["routeKilometre"];
    record["ruleEndTime"] = rule[selectarr[0]]["ruleEndTime"];
    record["ruleStartTime"] = rule[selectarr[0]]["ruleStartTime"];
    record["calorie"] = calorie;
    record["speed"] = speed;
    record["dispTimeText"] = dispTimeText;
    record["localId"] = localId;
    return record;
}