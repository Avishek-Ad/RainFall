import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("rainfall-theme") || "coffee",
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("rainfall-theme", theme);
  },
}));
