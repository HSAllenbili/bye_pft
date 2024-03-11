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
        <n-button @click="getRecord" style="margin: 24px 0 0 0;">刷新</n-button>
        <n-card v-for="item in recordlist" style="margin: 24px 0 24px 0;">
            记录id：{{ item.recordId }}
            <n-tag type="success" v-if="item.exerciseStatus == 0">
                有效
            </n-tag>
            <n-tag type="error" v-if="item.exerciseStatus == 1">
                无效
            </n-tag>
            <n-tag type="warning" v-if="item.exerciseStatus == 3">
                复核中
            </n-tag>
            <br>
            日期：{{ item.recordTime }}
            <br>
            运动时长：{{ item.strExerciseTimes }}
            <br>
            运动路程：{{ item.routeKilometre }}km
            <br>
            规则名称：{{ item.routeRule }}
            <br>
            路线名称：{{ item.routeName }}
        </n-card>
    </n-spin>
</template>

<script lang="ts" setup>
import { useMessage } from 'naive-ui';
import { myRecord } from './apis';
import { onMounted, ref } from 'vue'
const validtimes = ref(0);
const validkm = ref(0);
const totaltimes = ref(0);
const recordshow = ref();
const message = useMessage();
const recordlist = ref();
const getRecord = async () => {
    recordshow.value = true;
    const Record = (await myRecord());
    if (Record.code == 0) {
        validtimes.value = Record.data.totalEffectiveTimes;
        validkm.value = Record.data.totalRouteKilometre;
        totaltimes.value = Record.data.targetTimes;
        message.success("获取我的记录成功");
        recordlist.value = Record.data.recordList
    } else message.error("获取我的记录失败，原因：" + Record.msg);
    recordshow.value = false;
}


onMounted(() => {
    getRecord();
})
</script>