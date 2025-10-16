// src/contexts/ThemeContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    ReactNode,
  } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { Theme, lightTheme, darkTheme } from "../constants/theme";
  
  // Định nghĩa kiểu dữ liệu cho context
  type ThemeContextType = {
    theme: Theme;
    isDark: boolean;
    toggleTheme: () => void;
    isLoading: boolean;
  };
  
  // Tạo context với kiểu rõ ràng
  const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
  
  // Tên key để lưu trạng thái theme trong AsyncStorage
  const THEME_KEY = "@app_theme_is_dark";
  
  export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDark, setIsDark] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  
    // Load trạng thái theme khi app khởi động
    useEffect(() => {
      (async () => {
        try {
          const saved = await AsyncStorage.getItem(THEME_KEY);
          if (saved !== null) setIsDark(saved === "true");
        } catch (error) {
          console.warn("Failed to load theme:", error);
        } finally {
          setIsLoading(false);
        }
      })();
    }, []);
  
    // Lưu lại khi người dùng đổi theme
    useEffect(() => {
      AsyncStorage.setItem(THEME_KEY, String(isDark)).catch((err) =>
        console.warn("Failed to save theme:", err)
      );
    }, [isDark]);
  
    const toggleTheme = () => setIsDark((prev) => !prev);
    const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);
  
    return (
      <ThemeContext.Provider value={{ theme, isDark, toggleTheme, isLoading }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  
  // Custom hook để dùng theme trong mọi component
  export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error("useTheme must be used inside a ThemeProvider");
    }
    return context;
  };
  