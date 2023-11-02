<template>
    <n-spin :show="recordshow">
        <n-row>
            <n-col :span="12">
                <n-statistic label="有效次数（每日凌晨更新）" :value="validtimes">
                    <template #suffix>/ {{ totaltimes }}
                    </template>
                </n-statistic>
            </n-col>
            <n-col :span="12">
                <n-statistic label="有效里程（每日凌晨更新）" :value="validkm">
                    <template #suffix>
                        km
                    </template>
                </n-statistic>
            </n-col>
        </n-row>
        <n-button @click="getRecord" style="margin: 24px 0 0 0;">刷新</n-button>
        <n-card v-for="item in recordlist" style="margin: 24px 0 24px 0;">
            记录id：{{ item.recordId }}
            <n-tag type="success" v-if="!item.exerciseStatus">
                有效
            </n-tag>
            <n-tag type="error" v-if="item.exerciseStatus">
                无效
            </n-tag>
            <br>
            日期：{{ item.recordTime }}
            <br>
            运动时长：{{ item.strExerciseTimes }}
            <br>
            运动路程：{{ item.routeKilometre }}km
            <template #action>
                <n-space>
                    <n-button @click="detail">查看详情</n-button>
                    <n-button v-if="item.exerciseStatus" type="error" @click="deleterecord(item.recordId)">删除记录</n-button>
                </n-space>
            </template>
        </n-card>
    </n-spin>
</template>

<script lang="ts" setup>
import { useMessage } from 'naive-ui';
import { getTotalRecord, deleteRecord } from './tools.ts';
import { onMounted, ref } from 'vue'
const validtimes = ref(0);
const validkm = ref(0);
const totaltimes = ref(0);
const recordshow = ref();
const message = useMessage();
const recordlist = ref();
const getRecord = async () => {
    recordshow.value = true;
    const Record: any = (await getTotalRecord()).data;
    if (!Record.code) {
        validtimes.value = Record.data.totalEffectiveTimes;
        validkm.value = Record.data.totalRouteKilometre;
        totaltimes.value = Record.data.targetTimes;
        message.success("获取我的记录成功ヾ(•ω•`)o");
        recordlist.value = Record.data.recordList
    } else message.error("≡(▔﹏▔)≡获取我的记录失败，原因：" + Record.msg);
    recordshow.value = false;
}

const detail = () => {
    message.info("没做好呢");
}

const deleterecord = async (recordId: string) => {
    message.info("(*/ω＼*)正在删除"+recordId);
    const res: any = (await deleteRecord(recordId)).data;
    if (!res.code) {
        recordlist.value = recordlist.value.filter((record: any) => record.recordId !== recordId);
        message.success("删除记录成功(～￣▽￣)～");
    } else message.error("(￣_￣|||)删除记录失败，原因：" + res.msg);
}

onMounted(() => {
    getRecord();
})
</script>