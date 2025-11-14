import React from "react";
import { User, Settings, Link, Star, Target, Users, Eye } from "lucide-react";
import { EditorProps } from "../types";

const HeroEditor: React.FC<EditorProps> = ({
  formData,
  onInputChange,
  onNestedInputChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Main Hero Content */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Hero Section</h2>
            <p className="text-sm text-gray-600">
              Customize your main introduction section
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Star className="w-4 h-4 text-blue-500" />
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => onInputChange("name", e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 font-medium shadow-sm"
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="text-lg">👋</span>
                Greeting Text
              </label>
              <input
                type="text"
                value={formData.greeting}
                onChange={(e) => onInputChange("greeting", e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 font-medium shadow-sm"
                placeholder="Welcome message"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-500" />
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => onInputChange("description", e.target.value)}
              rows={4}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 resize-none leading-relaxed shadow-sm"
              placeholder="Write a compelling description about yourself..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              Roles (comma separated)
            </label>
            <input
              type="text"
              value={formData.roles}
              onChange={(e) => onInputChange("roles", e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 font-medium shadow-sm"
              placeholder="Full-Stack Developer, UI/UX Designer, etc."
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate multiple roles with commas
            </p>
          </div>
        </div>
      </div>

      {/* Hero Statistics */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2 bg-linear-to-r from-green-500 to-emerald-500 rounded-lg">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Hero Statistics</h2>
            <p className="text-sm text-gray-600">
              Showcase your achievements and experience
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 text-center">
              🎯 Years Experience
            </label>
            <input
              type="text"
              value={formData.heroStats?.experience || "5+"}
              onChange={(e) =>
                onNestedInputChange("heroStats", "experience", e.target.value)
              }
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white text-gray-900 text-center font-bold text-lg shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 text-center">
              🚀 Projects Completed
            </label>
            <input
              type="text"
              value={formData.heroStats?.projects || "100+"}
              onChange={(e) =>
                onNestedInputChange("heroStats", "projects", e.target.value)
              }
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white text-gray-900 text-center font-bold text-lg shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 text-center">
              💼 Happy Clients
            </label>
            <input
              type="text"
              value={formData.heroStats?.clients || "50+"}
              onChange={(e) =>
                onNestedInputChange("heroStats", "clients", e.target.value)
              }
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white text-gray-900 text-center font-bold text-lg shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg">
            <Link className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Social Links</h2>
            <p className="text-sm text-gray-600">
              Connect your social media profiles
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              GitHub URL
            </label>
            <input
              type="text"
              value={formData.socialLinks?.github || "https://github.com"}
              onChange={(e) =>
                onNestedInputChange("socialLinks", "github", e.target.value)
              }
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 font-mono text-sm shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">in</span>
              </div>
              LinkedIn URL
            </label>
            <input
              type="text"
              value={formData.socialLinks?.linkedin || "https://linkedin.com"}
              onChange={(e) =>
                onNestedInputChange("socialLinks", "linkedin", e.target.value)
              }
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 font-mono text-sm shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                <span className="text-white text-xs">@</span>
              </div>
              Email Address
            </label>
            <input
              type="text"
              value={formData.socialLinks?.email || "mailto:hello@example.com"}
              onChange={(e) =>
                onNestedInputChange("socialLinks", "email", e.target.value)
              }
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 font-mono text-sm shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6 border border-blue-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Eye className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Live Preview</h3>
        </div>
        <div className="bg-white rounded-xl p-6 border border-blue-200">
          <div className="text-center space-y-3">
            <p className="text-sm text-blue-600 font-medium bg-blue-50 inline-block px-3 py-1 rounded-full">
              {formData.greeting}
            </p>
            <h2 className="text-2xl font-bold text-gray-800">
              Hi, I&apos;m{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {formData.name}
              </span>
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {formData.description}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {formData.roles.split(",").map((role, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {role.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;
