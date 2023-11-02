<template>
    <n-spin :show="recordshow">
        <n-row>
            <n-col :span="12">
                <n-statistic label="有效次数" :value="validtimes">
                    <template #suffix>/ {{ totaltimes }}
                    </template>
                </n-statistic>
            </n-col>
            <n-col :span="12">
                <n-statistic label="有效里程" :value="validkm">
                    <template #suffix>
                        km
                    </template>
                </n-statistic>
            </n-col>
        </n-row>
    </n-spin>
</template>

<script lang="ts" setup>
import { useMessage } from 'naive-ui';
import { getTotalRecord } from './tools.ts';
import { onMounted, ref } from 'vue'
const validtimes = ref(0);
const validkm = ref(0);
const totaltimes = ref(0);
const recordshow = ref();
const message = useMessage();
const getRecord = async () => {
    recordshow.value = true;
    const Record: any = (await getTotalRecord()).data;
    if (!Record.code) {
        validtimes.value = Record.data.totalEffectiveTimes;
        validkm.value = Record.data.totalRouteKilometre;
        totaltimes.value = Record.data.targetTimes;
        message.success("获取记录成功ヾ(•ω•`)o");
    }else message.error("≡(▔﹏▔)≡获取记录失败，原因："+Record.msg);
    console.log(Record)
    recordshow.value = false;
}

onMounted(() => {
    getRecord();
})
</script>