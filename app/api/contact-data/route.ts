import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "contact-data.json");

const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const defaultData = {
  contactTitle: "Get In Touch",
  contactSubtitle:
    "Ready to bring your ideas to life? Let's discuss your project and create something amazing together.",
  contactDescription:
    "I'm always excited to work on new projects and collaborate with amazing people. Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you.",
  contactInfo: {
    email: "hello@mohan.dev",
    phone: "+1 (555) 123-4567",
    location: "Remote",
  },
  socialMedia: {
    github: "https://github.com",
    linkedin: "https://linkedin.com/in/mohan",
    twitter: "https://twitter.com/mohan",
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
    console.error("Error reading contact data:", error);
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
      message: "Contact data saved successfully",
    });
  } catch (error) {
    console.error("Error saving contact data:", error);
    return NextResponse.json(
      { success: false, message: "Error saving contact data" },
      { status: 500 }
    );
  }
}
