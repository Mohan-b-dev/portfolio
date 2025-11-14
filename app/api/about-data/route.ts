import { NextResponse } from "next/server";
import { readOrCreateSection, upsertSection } from "@/lib/db/mongo";

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
    const data = await readOrCreateSection("about", defaultData);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading about data:", error);
    return NextResponse.json(defaultData);
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    const success = await upsertSection("about", newData);

    if (success) {
      return NextResponse.json({
        success: true,
        message: "About data saved successfully",
      });
    }

    return NextResponse.json(
      { success: false, message: "Error saving about data" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error saving about data", error);
    return NextResponse.json(
      { success: false, message: "Error saving about data" },
      { status: 500 }
    );
  }
}
