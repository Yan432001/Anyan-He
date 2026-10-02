export type ProjectCategory = 'all' | 'mcp' | 'systems' | 'infra' | 'protocols';

export interface ProjectMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  summary: string;
  description: string;
  architectureSummary: string;
  metrics: ProjectMetric[];
  technologies: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  status: 'Production' | 'Open Source' | 'Enterprise Active' | 'Protocol Live';
  featured?: boolean;
  bentoSpan?: 'large' | 'medium' | 'tall';
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  nodePillars?: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  message: string;
  sentAt: string;
}
