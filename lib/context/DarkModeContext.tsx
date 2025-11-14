"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

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
    // Always return false on server, will be updated on client
    if (typeof window === "undefined") return false;

    // On client, read from localStorage or system preference
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
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
