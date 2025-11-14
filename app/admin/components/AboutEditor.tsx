import React from "react";
import {
  Settings,
  FileText,
  Code,
  MapPin,
  Calendar,
  Award,
  Coffee,
  User,
  Heart,
  Eye,
} from "lucide-react";
import { EditorProps } from "../types";

const AboutEditor: React.FC<EditorProps> = ({
  formData,
  onInputChange,
  onNestedInputChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Statistics Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              About Statistics
            </h2>
            <p className="text-sm text-gray-600">
              Showcase your professional achievements
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Award className="w-4 h-4 text-green-500" />
              Years Experience
            </label>
            <input
              type="number"
              value={formData.stats?.experience || 5}
              onChange={(e) =>
                onNestedInputChange(
                  "stats",
                  "experience",
                  parseInt(e.target.value) || 0
                )
              }
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white text-gray-900 text-center font-bold text-lg shadow-sm"
              min="0"
              max="50"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Coffee className="w-4 h-4 text-green-500" />
              Projects Completed
            </label>
            <input
              type="number"
              value={formData.stats?.projects || 100}
              onChange={(e) =>
                onNestedInputChange(
                  "stats",
                  "projects",
                  parseInt(e.target.value) || 0
                )
              }
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white text-gray-900 text-center font-bold text-lg shadow-sm"
              min="0"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4 text-green-500" />
              Happy Clients
            </label>
            <input
              type="number"
              value={formData.stats?.clients || 50}
              onChange={(e) =>
                onNestedInputChange(
                  "stats",
                  "clients",
                  parseInt(e.target.value) || 0
                )
              }
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white text-gray-900 text-center font-bold text-lg shadow-sm"
              min="0"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Heart className="w-4 h-4 text-green-500" />
              Code Commits
            </label>
            <input
              type="number"
              value={formData.stats?.commits || 2000}
              onChange={(e) =>
                onNestedInputChange(
                  "stats",
                  "commits",
                  parseInt(e.target.value) || 0
                )
              }
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white text-gray-900 text-center font-bold text-lg shadow-sm"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Text Content</h2>
            <p className="text-sm text-gray-600">
              Tell your story and showcase your personality
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="text-blue-500">📝</span>
              Description Paragraph 1
            </label>
            <textarea
              value={formData.description1}
              onChange={(e) => onInputChange("description1", e.target.value)}
              rows={4}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 resize-none leading-relaxed shadow-sm"
              placeholder="Write about your background, passion, and journey..."
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="text-blue-500">✨</span>
              Description Paragraph 2
            </label>
            <textarea
              value={formData.description2}
              onChange={(e) => onInputChange("description2", e.target.value)}
              rows={4}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 resize-none leading-relaxed shadow-sm"
              placeholder="Talk about your skills, specialties, and interests..."
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="text-blue-500">🎯</span>
              Mission Statement
            </label>
            <textarea
              value={formData.mission}
              onChange={(e) => onInputChange("mission", e.target.value)}
              rows={3}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 resize-none leading-relaxed shadow-sm"
              placeholder="What drives you? What's your professional mission?"
            />
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Code className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Personal Details
            </h2>
            <p className="text-sm text-gray-600">
              Additional information about you
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="text-purple-500">🛠️</span>
              Tech Stack (comma separated)
            </label>
            <input
              type="text"
              value={formData.techStack}
              onChange={(e) => onInputChange("techStack", e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 font-medium shadow-sm"
              placeholder="React, TypeScript, Node.js, Python..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate technologies with commas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-500" />
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => onInputChange("location", e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 font-medium shadow-sm"
                placeholder="Where are you based?"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-500" />
                Availability
              </label>
              <input
                type="text"
                value={formData.availability}
                onChange={(e) => onInputChange("availability", e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 font-medium shadow-sm"
                placeholder="Available for new projects"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg p-6 border border-green-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-500 rounded-lg">
            <Eye className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            Statistics Preview
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 text-center border border-green-200 shadow-sm">
            <div className="text-2xl font-bold text-green-600 bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              {formData.stats?.experience || 5}+
            </div>
            <div className="text-xs text-gray-600 font-medium">Years Exp</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-green-200 shadow-sm">
            <div className="text-2xl font-bold text-green-600 bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              {formData.stats?.projects || 100}+
            </div>
            <div className="text-xs text-gray-600 font-medium">Projects</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-green-200 shadow-sm">
            <div className="text-2xl font-bold text-green-600 bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              {formData.stats?.clients || 50}+
            </div>
            <div className="text-xs text-gray-600 font-medium">Clients</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-green-200 shadow-sm">
            <div className="text-2xl font-bold text-green-600 bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              {formData.stats?.commits || 2000}+
            </div>
            <div className="text-xs text-gray-600 font-medium">Commits</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutEditor;
