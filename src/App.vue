<template>
  <n-config-provider :theme="theme">
    <n-dialog-provider>
      <n-message-provider>
        <n-global-style />
        <reqToken v-if="!hasToken" />
        <root v-if="hasToken" />
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useOsTheme, darkTheme } from 'naive-ui'
const osThemeRef = useOsTheme();
const theme = computed(() => (osThemeRef.value === 'dark' ? darkTheme : null));
const hasToken = ref(localStorage.getItem("token") != null)
</script>

<style>
::-webkit-scrollbar {
     width: 0;
   }
</style>