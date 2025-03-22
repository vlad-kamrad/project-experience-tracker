import { createContext } from "react";
import { ThemeProviderState } from "./types";

export const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "system",
  setTheme: () => null,
});
