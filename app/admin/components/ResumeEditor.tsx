import React from "react";
import {
  FileText,
  Settings,
  Server,
  Link,
  Upload,
  RefreshCw,
} from "lucide-react";
import { EditorProps } from "../types";

const ResumeEditor: React.FC<EditorProps> = ({
  formData,
  onInputChange,
  onFileSelect,
  onUploadResume,
  isUploading,
  selectedFile,
}) => {
  return (
    <div className="space-y-6">
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
              onChange={(e) => onInputChange("resumeSource", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 font-medium"
            >
              <option value="server">📁 Upload to Server</option>
              <option value="external">🔗 External Link</option>
            </select>
          </div>

          {formData.resumeSource === "server" && (
            <div className="p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 transform transition-all duration-300">
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
                    onChange={onFileSelect}
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
                  onClick={onUploadResume}
                  disabled={!selectedFile || isUploading}
                  className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all duration-300 transform hover:-translate-y-0.5 font-medium"
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
            <div className="p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 transform transition-all duration-300">
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
                  onChange={(e) => onInputChange("resumeUrl", e.target.value)}
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
                onInputChange("resumeButtonText", e.target.value)
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
              onChange={(e) => onInputChange("resumeFileName", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
            />
          </div>
        </div>

        <div className="p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 transform transition-all duration-300">
          <h3 className="font-semibold text-purple-800 mb-2">Current Resume</h3>
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

        <div className="mt-4 p-4 bg-linear-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 transform transition-all duration-300">
          <h3 className="font-semibold text-blue-800 mb-2">Preview</h3>
          <p className="text-sm text-blue-700 mb-3">
            This is how the download button will appear:
          </p>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-lg transform transition-all duration-300 hover:scale-105 font-medium"
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
  );
};

export default ResumeEditor;
