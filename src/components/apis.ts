import { get, post } from "./http";
const header = () => {
    return {
        'ua': "Mozilla/5.0 (iPad; CPU OS 16_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.45(0x18002d2c) NetType/WIFI Language/zh_CN",
        'token': sessionStorage.getItem("token"),
        'tenant': 'NDEzMjAxMDI5OQ=='
    }
}

const header_1 = () => {
    return {
        'ua': "Mozilla/5.0 (iPad; CPU OS 16_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.45(0x18002d2c) NetType/WIFI Language/zh_CN",
        'token': sessionStorage.getItem("token"),
        'tenant': 'NDEzMjAxMDI5OQ==',
        'Content-Type': 'multipart/form-data'
    }
}

export async function getVersion() {
    const url = localStorage.getItem("proxy") + "/getVersion";
    return get(url, header())
}

export async function getInfo() {
    const url = localStorage.getItem("proxy") + "/getInfo";
    return get(url, header())
}

export async function myRecord() {
    const url = localStorage.getItem("proxy") + "/myRecord";
    return post(url, header(), {})
}

export async function recordDetail(body: any) {
    const url = localStorage.getItem("proxy") + "/recordDetail";
    return post(url, header(), body)
}

export async function listRule() {
    const url = localStorage.getItem("proxy") + "/listRule";
    return get(url, header())
}

export async function startRecord(body: any) {
    const url = localStorage.getItem("proxy") + "/startRecord";
    return post(url, header(), body)
}

export async function endRecord(body: any) {
    const url = localStorage.getItem("proxy") + "/endRecord";
    return post(url, header(), body)
}

export async function startImg(body: any) {
    const url = localStorage.getItem("proxy") + "/startImg";
    return post(url, header_1(), body)
}

export async function endImg(body: any) {
    const url = localStorage.getItem("proxy") + "/endImg";
    return post(url, header(), body)
}

