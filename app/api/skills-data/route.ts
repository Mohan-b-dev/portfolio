import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "skills-data.json");

const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const defaultData = {
  skillCategories: [
    {
      icon: "Code2",
      title: "Frontend Development",
      skills: [
        { name: "React/Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 88 },
        { name: "Vue.js", level: 82 },
      ],
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: "Database",
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 92 },
        { name: "Python", level: 85 },
        { name: "PostgreSQL", level: 88 },
        { name: "MongoDB", level: 80 },
      ],
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: "Cloud",
      title: "DevOps & Cloud",
      skills: [
        { name: "AWS", level: 85 },
        { name: "Docker", level: 82 },
        { name: "Kubernetes", level: 75 },
        { name: "CI/CD", level: 88 },
      ],
      color: "from-orange-500 to-red-600",
    },
    {
      icon: "Smartphone",
      title: "Mobile Development",
      skills: [
        { name: "React Native", level: 88 },
        { name: "Flutter", level: 75 },
        { name: "iOS/Swift", level: 70 },
        { name: "Android/Kotlin", level: 72 },
      ],
      color: "from-pink-500 to-rose-600",
    },
    {
      icon: "Palette",
      title: "Design & UX",
      skills: [
        { name: "Figma", level: 85 },
        { name: "Adobe XD", level: 80 },
        { name: "UI/UX Design", level: 88 },
        { name: "Prototyping", level: 82 },
      ],
      color: "from-violet-500 to-purple-600",
    },
    {
      icon: "Globe",
      title: "Other Skills",
      skills: [
        { name: "GraphQL", level: 85 },
        { name: "REST APIs", level: 92 },
        { name: "Git/GitHub", level: 90 },
        { name: "Agile/Scrum", level: 88 },
      ],
      color: "from-cyan-500 to-blue-600",
    },
  ],
  softSkills: [
    { name: "Problem Solving", level: 95, icon: "Zap" },
    { name: "Team Leadership", level: 88, icon: "Award" },
    { name: "Communication", level: 92, icon: "Globe" },
    { name: "Adaptability", level: 90, icon: "TrendingUp" },
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2024",
    },
    {
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      year: "2023",
    },
    {
      name: "Google Cloud Professional",
      issuer: "Google Cloud",
      year: "2023",
    },
  ],
  technologies: [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "PostgreSQL",
    "MongoDB",
    "GraphQL",
    "Redis",
    "Kubernetes",
    "Git",
    "Next.js",
    "Vue.js",
    "Tailwind CSS",
    "Express",
  ],
  sectionTitle: "My Skills",
  sectionDescription:
    "A comprehensive overview of my technical expertise and professional capabilities",
  technologiesTitle: "Technologies I Work With",
};

export async function GET() {
  try {
    ensureDataDirectory();

    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2));
      return NextResponse.json(defaultData);
    }

    const fileData = fs.readFileSync(dataFilePath, "utf8");
    const data = JSON.parse(fileData);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading skills data:", error);
    return NextResponse.json(defaultData);
  }
}

export async function POST(request: Request) {
  try {
    ensureDataDirectory();

    const newData = await request.json();
    fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2));

    return NextResponse.json({
      success: true,
      message: "Skills data saved successfully",
    });
  } catch (error) {
    console.error("Error saving skills data:", error);
    return NextResponse.json(
      { success: false, message: "Error saving skills data" },
      { status: 500 }
    );
  }
}
