import { NextResponse } from "next/server";
import { readOrCreateSection, upsertSection } from "@/lib/db/mongo";

const defaultData = {
  resumeUrl: "/resume.pdf",
  buttonText: "Download Resume",
  fileName: "Mohan_Resume.pdf",
};

export async function GET() {
  try {
    const data = await readOrCreateSection("resume", defaultData);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading resume data:", error);
    return NextResponse.json(defaultData);
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    const success = await upsertSection("resume", newData);

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Resume data saved successfully",
      });
    }

    return NextResponse.json(
      { success: false, message: "Error saving resume data" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error saving resume data:", error);
    return NextResponse.json(
      { success: false, message: "Error saving resume data" },
      { status: 500 }
    );
  }
}
