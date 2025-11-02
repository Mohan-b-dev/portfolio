"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  User,
  Award,
  Coffee,
  Heart,
  Download,
  MapPin,
  RefreshCw,
} from "lucide-react";

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
  const [counters, setCounters] = useState({
    experience: 0,
    projects: 0,
    clients: 0,
    commits: 0,
  });

  // Fetch about data
  const fetchAboutData = async () => {
    try {
      const response = await fetch("/api/about-data?t=" + Date.now());

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setAboutData(data);
      setCounters({ experience: 0, projects: 0, clients: 0, commits: 0 });
    } catch (error) {
      console.error("❌ Error loading about data:", error);
      setAboutData({
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
      });
    }
  };

  // Fetch resume data
  const fetchResumeData = async () => {
    try {
      const response = await fetch("/api/resume-data?t=" + Date.now());

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setResumeData(data);
    } catch (error) {
      console.error("❌ Error loading resume data:", error);
      setResumeData({
        resumeUrl: "/resume.pdf",
        buttonText: "Download Resume",
        fileName: "Mohan_Resume.pdf",
      });
    }
  };

  // Fetch all data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([fetchAboutData(), fetchResumeData()]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [dataVersion]);

  // Auto-refresh in development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const interval = setInterval(() => {
        setDataVersion((prev) => prev + 1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  // Download resume function
  const handleDownloadResume = async () => {
    if (!resumeData) return;

    try {
      // Create a temporary anchor element to trigger download
      const response = await fetch(resumeData.resumeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = resumeData.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading resume:", error);
      // Fallback to opening in new tab if download fails
      window.open(resumeData.resumeUrl, "_blank");
    }
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
  }, [isVisible, aboutData, dataVersion]);

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
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p
              className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
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
      className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"}`}
    >
      {/* Refresh Button - Development Only */}
      {process.env.NODE_ENV === "development" && (
        <div className="container mx-auto px-4 mb-4">
          <div className="flex justify-end">
            <button
              onClick={() => setDataVersion((prev) => prev + 1)}
              className="inline-flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            About{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* About Text */}
            <div className="space-y-6">
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
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
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
                    ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
                    : "bg-gradient-to-br from-white to-gray-50 border border-gray-200"
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center p-6 rounded-2xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300 ${
                  darkMode
                    ? "bg-white/5 hover:bg-white/10 border border-gray-800"
                    : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl mb-4 shadow-lg">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`text-3xl font-bold mb-2 ${
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
