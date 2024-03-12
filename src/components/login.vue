<template>
    <n-layout embedded content-style="padding: 24px 24px 0 24px;">
        <n-spin :show="show">
            <n-alert :type="type" :title="title">
                <n-flex>
                    {{ info }}
                    <n-input v-model:value="token" type="text" placeholder="Bearer ..." />
                    <n-collapse>
                        <n-collapse-item title="设置UA（可选）">
                            <n-flex>
                                <n-input v-model:value="ua" type="text" />
                                <n-button @click="changeUA">更改UA</n-button>
                            </n-flex>
                        </n-collapse-item>
                    </n-collapse>
                    <n-button @click="check">登录</n-button>
                </n-flex>
            </n-alert>
        </n-spin>
    </n-layout>
    <tools v-if="type == 'success'" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getInfo } from './apis';
const token = ref(localStorage.getItem("token"));
const title = ref("");
const show = ref(false);
const type = ref("");
const info = ref("");
const ua = ref("")

const check = async () => {
    title.value = "登录中";
    show.value = true;
    type.value = "info";
    info.value = ""
    sessionStorage.removeItem("stuinfo");
    sessionStorage.setItem("token", token.value as string);
    let res = (await getInfo())
    if (res.code == 0) {
        sessionStorage.setItem("stuinfo", JSON.stringify(res));
        localStorage.setItem("token", sessionStorage.getItem("token") as string)
        localStorage.setItem("stuinfo", sessionStorage.getItem("stuinfo") as string)
        type.value = "success";
        title.value = "登录信息";
        info.value = JSON.parse(localStorage.getItem("stuinfo") as string).data.studentName + " " + JSON.parse(localStorage.getItem("stuinfo") as string).data.studentNo;
    } else {
        sessionStorage.removeItem("token");
        type.value = "error";
        title.value = "登录异常";
        info.value = res.msg;
    }
    show.value = false
}

const changeUA = () => {
    localStorage.setItem("ua", ua.value);
}

onMounted(async () => {
    if (localStorage.getItem("ua") == null) {
        localStorage.setItem("ua", "Mozilla/5.0 (iPad; CPU OS 16_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.45(0x18002d2c) NetType/WIFI Language/zh_CN")
    }
    ua.value = localStorage.getItem("ua") as string;
    if (localStorage.getItem("token") == null || localStorage.getItem("stuinfo") == null) {
        title.value = "登录异常";
        type.value = "error"
        info.value = "登录信息缺失"
    } else {
        sessionStorage.setItem("token", localStorage.getItem("token") as string)
        sessionStorage.setItem("stuinfo", localStorage.getItem("stuinfo") as string)
        title.value = "登录信息";
        type.value = "success"
        info.value = JSON.parse(localStorage.getItem("stuinfo") as string).data.studentName + " " + JSON.parse(localStorage.getItem("stuinfo") as string).data.studentNo;
    }
})

</script>