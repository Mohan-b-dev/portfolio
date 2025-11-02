import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "resume-data.json");

const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const defaultData = {
  resumeUrl: "/resume.pdf",
  buttonText: "Download Resume",
  fileName: "Mohan_Resume.pdf",
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
    console.error("Error reading resume data:", error);
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
      message: "Resume data saved successfully",
    });
  } catch (error) {
    console.error("Error saving resume data:", error);
    return NextResponse.json(
      { success: false, message: "Error saving resume data" },
      { status: 500 }
    );
  }
}
