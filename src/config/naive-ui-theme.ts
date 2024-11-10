import { GlobalThemeOverrides } from "naive-ui";

export const naiveUIThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#18a058",
    primaryColorHover: "#36ad6a",
  },
  Card: {
    color: "var(--card-background)",
    textColor: "var(--text-color)",
    borderColor: "var(--border-color)",
  },
  Button: {
    textColor: "var(--text-color)",
    borderColor: "var(--border-color)",
  },
  Input: {
    color: "var(--background-color)",
    textColor: "var(--text-color)",
    borderColor: "var(--border-color)",
  },
  Menu: {
    color: "var(--background-color)",
    itemTextColor: "var(--text-color)",
  },
};
