export interface Person {
  name: string;
  handle: string;
  label: string;
  location: {
    city: string;
    country: string;
    timezone: string;
  };
  headline: string;
  valueProp: string;
  availability: string;
  contact: {
    email: string;
    preferred: string;
    social: {
      linkedin: string;
      twitter: string;
      github: string;
      discord: string;
    };
  };
}

export interface Project {
  title: string;
  role: string;
  clientOrCompany: string;
  year: number;
  summary: string;
  context: string;
  problem: string;
  approach: string;
  techs?: string[];
  outcome: {
    metric: string;
    details: string;
  };
  links: {
    live: string;
    repo: string;
    video: string;
  };
  assets: Array<{
    src: string;
    alt: string;
  }>;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Service {
  name: string;
  scope: string;
  timeline: string;
  notes: string;
}

export interface Education {
  school: string;
  degree: string;
  graduationYear: number;
}

export interface TechStack {
  name: string;
  icon: string;
}

export interface PortfolioData {
  person: Person;
  projects: Project[];
  experience: Experience[];
  testimonials: any[];
  services: Service[];
  writing: any[];
  education: Education;
  languages: Record<string, string>;
  techStack: TechStack[];
}

