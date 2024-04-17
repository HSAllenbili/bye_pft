<template>
  <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <n-global-style />
            <n-alert type="warning" title="注意">
              江苏大学信息化中心将于4月17-24日限制外网访问体育系统，期间内需要通过校园网访问体育系统。为规避潜在的钓鱼风险，维护期间内请勿使用该工具。
            </n-alert>
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
