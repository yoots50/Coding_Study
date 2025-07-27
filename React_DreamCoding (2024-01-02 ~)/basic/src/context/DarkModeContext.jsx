import { createContext, useState } from "react";

export const DarkModeContext = createContext(); // darkmode 데이터를 가짐

export function DarkModeProvider({ children }) {
  // 데이터를 가지는 umbrella, UI적으로 무언갈 하진 않지만 children에게 darkMode와 toggleDarkMode 함수를 전달함
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode((mode) => !mode);
  };
  return <DarkModeContext.Provider value={{darkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
}
