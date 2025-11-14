// app/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDarkMode } from "@/lib/context/DarkModeContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills ";
import Projects from "@/components/Projects ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // ---------- Custom cursor ----------
  const cursorRef = useRef<HTMLDivElement>(null);

  // ---------- Scroll progress ----------
  useEffect(() => {
    const onScroll = () => {
      const winScroll = window.pageYOffset;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollPercentage(scrolled);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---------- Custom cursor (desktop only) ----------
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const addHover = () => cursor.classList.add("hover");
    const removeHover = () => cursor.classList.remove("hover");

    const interactives = document.querySelectorAll(
      "a, button, [role='button'], input[type='button'], input[type='submit'], input[type='reset'], label[for], select, summary"
    );

    interactives.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  // ---------- Dark-mode aware cursor color ----------
  const cursorBg = darkMode
    ? "rgba(167, 139, 250, 0.35)" // purple-ish for dark
    : "rgba(124, 58, 237, 0.35)"; // violet for light

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
      suppressHydrationWarning
    >
      {/* ---------- Scroll Progress Bar ---------- */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none">
        <div
          className="h-full bg-linear-to-r from-purple-600 to-blue-600 transition-all duration-300"
          style={{ width: `${scrollPercentage}%` }}
        />
      </div>

      {/* ---------- Sections ---------- */}
      <main id="main-content">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Hero darkMode={darkMode} />
        <About darkMode={darkMode} />
        <Skills darkMode={darkMode} />
        <Projects darkMode={darkMode} />
        <Contact darkMode={darkMode} />
        <Footer darkMode={darkMode} />
      </main>

      {/* ---------- Back-to-top ---------- */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-40 ${
          scrollPercentage > 10
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        } bg-linear-to-r from-purple-600 to-blue-600 text-white`}
        aria-label="Scroll to top"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      {/* ---------- Custom Cursor (desktop only) ---------- */}
      <div
        ref={cursorRef}
        className="custom-cursor hidden lg:block"
        style={{ backgroundColor: cursorBg }}
        suppressHydrationWarning
      />

      {/* ---------- Global inline styles (kept for scroll-behavior) ---------- */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
