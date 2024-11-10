import { defineStore } from "pinia";
import { ref, onMounted } from "vue";

export const useThemeStore = defineStore("theme", () => {
  // 检测系统主题
  const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // 初始化时，优先使用本地存储的主题设置，如果没有则使用系统主题
  const isDark = ref(
    localStorage.getItem("theme") !== null
      ? localStorage.getItem("theme") === "dark"
      : systemThemeQuery.matches
  );

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    // 保存到本地存储
    localStorage.setItem("theme", isDark.value ? "dark" : "light");

    if (isDark.value) {
      document.documentElement.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
    }
  };

  // 监听系统主题变化
  const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    // 只有当用户没有手动设置过主题时，才跟随系统主题
    if (!localStorage.getItem("theme")) {
      isDark.value = e.matches;
      if (isDark.value) {
        document.documentElement.classList.add("dark-theme");
      } else {
        document.documentElement.classList.remove("dark-theme");
      }
    }
  };

  onMounted(() => {
    // 添加系统主题变化监听
    systemThemeQuery.addEventListener("change", handleSystemThemeChange);

    // 初始化主题
    if (isDark.value) {
      document.documentElement.classList.add("dark-theme");
    }
  });

  return {
    isDark,
    toggleTheme,
  };
});
