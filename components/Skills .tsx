"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Code2,
  Database,
  Globe,
  Smartphone,
  Cloud,
  Palette,
  Award,
  TrendingUp,
  Zap,
} from "lucide-react";

interface SkillsProps {
  darkMode?: boolean;
}

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  skills: Skill[];
  color: string;
}

const Skills: React.FC<SkillsProps> = ({ darkMode = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("technical");
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillCategories: SkillCategory[] = [
    {
      icon: Code2,
      title: "Frontend Development",
      skills: [
        { name: "React/Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 88 },
        { name: "Vue.js", level: 82 },
      ],
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: Database,
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 92 },
        { name: "Python", level: 85 },
        { name: "PostgreSQL", level: 88 },
        { name: "MongoDB", level: 80 },
      ],
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: Cloud,
      title: "DevOps & Cloud",
      skills: [
        { name: "AWS", level: 85 },
        { name: "Docker", level: 82 },
        { name: "Kubernetes", level: 75 },
        { name: "CI/CD", level: 88 },
      ],
      color: "from-orange-500 to-red-600",
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      skills: [
        { name: "React Native", level: 88 },
        { name: "Flutter", level: 75 },
        { name: "iOS/Swift", level: 70 },
        { name: "Android/Kotlin", level: 72 },
      ],
      color: "from-pink-500 to-rose-600",
    },
    {
      icon: Palette,
      title: "Design & UX",
      skills: [
        { name: "Figma", level: 85 },
        { name: "Adobe XD", level: 80 },
        { name: "UI/UX Design", level: 88 },
        { name: "Prototyping", level: 82 },
      ],
      color: "from-violet-500 to-purple-600",
    },
    {
      icon: Globe,
      title: "Other Skills",
      skills: [
        { name: "GraphQL", level: 85 },
        { name: "REST APIs", level: 92 },
        { name: "Git/GitHub", level: 90 },
        { name: "Agile/Scrum", level: 88 },
      ],
      color: "from-cyan-500 to-blue-600",
    },
  ];

  const softSkills = [
    { name: "Problem Solving", level: 95, icon: Zap },
    { name: "Team Leadership", level: 88, icon: Award },
    { name: "Communication", level: 92, icon: Globe },
    { name: "Adaptability", level: 90, icon: TrendingUp },
  ];

  const certifications = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2024",
    },
    {
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      year: "2023",
    },
    {
      name: "Google Cloud Professional",
      issuer: "Google Cloud",
      year: "2023",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const technologies = [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "PostgreSQL",
    "MongoDB",
    "GraphQL",
    "Redis",
    "Kubernetes",
    "Git",
    "Next.js",
    "Vue.js",
    "Tailwind CSS",
    "Express",
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`relative py-16 md:py-20 lg:py-24 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 ${
            isVisible ? "animate-fadeInUp" : "opacity-0"
          }`}
        >
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            My{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full mb-6 md:mb-8"></div>
          <p
            className={`text-base md:text-xl max-w-3xl mx-auto px-4 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            A comprehensive overview of my technical expertise and professional
            capabilities
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          className={`flex justify-center mb-10 md:mb-12 ${
            isVisible ? "animate-fadeInUp" : "opacity-0"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          <div
            className={`inline-flex rounded-xl md:rounded-2xl p-1 ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow-lg`}
          >
            <button
              onClick={() => setActiveTab("technical")}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-medium transition-all duration-300 text-sm md:text-base ${
                activeTab === "technical"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Technical Skills
            </button>
            <button
              onClick={() => setActiveTab("soft")}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-medium transition-all duration-300 text-sm md:text-base ${
                activeTab === "soft"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Soft Skills
            </button>
          </div>
        </div>

        {/* Technical Skills */}
        {activeTab === "technical" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-12 md:mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className={`p-6 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-sm transform hover:scale-105 transition-all duration-500 ${
                  darkMode
                    ? "bg-gray-800/50 hover:bg-gray-700/50"
                    : "bg-white/80 hover:bg-white/90"
                } shadow-xl hover:shadow-2xl ${
                  isVisible ? "animate-fadeInUp" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${0.3 + categoryIndex * 0.1}s`,
                }}
              >
                <div className="text-center mb-6 md:mb-8">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-r ${category.color} mb-3 md:mb-4 transform hover:rotate-12 transition-transform duration-300 shadow-lg`}
                  >
                    <category.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3
                    className={`text-lg md:text-xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4 md:space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span
                          className={`text-sm md:text-base font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {skill.name}
                        </span>
                        <span
                          className={`text-xs md:text-sm font-semibold ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div
                        className={`w-full h-2 md:h-2.5 rounded-full overflow-hidden ${
                          darkMode ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      >
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${category.color} transition-all duration-1000 ease-out`}
                          style={{
                            width: isVisible ? `${skill.level}%` : "0%",
                            transitionDelay: `${
                              0.3 + categoryIndex * 0.1 + skillIndex * 0.1 + 0.5
                            }s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Soft Skills */}
        {activeTab === "soft" && (
          <div className="max-w-4xl mx-auto mb-12 md:mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {softSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`p-6 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-sm ${
                    darkMode ? "bg-gray-800/50" : "bg-white/80"
                  } shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 ${
                    isVisible ? "animate-fadeInUp" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600">
                      <skill.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3
                      className={`text-lg md:text-xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {skill.name}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Proficiency
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      className={`w-full h-3 rounded-full ${
                        darkMode ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-1000"
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${0.3 + index * 0.1 + 0.5}s`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-12">
              <h3
                className={`text-2xl md:text-3xl font-bold text-center mb-8 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <div
                    key={cert.name}
                    className={`p-6 rounded-2xl backdrop-blur-sm ${
                      darkMode ? "bg-gray-800/50" : "bg-white/80"
                    } shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isVisible ? "animate-fadeInUp" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-3 mb-3">
                      <Award className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4
                          className={`font-bold mb-1 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {cert.name}
                        </h4>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {cert.issuer}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            darkMode ? "text-gray-500" : "text-gray-500"
                          }`}
                        >
                          {cert.year}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Technologies Cloud */}
        <div className="mt-12 md:mt-16 text-center">
          <h3
            className={`text-xl md:text-2xl font-bold mb-6 md:mb-8 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
            {technologies.map((tech, index) => (
              <span
                key={tech}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl text-sm md:text-base font-medium transform hover:scale-110 transition-all duration-300 cursor-default ${
                  darkMode
                    ? "bg-gradient-to-r from-purple-900/30 to-blue-900/30 text-purple-300 hover:from-purple-800/40 hover:to-blue-800/40"
                    : "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 hover:from-purple-200 hover:to-blue-200"
                } shadow-lg hover:shadow-xl ${
                  isVisible ? "animate-fadeInUp" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${0.8 + index * 0.05}s`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default Skills;
