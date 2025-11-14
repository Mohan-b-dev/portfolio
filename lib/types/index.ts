/**
 * Centralized TypeScript type definitions for all portfolio data
 * Single source of truth for API response shapes
 */

export interface HeroData {
  name: string;
  greeting: string;
  description: string;
  roles: string[];
  stats: {
    experience: string;
    projects: string;
    clients: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
  };
}

export interface AboutData {
  stats: {
    experience: number;
    projects: number;
    clients: number;
    commits: number;
  };
  description1: string;
  description2: string;
  mission: string;
  location: string;
  availability: string;
  techStack: string;
}

export interface ResumeData {
  resumeUrl: string;
  buttonText: string;
  fileName: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: {
    name: string;
    percentage: number;
  }[];
}

export interface SkillsData {
  sectionTitle: string;
  sectionDescription: string;
  skillCategories: SkillCategory[];
  softSkills: string[];
  certifications: string[];
  technologies: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  github: string;
  live: string;
  featured?: boolean;
}

export interface ProjectsData {
  sectionTitle: string;
  sectionDescription: string;
  projects: Project[];
  categories: string[];
  githubUrl: string;
  viewAllText: string;
}

export interface ContactData {
  sectionTitle: string;
  sectionDescription: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  formPlaceholder: {
    name: string;
    email: string;
    message: string;
  };
}

export interface FooterData {
  copyYear: number;
  copyrightText: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
  quickLinks: {
    label: string;
    href: string;
  }[];
}
