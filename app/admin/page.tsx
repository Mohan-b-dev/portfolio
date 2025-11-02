"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  RefreshCw,
  Lock,
  Eye,
  EyeOff,
  Settings,
  User,
  Code,
  FileText,
  Upload,
  Download,
  Server,
  Link,
} from "lucide-react";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    // Hero Section
    name: "MOHAN",
    greeting: "👋 Welcome to my portfolio",
    description:
      "Crafting digital experiences with cutting-edge technology and innovative design. Passionate about creating solutions that make a difference.",
    roles:
      "Full-Stack Developer,BLOCKCHAIN DEVELOPER,APP DEVELOPER,Problem Solver,Creative Thinker",
    heroStats: {
      experience: "5+",
      projects: "100+",
      clients: "50+",
    },
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "mailto:hello@example.com",
    },

    // About Section
    stats: {
      experience: 5,
      projects: 100,
      clients: 50,
      commits: 2000,
    },
    description1:
      "I'm a passionate full-stack developer with over 5 years of experience creating digital solutions that bridge the gap between design and technology. My journey began with a curiosity for how things work, which evolved into a love for building applications that solve real-world problems.",
    description2:
      "I specialize in modern web technologies including React, TypeScript, Node.js, and cloud platforms. When I'm not coding, you'll find me exploring new technologies, contributing to open source, or mentoring aspiring developers.",
    mission:
      "To create digital experiences that not only look beautiful but also perform exceptionally well and provide genuine value to users.",
    location: "Remote",
    availability: "Available for new projects",
    techStack: "React,TypeScript,Node.js,Python,AWS,Docker",

    // Resume Section
    resumeUrl: "/resume.pdf",
    resumeButtonText: "Download Resume",
    resumeFileName: "Mohan_Resume.pdf",
    resumeSource: "server",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("hero");
  const [selectedFile, setSelectedFile] = useState(null);

  const correctPassword = "admin123";

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setMessage("✅ Login successful!");
      setTimeout(() => setMessage(""), 2000);
    } else {
      setMessage("❌ Wrong password!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Load existing data after authentication
  useEffect(() => {
    if (!isAuthenticated) return;

    const loadData = async () => {
      try {
        const [heroResponse, aboutResponse, resumeResponse] = await Promise.all(
          [
            fetch("/api/hero-data"),
            fetch("/api/about-data"),
            fetch("/api/resume-data"),
          ]
        );

        const heroData = await heroResponse.json();
        const aboutData = await aboutResponse.json();
        const resumeData = await resumeResponse.json();

        setFormData((prev) => ({
          ...prev,
          ...heroData,
          ...aboutData,
          ...resumeData,
          roles: Array.isArray(heroData.roles)
            ? heroData.roles.join(",")
            : heroData.roles,
          heroStats: heroData.stats || prev.heroStats,
          socialLinks: heroData.socialLinks || prev.socialLinks,
          stats: aboutData.stats || prev.stats,
          resumeSource: resumeData.resumeSource || "server",
        }));
      } catch (error) {
        console.log("No existing data found, using defaults");
      }
    };
    loadData();
  }, [isAuthenticated]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedInputChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  // Handle file selection for upload
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setMessage("❌ Please select a PDF file");
        setTimeout(() => setMessage(""), 3000);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setMessage("❌ File size must be less than 5MB");
        setTimeout(() => setMessage(""), 3000);
        return;
      }
      setSelectedFile(file);
      setFormData((prev) => ({
        ...prev,
        resumeFileName: file.name,
        resumeButtonText: `Download ${file.name.replace(".pdf", "")}`,
      }));
    }
  };

  // Upload PDF to server
  const handleUploadResume = async () => {
    if (!selectedFile) {
      setMessage("❌ Please select a PDF file first");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setIsUploading(true);
    setMessage("📤 Uploading resume...");

    try {
      const formData = new FormData();
      formData.append("resume", selectedFile);

      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Resume uploaded successfully!");
        setFormData((prev) => ({
          ...prev,
          resumeUrl: result.fileUrl,
          resumeSource: "server",
        }));
        setSelectedFile(null);
        document.getElementById("resume-file").value = "";
      } else {
        setMessage(`❌ Upload failed: ${result.message}`);
      }
    } catch (error) {
      setMessage("❌ Error uploading resume");
    } finally {
      setIsUploading(false);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("");

    try {
      const heroData = {
        name: formData.name,
        greeting: formData.greeting,
        description: formData.description,
        roles: formData.roles.split(",").map((role) => role.trim()),
        stats: formData.heroStats,
        socialLinks: formData.socialLinks,
      };

      const aboutData = {
        stats: formData.stats,
        description1: formData.description1,
        description2: formData.description2,
        mission: formData.mission,
        location: formData.location,
        availability: formData.availability,
        techStack: formData.techStack,
      };

      const resumeData = {
        resumeUrl: formData.resumeUrl,
        buttonText: formData.resumeButtonText,
        fileName: formData.resumeFileName,
        resumeSource: formData.resumeSource,
      };

      const [heroResponse, aboutResponse, resumeResponse] = await Promise.all([
        fetch("/api/hero-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(heroData),
        }),
        fetch("/api/about-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(aboutData),
        }),
        fetch("/api/resume-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resumeData),
        }),
      ]);

      if (heroResponse.ok && aboutResponse.ok && resumeResponse.ok) {
        setMessage("✅ All data saved successfully!");
      } else {
        setMessage("❌ Error saving data");
      }
    } catch (error) {
      setMessage("❌ Error saving data");
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-300 hover:shadow-3xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 transform transition-transform duration-300 hover:scale-110">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Access
            </h1>
            <p className="text-gray-600 text-sm">
              Enter password to edit portfolio content
            </p>
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg mb-4 text-center transform transition-all duration-300 ${
                message.includes("✅")
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              Unlock Editor
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Portfolio Editor
          </h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200 flex items-center justify-center gap-1 mx-auto"
          >
            <Lock className="w-3 h-3" />
            Lock Editor
          </button>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg mb-6 text-center transform transition-all duration-300 ${
              message.includes("✅")
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex mb-8 bg-white rounded-xl p-1 shadow-lg border border-gray-100">
          <button
            onClick={() => setActiveTab("hero")}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "hero"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transform scale-105"
                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            <User className="w-4 h-4" />
            Hero
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "about"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transform scale-105"
                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            <Code className="w-4 h-4" />
            About
          </button>
          <button
            onClick={() => setActiveTab("resume")}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "resume"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transform scale-105"
                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            <FileText className="w-4 h-4" />
            Resume
          </button>
        </div>

        {/* Hero Section Editor */}
        {activeTab === "hero" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Hero Section
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Greeting Text
                    </label>
                    <input
                      type="text"
                      value={formData.greeting}
                      onChange={(e) =>
                        handleInputChange("greeting", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 resize-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roles (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.roles}
                    onChange={(e) => handleInputChange("roles", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                Hero Statistics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years Experience
                  </label>
                  <input
                    type="text"
                    value={formData.heroStats?.experience || "5+"}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "heroStats",
                        "experience",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Projects Completed
                  </label>
                  <input
                    type="text"
                    value={formData.heroStats?.projects || "100+"}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "heroStats",
                        "projects",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Happy Clients
                  </label>
                  <input
                    type="text"
                    value={formData.heroStats?.clients || "50+"}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "heroStats",
                        "clients",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium text-center"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <Link className="w-5 h-5 text-blue-600" />
                Social Links
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={formData.socialLinks?.github || "https://github.com"}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "socialLinks",
                        "github",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={
                      formData.socialLinks?.linkedin || "https://linkedin.com"
                    }
                    onChange={(e) =>
                      handleNestedInputChange(
                        "socialLinks",
                        "linkedin",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="text"
                    value={
                      formData.socialLinks?.email || "mailto:hello@example.com"
                    }
                    onChange={(e) =>
                      handleNestedInputChange(
                        "socialLinks",
                        "email",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About Section Editor */}
        {activeTab === "about" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                About Statistics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years Experience
                  </label>
                  <input
                    type="number"
                    value={formData.stats?.experience || 5}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "stats",
                        "experience",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Projects Completed
                  </label>
                  <input
                    type="number"
                    value={formData.stats?.projects || 100}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "stats",
                        "projects",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Happy Clients
                  </label>
                  <input
                    type="number"
                    value={formData.stats?.clients || 50}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "stats",
                        "clients",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Code Commits
                  </label>
                  <input
                    type="number"
                    value={formData.stats?.commits || 2000}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "stats",
                        "commits",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium text-center"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Text Content
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description Paragraph 1
                  </label>
                  <textarea
                    value={formData.description1}
                    onChange={(e) =>
                      handleInputChange("description1", e.target.value)
                    }
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 resize-none leading-relaxed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description Paragraph 2
                  </label>
                  <textarea
                    value={formData.description2}
                    onChange={(e) =>
                      handleInputChange("description2", e.target.value)
                    }
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 resize-none leading-relaxed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mission Statement
                  </label>
                  <textarea
                    value={formData.mission}
                    onChange={(e) =>
                      handleInputChange("mission", e.target.value)
                    }
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-600" />
                Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) =>
                      handleInputChange("techStack", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Availability
                    </label>
                    <input
                      type="text"
                      value={formData.availability}
                      onChange={(e) =>
                        handleInputChange("availability", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resume Section Editor */}
        {activeTab === "resume" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Resume Source
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Resume Source
                  </label>
                  <select
                    value={formData.resumeSource}
                    onChange={(e) =>
                      handleInputChange("resumeSource", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 font-medium"
                  >
                    <option value="server">📁 Upload to Server</option>
                    <option value="external">🔗 External Link</option>
                  </select>
                </div>

                {formData.resumeSource === "server" && (
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 transform transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <Server className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-800">
                        Upload PDF to Server
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select PDF File (Max 5MB)
                        </label>
                        <input
                          id="resume-file"
                          type="file"
                          accept=".pdf"
                          onChange={handleFileSelect}
                          className="w-full p-2 border border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>

                      {selectedFile && (
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200 transform transition-all duration-300">
                          <p className="text-sm text-green-700 font-medium">
                            <strong>Selected:</strong> {selectedFile.name}(
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                          </p>
                        </div>
                      )}

                      <button
                        onClick={handleUploadResume}
                        disabled={!selectedFile || isUploading}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all duration-300 transform hover:-translate-y-0.5 font-medium"
                      >
                        {isUploading ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                        {isUploading ? "Uploading..." : "Upload Resume"}
                      </button>
                    </div>
                  </div>
                )}

                {formData.resumeSource === "external" && (
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 transform transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <Link className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-green-800">
                        External Resume Link
                      </h3>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resume URL
                      </label>
                      <input
                        type="text"
                        value={formData.resumeUrl}
                        onChange={(e) =>
                          handleInputChange("resumeUrl", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-mono text-sm"
                        placeholder="https://drive.google.com/..."
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                Resume Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.resumeButtonText}
                    onChange={(e) =>
                      handleInputChange("resumeButtonText", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File Name
                  </label>
                  <input
                    type="text"
                    value={formData.resumeFileName}
                    onChange={(e) =>
                      handleInputChange("resumeFileName", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
                  />
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 transform transition-all duration-300">
                <h3 className="font-semibold text-purple-800 mb-2">
                  Current Resume
                </h3>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-700">
                    <strong>Source:</strong>{" "}
                    {formData.resumeSource === "server"
                      ? "📁 Server Upload"
                      : "🔗 External Link"}
                  </p>
                  <p className="text-gray-700">
                    <strong>URL:</strong>{" "}
                    <span className="text-blue-600 break-all font-mono">
                      {formData.resumeUrl}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <strong>File Name:</strong> {formData.resumeFileName}
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 transform transition-all duration-300">
                <h3 className="font-semibold text-blue-800 mb-2">Preview</h3>
                <p className="text-sm text-blue-700 mb-3">
                  This is how the download button will appear:
                </p>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg transform transition-all duration-300 hover:scale-105 font-medium"
                  disabled
                >
                  <FileText className="w-4 h-4" />
                  {formData.resumeButtonText}
                </button>
                <p className="text-xs text-blue-600 mt-2 font-medium">
                  File: {formData.resumeFileName}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 mx-auto transform transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Saving..." : "Save All Changes"}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Admin;
