<template>
  <n-spin :show="spinshow">
    <stuInfo ref="stuinfo" @reload="getInfo" />
    <template #description>
      正在获取学生信息
    </template>
  </n-spin>
  <tools v-if="toolshow" />
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
  toolshow.value = false;
  global.Info = (await getStudentInfo()).data;
  if (global.Info.code) {
    message.error("(꒪⌓꒪)获取学生信息失败，原因：" + global.Info.msg);
    spinshow.value = false;
  } else {
    spinshow.value = false;
    message.success("获取学生信息成功ᕕ( ᐛ )ᕗ");
    toolshow.value = true;
    stuinfo.value.id = global.Info.data.studentNo;
    stuinfo.value.name = global.Info.data.studentName;
  }
}

onMounted(() => {
  getInfo();
})

</script>