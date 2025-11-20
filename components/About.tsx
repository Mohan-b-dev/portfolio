"use client";

import React, { useState, useEffect, useMemo } from "react";
import { User, Award, Coffee, Heart, Download, MapPin } from "lucide-react";
import MovingObjects from "./MovingObjects";

type StatKey = "experience" | "projects" | "clients" | "commits";

interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  suffix: string;
  key: StatKey;
}

interface AboutData {
  stats: {
    experience: number;
    projects: number;
    clients: number;
    commits: number;
  };
  description1: string;
  description2: string;
  mission: string;
  location: string;
  availability: string;
  techStack: string;
}

interface ResumeData {
  resumeUrl: string;
  buttonText: string;
  fileName: string;
}

const About = ({ darkMode = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataVersion, setDataVersion] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [counters, setCounters] = useState({
    experience: 0,
    projects: 0,
    clients: 0,
    commits: 0,
  });

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initial data fetch
  useEffect(() => {
    // Only run data fetching on client side
    if (!isClient) return;

    // Prevent concurrent fetches
    if (isFetching) return;

    // Only fetch if we don't have data
    if (aboutData && resumeData) return;

    const fetchData = async () => {
      try {
        console.log("🚀 Starting data fetch for About component");
        setIsLoading(true);
        setIsFetching(true);

        // Fetch about data
        try {
          console.log("🔄 Fetching about data...");
          const aboutResponse = await fetch("/api/about-data", {
            headers: { "Content-Type": "application/json" },
          });
          if (aboutResponse.ok) {
            const aboutDataResult = await aboutResponse.json();
            console.log("✅ About data loaded successfully:", aboutDataResult);
            setAboutData(aboutDataResult);
            setCounters({ experience: 0, projects: 0, clients: 0, commits: 0 });
          }
        } catch (error) {
          console.error("❌ Error loading about data:", error);
          setAboutData((currentData) => {
            if (currentData) return currentData;
            return {
              stats: {
                experience: 5,
                projects: 100,
                clients: 50,
                commits: 2000,
              },
              description1:
                "I'm a passionate full-stack developer with over 5 years of experience...",
              description2: "I specialize in modern web technologies...",
              mission:
                "To create digital experiences that not only look beautiful...",
              location: "Remote",
              availability: "Available for new projects",
              techStack: "React,TypeScript,Node.js,Python,AWS,Docker",
            };
          });
        }

        // Fetch resume data
        try {
          console.log("🔄 Fetching resume data...");
          const resumeResponse = await fetch("/api/resume-data", {
            headers: { "Content-Type": "application/json" },
          });
          if (resumeResponse.ok) {
            const resumeDataResult = await resumeResponse.json();
            console.log(
              "✅ Resume data loaded successfully:",
              resumeDataResult
            );
            setResumeData(resumeDataResult);
          }
        } catch (error) {
          console.error("❌ Error loading resume data:", error);
          setResumeData((currentData) => {
            if (currentData) return currentData;
            return {
              resumeUrl: "/resume.pdf",
              buttonText: "Download Resume",
              fileName: "Mohan_Resume.pdf",
            };
          });
        }

        console.log("✅ All data fetched successfully");
      } catch (error) {
        console.error("❌ Error in data fetch:", error);
      } finally {
        setIsLoading(false);
        setIsFetching(false);
      }
    };

    fetchData();
  }, [dataVersion, isClient, isFetching, aboutData, resumeData]);

  // Auto-refresh in development (less frequent)
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const interval = setInterval(() => {
        setDataVersion((prev) => prev + 1);
      }, 30000); // 30 seconds instead of 5
      return () => clearInterval(interval);
    }
  }, []);

  // Download resume function - Same logic as Header
  const handleDownloadResume = () => {
    if (!resumeData) return;

    // Simple approach - just open the PDF in new tab
    // This works for both local files and external URLs
    window.open(resumeData.resumeUrl, "_blank", "noopener,noreferrer");
  };

  const stats: Stat[] = useMemo(
    () => [
      {
        icon: Award,
        label: "Years Experience",
        value: aboutData?.stats?.experience || 5,
        suffix: "+",
        key: "experience",
      },
      {
        icon: Coffee,
        label: "Projects Completed",
        value: aboutData?.stats?.projects || 100,
        suffix: "+",
        key: "projects",
      },
      {
        icon: User,
        label: "Happy Clients",
        value: aboutData?.stats?.clients || 50,
        suffix: "+",
        key: "clients",
      },
      {
        icon: Heart,
        label: "Code Commits",
        value: aboutData?.stats?.commits || 2000,
        suffix: "+",
        key: "commits",
      },
    ],
    [aboutData]
  );

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("about");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Counter animation
  useEffect(() => {
    if (!isVisible || !aboutData) return;

    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    setCounters({ experience: 0, projects: 0, clients: 0, commits: 0 });

    const timer = setTimeout(() => {
      stats.forEach((stat) => {
        let current = 0;
        const targetValue = stat.value;
        const step = targetValue / steps;

        const counterTimer = setInterval(() => {
          current += step;
          if (current >= targetValue) {
            current = targetValue;
            clearInterval(counterTimer);
          }
          setCounters((prev) => ({
            ...prev,
            [stat.key]: Math.floor(current),
          }));
        }, increment);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [isVisible, aboutData, dataVersion, stats]);

  const formatStatValue = (
    key: StatKey,
    value: number,
    suffix: string
  ): string => {
    if (key === "commits" && value >= 1000) {
      return `${(value / 1000).toFixed(1)}k${suffix}`;
    }
    return `${value}${suffix}`;
  };

  // Split tech stack string into array
  const techStackArray = aboutData?.techStack
    ? aboutData.techStack.split(",").map((tech) => tech.trim())
    : ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"];

  if (isLoading || !aboutData || !resumeData) {
    return (
      <section
        id="about"
        className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"}`}
        suppressHydrationWarning
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p
              className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              suppressHydrationWarning
            >
              Loading about data...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="about"
      className={`relative py-16 md:py-20 lg:py-24 ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
      suppressHydrationWarning
    >
      {/* Moving Objects Background */}
      <MovingObjects variant="about" density="medium" mode="section" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          className="text-center mb-16 animate-fadeInUp"
          style={{ animationDelay: "0.1s" }}
        >
          <h2
            className={`text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            About{" "}
            <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-text-glow">
              Me
            </span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-linear-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* About Text */}
            <div
              className="space-y-6 animate-fadeInLeft"
              style={{ animationDelay: "0.2s" }}
            >
              <p
                className={`text-lg leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {aboutData.description1}
              </p>
              <p
                className={`text-lg leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {aboutData.description2}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-3 pt-4">
                {techStackArray.map((tech) => (
                  <span
                    key={tech}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 ${
                      darkMode
                        ? "bg-purple-900/30 text-purple-300 hover:bg-purple-900/50"
                        : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleDownloadResume}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium bg-linear-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {resumeData.buttonText}
                </button>
                <a
                  href="#contact"
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium border-2 transition-all duration-300 transform hover:scale-105 ${
                    darkMode
                      ? "border-purple-500 text-purple-400 hover:bg-purple-500/10"
                      : "border-purple-600 text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  Get In Touch
                </a>
              </div>
            </div>

            {/* Mission Card */}
            <div className="relative">
              <div
                className={`p-8 rounded-3xl shadow-2xl transform transition-all duration-500 hover:shadow-3xl ${
                  darkMode
                    ? "bg-linear-to-br from-gray-800 to-gray-900 border border-gray-700"
                    : "bg-linear-to-br from-white to-gray-50 border border-gray-200"
                }`}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-2xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      My Mission
                    </h3>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin
                        className={`w-4 h-4 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                      <span
                        className={darkMode ? "text-gray-400" : "text-gray-500"}
                      >
                        {aboutData.location}
                      </span>
                    </div>
                  </div>

                  <p
                    className={`text-lg leading-relaxed ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {aboutData.mission}
                  </p>

                  {/* Availability */}
                  <div
                    className={`flex items-center space-x-2 p-3 rounded-lg ${
                      darkMode ? "bg-green-900/20" : "bg-green-50"
                    }`}
                  >
                    <div className="relative">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-green-400" : "text-green-700"
                      }`}
                    >
                      {aboutData.availability}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-zoomInUp"
            style={{ animationDelay: "0.3s" }}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center p-6 rounded-2xl card-hover glass-effect ${
                  darkMode
                    ? "bg-white/5 border border-gray-800/50"
                    : "bg-gray-50/50 border border-gray-200/50"
                } stagger-item`}
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-linear-to-r from-purple-600 to-blue-600 rounded-xl mb-4 shadow-lg glow-hover transform hover:rotate-12 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-white animate-bounce-soft" />
                </div>
                <div
                  className={`text-3xl font-bold mb-2 bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {formatStatValue(stat.key, counters[stat.key], stat.suffix)}
                </div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
