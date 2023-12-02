<template>
    <n-spin :show="genshow">
        <n-card>
            <n-space vertical>
                <n-select v-model:value="rulevalue" :loading="ruleloading" :options="ruleoptions" placeholder="选择路线" />
                <div style="display: flex; ">
                    <n-button style="margin-right: 5x;flex: 1;" :disabled="ruleloading" @click="getRule">刷新路线</n-button>
                    <n-button style="margin-left: 5px;flex: 1;" :disabled="ruleloading"
                        @click="getPftRule">使用备用路线</n-button>
                </div>
                <n-popover trigger="hover">
                    <template #trigger>
                        <n-date-picker v-model:value="selecttime" type="datetime" />
                    </template>
                    <span>选择运动结束时间</span>
                </n-popover>
                <n-checkbox label="上传为有效记录" :checked="isUse" @update:checked="askUse" />
            </n-space>
            <template #action>
                <n-button type="primary" @click="submit">开始上传</n-button>
            </template>
        </n-card>
    </n-spin>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useDialog, useMessage } from 'naive-ui'
import { listRule, listPftRule, saveRecord } from './tools.ts';
import global from './global.ts'
import { fakeRecord } from './fakerecord.ts'

const rulevalue = ref();
const isUse = ref();
const dialog = useDialog();
const message = useMessage();
const ruleoptions = ref();
const genshow = ref(false)
const rules: { planId: any; ruleId: any; }[] = [];
const record = { "routeName": "", "ruleId": "", "planId": "", "recordTime": "", "startTime": "", "startImage": "", "endTime": "", "exerciseTimes": 0, "routeKilometre": 0, "endImage": "", "strLatitudeLongitude": "", "routeRule": "", "maxTime": 0, "minTime": 0, "orouteKilometre": 0, "ruleEndTime": "", "ruleStartTime": "", "calorie": "", "speed": "", "dispTimeText": "", "localId": 0, "studentId": "", "exerciseStatus": 1 }
const ruleloading = ref();
const selecttime = ref(Date.parse(new Date().toString()));
let rule: any;
let selectarr: any;

const askUse = () => {
    if (isUse.value != true) {
        isUse.value = false;
        dialog.warning({
            title: '警告',
            content: '你确定？',
            positiveText: '确定',
            negativeText: '不确定',
            onPositiveClick: () => {
                isUse.value = true;
            }
        })
    } else isUse.value = false;
}


const getRule = async () => {
    ruleloading.value = true;
    rulevalue.value = null;
    ruleoptions.value = [];
    rule = [];
    rule = (await listRule()).data;
    if (!rule.code) {
        rule = rule.data;
        if (rule.length > 0) {
            for (const i in rule) {
                ruleoptions.value.push({ label: rule[i].routeRule + "(" + rule[i].ruleStartTime + "-" + rule[i].ruleEndTime + ")", disabled: true })
                for (const j in rule[i].plans) {
                    (ruleoptions.value as any).push({ label: rule[i].plans[j].routeName + "(" + rule[i].plans[j].routeKilometre + "km)", value: `${i}-${j}` });
                    rules.push({ planId: rule[i].ruleId.planId, ruleId: rule[i].plans[j].ruleId });
                }
            }
            message.success("获取路线信息成功");
        } else message.warning("不在规定锻炼时间内，请尝试备用路线信息")
    } else {
        message.error("获取路线信息失败，原因：" + rule.msg);
    }
    ruleloading.value = false;
}

const getPftRule = async () => {
    ruleloading.value = true;
    rulevalue.value = null;
    ruleoptions.value = [];
    rule = [];
    rule = (await listPftRule()).data;
    if (!rule.code) {
        rule = rule.data;
        if (rule.length > 0) {
            for (const i in rule) {
                ruleoptions.value.push({ label: rule[i].routeRule + "(" + rule[i].ruleStartTime + "-" + rule[i].ruleEndTime + ")", disabled: true })
                for (const j in rule[i].plans) {
                    (ruleoptions.value as any).push({ label: rule[i].plans[j].routeName + "(" + rule[i].plans[j].routeKilometre + "km)", value: `${i}-${j}` });
                    rules.push({ planId: rule[i].ruleId.planId, ruleId: rule[i].plans[j].ruleId });
                }
            }
            message.success("获取备用路线信息成功");
        }
    } else {
        message.error("获取备用路线信息失败");
    }
    ruleloading.value = false;
}

const submit = async () => {
    if (rulevalue.value != null) {
        selectarr = rulevalue.value.split('-');
        record["studentId"] = global.Info.data.id;
        isUse.value == true ? record["exerciseStatus"] = 0 : record["exerciseStatus"] = 1;
        const body = fakeRecord(record, rule, selectarr, selecttime.value);
        dialog.warning({
            title: '警告',
            content: '确定上传?',
            positiveText: '确定',
            negativeText: '不确定',
            onPositiveClick: () => {
                upload(body);
            }
        })
    } else message.error("还没选择路线");
}

const upload = async (body: any) => {
    genshow.value = true;
    const res: any = (await saveRecord(body)).data;
    !res.code ? message.success("上传成功") : message.error("上传失败，原因：" + res.msg);
    genshow.value = false;
    isUse.value = false;
}

onMounted(() => {
    getRule();
})
</script>