"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  RefreshCw,
  Lock,
  Eye,
  EyeOff,
  User,
  Code,
  Code2,
  ExternalLink,
  FileText,
  Mail,
  Heart,
} from "lucide-react";

// Import components
import HeroEditor from "./components/HeroEditor";
import AboutEditor from "./components/AboutEditor";
import SkillsEditor from "./components/SkillsEditor";
import ProjectsEditor from "./components/ProjectsEditor";
import ResumeEditor from "./components/ResumeEditor";
import ContactEditor from "./components/ContactEditor";
import FooterEditor from "./components/FooterEditor";

// Import types
import { AdminFormData, FormValue } from "./types";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState<AdminFormData>({
    name: "MOHAN",
    greeting: "👋 Welcome to my portfolio",
    description:
      "Crafting digital experiences with cutting-edge technology and innovative design. Passionate about creating solutions that make a difference.",
    roles:
      "Full-Stack Developer,BLOCKCHAIN DEVELOPER,APP DEVELOPER,Problem Solver,Creative Thinker",
    heroStats: { experience: "5+", projects: "100+", clients: "50+" },
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "mailto:hello@example.com",
    },
    stats: { experience: 5, projects: 100, clients: 50, commits: 2000 },
    description1:
      "I'm a passionate full-stack developer with over 5 years of experience creating digital solutions that bridge the gap between design and technology. My journey began with a curiosity for how things work, which evolved into a love for building applications that solve real-world problems.",
    description2:
      "I specialize in modern web technologies including React, TypeScript, Node.js, and cloud platforms. When I'm not coding, you'll find me exploring new technologies, contributing to open source, or mentoring aspiring developers.",
    mission:
      "To create digital experiences that not only look beautiful but also perform exceptionally well and provide genuine value to users.",
    location: "Remote",
    availability: "Available for new projects",
    techStack: "React,TypeScript,Node.js,Python,AWS,Docker",
    resumeUrl: "/resume.pdf",
    resumeButtonText: "Download Resume",
    resumeFileName: "Mohan_Resume.pdf",
    resumeSource: "server",
    projects: {
      sectionTitle: "Featured Projects",
      sectionDescription:
        "A showcase of my recent work, featuring innovative solutions and cutting-edge technologies",
      githubUrl: "https://github.com",
      viewAllText: "View All Projects on GitHub",
      categories: ["All", "Web App", "Mobile App", "DevOps", "Blockchain"],
      projects: [],
    },
    skills: {
      sectionTitle: "My Skills",
      sectionDescription:
        "A comprehensive overview of my technical expertise and professional capabilities",
      technologiesTitle: "Technologies I Work With",
      skillCategories: [],
      softSkills: [],
      certifications: [],
      technologies: [],
    },
    contactTitle: "Get In Touch",
    contactSubtitle:
      "Ready to bring your ideas to life? Let's discuss your project and create something amazing together.",
    contactDescription:
      "I'm always excited to work on new projects and collaborate with amazing people. Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you.",
    contactInfo: {
      email: "hello@mohan.dev",
      phone: "+1 (555) 123-4567",
      location: "Remote",
    },
    socialMedia: {
      github: "https://github.com",
      linkedin: "https://linkedin.com/in/mohan",
      twitter: "https://twitter.com/mohan",
    },
    footer: {
      name: "MOHAN",
      tagline:
        "Full-Stack Developer passionate about creating digital experiences that make a difference.",
      quickLinks: [],
      resources: [],
      socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "mailto:hello@mohan.dev",
      },
      contactText: "Ready to start your next project?",
      copyright: "© {year} MOHAN. All rights reserved.",
      madeWithText: "Made with ❤️ using Next.js & TypeScript",
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("hero");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
        const [
          heroResponse,
          aboutResponse,
          resumeResponse,
          projectsResponse,
          skillsResponse,
          contactResponse,
          footerResponse,
        ] = await Promise.all([
          fetch("/api/hero-data"),
          fetch("/api/about-data"),
          fetch("/api/resume-data"),
          fetch("/api/projects-data"),
          fetch("/api/skills-data"),
          fetch("/api/contact-data"),
          fetch("/api/footer-data"),
        ]);

        const [
          heroData,
          aboutData,
          resumeData,
          projectsData,
          skillsData,
          contactData,
          footerData,
        ] = await Promise.all([
          heroResponse.json(),
          aboutResponse.json(),
          resumeResponse.json(),
          projectsResponse.json(),
          skillsResponse.json(),
          contactResponse.json(),
          footerResponse.json(),
        ]);

        setFormData((prev) => ({
          ...prev,
          ...heroData,
          ...aboutData,
          ...resumeData,
          ...projectsData,
          ...skillsData,
          ...contactData,
          ...footerData,
          roles: Array.isArray(heroData.roles)
            ? heroData.roles.join(",")
            : heroData.roles,
          heroStats: heroData.stats || prev.heroStats,
          socialLinks: heroData.socialLinks || prev.socialLinks,
          stats: aboutData.stats || prev.stats,
          resumeSource: resumeData.resumeSource || "server",
          contactInfo: contactData.contactInfo || prev.contactInfo,
          socialMedia: contactData.socialMedia || prev.socialMedia,
          footer: footerData.footer || prev.footer,
          projects: projectsData.projects || prev.projects,
          skills: skillsData || prev.skills,
        }));
      } catch {
        console.log("No existing data found, using defaults");
      }
    };
    loadData();
  }, [isAuthenticated]);

  const handleInputChange = (field: string, value: FormValue) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedInputChange = (
    parent: string,
    field: string,
    value: FormValue
  ) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof AdminFormData] as object),
        [field]: value,
      },
    }));
  };

  // Handle file selection for upload
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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
        // Reset file input
        const fileInput = document.getElementById(
          "resume-file"
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        setMessage(`❌ Upload failed: ${result.message}`);
      }
    } catch {
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

      const projectsData = { projects: formData.projects };
      const skillsData = formData.skills;

      const contactData = {
        contactTitle: formData.contactTitle,
        contactSubtitle: formData.contactSubtitle,
        contactDescription: formData.contactDescription,
        contactInfo: formData.contactInfo,
        socialMedia: formData.socialMedia,
      };

      const footerData = { footer: formData.footer };

      const responses = await Promise.all([
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
        fetch("/api/projects-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectsData),
        }),
        fetch("/api/skills-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(skillsData),
        }),
        fetch("/api/contact-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData),
        }),
        fetch("/api/footer-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(footerData),
        }),
      ]);

      const allOk = responses.every((response) => response.ok);
      setMessage(
        allOk ? "✅ All data saved successfully!" : "❌ Error saving data"
      );
    } catch {
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
        <div className="flex mb-8 bg-white rounded-xl p-1 shadow-lg border border-gray-100 overflow-x-auto">
          {[
            { id: "hero", icon: User, label: "Hero" },
            { id: "about", icon: Code, label: "About" },
            { id: "skills", icon: Code2, label: "Skills" },
            { id: "projects", icon: ExternalLink, label: "Projects" },
            { id: "resume", icon: FileText, label: "Resume" },
            { id: "contact", icon: Mail, label: "Contact" },
            { id: "footer", icon: Heart, label: "Footer" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-24 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transform scale-105"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Section Render */}
        <div className="animate-fade-in">
          {activeTab === "hero" && (
            <HeroEditor
              formData={formData}
              onInputChange={handleInputChange}
              onNestedInputChange={handleNestedInputChange}
            />
          )}
          {activeTab === "about" && (
            <AboutEditor
              formData={formData}
              onInputChange={handleInputChange}
              onNestedInputChange={handleNestedInputChange}
            />
          )}
          {activeTab === "skills" && (
            <SkillsEditor
              formData={formData}
              onInputChange={handleInputChange}
              onNestedInputChange={handleNestedInputChange}
            />
          )}
          {activeTab === "projects" && (
            <ProjectsEditor
              formData={formData}
              onInputChange={handleInputChange}
              onNestedInputChange={handleNestedInputChange}
            />
          )}
          {activeTab === "resume" && (
            <ResumeEditor
              formData={formData}
              onInputChange={handleInputChange}
              onNestedInputChange={handleNestedInputChange}
              onFileSelect={handleFileSelect}
              onUploadResume={handleUploadResume}
              isUploading={isUploading}
              selectedFile={selectedFile}
            />
          )}
          {activeTab === "contact" && (
            <ContactEditor
              formData={formData}
              onInputChange={handleInputChange}
              onNestedInputChange={handleNestedInputChange}
            />
          )}
          {activeTab === "footer" && (
            <FooterEditor
              formData={formData}
              onInputChange={handleInputChange}
              onNestedInputChange={handleNestedInputChange}
            />
          )}
        </div>

        {/* Save Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 mx-auto transform transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
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
