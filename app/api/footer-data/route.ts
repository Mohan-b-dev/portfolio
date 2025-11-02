import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "footer-data.json");

const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const defaultData = {
  footer: {
    name: "John Doe",
    tagline:
      "Full-Stack Developer passionate about creating digital experiences that make a difference.",
    quickLinks: [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Skills", href: "#skills" },
      { name: "Projects", href: "#projects" },
      { name: "Contact", href: "#contact" },
    ],
    resources: [
      { name: "Blog", href: "#blog" },
      { name: "Portfolio", href: "#projects" },
      { name: "Resume", href: "/resume.pdf" },
      { name: "Testimonials", href: "#testimonials" },
    ],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:hello@johndoe.dev",
    },
    contactText: "Ready to start your next project?",
    copyright: "© {year} John Doe. All rights reserved.",
    madeWithText: "Made with ❤️ using Next.js & TypeScript",
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
    console.error("Error reading footer data:", error);
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
      message: "Footer data saved successfully",
    });
  } catch (error) {
    console.error("Error saving footer data:", error);
    return NextResponse.json(
      { success: false, message: "Error saving footer data" },
      { status: 500 }
    );
  }
}
