<template>
    <n-layout embedded content-style="padding: 24px 24px 0 24px;">
        <n-alert :type="type">
            {{ info }}<br><n-button size="small" v-if="type == 'error'" @click="check" style="margin-top: 10px;">重新检查</n-button><a v-if="type == 'warning'" href="https://github.com/HSAllenbili/bye_pft/releases/latest" target="_blank" style="color: inherit;">前往更新</a>
        </n-alert>
    </n-layout>
</template>

<script lang="ts" setup>
import { getVersion } from '@tauri-apps/api/app';
import { onMounted, ref } from 'vue';
import { updater } from './tools.ts';

const type = ref("info");
const info = ref("正在检查新版本");
const version = getVersion();

onMounted(async () => {
    check();
}
)

const check = async () => {
    const res: any = (await updater());
    if (res.code != -1) {
        console.log(res.data.name)
        console.log("App v" +await version)
        if (res.data.name == "App v" + await version) {
            type.value = "success";
            info.value = "您已处于最新版本";
        }else{
            type.value = "warning";
            info.value = "有新版本可以更新";
        }
    } else {
        type.value = "error";
        info.value = "无法获取版本信息，您可能错过新版本。"
    }
}
</script>