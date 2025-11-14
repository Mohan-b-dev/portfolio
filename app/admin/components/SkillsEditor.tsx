import React from "react";
import {
  Code2,
  Database,
  Cloud,
  Award,
  Plus,
  Trash2,
  Gauge,
  Palette,
  Smartphone,
  Globe,
  Eye,
} from "lucide-react";
import { EditorProps } from "../types";

const SkillsEditor: React.FC<EditorProps> = ({
  formData,
  onNestedInputChange,
}) => {
  const handleAddCategory = () => {
    const newCategories = [...(formData.skills?.skillCategories || [])];
    newCategories.push({
      icon: "Code2",
      title: "New Category",
      skills: [{ name: "New Skill", level: 50 }],
      color: "from-blue-500 to-purple-600",
    });
    onNestedInputChange("skills", "skillCategories", newCategories);
  };

  const handleAddSoftSkill = () => {
    const newSoftSkills = [...(formData.skills?.softSkills || [])];
    newSoftSkills.push({ name: "New Soft Skill", level: 50, icon: "Award" });
    onNestedInputChange("skills", "softSkills", newSoftSkills);
  };

  const handleAddCertification = () => {
    const newCerts = [...(formData.skills?.certifications || [])];
    newCerts.push({
      name: "New Certification",
      issuer: "Issuer",
      year: "2024",
    });
    onNestedInputChange("skills", "certifications", newCerts);
  };

  const iconOptions = [
    { value: "Code2", label: "Code", icon: Code2 },
    { value: "Database", label: "Database", icon: Database },
    { value: "Cloud", label: "Cloud", icon: Cloud },
    { value: "Palette", label: "Design", icon: Palette },
    { value: "Smartphone", label: "Mobile", icon: Smartphone },
    { value: "Globe", label: "Web", icon: Globe },
    { value: "Award", label: "Award", icon: Award },
  ];

  const colorOptions = [
    { value: "from-blue-500 to-purple-600", label: "Blue to Purple" },
    { value: "from-emerald-500 to-teal-600", label: "Emerald to Teal" },
    { value: "from-orange-500 to-red-600", label: "Orange to Red" },
    { value: "from-pink-500 to-rose-600", label: "Pink to Rose" },
    { value: "from-violet-500 to-purple-600", label: "Violet to Purple" },
    { value: "from-cyan-500 to-blue-600", label: "Cyan to Blue" },
  ];

  return (
    <div className="space-y-6">
      {/* Skills Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Skills Section Header
            </h2>
            <p className="text-sm text-gray-600">
              Configure the main skills section
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="text-blue-500">🏷️</span>
              Section Title
            </label>
            <input
              type="text"
              value={formData.skills?.sectionTitle || "My Skills"}
              onChange={(e) =>
                onNestedInputChange("skills", "sectionTitle", e.target.value)
              }
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 font-medium shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="text-blue-500">📄</span>
              Technologies Title
            </label>
            <input
              type="text"
              value={
                formData.skills?.technologiesTitle || "Technologies I Work With"
              }
              onChange={(e) =>
                onNestedInputChange(
                  "skills",
                  "technologiesTitle",
                  e.target.value
                )
              }
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 font-medium shadow-sm"
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span className="text-blue-500">📝</span>
            Section Description
          </label>
          <textarea
            value={
              formData.skills?.sectionDescription ||
              "A comprehensive overview of my technical expertise and professional capabilities"
            }
            onChange={(e) =>
              onNestedInputChange(
                "skills",
                "sectionDescription",
                e.target.value
              )
            }
            rows={3}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 resize-none leading-relaxed shadow-sm"
          />
        </div>
      </div>

      {/* Skill Categories Editor */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2 bg-linear-to-r from-green-500 to-emerald-500 rounded-lg">
            <Database className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Skill Categories
            </h2>
            <p className="text-sm text-gray-600">
              Organize your skills into categories
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {formData.skills?.skillCategories?.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="p-6 border-2 border-gray-200 rounded-2xl bg-gray-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-green-500" />
                  Category {categoryIndex + 1}
                </h3>
                <button
                  onClick={() => {
                    const newCategories =
                      formData.skills.skillCategories.filter(
                        (_, i) => i !== categoryIndex
                      );
                    onNestedInputChange(
                      "skills",
                      "skillCategories",
                      newCategories
                    );
                  }}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Category Title
                  </label>
                  <input
                    type="text"
                    value={category.title}
                    onChange={(e) => {
                      const newCategories = [
                        ...formData.skills.skillCategories,
                      ];
                      newCategories[categoryIndex].title = e.target.value;
                      onNestedInputChange(
                        "skills",
                        "skillCategories",
                        newCategories
                      );
                    }}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white text-gray-900 shadow-sm"
                    placeholder="e.g., Frontend Development"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Icon
                  </label>
                  <select
                    value={category.icon}
                    onChange={(e) => {
                      const newCategories = [
                        ...formData.skills.skillCategories,
                      ];
                      newCategories[categoryIndex].icon = e.target.value;
                      onNestedInputChange(
                        "skills",
                        "skillCategories",
                        newCategories
                      );
                    }}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white text-gray-900 shadow-sm"
                  >
                    {iconOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Color Gradient
                  </label>
                  <select
                    value={category.color}
                    onChange={(e) => {
                      const newCategories = [
                        ...formData.skills.skillCategories,
                      ];
                      newCategories[categoryIndex].color = e.target.value;
                      onNestedInputChange(
                        "skills",
                        "skillCategories",
                        newCategories
                      );
                    }}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white text-gray-900 shadow-sm"
                  >
                    {colorOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <div
                    className={`w-full h-2 rounded-full bg-linear-to-r ${category.color} shadow-md`}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-green-500">📊</span>
                    Skills in this Category
                  </h4>
                  <button
                    onClick={() => {
                      const newCategories = [
                        ...formData.skills.skillCategories,
                      ];
                      newCategories[categoryIndex].skills.push({
                        name: "New Skill",
                        level: 50,
                      });
                      onNestedInputChange(
                        "skills",
                        "skillCategories",
                        newCategories
                      );
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Skill
                  </button>
                </div>
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end p-4 bg-white rounded-xl border border-gray-200"
                  >
                    <div className="md:col-span-5 space-y-2">
                      <label className="block text-xs font-semibold text-gray-600">
                        Skill Name
                      </label>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => {
                          const newCategories = [
                            ...formData.skills.skillCategories,
                          ];
                          newCategories[categoryIndex].skills[skillIndex].name =
                            e.target.value;
                          onNestedInputChange(
                            "skills",
                            "skillCategories",
                            newCategories
                          );
                        }}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white text-gray-900 shadow-sm"
                        placeholder="e.g., React/Next.js"
                      />
                    </div>
                    <div className="md:col-span-5 space-y-2">
                      <label className="block text-xs font-semibold text-gray-600">
                        Level (0-100)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          value={skill.level}
                          onChange={(e) => {
                            const newCategories = [
                              ...formData.skills.skillCategories,
                            ];
                            newCategories[categoryIndex].skills[
                              skillIndex
                            ].level = parseInt(e.target.value);
                            onNestedInputChange(
                              "skills",
                              "skillCategories",
                              newCategories
                            );
                          }}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500"
                          min="0"
                          max="100"
                        />
                        <span className="text-sm font-bold text-green-600 min-w-8">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                      <button
                        onClick={() => {
                          const newCategories = [
                            ...formData.skills.skillCategories,
                          ];
                          newCategories[categoryIndex].skills = newCategories[
                            categoryIndex
                          ].skills.filter((_, i) => i !== skillIndex);
                          onNestedInputChange(
                            "skills",
                            "skillCategories",
                            newCategories
                          );
                        }}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleAddCategory}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Category
          </button>
        </div>
      </div>

      {/* Technologies Editor */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2 bg-linear-to-r from-orange-500 to-red-500 rounded-lg">
            <Cloud className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Technologies</h2>
            <p className="text-sm text-gray-600">
              List all technologies you work with
            </p>
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-orange-500">🛠️</span>
            Technologies (comma separated)
          </label>
          <textarea
            value={formData.skills?.technologies?.join(", ") || ""}
            onChange={(e) =>
              onNestedInputChange(
                "skills",
                "technologies",
                e.target.value.split(",").map((tech) => tech.trim())
              )
            }
            rows={3}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 resize-none leading-relaxed shadow-sm"
            placeholder="React, TypeScript, Node.js, Python, AWS, Docker..."
          />
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            💡 Separate technologies with commas
          </p>
        </div>
      </div>

      {/* Soft Skills Editor */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Soft Skills</h2>
            <p className="text-sm text-gray-600">
              Showcase your interpersonal skills
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {formData.skills?.softSkills?.map((skill, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end p-4 bg-white rounded-xl border-2 border-gray-200"
            >
              <div className="md:col-span-5 space-y-2">
                <label className="block text-xs font-semibold text-gray-600">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => {
                    const newSoftSkills = [...formData.skills.softSkills];
                    newSoftSkills[index].name = e.target.value;
                    onNestedInputChange("skills", "softSkills", newSoftSkills);
                  }}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white text-gray-900 shadow-sm"
                />
              </div>
              <div className="md:col-span-5 space-y-2">
                <label className="block text-xs font-semibold text-gray-600">
                  Proficiency Level
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    value={skill.level}
                    onChange={(e) => {
                      const newSoftSkills = [...formData.skills.softSkills];
                      newSoftSkills[index].level = parseInt(e.target.value);
                      onNestedInputChange(
                        "skills",
                        "softSkills",
                        newSoftSkills
                      );
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                    min="0"
                    max="100"
                  />
                  <span className="text-sm font-bold text-purple-600 min-w-8">
                    {skill.level}%
                  </span>
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  onClick={() => {
                    const newSoftSkills = formData.skills.softSkills.filter(
                      (_, i) => i !== index
                    );
                    onNestedInputChange("skills", "softSkills", newSoftSkills);
                  }}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddSoftSkill}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Soft Skill
          </button>
        </div>
      </div>

      {/* Certifications Editor */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2 bg-linear-to-r from-cyan-500 to-blue-500 rounded-lg">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Certifications</h2>
            <p className="text-sm text-gray-600">
              Show your professional certifications
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {formData.skills?.certifications?.map((cert, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end p-4 bg-white rounded-xl border-2 border-gray-200"
            >
              <div className="md:col-span-4 space-y-2">
                <label className="block text-xs font-semibold text-gray-600">
                  Certification Name
                </label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => {
                    const newCerts = [...formData.skills.certifications];
                    newCerts[index].name = e.target.value;
                    onNestedInputChange("skills", "certifications", newCerts);
                  }}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300 bg-white text-gray-900 shadow-sm"
                />
              </div>
              <div className="md:col-span-3 space-y-2">
                <label className="block text-xs font-semibold text-gray-600">
                  Issuer
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => {
                    const newCerts = [...formData.skills.certifications];
                    newCerts[index].issuer = e.target.value;
                    onNestedInputChange("skills", "certifications", newCerts);
                  }}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300 bg-white text-gray-900 shadow-sm"
                />
              </div>
              <div className="md:col-span-3 space-y-2">
                <label className="block text-xs font-semibold text-gray-600">
                  Year
                </label>
                <input
                  type="text"
                  value={cert.year}
                  onChange={(e) => {
                    const newCerts = [...formData.skills.certifications];
                    newCerts[index].year = e.target.value;
                    onNestedInputChange("skills", "certifications", newCerts);
                  }}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300 bg-white text-gray-900 shadow-sm"
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  onClick={() => {
                    const newCerts = formData.skills.certifications.filter(
                      (_, i) => i !== index
                    );
                    onNestedInputChange("skills", "certifications", newCerts);
                  }}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddCertification}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-cyan-500 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Certification
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6 border border-blue-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Eye className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Skills Preview</h3>
        </div>
        <div className="bg-white rounded-xl p-4 border border-blue-200">
          <div className="text-center mb-4">
            <h4 className="text-lg font-bold text-gray-800">
              {formData.skills?.sectionTitle || "My Skills"}
            </h4>
            <p className="text-sm text-gray-600">
              {formData.skills?.sectionDescription ||
                "A comprehensive overview..."}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {formData.skills?.technologies?.slice(0, 6).map((tech, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm text-center"
              >
                {tech}
              </span>
            ))}
            {(!formData.skills?.technologies ||
              formData.skills.technologies.length === 0) && (
              <div className="col-span-3 text-center py-4 text-gray-500">
                Add technologies to see preview
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsEditor;
