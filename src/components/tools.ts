import { get, post } from "./http.ts";
const header = () => {
    return {
        'Host': 'pft.ujs.edu.cn',
        'Connection': 'keep-alive',
        'xweb_xhr': "1",
        'User-Agent': localStorage.getItem("UA"),
        'token': localStorage.getItem("token"),
        'tenant': 'NDEzMjAxMDI5OQ==',
        'Accept': '*/*',
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://servicewechat.com/wx482e15722a952deb/23/page-frame.html',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9'
    }
}

export async function getStudentInfo() {
    const url = "https://pft.ujs.edu.cn/api/miniapp/studentMini/getStudentInfo";
    return get(url, header())
}

export async function getTotalRecord() {
    const url = "https://pft.ujs.edu.cn/api/miniapp/exercise/getTotalRecord";
    return post(url, header(), {})
}

export async function listRule() {
    const url = "https://pft.ujs.edu.cn/api/miniapp/exercise/listRule";
    return get(url, header())
}

export async function saveRecord(body: any) {
    const url = "https://pft.ujs.edu.cn/api/exercise/exerciseRecord/saveRecord";
    return post(url, header(), body)
}

export async function deleteRecord(id: string) {
    const url = "https://pft.ujs.edu.cn/api/miniapp/exercise/deleteRecordId?deleteRecordId=" + id;
    return get(url, header())
}

export async function rankingList() {
    const url = "https://pft.ujs.edu.cn/api/miniapp/exercise/rankingList";
    return get(url, header())
}