import { NextResponse } from "next/server";
import { readOrCreateSection, upsertSection } from "@/lib/db/mongo";

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
    console.log("[API] Hero GET request received");
    const data = await readOrCreateSection("hero", defaultData);
    console.log("[API] Returning hero data:", { name: data?.name });
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API] Error reading hero data:", error);
    return NextResponse.json(defaultData);
  }
}

export async function POST(request: Request) {
  try {
    console.log("[API] Hero POST request received");
    const newData = await request.json();
    console.log("[API] Saving hero data:", { name: newData.name });
    const success = await upsertSection("hero", newData);

    if (success) {
      console.log("[API] Hero data saved successfully");
      return NextResponse.json({
        success: true,
        message: "Hero data saved successfully",
      });
    }

    console.error("[API] Failed to save hero data");
    return NextResponse.json(
      { success: false, message: "Error saving hero data" },
      { status: 500 }
    );
  } catch (error) {
    console.error("[API] Error saving hero data:", error);
    return NextResponse.json(
      { success: false, message: "Error saving hero data" },
      { status: 500 }
    );
  }
}
