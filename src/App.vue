<template>
  <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <n-global-style />
          <proxy />
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useOsTheme, darkTheme } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'
const osThemeRef = useOsTheme();
const theme = computed(() => (osThemeRef.value === 'dark' ? darkTheme : null));

</script>

<style>
::-webkit-scrollbar {
  width: 0;
}
</style>