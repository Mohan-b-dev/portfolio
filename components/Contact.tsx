"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";

interface ContactProps {
  darkMode?: boolean;
}

interface ContactData {
  contactTitle: string;
  contactSubtitle: string;
  contactDescription: string;
  contactInfo: {
    email: string;
    phone: string;
    location: string;
  };
  socialMedia: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

const Contact: React.FC<ContactProps> = ({ darkMode = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isVisible, setIsVisible] = useState(false);

  // Load contact data
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch("/api/contact-data");
        const data = await response.json();
        setContactData(data);
      } catch (error) {
        console.error("Error loading contact data:", error);
        // Fallback to default data
        setContactData({
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
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactData();
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("contact");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: contactData?.contactInfo?.email || "hello@mohan.dev",
      href: `mailto:${contactData?.contactInfo?.email || "hello@mohan.dev"}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: contactData?.contactInfo?.phone || "+1 (555) 123-4567",
      href: `tel:${contactData?.contactInfo?.phone || "+15551234567"}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: contactData?.contactInfo?.location || "Remote",
      href: "https://maps.google.com",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: contactData?.socialMedia?.github || "https://github.com",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: contactData?.socialMedia?.linkedin || "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: contactData?.socialMedia?.twitter || "https://twitter.com",
      label: "Twitter",
    },
  ];

  if (isLoading || !contactData) {
    return (
      <section
        id="contact"
        className={`py-16 md:py-20 lg:py-24 transition-colors duration-300 ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p
              className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Loading contact information...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className={`py-16 md:py-20 lg:py-24 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 ${
            isVisible ? "animate-fadeInUp" : "opacity-0"
          }`}
        >
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {contactData.contactTitle.split(" ")[0]}{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {contactData.contactTitle.split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full mb-6 md:mb-8"></div>
          <p
            className={`text-base md:text-xl max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {contactData.contactSubtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <div
            className={`space-y-6 md:space-y-8 ${
              isVisible ? "animate-fadeInLeft" : "opacity-0"
            }`}
          >
            <div>
              <h3
                className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Let&apos;s Start a Conversation
              </h3>
              <p
                className={`text-base md:text-lg leading-relaxed mb-6 md:mb-8 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {contactData.contactDescription}
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 md:space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.label === "Location" ? "_blank" : undefined}
                  rel={
                    info.label === "Location"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={`flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl md:rounded-2xl 
                    transition-all duration-300 hover:scale-105 group ${
                      darkMode
                        ? "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white"
                        : "bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900"
                    } shadow-lg hover:shadow-xl`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <info.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <div
                      className={`text-xs md:text-sm font-medium ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {info.label}
                    </div>
                    <div className="text-sm md:text-base font-semibold">
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-4 md:pt-6">
              <h4
                className={`text-sm md:text-base font-semibold mb-3 md:mb-4 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Connect with me
              </h4>
              <div className="flex space-x-3 md:space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center
                      transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                        darkMode
                          ? "bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600"
                          : "bg-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600"
                      } shadow-lg hover:shadow-xl`}
                  >
                    <social.icon
                      className={`w-5 h-5 md:w-6 md:h-6 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      } hover:text-white transition-colors`}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* 3D Floating Elements - Desktop Only */}
            <div className="relative mt-8 md:mt-12 hidden lg:block">
              <div className="absolute top-0 right-0 w-16 md:w-20 h-16 md:h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-12 md:w-16 h-12 md:h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full opacity-20 animate-bounce"></div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl ${
              darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
            } ${isVisible ? "animate-fadeInRight" : "opacity-0"}`}
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {/* Name Field */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border-2 
                      transition-all duration-300 focus:scale-[1.02] ${
                        errors.name
                          ? "border-red-500 focus:border-red-500"
                          : darkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                          : "bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500"
                      } focus:outline-none`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border-2 
                      transition-all duration-300 focus:scale-[1.02] ${
                        errors.email
                          ? "border-red-500 focus:border-red-500"
                          : darkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                          : "bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500"
                      } focus:outline-none`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border-2 
                    transition-all duration-300 focus:scale-[1.02] ${
                      errors.subject
                        ? "border-red-500 focus:border-red-500"
                        : darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500"
                    } focus:outline-none`}
                  placeholder="Let's work together!"
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border-2 
                    transition-all duration-300 focus:scale-[1.02] resize-none ${
                      errors.message
                        ? "border-red-500 focus:border-red-500"
                        : darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500"
                    } focus:outline-none`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 md:py-4 px-6 rounded-lg md:rounded-xl font-semibold text-sm md:text-base
                  transition-all duration-300 transform hover:scale-105 ${
                    isSubmitted
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl hover:shadow-purple-500/25"
                  } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              >
                <div className="flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Sending...</span>
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </div>
              </button>

              {/* Success Message */}
              {isSubmitted && (
                <div
                  className={`p-3 md:p-4 rounded-lg ${
                    darkMode ? "bg-green-900/20" : "bg-green-50"
                  } border-2 border-green-500 animate-fadeInUp`}
                >
                  <p
                    className={`text-sm text-center ${
                      darkMode ? "text-green-400" : "text-green-700"
                    }`}
                  >
                    Thank you! I&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
