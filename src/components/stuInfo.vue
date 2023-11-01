<template>
    <n-layout embedded content-style="padding: 24px 24px 0 24px;">
        <n-card title="登录信息">
            <n-space vertical>
                <ul style="list-style: none;padding-left: 0;">
                    <li>姓名：{{ name }}</li>
                    <li>学号：{{ id }}</li>
                </ul>
                <n-space>
                    <n-button type="primary" @click="reload">
                        重新加载
                    </n-button><n-button type="error" @click="refresh">
                        清除token
                    </n-button>
                </n-space>
            </n-space>
        </n-card>
    </n-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const id = ref();
const name = ref();

const emit = defineEmits(['reload']);

const reload = () => {
    emit('reload');
}

const refresh = () => {
    localStorage.clear();
    location.reload();
}

defineExpose({
    id,
    name
})
</script>

  