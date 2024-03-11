<template>
    <n-layout embedded content-style="padding: 24px 24px 0 24px;">
        <n-spin :show="show">
            <n-alert :type="type" :title="title">
                <n-flex>
                    {{ info }}
                    <n-input v-model:value="token" type="text" placeholder="Bearer ..." />
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

onMounted(async () => {
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