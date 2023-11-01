<template>
    <n-card>
        <n-space vertical>
            <div style="display: flex; ">
                <n-select v-model:value="rulevalue" :loading="ruleloading" filterable :options="ruleoptions"
                    @update:value="rulevalueupdate" placeholder="选择路线" />
                <n-button style="margin-left: 5px;" :disabled="ruleloading" @click="getRule">刷新路线</n-button>
            </div>
            <n-input-number v-model:value="timevalue" :max="maxTime" :min="minTime" placeholder="运动时间">
                <template #suffix>
                    秒
                </template>
            </n-input-number>
            <n-checkbox label="上传为有效记录" :checked="isUse" @update:checked="askUse" />
        </n-space>
        <template #action>
            <n-button type="primary" @click="submit">开始上传</n-button>
        </template>
    </n-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useDialog, useMessage } from 'naive-ui'
import { listRule, saveRecord } from './tools.ts';
import global from './global.ts'
import { fakeRecord } from './fakerecord.ts'

const rulevalue = ref();
const timevalue = ref();
const isUse = ref();
const dialog = useDialog();
const message = useMessage();
const ruleoptions = ref();
const rules: { planId: any; ruleId: any; }[] = [];
const record = { "routeName": "", "ruleId": "", "planId": "", "recordTime": "", "startTime": "", "startImage": "", "endTime": "", "exerciseTimes": 0, "routeKilometre": 0, "endImage": "", "strLatitudeLongitude": "", "routeRule": "", "maxTime": 0, "minTime": 0, "orouteKilometre": 0, "ruleEndTime": "", "ruleStartTime": "", "calorie": "", "speed": "", "dispTimeText": "", "localId": 0, "studentId": "", "exerciseStatus": 1 }
const maxTime = ref(0);
const minTime = ref(0);
const ruleloading = ref();
let rule: any;
let selectarr: any;

const askUse = () => {
    console.log(isUse.value)
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

const rulevalueupdate = () => {
    selectarr = rulevalue.value.split('-');
    maxTime.value = 60 * rule[selectarr[0]]["plans"][selectarr[1]]["maxTime"];
    minTime.value = 60 * rule[selectarr[0]]["plans"][selectarr[1]]["minTime"];
    timevalue.value = parseInt(((maxTime.value - 120) + 60 * Math.random()).toFixed(0));
}

const getRule = async () => {
    ruleloading.value = true;
    rulevalue.value = null;
    timevalue.value = null;
    ruleoptions.value = [];
    rule = [];
    rule = (await listRule()).data;
    if (!rule.code) {
        rule = rule.data;
        if (rule.length > 0) {
            console.log(rule);
            for (const i in rule) {
                ruleoptions.value.push({ type: 'group', label: rule[i].routeRule, children: [] })
                for (const j in rule[i].plans) {
                    (ruleoptions.value as any)[i].children.push({ label: rule[i].plans[j].routeName, value: `${i}-${j}` })
                    rules.push({ planId: rule[i].ruleId.planId, ruleId: rule[i].plans[j].ruleId });
                    console.log(ruleoptions.value);
                }
            }
            message.success("获取路线信息成功～(∠・ω< )⌒★");
        } else message.warning("获得的路线信息为空。晚安，玛卡巴卡🌕")
    } else {
        message.error("（╯#-皿-)╯~~╧═╧获取路线信息失败，原因：" + rule.msg);
    }
    ruleloading.value = false;
}

const submit = async () => {
    if (rulevalue.value != null) {
        if (timevalue.value != null) {
            record["studentId"] = global.Info.data.id;
            record["exerciseTimes"] = timevalue.value;
            isUse.value == true ? record["exerciseStatus"] = 0 : record["exerciseStatus"] = 1;
            var body = fakeRecord(record, rule, selectarr);
            dialog.warning({
                title: '警告',
                content: '确定上传?' + body,
                positiveText: '确定',
                negativeText: '不确定',
                onPositiveClick: async () => {
                    (await saveRecord(body)).data ? message.success("上传成功(●′ω`●)") : message.error("ε=ε=┌(;￣◇￣)┘上传失败，原因：" + rule.msg);
                }
            })
        }
        else message.error("还没设置运动时间啊喂>ᯅ<");
    } else message.error("还没选择路线啊喂(⌯꒪꒫꒪)੭");
}

onMounted(() => {
    getRule();
})
</script>