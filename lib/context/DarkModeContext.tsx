"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

export { DarkModeContext };

/**
 * DarkModeProvider - Provides dark mode state to all child components
 * Eliminates prop drilling and centralizes dark mode logic
 *
 * @example
 * <DarkModeProvider>
 *   <App />
 * </DarkModeProvider>
 */

export function DarkModeProvider({ children }: { children: ReactNode }) {
  // Use a function to initialize state only on client-side
  const [darkMode, setDarkMode] = useState(() => {
    // Always return true (dark mode) on server for better UX
    if (typeof window === "undefined") return true;

    // On client, read from localStorage or default to dark mode
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Default to dark mode instead of system preference
    return true;
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

/**
 * Custom hook to use dark mode context
 * Must be called within a DarkModeProvider
 *
 * @example
 * const { darkMode, toggleDarkMode } = useDarkMode();
 */
export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within DarkModeProvider");
  }
  return context;
}
