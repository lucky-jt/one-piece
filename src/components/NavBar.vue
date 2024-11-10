<template>
  <div class="nav-bar">
    <!-- 移动端菜单按钮 -->
    <div class="mobile-menu-btn">
      <n-button text @click="showDrawer = true">
        <template #icon>
          <n-icon size="24">
            <MenuOutline />
          </n-icon>
        </template>
      </n-button>
    </div>

    <div class="text-logo">鲸鱼Jt的日记本</div>

    <!-- PC端导航菜单 -->
    <div class="desktop-menu">
      <n-menu
        mode="horizontal"
        :options="menuOptions"
        :value="activeKey"
        @update:value="handleMenuSelect"
      />
    </div>

    <div class="nav-controls">
      <!-- 主题切换按钮 -->
      <n-button text circle @click="toggleTheme">
        <template #icon>
          <n-icon size="20">
            <SunnySharp v-if="isDark" />
            <MoonSharp v-else />
          </n-icon>
        </template>
      </n-button>
    </div>

    <!-- 移动端抽屉式导航菜单 -->
    <n-drawer v-model:show="showDrawer" :width="280">
      <n-drawer-content title="菜单">
        <n-menu
          :options="menuOptions"
          :indent="18"
          @update:value="handleMenuSelect"
        />
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { h, computed, ref } from "vue";
import { RouterLink, useRouter, useRoute } from "vue-router";
import { NMenu, NButton, NIcon, NDrawer, NDrawerContent } from "naive-ui";
import { SunnySharp, MoonSharp, MenuOutline } from "@vicons/ionicons5";
import { useThemeStore } from "@/stores/theme";
import type { MenuOption } from "naive-ui";

const router = useRouter();
const route = useRoute();
const showDrawer = ref(false);
const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

const activeKey = computed(() => {
  const path = route.path;
  if (path.startsWith("/life")) {
    return "";
  }

  switch (path) {
    case "/":
      return "home";
    case "/home":
      return "map";
    case "/friend":
      return "friend";
    default:
      return "";
  }
});

const toggleTheme = () => {
  themeStore.toggleTheme();
};

const handleMenuSelect = (key: string) => {
  showDrawer.value = false;
  switch (key) {
    case "home":
      router.push("/");
      break;
    case "map":
      router.push("/home");
      break;
    case "friend":
      router.push("/friend");
      break;
  }
};

const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, { to: "/" }, { default: () => "首页" }),
    key: "home",
  },
  {
    label: () => h(RouterLink, { to: "/home" }, { default: () => "地图" }),
    key: "map",
  },
  {
    label: () => h(RouterLink, { to: "/friend" }, { default: () => "好友" }),
    key: "friend",
  },
];
</script>

<style scoped>
.nav-bar {
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background-color: var(--background-color);
  border-bottom: 1px solid var(--border-color);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

/* PC端菜单样式 */
.desktop-menu {
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 0 20px;
}

.desktop-menu :deep(.n-menu) {
  background-color: transparent;
}

.desktop-menu :deep(.n-menu-item) {
  color: var(--text-color);
  transition: color 0.3s ease;
}

.desktop-menu :deep(.n-menu-item:hover) {
  color: var(--primary-color);
}

/* 移动端/PC端响应式显示控制 */
.mobile-menu-btn {
  display: none;
}

@media screen and (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
    align-items: center;
  }

  .desktop-menu {
    display: none;
  }
}

.text-logo {
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
}

.theme-switch :deep(.n-button) {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 抽屉菜单样式 */
:deep(.n-drawer-content) {
  background-color: var(--card-background);
}

:deep(.n-drawer-header__title) {
  color: var(--text-color);
}

:deep(.n-menu-item) {
  color: var(--text-color);
}

:deep(.n-menu-item:hover) {
  color: var(--primary-color);
}

:deep(.n-menu-item--selected) {
  color: var(--primary-color) !important;
}

:deep(.n-drawer-header) {
  border-bottom: 1px solid var(--border-color);
}

/* 添加选中项的下划线样式 */
.desktop-menu :deep(.n-menu-item--selected::after) {
  background-color: var(--primary-color) !important;
}

/* 添加音乐控制相关样式 */
.nav-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* 删除音乐相关样式 */
.music-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.music-btn:hover :deep(.n-icon) {
  transform: scale(1.2);
  color: var(--primary-color);
}

.music-btn :deep(.n-icon) {
  transition: all 0.3s ease;
}

/* 旋转动画 */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.icon-rotating {
  animation: rotate 3s linear infinite;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .nav-controls {
    gap: 4px;
  }
}
</style>
