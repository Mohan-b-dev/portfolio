"use client";

import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Heart,
  ArrowUp,
  Code,
} from "lucide-react";

interface FooterProps {
  darkMode?: boolean;
}

interface FooterData {
  footer: {
    name: string;
    tagline: string;
    quickLinks: Array<{ name: string; href: string }>;
    resources: Array<{ name: string; href: string }>;
    socialLinks: {
      github: string;
      linkedin: string;
      twitter: string;
      email: string;
    };
    contactText: string;
    copyright: string;
    madeWithText: string;
  };
}

const Footer: React.FC<FooterProps> = ({ darkMode = false }) => {
  const [showScrollTop, setShowScrollTop] = useState(true);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load footer data
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch("/api/footer-data");
        const data = await response.json();
        setFooterData(data);
      } catch (error) {
        console.error("Error loading footer data:", error);
        // Fallback to default data
        setFooterData({
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
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  const socialLinks = [
    {
      icon: Github,
      href: footerData?.footer?.socialLinks?.github || "https://github.com",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: footerData?.footer?.socialLinks?.linkedin || "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: footerData?.footer?.socialLinks?.twitter || "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: Mail,
      href:
        footerData?.footer?.socialLinks?.email || "mailto:hello@johndoe.dev",
      label: "Email",
    },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const section = href.replace("#", "");
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: "smooth" });
    } else if (href === "/resume.pdf") {
      window.open(href, "_blank");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();
  const copyrightText =
    footerData?.footer?.copyright?.replace("{year}", currentYear.toString()) ||
    `© ${currentYear} John Doe. All rights reserved.`;

  if (isLoading || !footerData) {
    return (
      <footer
        className={`relative w-full py-12 md:py-16 transition-colors duration-300 ${
          darkMode
            ? "bg-gradient-to-b from-gray-900 to-black"
            : "bg-gradient-to-b from-gray-50 to-white"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p
              className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Loading footer...
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className={`relative w-full py-12 md:py-16 transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 to-black"
          : "bg-gradient-to-b from-gray-50 to-white"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-8 md:mb-12">
          {/* Brand Section */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <Code className="w-8 h-8 text-purple-600" />
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {footerData.footer.name}
              </div>
            </div>
            <p
              className={`text-sm md:text-base leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {footerData.footer.tagline}
            </p>
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl transition-all duration-300 
                    hover:scale-110 hover:-translate-y-1 group ${
                      darkMode
                        ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                        : "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                    }`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className={`text-lg md:text-xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Quick Links
            </h3>
            <ul className="space-y-2.5 md:space-y-3">
              {footerData.footer.quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={`text-sm md:text-base transition-all duration-300 
                      hover:translate-x-2 flex items-center group ${
                        darkMode
                          ? "text-gray-400 hover:text-purple-400"
                          : "text-gray-600 hover:text-purple-600"
                      }`}
                  >
                    <span className="w-0 h-0.5 bg-purple-600 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3
              className={`text-lg md:text-xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Resources
            </h3>
            <ul className="space-y-2.5 md:space-y-3">
              {footerData.footer.resources.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={`text-sm md:text-base transition-all duration-300 
                      hover:translate-x-2 flex items-center group ${
                        darkMode
                          ? "text-gray-400 hover:text-purple-400"
                          : "text-gray-600 hover:text-purple-600"
                      }`}
                  >
                    <span className="w-0 h-0.5 bg-purple-600 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className={`text-lg md:text-xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Let&apos;s Connect
            </h3>
            <div className="space-y-3 md:space-y-4">
              <p
                className={`text-sm md:text-base ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {footerData.footer.contactText}
              </p>
              <a
                href={footerData.footer.socialLinks.email}
                className={`inline-block px-5 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl 
                  text-sm md:text-base font-medium transition-all duration-300 
                  transform hover:scale-105 ${
                    darkMode
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/25"
                      : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl hover:shadow-purple-500/30"
                  }`}
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`border-t ${
            darkMode ? "border-gray-800" : "border-gray-200"
          }`}
        ></div>

        {/* Bottom Section */}
        <div className="pt-6 md:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 gap-4">
            {/* Copyright */}
            <p
              className={`text-xs md:text-sm text-center sm:text-left ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {copyrightText}
            </p>

            {/* Made with Love */}
            <div
              className={`flex items-center space-x-1 text-xs md:text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <span>{footerData.footer.madeWithText.replace("❤️", "")}</span>
              <Heart className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500 animate-pulse" />
              <span>
                {footerData.footer.madeWithText.includes("❤️")
                  ? footerData.footer.madeWithText.split("❤️")[1]
                  : ""}
              </span>
            </div>

            {/* Privacy Links */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => scrollToSection("#privacy")}
                className={`text-xs md:text-sm transition-colors ${
                  darkMode
                    ? "text-gray-400 hover:text-purple-400"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                Privacy
              </button>
              <button
                onClick={() => scrollToSection("#terms")}
                className={`text-xs md:text-sm transition-colors ${
                  darkMode
                    ? "text-gray-400 hover:text-purple-400"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                Terms
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 md:p-4 rounded-full shadow-lg 
            transition-all duration-300 hover:scale-110 hover:-translate-y-1 z-50 ${
              darkMode
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-purple-500/25"
                : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl hover:shadow-purple-500/30"
            }`}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
