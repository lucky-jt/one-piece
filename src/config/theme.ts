// 定义主题类型
export type Theme = "light" | "dark";

// 创建基础主题配置
const baseTheme = {
  primaryColor: "#18a058",
  primaryColorHover: "#36ad6a",
  primaryColorPressed: "#0c7a43",
  primaryColorSuppl: "#36ad6a",
};

export const lightTheme = {
  ...baseTheme,
  backgroundColor: "#ffffff",
  textColor: "#333333",
  borderColor: "#dcdfe6",
};

export const darkTheme = {
  ...baseTheme,
  backgroundColor: "#1f1f1f",
  textColor: "#ffffff",
  borderColor: "#333333",
};

export type ThemeConfig = typeof lightTheme;
