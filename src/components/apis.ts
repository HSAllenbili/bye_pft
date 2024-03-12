import { get, post } from "./http";
const header = () => {
    return {
        'ua': localStorage.getItem("ua"),
        'token': sessionStorage.getItem("token"),
        'tenant': 'NDEzMjAxMDI5OQ=='
    }
}

const header_1 = () => {
    return {
        'ua': localStorage.getItem("ua"),
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

