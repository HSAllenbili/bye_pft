<template>
  <n-spin :show="spinshow">
    <stuInfo ref="stuinfo" @reload="getInfo" />
    <template #description>
      正在同步学生信息
    </template>
  </n-spin>
  <tools v-if="toolshow"/>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useMessage } from 'naive-ui';
import { getStudentInfo } from './tools.ts'
import global from './global.ts'
const message = useMessage();
const spinshow = ref(true);
const toolshow = ref(false);
const stuinfo = ref();

const getInfo = async () => {
  spinshow.value = true;
  const asyncinfo: any = (await getStudentInfo()).data;
  if (asyncinfo.code) {
    message.error("同步学生信息失败，原因：" + asyncinfo.msg);
    spinshow.value = false;
  } else {
    message.success("同步学生信息成功");
    localStorage.setItem("info", JSON.stringify(asyncinfo));
    showinfo();
  }
}

const showinfo =() =>{
    global.Info = JSON.parse(localStorage.getItem("info") as string);
    stuinfo.value.id = global.Info.data.studentNo;
    stuinfo.value.name = global.Info.data.studentName;
    spinshow.value = false;
    toolshow.value = true;
}

onMounted(() => {
  if (localStorage.getItem("info") != null) showinfo();
  else getInfo();
})

</script>