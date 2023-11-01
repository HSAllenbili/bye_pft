<template>
    <n-layout embedded content-style="padding: 24px 24px 0 24px;">
        <n-alert title="未设置token" type="error">
            <n-space vertical>
                token
                <n-input v-model:value="token" type="textarea" placeholder="在此处粘贴token" :autosize="{ minRows: 3 }"
                    clearable />
                    
                <n-collapse>
                    <n-collapse-item title="UA(可选 默认为小米12)">
                        <n-input v-model:value="UA" type="textarea" placeholder="在此处粘贴UA" :autosize="{ minRows: 3 }" clearable />
                    </n-collapse-item>
                </n-collapse>
                <n-button attr-type="button" @click="submit">
                    提交
                </n-button>
            </n-space>
        </n-alert>
    </n-layout>
    <n-layout embedded content-style="padding: 24px 24px 0 24px;">
        <n-card title="如何获取token">
            <h1>todo</h1>
        </n-card>
    </n-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
const token = ref();
const UA = ref();
const message =useMessage();
const submit = () => {
    localStorage.setItem("UA", UA.value!=null?UA.value:"Mozilla/5.0 (Linux; Android 13; 2201123C Build/TKQ1.220829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/5317 MMWEBSDK/20230805 MMWEBID/9037 MicroMessenger/8.0.42.2460(0x28002A54) WeChat/arm64 Weixin NetType/5G Language/zh_CN ABI/arm64");
    if(token.value!=null){localStorage.setItem("token", token.value);location.reload();}else message.warning("token为空");
}
</script>