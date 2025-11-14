import { NextResponse } from "next/server";
import { readOrCreateSection, upsertSection } from "@/lib/db/mongo";

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
    const data = await readOrCreateSection("contact", defaultData);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading contact data:", error);
    return NextResponse.json(defaultData);
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    const success = await upsertSection("contact", newData);

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Contact data saved successfully",
      });
    }

    return NextResponse.json(
      { success: false, message: "Error saving contact data" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error saving contact data:", error);
    return NextResponse.json(
      { success: false, message: "Error saving contact data" },
      { status: 500 }
    );
  }
}
