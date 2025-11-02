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
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Admin Access
            </h1>
            <p className="text-gray-600 text-sm">
              Enter password to edit portfolio content
            </p>
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg mb-4 text-center ${
                message.includes("✅")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Unlock Editor
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Portfolio Editor
          </h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-sm text-red-600 hover:text-red-800"
          >
            🔒 Lock Editor
          </button>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg mb-6 text-center ${
              message.includes("✅")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex mb-6 bg-white rounded-lg p-1 shadow">
          <button
            onClick={() => setActiveTab("hero")}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "hero"
                ? "bg-blue-600 text-white shadow"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <User className="w-4 h-4" />
            Hero
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "about"
                ? "bg-blue-600 text-white shadow"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <Code className="w-4 h-4" />
            About
          </button>
          <button
            onClick={() => setActiveTab("resume")}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "resume"
                ? "bg-blue-600 text-white shadow"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <FileText className="w-4 h-4" />
            Resume
          </button>
        </div>

        {/* Hero Section Editor */}
        {activeTab === "hero" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Greeting Text
                    </label>
                    <input
                      type="text"
                      value={formData.greeting}
                      onChange={(e) =>
                        handleInputChange("greeting", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Roles (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.roles}
                    onChange={(e) => handleInputChange("roles", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Hero Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Social Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About Section Editor */}
        {activeTab === "about" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">About Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Text Content</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description Paragraph 1
                  </label>
                  <textarea
                    value={formData.description1}
                    onChange={(e) =>
                      handleInputChange("description1", e.target.value)
                    }
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description Paragraph 2
                  </label>
                  <textarea
                    value={formData.description2}
                    onChange={(e) =>
                      handleInputChange("description2", e.target.value)
                    }
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mission Statement
                  </label>
                  <textarea
                    value={formData.mission}
                    onChange={(e) =>
                      handleInputChange("mission", e.target.value)
                    }
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) =>
                      handleInputChange("techStack", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Availability
                    </label>
                    <input
                      type="text"
                      value={formData.availability}
                      onChange={(e) =>
                        handleInputChange("availability", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resume Section Editor */}
        {activeTab === "resume" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Resume Source</h2>

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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="server">📁 Upload to Server</option>
                    <option value="external">🔗 External Link</option>
                  </select>
                </div>

                {formData.resumeSource === "server" && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
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
                          className="w-full p-2 border border-dashed border-gray-300 rounded-lg"
                        />
                      </div>

                      {selectedFile && (
                        <div className="p-3 bg-green-50 rounded border border-green-200">
                          <p className="text-sm text-green-700">
                            <strong>Selected:</strong> {selectedFile.name}(
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                          </p>
                        </div>
                      )}

                      <button
                        onClick={handleUploadResume}
                        disabled={!selectedFile || isUploading}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
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
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="https://drive.google.com/..."
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Resume Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.resumeButtonText}
                    onChange={(e) =>
                      handleInputChange("resumeButtonText", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    File Name
                  </label>
                  <input
                    type="text"
                    value={formData.resumeFileName}
                    onChange={(e) =>
                      handleInputChange("resumeFileName", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">
                  Current Resume
                </h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Source:</strong>{" "}
                    {formData.resumeSource === "server"
                      ? "📁 Server Upload"
                      : "🔗 External Link"}
                  </p>
                  <p>
                    <strong>URL:</strong>{" "}
                    <span className="text-blue-600 break-all">
                      {formData.resumeUrl}
                    </span>
                  </p>
                  <p>
                    <strong>File Name:</strong> {formData.resumeFileName}
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Preview</h3>
                <p className="text-sm text-blue-700 mb-3">
                  This is how the download button will appear:
                </p>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
                  disabled
                >
                  <FileText className="w-4 h-4" />
                  {formData.resumeButtonText}
                </button>
                <p className="text-xs text-blue-600 mt-2">
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
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 mx-auto"
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
    </div>
  );
};

export default Admin;
