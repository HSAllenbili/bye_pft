import axios from 'axios'

export async function get(url: string, header: any) {
    try {
        const response = await axios.get(url, { headers: header })
        return response.data
    }
    catch {
        return { data: { 'code': -1, 'msg': "网络异常" } }
    }
}

export async function post(url: string, header: any, data: any) {
    try {
        const response = await axios.post(url, data, { headers: header })
        console.log(response.data)
        return response.data
    }
    catch {
        return { data: { 'code': -1, 'msg': "网络异常" } }
    }
}