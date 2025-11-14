export interface AdminFormData {
  name: string;
  greeting: string;
  description: string;
  roles: string;
  heroStats: {
    experience: string;
    projects: string;
    clients: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
  };
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
  resumeUrl: string;
  resumeButtonText: string;
  resumeFileName: string;
  resumeSource: string;
  projects: {
    sectionTitle: string;
    sectionDescription: string;
    githubUrl: string;
    viewAllText: string;
    categories: string[];
    projects: Project[];
  };
  skills: {
    sectionTitle: string;
    sectionDescription: string;
    technologiesTitle: string;
    skillCategories: SkillCategory[];
    softSkills: SoftSkill[];
    certifications: Certification[];
    technologies: string[];
  };
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
  footer: {
    name: string;
    tagline: string;
    quickLinks: Link[];
    resources: Link[];
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

export interface SkillCategory {
  icon: string;
  title: string;
  skills: Skill[];
  color: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SoftSkill {
  name: string;
  level: number;
  icon: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Link {
  name: string;
  href: string;
}

export type FormValue =
  | string
  | number
  | boolean
  | object
  | string[]
  | Project[]
  | SkillCategory[]
  | SoftSkill[]
  | Certification[];

export interface EditorProps {
  formData: AdminFormData;
  onInputChange: (field: string, value: FormValue) => void;
  onNestedInputChange: (
    parent: string,
    field: string,
    value: FormValue
  ) => void;
  onFileSelect?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUploadResume?: () => void;
  isUploading?: boolean;
  selectedFile?: File | null;
}
