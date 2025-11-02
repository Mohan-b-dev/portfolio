import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "about-data.json");

const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const defaultData = {
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
    console.error("Error reading about data:", error);
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
      message: "About data saved successfully",
    });
  } catch (error) {
    console.error("Error saving about data:", error);
    return NextResponse.json(
      { success: false, message: "Error saving about data" },
      { status: 500 }
    );
  }
}
