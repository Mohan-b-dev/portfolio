"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Code, Download } from "lucide-react";

interface HeaderProps {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  darkMode = false,
  toggleDarkMode,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest("nav")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Header height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const handleDownloadResume = () => {
    window.open("/resume.pdf", "_blank");
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? `backdrop-blur-md ${
                darkMode ? "bg-gray-900/90" : "bg-white/90"
              } shadow-lg border-b ${
                darkMode ? "border-gray-800" : "border-gray-200"
              }`
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center space-x-2 group"
            >
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 group-hover:scale-110 transition-transform">
                <Code className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Portfolio
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 
                    hover:scale-105 ${
                      activeSection === item.id
                        ? darkMode
                          ? "text-white bg-gray-800"
                          : "text-gray-900 bg-gray-100"
                        : darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                    }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={handleDownloadResume}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 
                  hover:scale-105 flex items-center space-x-2 ${
                    darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </button>
              <button
                onClick={toggleDarkMode}
                className={`p-2.5 rounded-lg transition-all duration-300 hover:scale-110 ${
                  darkMode
                    ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode ? "text-yellow-400" : "text-gray-700"
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              isMenuOpen ? "max-h-96 mt-4" : "max-h-0"
            }`}
          >
            <div
              className={`p-4 rounded-2xl backdrop-blur-md ${
                darkMode ? "bg-gray-900/95" : "bg-white/95"
              } shadow-xl border ${
                darkMode ? "border-gray-800" : "border-gray-200"
              }`}
            >
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium
                    transition-all duration-300 hover:scale-105 ${
                      activeSection === item.id
                        ? darkMode
                          ? "text-white bg-gray-800"
                          : "text-gray-900 bg-gray-100"
                        : darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                    }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={handleDownloadResume}
                className={`block w-full text-left px-4 py-3 rounded-lg font-medium
                  transition-all duration-300 hover:scale-105 mt-2 ${
                    darkMode
                      ? "text-purple-400 hover:text-purple-300 hover:bg-gray-800/50"
                      : "text-purple-600 hover:text-purple-700 hover:bg-gray-100/50"
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Header;
