<template>
    <n-table>
        <thead>
            <tr>
                <th>排名</th>
                <th>姓名</th>
                <th>运动里程</th>
                <th>校区</th>
            </tr>
        </thead>
        <tbody v-for="item in ranking">
            <tr>
                <td>{{ item.rankNum }}</td>
                <td>{{ item.studentName }}</td>
                <td>{{ item.totalRouteKilometre }}km</td>
                <td>{{ item.studentId.substring(0, 1) == '2' ? "本部" : "京江" }}</td>
            </tr>
        </tbody>
    </n-table>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { rankingList } from './tools.ts';
import { useMessage } from 'naive-ui';
const message = useMessage();
const ranking = ref();

const getRanking = async () => {
    const res: any = (await rankingList()).data;
    if (!res.code) {
        ranking.value = res.data.rankingListVOs;
        message.success("获取排行榜成功");
    } else message.error("获取排行榜失败，原因：" + res.msg);
}

onMounted(() => {
    getRanking();
}
)
</script>