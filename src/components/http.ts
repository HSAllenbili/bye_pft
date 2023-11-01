import { http } from '@tauri-apps/api';


export async function get(url:string,header:any) {
    try {
        const response = await http.fetch(url, {
            headers: header,
            method: 'GET',
            timeout: 15
        });
        return response
    }
    catch {
        return {data:{'code': -1,'msg':"网络异常"}}
    }
}

export async function post(url:string,header:any,body:any) {
    try {
        const response = await http.fetch(url, {
            headers: header,
            method: 'POST',
            body:http.Body.json(body),
            timeout: 15
        });
        return response
    }
    catch {
        return {data:{'code': -1,'msg':"网络异常"}}
    }
}