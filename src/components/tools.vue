<template>
    <n-layout embedded content-style="padding: 24px 24px 0 24px;margin-bottom:24px">
        <n-tabs default-value="上传" justify-content="space-evenly" type="line" animated>
            <n-tab-pane name="上传" animated display-directive="show:lazy">
                <genRecord />
            </n-tab-pane>
            <n-tab-pane name="记录" animated display-directive="show:lazy">
                <myRecord />
            </n-tab-pane>
            <n-tab-pane name="关于" animated display-directive="show:lazy">
                <n-statistic label="本项目累计上传" tabular-nums>
                    <n-number-animation ref="numberAnimationInstRef" :from="0" :to="counter" />
                    <template #suffix>
                        条记录
                    </template>
                </n-statistic>
                repo:<a href="https://github.com/HSAllenbili/bye_pft" style="color: inherit;"
                    target="_blank">https://github.com/HSAllenbili/bye_pft</a>
            </n-tab-pane>
        </n-tabs>
    </n-layout>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
const counter = ref(0)

onMounted(async () => {
    counter.value = (await axios.get("https://api.counterapi.dev/v1/byepft/upload/")).data.count;
})
</script>