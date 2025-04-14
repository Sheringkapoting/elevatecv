
export interface Resume {
  id: string;
  user_id: string;
  name: string;
  file_path: string;
  file_type: string;
  created_at: string;
  updated_at: string;
}

export interface JobDescription {
  id: string;
  user_id: string;
  title: string;
  company: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface AnalysisResult {
  id: string;
  user_id: string;
  resume_id: string;
  job_description_id: string;
  ats_score: number;
  keyword_score: number;
  formatting_score: number;
  content_score: number;
  suggestions: {
    keywords: string[];
    formatting: string[];
    content: string[];
  };
  enhanced_resume_path?: string;
  created_at: string;
}

export interface Feedback {
  id: string;
  user_id: string;
  rating: number;
  comments?: string;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  subscription_tier: 'free' | 'premium';
  subscription_end_date?: string;
  created_at: string;
  updated_at: string;
}

// Type guards to check if an object matches a specific interface
export function isResume(obj: any): obj is Resume {
  return obj && 
    typeof obj.id === 'string' &&
    typeof obj.user_id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.file_path === 'string' &&
    typeof obj.file_type === 'string';
}

export function isJobDescription(obj: any): obj is JobDescription {
  return obj && 
    typeof obj.id === 'string' &&
    typeof obj.user_id === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string';
}

export function isAnalysisResult(obj: any): obj is AnalysisResult {
  return obj && 
    typeof obj.id === 'string' &&
    typeof obj.user_id === 'string' &&
    typeof obj.resume_id === 'string' &&
    typeof obj.job_description_id === 'string' &&
    typeof obj.ats_score === 'number';
}
