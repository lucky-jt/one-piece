<template>
  <n-config-provider
    :theme="isDark ? darkTheme : null"
    :theme-overrides="themeOverrides"
  >
    <n-message-provider>
      <div class="app" :class="{ 'dark-theme': isDark }">
        <router-view />
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { NConfigProvider, NMessageProvider, darkTheme } from "naive-ui";
import { naiveUIThemeOverrides } from "@/config/naive-ui-theme";
import { useThemeStore } from "@/stores/theme";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);
const themeOverrides = naiveUIThemeOverrides;
</script>

<style scoped>
.app {
  width: 100%;
  min-height: 100vh;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: all 0.3s ease;
}

.app.dark-theme {
  background-color: #18181c;
  color: #fff;
}

/* 移除顶部空白区域 */
body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>
