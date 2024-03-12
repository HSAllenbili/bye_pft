<template>
    <n-spin :show="genshow">
        <template #description>
            {{ spin_info }}
        </template>
        <n-card>
            <n-space vertical>
                <n-flex>
                    <n-select v-model:value="rulevalue" :loading="ruleloading" :options="ruleoptions"
                        placeholder="选择路线" />
                    <n-button style="margin-right: 5x;flex: 1;" :disabled="ruleloading" @click="getRule">刷新路线</n-button>
                </n-flex>
                <n-space justify="space-around">
                    <n-upload accept="image/*" list-type="image-card" max="1"
                        v-model:file-list="startimage">开始照片</n-upload><n-upload accept="image/*" list-type="image-card"
                        max="1" v-model:file-list="endimage">结束照片</n-upload>
                </n-space>
                <n-checkbox v-model:checked="rapid_upload" @update:checked="askRapid">
                    使用快速上传
                </n-checkbox>
            </n-space>
            <template #action>
                <n-button @click="submmit">开始上传</n-button>
            </template>
        </n-card></n-spin>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useDialog, useMessage } from 'naive-ui'
import { listRule, startImg, endImg, startRecord, endRecord } from './apis'
import { fakeRecord } from './fakerecord';
import { compressionFile } from './imgCompress';

const genshow = ref(false)
const rapid_upload = ref(false)
const startimage = ref([])
const endimage = ref([])
const dialog = useDialog();
const rulevalue = ref();
const spin_info = ref("11");
const message = useMessage();
const ruleoptions = ref();
const rules: { planId: any; ruleId: any; }[] = [];
const record = {
    "routeName": "",
    "ruleId": "",
    "planId": "",
    "recordTime": "",
    "startTime": "",
    "startImage": "",
    "endTime": "",
    "exerciseTimes": 0,
    "routeKilometre": 0,
    "endImage": "",
    "strLatitudeLongitude": "",
    "routeRule": "",
    "maxTime": 0,
    "minTime": 0,
    "orouteKilometre": 0,
    "ruleEndTime": "",
    "ruleStartTime": "",
    "calorie": "",
    "speed": "",
    "dispTimeText": "",
    "studentId": ""
}
const ruleloading = ref(false);
let rule: any;
let selectarr: any;

const askRapid = () => {
    if (rapid_upload.value == true) {
        rapid_upload.value = false;
        dialog.warning({
            title: '警告',
            content: '快速上传模式将直接上传运动记录，相对于普通上传存在一定风险。',
            positiveText: '使用快速上传',
            negativeText: '取消',
            onPositiveClick: () => {
                rapid_upload.value = true;
            }
        })
    } else rapid_upload.value = false;
}

const getRule = async () => {
    ruleloading.value = true;
    rulevalue.value = null;
    ruleoptions.value = [];
    rule = [];
    rule = (await listRule());
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
        } else message.warning("获取到的路线信息为空")
    } else {
        message.error("获取路线信息失败，原因：" + rule.msg);
    }
    ruleloading.value = false;
}

const submmit = async () => {
    if (startimage.value.length > 0 && endimage.value.length > 0 && rulevalue.value != null) {
        let now = new Date();
        selectarr = rulevalue.value.split('-');
        record["studentId"] = JSON.parse(localStorage.getItem("stuinfo") as string).data.id;
        const body = fakeRecord(record, rule, selectarr, now);
        dialog.info({
            title: '请仔细检查上传参数',
            content: '本项目即使尽可能地模拟真实上传流程，也无法完全排除潜在风险。同时，自新版本起，记录有效性将由体育系统后台判断。请注意：1.未在规定时间上传等情形的记录将被判定成无效锻炼。2.未上传本人有效照片的记录将被复核。',
            positiveText: '上传',
            negativeText: '取消',
            onPositiveClick: () => {
                upload(body, rapid_upload.value);
            }
        })
    } else message.error("请补充未填项");
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const upload = async (body: any, rapidMode: boolean) => {
    genshow.value = true;
    spin_info.value = "请勿关闭标签页，正在上传开始照片";
    var img1: any = await compressionFile((startimage.value[0] as any).file)
    const form1 = new FormData();
    form1.append('file', img1);
    let res1 = await startImg(form1);
    if (res1.code == 0) {
        spin_info.value = "请勿关闭标签页，正在开始运动";
        let imgurl1 = res1.data;
        body["startImage"] = imgurl1;
        let res2 = await startRecord({
            "routeName": body["routeName"],
            "ruleId": body["ruleId"],
            "planId": body["planId"],
            "recordTime": body["recordTime"],
            "startTime": body["startTime"],
            "startImage": imgurl1,
            "endTime": "",
            "exerciseTimes": "",
            "routeKilometre": "",
            "endImage": "",
            "strLatitudeLongitude": [],
            "routeRule": body["routeRule"],
            "maxTime": body["maxTime"],
            "minTime": body["minTime"],
            "orouteKilometre": body["orouteKilometre"],
            "ruleEndTime": body["ruleEndTime"],
            "ruleStartTime": body["ruleStartTime"],
            "calorie": 0,
            "speed": "0'00''",
            "dispTimeText": 0,
            "studentId": body["studentId"]
        });
        if (!rapidMode) { spin_info.value = "请勿关闭标签页，将于" + body["endTime"] + "结束运动"; await sleep(body["exerciseTimes"] * 1000) }
        if (res2.code == 0) {
            let exid = res2.data;
            spin_info.value = "请勿关闭标签页，正在上传结束照片";
            let img2: any = await compressionFile((endimage.value[0] as any).file)
            const form2 = new FormData();
            form2.append('file', img2);
            let res3 = await endImg(form2);
            if (res3.code == 0) {
                spin_info.value = "请勿关闭标签页，正在结束运动";
                let imgurl2 = res3.data;
                let res4 = await endRecord({
                    "routeName": body["routeName"],
                    "ruleId": body["ruleId"],
                    "planId": body["planId"],
                    "recordTime": body["recordTime"],
                    "startTime": body["startTime"],
                    "startImage": imgurl1,
                    "endTime": body["endTime"],
                    "exerciseTimes": body["exerciseTimes"],
                    "routeKilometre": body["routeKilometre"],
                    "endImage": imgurl2,
                    "strLatitudeLongitude": body["strLatitudeLongitude"],
                    "routeRule": body["routeRule"],
                    "maxTime": body["maxTime"],
                    "minTime": body["minTime"],
                    "orouteKilometre": body["orouteKilometre"],
                    "ruleEndTime": body["ruleEndTime"],
                    "ruleStartTime": body["ruleStartTime"],
                    "calorie": body["calorie"],
                    "speed": body["speed"],
                    "dispTimeText": body["dispTimeText"],
                    "studentId": body["studentId"],
                    "id": exid,
                    "nowStatus": 2
                });
                if (res4.code == 0) {
                    message.success("记录上传成功", { duration: 0, closable: true });
                } else message.error("运动结束失败，原因：" + res4.msg, { duration: 0, closable: true });
            } else message.error("结束图片上传失败，原因：" + res3.msg, { duration: 0, closable: true });
        } else message.error("运动开始失败，原因：" + res2.msg, { duration: 0, closable: true });
    } else message.error("开始图片上传失败，原因：" + res1.msg, { duration: 0, closable: true });
    genshow.value = false;
}

onMounted(() => {
    getRule();
})
</script>