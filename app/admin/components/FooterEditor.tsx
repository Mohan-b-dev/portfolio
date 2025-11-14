import React from "react";
import { Heart, Link, Mail, Settings } from "lucide-react";
import { EditorProps } from "../types";

const FooterEditor: React.FC<EditorProps> = ({
  formData,
  onNestedInputChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Footer Brand Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <Heart className="w-5 h-5 text-blue-600" />
          Footer Brand
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={formData.footer?.name || "MOHAN"}
              onChange={(e) =>
                onNestedInputChange("footer", "name", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tagline
            </label>
            <textarea
              value={
                formData.footer?.tagline ||
                "Full-Stack Developer passionate about creating digital experiences that make a difference."
              }
              onChange={(e) =>
                onNestedInputChange("footer", "tagline", e.target.value)
              }
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 resize-none leading-relaxed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Copyright Text
            </label>
            <input
              type="text"
              value={
                formData.footer?.copyright ||
                "© {year} MOHAN. All rights reserved."
              }
              onChange={(e) =>
                onNestedInputChange("footer", "copyright", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
              placeholder="© {year} Your Name. All rights reserved."
            />
            <p className="text-sm text-gray-500 mt-1">
              Use {"{year}"} for current year
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Made With Text
            </label>
            <input
              type="text"
              value={
                formData.footer?.madeWithText ||
                "Made with ❤️ using Next.js & TypeScript"
              }
              onChange={(e) =>
                onNestedInputChange("footer", "madeWithText", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <Link className="w-5 h-5 text-blue-600" />
          Footer Links
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Quick Links
            </h3>
            <div className="space-y-2">
              {formData.footer?.quickLinks?.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={link.name}
                    onChange={(e) => {
                      const newLinks = [...formData.footer.quickLinks];
                      newLinks[index] = {
                        ...newLinks[index],
                        name: e.target.value,
                      };
                      onNestedInputChange("footer", "quickLinks", newLinks);
                    }}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Link Name"
                  />
                  <input
                    type="text"
                    value={link.href}
                    onChange={(e) => {
                      const newLinks = [...formData.footer.quickLinks];
                      newLinks[index] = {
                        ...newLinks[index],
                        href: e.target.value,
                      };
                      onNestedInputChange("footer", "quickLinks", newLinks);
                    }}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="#section or URL"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Resources
            </h3>
            <div className="space-y-2">
              {formData.footer?.resources?.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={link.name}
                    onChange={(e) => {
                      const newLinks = [...formData.footer.resources];
                      newLinks[index] = {
                        ...newLinks[index],
                        name: e.target.value,
                      };
                      onNestedInputChange("footer", "resources", newLinks);
                    }}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Resource Name"
                  />
                  <input
                    type="text"
                    value={link.href}
                    onChange={(e) => {
                      const newLinks = [...formData.footer.resources];
                      newLinks[index] = {
                        ...newLinks[index],
                        href: e.target.value,
                      };
                      onNestedInputChange("footer", "resources", newLinks);
                    }}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="#section or URL"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social Links & Contact */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-600" />
          Social & Contact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Social Links
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub
                </label>
                <input
                  type="text"
                  value={
                    formData.footer?.socialLinks?.github || "https://github.com"
                  }
                  onChange={(e) =>
                    onNestedInputChange("footer", "socialLinks", {
                      ...formData.footer.socialLinks,
                      github: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <input
                  type="text"
                  value={
                    formData.footer?.socialLinks?.linkedin ||
                    "https://linkedin.com"
                  }
                  onChange={(e) =>
                    onNestedInputChange("footer", "socialLinks", {
                      ...formData.footer.socialLinks,
                      linkedin: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter
                </label>
                <input
                  type="text"
                  value={
                    formData.footer?.socialLinks?.twitter ||
                    "https://twitter.com"
                  }
                  onChange={(e) =>
                    onNestedInputChange("footer", "socialLinks", {
                      ...formData.footer.socialLinks,
                      twitter: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="text"
                  value={
                    formData.footer?.socialLinks?.email ||
                    "mailto:hello@mohan.dev"
                  }
                  onChange={(e) =>
                    onNestedInputChange("footer", "socialLinks", {
                      ...formData.footer.socialLinks,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Contact Section
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Text
                </label>
                <input
                  type="text"
                  value={
                    formData.footer?.contactText ||
                    "Ready to start your next project?"
                  }
                  onChange={(e) =>
                    onNestedInputChange("footer", "contactText", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          Footer Preview
        </h2>
        <div className="p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <h3 className="font-semibold text-purple-800 mb-2">
            Current Footer Info
          </h3>
          <div className="space-y-2 text-sm">
            <p className="text-gray-700">
              <strong>Name:</strong> {formData.footer?.name}
            </p>
            <p className="text-gray-700">
              <strong>Tagline:</strong> {formData.footer?.tagline}
            </p>
            <p className="text-gray-700">
              <strong>Quick Links:</strong>{" "}
              {formData.footer?.quickLinks?.length} items
            </p>
            <p className="text-gray-700">
              <strong>Resources:</strong> {formData.footer?.resources?.length}{" "}
              items
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterEditor;
