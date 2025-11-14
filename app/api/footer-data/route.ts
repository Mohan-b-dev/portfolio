import { NextResponse } from "next/server";
import { readOrCreateSection, upsertSection } from "@/lib/db/mongo";

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
    const data = await readOrCreateSection("footer", defaultData);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading footer data:", error);
    return NextResponse.json(defaultData);
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    const success = await upsertSection("footer", newData);

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Footer data saved successfully",
      });
    }

    return NextResponse.json(
      { success: false, message: "Error saving footer data" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error saving footer data:", error);
    return NextResponse.json(
      { success: false, message: "Error saving footer data" },
      { status: 500 }
    );
  }
}
