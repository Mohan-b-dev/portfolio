import React from "react";
import { Mail, Phone, Link, Settings } from "lucide-react";
import { EditorProps } from "../types";

const ContactEditor: React.FC<EditorProps> = ({
  formData,
  onInputChange,
  onNestedInputChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-600" />
          Contact Section Header
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Title
            </label>
            <input
              type="text"
              value={formData.contactTitle}
              onChange={(e) => onInputChange("contactTitle", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
              placeholder="Get In Touch"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={formData.contactSubtitle}
              onChange={(e) => onInputChange("contactSubtitle", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
              placeholder="Ready to bring your ideas to life?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.contactDescription}
              onChange={(e) =>
                onInputChange("contactDescription", e.target.value)
              }
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 resize-none leading-relaxed"
              placeholder="I'm always excited to work on new projects..."
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <Phone className="w-5 h-5 text-blue-600" />
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="text"
              value={formData.contactInfo?.email || "hello@mohan.dev"}
              onChange={(e) =>
                onNestedInputChange("contactInfo", "email", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.contactInfo?.phone || "+1 (555) 123-4567"}
              onChange={(e) =>
                onNestedInputChange("contactInfo", "phone", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.contactInfo?.location || "Remote"}
              onChange={(e) =>
                onNestedInputChange("contactInfo", "location", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <Link className="w-5 h-5 text-blue-600" />
          Social Media Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub URL
            </label>
            <input
              type="text"
              value={formData.socialMedia?.github || "https://github.com"}
              onChange={(e) =>
                onNestedInputChange("socialMedia", "github", e.target.value)
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
                formData.socialMedia?.linkedin ||
                "https://linkedin.com/in/mohan"
              }
              onChange={(e) =>
                onNestedInputChange("socialMedia", "linkedin", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Twitter URL
            </label>
            <input
              type="text"
              value={
                formData.socialMedia?.twitter || "https://twitter.com/mohan"
              }
              onChange={(e) =>
                onNestedInputChange("socialMedia", "twitter", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-mono text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          Contact Preview
        </h2>
        <div className="p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <h3 className="font-semibold text-purple-800 mb-2">
            Current Contact Info
          </h3>
          <div className="space-y-2 text-sm">
            <p className="text-gray-700">
              <strong>Title:</strong> {formData.contactTitle}
            </p>
            <p className="text-gray-700">
              <strong>Subtitle:</strong> {formData.contactSubtitle}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {formData.contactInfo?.email}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {formData.contactInfo?.phone}
            </p>
            <p className="text-gray-700">
              <strong>Location:</strong> {formData.contactInfo?.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactEditor;
