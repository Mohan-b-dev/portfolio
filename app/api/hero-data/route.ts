import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "hero-data.json");

const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const defaultData = {
  name: "MOHAN",
  greeting: "👋 Welcome to my portfolio",
  description:
    "Crafting digital experiences with cutting-edge technology and innovative design. Passionate about creating solutions that make a difference.",
  roles: [
    "Full-Stack Developer",
    "BLOCKCHAIN DEVELOPER",
    "APP DEVELOPER",
    "Problem Solver",
    "Creative Thinker",
  ],
  stats: {
    experience: "5+",
    projects: "100+",
    clients: "50+",
  },
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:hello@johndoe.dev",
  },
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
    console.error("Error reading hero data:", error);
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
      message: "Hero data saved successfully",
    });
  } catch (error) {
    console.error("Error saving hero data:", error);
    return NextResponse.json(
      { success: false, message: "Error saving hero data" },
      { status: 500 }
    );
  }
}
