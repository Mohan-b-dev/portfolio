"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowDown,
  Code,
  Palette,
  Zap,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  RefreshCw,
} from "lucide-react";

interface HeroProps {
  darkMode?: boolean;
}

interface HeroData {
  name: string;
  greeting: string;
  description: string;
  roles: string[];
  stats: {
    experience: string;
    projects: string;
    clients: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
  };
}

const Hero: React.FC<HeroProps> = ({ darkMode = false }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Fetch hero data from JSON file
  const fetchHeroData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/hero-data");
      const data = await response.json();
      setHeroData(data);
    } catch {
      console.log("Error loading hero data, using defaults");
      setHeroData({
        name: "MOHAN",
        greeting: "👋 Welcome to my portfolio",
        description:
          "Crafting digital experiences with cutting-edge technology and innovative design. Passionate about creating solutions that make a difference.",
        roles: [
          "Full-Stack Developer",
          "BLOCKCHAIN DEVELOPER",
          "APP DEVELOPER",
          "Problem Solver",
          "Creative Thinker",
        ],
        stats: {
          experience: "5+",
          projects: "100+",
          clients: "50+",
        },
        socialLinks: {
          github: "https://github.com/Mohan-b-dev",
          linkedin: "https://linkedin.com/mohan",
          email: "mailto:hello@johndoe.dev",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initial data fetch
  useEffect(() => {
    if (!isClient) return;
    fetchHeroData();
  }, [isClient]);

  // Mouse movement parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (!heroData) return;

    const currentRole = heroData.roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && typedText === currentRole) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % heroData.roles.length);
      } else {
        setTypedText(
          isDeleting
            ? currentRole.substring(0, typedText.length - 1)
            : currentRole.substring(0, typedText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentRoleIndex, heroData]);

  const floatingElements = [
    { icon: Code, delay: "0s", position: "top-20 left-20", color: "purple" },
    {
      icon: Palette,
      delay: "0.5s",
      position: "top-40 right-20",
      color: "blue",
    },
    { icon: Zap, delay: "1s", position: "bottom-40 left-40", color: "emerald" },
    {
      icon: Sparkles,
      delay: "1.5s",
      position: "bottom-20 right-40",
      color: "pink",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Mohan-b-dev",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: heroData?.socialLinks.linkedin || "https://linkedin.com/mohan",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: heroData?.socialLinks.email || "mohangokul515@johndoe.dev",
      label: "Email",
    },
  ];

  const stats = [
    { value: heroData?.stats.experience || "5+", label: "Years Experience" },
    { value: heroData?.stats.projects || "100+", label: "Projects Completed" },
    { value: heroData?.stats.clients || "50+", label: "Happy Clients" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <section
        id="home"
        className={`relative min-h-screen overflow-hidden flex items-center justify-center ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
        suppressHydrationWarning
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p
            className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            suppressHydrationWarning
          >
            Loading hero data...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className={`relative min-h-screen overflow-hidden flex items-center ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
      suppressHydrationWarning
    >
      {/* Refresh Button - Development Only */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={fetchHeroData}
            className="inline-flex items-center px-3 py-2 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Refresh
          </button>
        </div>
      )}

      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(139, 92, 246, 0.4) 0%, 
              rgba(59, 130, 246, 0.3) 25%, 
              rgba(16, 185, 129, 0.2) 50%, 
              transparent 70%)`,
          }}
        />
        {/* Grid Pattern */}
        <div
          className={`absolute inset-0 ${
            darkMode ? "opacity-5" : "opacity-10"
          }`}
          style={{
            backgroundImage: `linear-gradient(${
              darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            } 1px, transparent 1px), 
            linear-gradient(90deg, ${
              darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            } 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating Elements */}
      {floatingElements.map((element, index) => (
        <div
          key={index}
          className={`absolute ${element.position} hidden lg:block animate-float`}
          style={{
            animationDelay: element.delay,
          }}
        >
          <div
            className={`p-4 rounded-2xl backdrop-blur-sm ${
              darkMode ? "bg-white/10 text-white" : "bg-white/30 text-gray-600"
            } transform hover:scale-110 transition-all duration-300 shadow-xl cursor-pointer`}
          >
            <element.icon className="w-8 h-8" />
          </div>
        </div>
      ))}

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-0 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8 md:mb-10 relative inline-block">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-linear-to-br from-purple-600 via-blue-600 to-emerald-500 p-1 transform hover:scale-110 transition-all duration-500 animate-pulse-slow">
              <div
                className={`w-full h-full rounded-full ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } flex items-center justify-center text-4xl md:text-6xl font-bold bg-linear-to-br from-purple-600 via-blue-600 to-emerald-500 bg-clip-text text-transparent`}
              >
                {heroData?.name?.charAt(0) || "M"}
              </div>
            </div>
            {/* Status Indicator */}
            <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2">
              <div className="relative">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>

          {/* Social Links - Mobile Top */}
          <div className="flex justify-center space-x-4 mb-6 lg:hidden">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                  darkMode
                    ? "bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700"
                    : "bg-white/50 text-gray-600 hover:text-gray-900 hover:bg-white"
                } backdrop-blur-sm shadow-lg`}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Greeting */}
          <div className="mb-4 md:mb-6">
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm md:text-base font-medium ${
                darkMode
                  ? "bg-purple-900/30 text-purple-300"
                  : "bg-purple-100 text-purple-700"
              } backdrop-blur-sm`}
            >
              {heroData?.greeting || "👋 Welcome to my portfolio"}
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Hi, I&apos;m{" "}
            <span className="bg-linear-to-r from-purple-600 via-blue-600 to-emerald-500 bg-clip-text text-transparent">
              {heroData?.name || "MOHAN"}
            </span>
          </h1>

          {/* Typing Animation */}
          <div className="mb-6 md:mb-8 h-12 md:h-16 flex items-center justify-center">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-semibold ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {typedText}
              <span className="animate-blink">|</span>
            </h2>
          </div>

          {/* Description */}
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto mb-8 md:mb-10 px-4 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {heroData?.description ||
              "Crafting digital experiences with cutting-edge technology and innovative design. Passionate about creating solutions that make a difference."}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 md:mb-16">
            <button
              onClick={() => scrollToSection("projects")}
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-xl md:rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-purple-500/50 text-sm md:text-base"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 rounded-xl md:rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300 text-sm md:text-base ${
                darkMode
                  ? "border-purple-500 text-purple-400 hover:bg-purple-500/10"
                  : "border-purple-600 text-purple-600 hover:bg-purple-50"
              }`}
            >
              Get In Touch
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`p-4 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-sm ${
                  darkMode ? "bg-white/5" : "bg-white/50"
                } transform hover:scale-105 transition-all duration-300`}
              >
                <div
                  className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-xs md:text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Social Links - Desktop Side */}
          <div className="hidden lg:flex fixed left-8 top-1/2 transform -translate-y-1/2 flex-col space-y-4 z-20">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-x-1 ${
                  darkMode
                    ? "bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700"
                    : "bg-white/50 text-gray-600 hover:text-gray-900 hover:bg-white"
                } backdrop-blur-sm shadow-lg`}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <button
          onClick={() => scrollToSection("about")}
          aria-label="Scroll to about section"
          className={`p-2 rounded-full ${
            darkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          } transition-colors`}
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
