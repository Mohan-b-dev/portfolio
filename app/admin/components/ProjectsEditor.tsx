import React from "react";
import {
  ExternalLink,
  Github,
  Filter,
  Star,
  Plus,
  Trash2,
  Image as ImageIcon,
  Eye,
} from "lucide-react";
import { EditorProps, Project } from "../types";

const ProjectsEditor: React.FC<EditorProps> = ({
  formData,
  onNestedInputChange,
}) => {
  const handleAddProject = () => {
    const currentProjects = formData.projects?.projects || [];
    const newProject: Project = {
      id: Date.now(),
      title: "New Project",
      description: "Project description...",
      image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
      category: formData.projects?.categories?.[1] || "Web App",
      technologies: ["React", "Node.js"],
      github: "https://github.com",
      live: "https://example.com",
      featured: false,
    };

    onNestedInputChange("projects", "projects", [
      ...currentProjects,
      newProject,
    ]);
  };

  const handleUpdateProject = (
    index: number,
    field: keyof Project,
    value: Project[keyof Project]
  ) => {
    const currentProjects = formData.projects?.projects || [];
    const updatedProjects = [...currentProjects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    onNestedInputChange("projects", "projects", updatedProjects);
  };

  const handleRemoveProject = (index: number) => {
    const currentProjects = formData.projects?.projects || [];
    const updatedProjects = currentProjects.filter((_, i) => i !== index);
    onNestedInputChange("projects", "projects", updatedProjects);
  };

  return (
    <div className="space-y-6">
      {/* Projects Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg">
            <ExternalLink className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Projects Section Header
            </h2>
            <p className="text-sm text-gray-600">
              Configure the projects section
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="text-blue-500">🏷️</span>
                Section Title
              </label>
              <input
                type="text"
                value={formData.projects?.sectionTitle || ""}
                onChange={(e) =>
                  onNestedInputChange(
                    "projects",
                    "sectionTitle",
                    e.target.value
                  )
                }
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 font-medium shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="text-blue-500">🔗</span>
                GitHub URL
              </label>
              <input
                type="text"
                value={formData.projects?.githubUrl || ""}
                onChange={(e) =>
                  onNestedInputChange("projects", "githubUrl", e.target.value)
                }
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 font-mono text-sm shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="text-blue-500">📝</span>
              Section Description
            </label>
            <textarea
              value={formData.projects?.sectionDescription || ""}
              onChange={(e) =>
                onNestedInputChange(
                  "projects",
                  "sectionDescription",
                  e.target.value
                )
              }
              rows={3}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 resize-none leading-relaxed shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="text-blue-500">👁️</span>
              View All Text
            </label>
            <input
              type="text"
              value={formData.projects?.viewAllText || ""}
              onChange={(e) =>
                onNestedInputChange("projects", "viewAllText", e.target.value)
              }
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 font-medium shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Categories Editor */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2 bg-linear-to-r from-green-500 to-emerald-500 rounded-lg">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Project Categories
            </h2>
            <p className="text-sm text-gray-600">
              Define project categories for filtering
            </p>
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-green-500">📂</span>
            Categories (comma separated)
          </label>
          <textarea
            value={formData.projects?.categories?.join(", ") || ""}
            onChange={(e) =>
              onNestedInputChange(
                "projects",
                "categories",
                e.target.value.split(",").map((cat) => cat.trim())
              )
            }
            rows={2}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 resize-none leading-relaxed shadow-sm"
            placeholder="All, Web App, Mobile App, DevOps, Blockchain"
          />
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            💡 Separate categories with commas. The All category is required.
          </p>
        </div>
      </div>

      {/* Projects List Editor */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg">
            <Github className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Projects List
              <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                {formData.projects?.projects?.length || 0} projects
              </span>
            </h2>
            <p className="text-sm text-gray-600">Manage all your projects</p>
          </div>
        </div>

        <div className="space-y-6">
          {formData.projects?.projects?.map((project, index) => (
            <div
              key={project.id}
              className="p-6 border-2 border-gray-200 rounded-2xl bg-gray-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-purple-500">🚀</span>
                  Project {index + 1}
                </h3>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <input
                      type="checkbox"
                      checked={project.featured || false}
                      onChange={(e) =>
                        handleUpdateProject(index, "featured", e.target.checked)
                      }
                      className="w-4 h-4 text-purple-500 bg-white border-2 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    Featured
                  </label>
                  <button
                    onClick={() => handleRemoveProject(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                    <span className="text-purple-500">📛</span>
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) =>
                      handleUpdateProject(index, "title", e.target.value)
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white text-gray-900 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                    <span className="text-purple-500">📂</span>
                    Category
                  </label>
                  <select
                    value={project.category}
                    onChange={(e) =>
                      handleUpdateProject(index, "category", e.target.value)
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white text-gray-900 shadow-sm"
                  >
                    {formData.projects?.categories
                      ?.filter((cat) => cat !== "All")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="mb-4 space-y-2">
                <label className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                  <span className="text-purple-500">📄</span>
                  Description
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) =>
                    handleUpdateProject(index, "description", e.target.value)
                  }
                  rows={3}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white text-gray-900 resize-none leading-relaxed shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                    <ImageIcon
                      aria-hidden="true"
                      className="w-5 h-5 text-purple-500"
                    />
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={project.image}
                    onChange={(e) =>
                      handleUpdateProject(index, "image", e.target.value)
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white text-gray-900 font-mono text-sm shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                    <Github className="w-5 h-5 text-purple-500" />
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={project.github}
                    onChange={(e) =>
                      handleUpdateProject(index, "github", e.target.value)
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white text-gray-900 font-mono text-sm shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-purple-500" />
                    Live Demo URL
                  </label>
                  <input
                    type="text"
                    value={project.live}
                    onChange={(e) =>
                      handleUpdateProject(index, "live", e.target.value)
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white text-gray-900 font-mono text-sm shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                    <span className="text-purple-500">🛠️</span>
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={(project.technologies || []).join(", ")}
                    onChange={(e) =>
                      handleUpdateProject(
                        index,
                        "technologies",
                        e.target.value.split(",").map((tech) => tech.trim())
                      )
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white text-gray-900 shadow-sm"
                  />
                </div>
              </div>

              {/* Image Preview */}
              {project.image && (
                <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                  <label className="text-xs font-semibold text-gray-600 mb-2">
                    Image Preview
                  </label>
                  <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent flex items-end p-2">
                      <span className="text-white text-xs">Image Preview</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={handleAddProject}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Project
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 border border-purple-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500 rounded-lg">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Projects Preview</h3>
        </div>
        <div className="bg-white rounded-xl p-4 border border-purple-200">
          <div className="text-center mb-4">
            <h4 className="text-lg font-bold text-gray-800">
              {formData.projects?.sectionTitle || "Featured Projects"}
            </h4>
            <p className="text-sm text-gray-600">
              {formData.projects?.sectionDescription ||
                "A showcase of my recent work..."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.projects?.projects?.slice(0, 2).map((project, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-3"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                    {project.category}
                  </span>
                  {project.featured && (
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  )}
                </div>
                <h5 className="font-semibold text-gray-800 text-sm mb-1">
                  {project.title}
                </h5>
                <p className="text-gray-600 text-xs line-clamp-2">
                  {project.description}
                </p>
              </div>
            ))}
            {(!formData.projects?.projects ||
              formData.projects.projects.length === 0) && (
              <div className="col-span-2 text-center py-4 text-gray-500">
                Add projects to see preview
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsEditor;
