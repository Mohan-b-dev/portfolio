import {
  HeroData,
  AboutData,
  SkillsData,
  ProjectsData,
  ContactData,
  FooterData,
  ResumeData,
} from "@/lib/types";

/**
 * Centralized default/fallback data for all portfolio sections
 * Used when API calls fail or components need initial data
 */

export const DEFAULT_HERO: HeroData = {
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
    github: "https://github.com/Mohan-b-dev",
    linkedin: "https://linkedin.com/mohan",
    email: "mailto:hello@johndoe.dev",
  },
};

export const DEFAULT_ABOUT: AboutData = {
  stats: {
    experience: 5,
    projects: 100,
    clients: 50,
    commits: 2000,
  },
  description1:
    "I'm a passionate full-stack developer with over 5 years of experience building scalable web applications and mobile solutions.",
  description2:
    "I specialize in modern web technologies and best practices to deliver high-quality, maintainable code.",
  mission:
    "To create digital experiences that not only look beautiful but are also highly functional and user-friendly.",
  location: "Remote",
  availability: "Available for new projects",
  techStack: "React,TypeScript,Node.js,Python,AWS,Docker",
};

export const DEFAULT_SKILLS: SkillsData = {
  sectionTitle: "My Skills",
  sectionDescription: "Technologies and tools I work with",
  skillCategories: [
    {
      category: "Frontend",
      icon: "Code",
      skills: [
        { name: "React", percentage: 90 },
        { name: "TypeScript", percentage: 85 },
        { name: "Tailwind CSS", percentage: 95 },
        { name: "Next.js", percentage: 88 },
      ],
    },
  ],
  softSkills: ["Problem Solving", "Team Leadership", "Communication"],
  certifications: ["React Professional", "AWS Certified"],
  technologies: ["JavaScript", "Python", "SQL", "Docker", "Kubernetes"],
};

export const DEFAULT_PROJECTS: ProjectsData = {
  sectionTitle: "Featured Projects",
  sectionDescription:
    "A showcase of my recent work, featuring innovative solutions and cutting-edge technologies",
  categories: ["All", "Web App", "Mobile App", "DevOps", "Blockchain"],
  githubUrl: "https://github.com/Mohan-b-dev",
  viewAllText: "View All Projects on GitHub",
  projects: [],
};

export const DEFAULT_CONTACT: ContactData = {
  sectionTitle: "Get In Touch",
  sectionDescription:
    "Feel free to reach out for collaborations or just a friendly hello",
  email: "hello@johndoe.dev",
  phone: "+1 (555) 123-4567",
  location: "Remote",
  socialLinks: {
    github: "https://github.com/Mohan-b-dev",
    linkedin: "https://linkedin.com/mohan",
    twitter: "https://twitter.com/mohan",
  },
  formPlaceholder: {
    name: "Your Name",
    email: "your@email.com",
    message: "Your message...",
  },
};

export const DEFAULT_FOOTER: FooterData = {
  copyYear: new Date().getFullYear(),
  copyrightText: "© All rights reserved.",
  socialLinks: {
    github: "https://github.com/Mohan-b-dev",
    linkedin: "https://linkedin.com/mohan",
    twitter: "https://twitter.com/mohan",
    email: "hello@johndoe.dev",
  },
  quickLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
};

export const DEFAULT_RESUME: ResumeData = {
  resumeUrl: "/uploads/resume.pdf",
  buttonText: "Download Resume",
  fileName: "Mohan_Resume.pdf",
};
