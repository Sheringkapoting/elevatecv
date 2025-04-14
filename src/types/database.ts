
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
