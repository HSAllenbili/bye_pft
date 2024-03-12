<template>
    <n-layout embedded content-style="padding: 24px 24px 0 24px;">
        <n-alert :type="type" :title="title">
            <n-flex>
                {{ info }}
                <n-input v-model:value="proxy_url" type="text" placeholder="http(s)://x.x.x.x:port" />
                <n-button @click="set_proxy">设置代理</n-button>
            </n-flex>
        </n-alert>
    </n-layout>
    <login v-if="type == 'success'" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getVersion } from './apis';
const proxy_url = ref(localStorage.getItem("proxy"));
const title = ref("代理检查中");
const type = ref("info");
const info = ref("");

const check = async () => {
    if(localStorage.getItem("proxy")==null) localStorage.setItem("proxy","http://127.0.0.1:11451");
    title.value = "代理检查中";
    type.value = "info";
    info.value = ""
    let res = (await getVersion())
    if (localStorage.getItem("proxy") != null && res.status == 0) {
        type.value = "success";
        title.value = "代理正常";
        info.value = "代理端版本:" + res.proxy_version + " 适用小程序版本:" + res.miniapp_ver_str;
    } else {
        type.value = "error";
        title.value = "代理异常"
    }
}

const set_proxy = async () => {
    localStorage.setItem("proxy", proxy_url.value as string)
    await check();
}

onMounted(async () => {
    check();
})

</script>