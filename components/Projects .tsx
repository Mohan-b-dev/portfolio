"use client";

import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, ArrowRight, Filter, Star } from "lucide-react";
import MovingObjects from "./MovingObjects";

interface ProjectsProps {
  darkMode?: boolean;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  github: string;
  live: string;
  featured?: boolean;
}

interface ProjectsData {
  sectionTitle: string;
  sectionDescription: string;
  projects: Project[];
  categories: string[];
  githubUrl: string;
  viewAllText: string;
}

const Projects: React.FC<ProjectsProps> = ({ darkMode = false }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects data
  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await fetch("/api/projects-data");
        const data = await response.json();
        setProjectsData(data);
      } catch (error) {
        console.error("Error loading projects data:", error);
        // Fallback to default data
        setProjectsData({
          sectionTitle: "Featured Projects",
          sectionDescription:
            "A showcase of my recent work, featuring innovative solutions and cutting-edge technologies",
          githubUrl: "https://github.com",
          viewAllText: "View All Projects on GitHub",
          categories: ["All", "Web App", "Mobile App", "DevOps", "Blockchain"],
          projects: [
            {
              id: 1,
              title: "E-Commerce Platform",
              description:
                "A full-stack e-commerce solution with advanced features like real-time inventory, payment processing, and admin dashboard.",
              image:
                "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
              category: "Web App",
              technologies: ["React", "Node.js", "MongoDB", "Stripe"],
              github: "https://github.com",
              live: "https://example.com",
              featured: true,
            },
            {
              id: 2,
              title: "AI Task Manager",
              description:
                "An intelligent task management app that uses AI to prioritize tasks and suggest optimal work schedules.",
              image:
                "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
              category: "Mobile App",
              technologies: [
                "React Native",
                "Python",
                "TensorFlow",
                "Firebase",
              ],
              github: "https://github.com",
              live: "https://example.com",
              featured: true,
            },
            {
              id: 3,
              title: "Real-time Analytics Dashboard",
              description:
                "A comprehensive analytics platform with real-time data visualization and interactive charts for business insights.",
              image:
                "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
              category: "Web App",
              technologies: ["Vue.js", "D3.js", "PostgreSQL", "WebSocket"],
              github: "https://github.com",
              live: "https://example.com",
            },
            {
              id: 4,
              title: "Cloud Infrastructure Tool",
              description:
                "DevOps tool for managing cloud infrastructure with automated deployment and monitoring capabilities.",
              image:
                "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg",
              category: "DevOps",
              technologies: ["Docker", "Kubernetes", "AWS", "Terraform"],
              github: "https://github.com",
              live: "https://example.com",
            },
            {
              id: 5,
              title: "Social Media App",
              description:
                "A modern social platform with real-time messaging, story features, and advanced privacy controls.",
              image:
                "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg",
              category: "Mobile App",
              technologies: ["React Native", "GraphQL", "Redis", "WebRTC"],
              github: "https://github.com",
              live: "https://example.com",
              featured: true,
            },
            {
              id: 6,
              title: "Blockchain Wallet",
              description:
                "Secure cryptocurrency wallet with multi-chain support and DeFi integration capabilities.",
              image:
                "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg",
              category: "Blockchain",
              technologies: ["TypeScript", "Solidity", "Web3.js", "React"],
              github: "https://github.com",
              live: "https://example.com",
            },
          ],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectsData();
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("projects");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Filter projects with animation
  useEffect(() => {
    if (!projectsData) return;

    setIsAnimating(true);
    const timer = setTimeout(() => {
      const allProjects = Array.isArray(projectsData.projects)
        ? projectsData.projects
        : [];
      const filtered =
        activeFilter === "All"
          ? allProjects
          : allProjects.filter((project) => project.category === activeFilter);
      // ensure we always store an array
      setFilteredProjects(Array.isArray(filtered) ? filtered : []);
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeFilter, projectsData]);

  // Ensure filteredProjects is initialized once when projectsData arrives
  const initializedRef = useRef(false);
  useEffect(() => {
    if (!projectsData || initializedRef.current) return;
    const allProjects = Array.isArray(projectsData.projects)
      ? projectsData.projects
      : [];
    setFilteredProjects(allProjects);
    initializedRef.current = true;
  }, [projectsData]);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
  };

  if (isLoading || !projectsData) {
    return (
      <section
        id="projects"
        className={`relative py-16 md:py-20 lg:py-24 transition-colors duration-300 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
        suppressHydrationWarning
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p
              className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              suppressHydrationWarning
            >
              Loading projects...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className={`relative py-16 md:py-20 lg:py-24 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
      suppressHydrationWarning
    >
      {/* Moving Objects Background */}
      <MovingObjects variant="projects" density="medium" mode="section" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 ${
            isVisible ? "animate-fadeInUp" : "opacity-0"
          }`}
        >
          {(() => {
            const title = projectsData.sectionTitle || "Featured Projects";
            const parts = title.split(" ");
            const first = parts[0] || title;
            const rest = parts.length > 1 ? parts.slice(1).join(" ") : "";
            return (
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {first}
                {rest && (
                  <>
                    {" "}
                    <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {rest}
                    </span>
                  </>
                )}
              </h2>
            );
          })()}
          <div className="w-16 sm:w-20 h-1 bg-linear-to-r from-purple-600 to-blue-600 mx-auto rounded-full mb-6 md:mb-8"></div>
          <p
            className={`text-base md:text-xl max-w-3xl mx-auto px-4 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {projectsData.sectionDescription}
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          className={`flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-12 ${
            isVisible ? "animate-fadeInUp" : "opacity-0"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          <div
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl ${
              darkMode
                ? "bg-gray-800/60 border border-gray-700"
                : "bg-gray-100/50 border border-gray-300"
            }`}
          >
            <Filter
              className={`w-4 h-4 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Filter:
            </span>
          </div>
          {(projectsData.categories || []).map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl text-sm md:text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === category
                  ? "bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105"
                  : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Count */}
        <div className="text-center mb-8">
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Showing {filteredProjects.length} project
            {filteredProjects.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Projects Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto transition-opacity duration-300 ${
            isAnimating ? "opacity-50" : "opacity-100"
          }`}
        >
          {Array.isArray(filteredProjects)
            ? filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl card-hover glass-effect ${
                    darkMode
                      ? "bg-gray-700/50 border border-gray-600/50"
                      : "bg-white/80 border border-gray-200/50"
                  } ${
                    isVisible ? "animate-fadeInUp" : "opacity-0"
                  } stagger-item`}
                  style={{
                    animationDelay: `${0.4 + index * 0.1}s`,
                  }}
                >
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className="flex items-center space-x-1 px-3 py-1.5 bg-linear-to-r from-yellow-500 to-orange-500 rounded-full text-white text-xs font-semibold shadow-lg animate-bounce-soft">
                        <Star className="w-5 h-5 fill-current animate-spin" />
                        <span>Featured</span>
                      </div>
                    </div>
                  )}

                  {/* Project Image */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex space-x-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 md:p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 hover:scale-110 transition-all duration-200"
                          aria-label="View GitHub repository"
                        >
                          <Github className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 md:p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 hover:scale-110 transition-all duration-200"
                          aria-label="View live demo"
                        >
                          <ExternalLink className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-5 md:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          darkMode
                            ? "bg-purple-900/30 text-purple-300"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {project.category}
                      </span>
                      <ArrowRight
                        className={`w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300 ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      />
                    </div>

                    <h3
                      className={`text-lg md:text-xl font-bold mb-2 md:mb-3 line-clamp-1 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {project.title}
                    </h3>

                    <p
                      className={`text-xs md:text-sm leading-relaxed mb-4 line-clamp-3 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {(project.technologies || []).map((tech) => (
                        <span
                          key={tech}
                          className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                            darkMode
                              ? "bg-gray-600 text-gray-300 hover:bg-gray-500 border border-gray-500"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p
              className={`text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No projects found in this category.
            </p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-10 md:mt-12">
          <a
            href={projectsData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center space-x-2 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              darkMode
                ? "border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10"
                : "border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
            }`}
          >
            <Github className="w-5 h-5" />
            <span>{projectsData.viewAllText}</span>
          </a>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default Projects;
