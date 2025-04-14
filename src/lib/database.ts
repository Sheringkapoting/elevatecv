
import { supabase } from '@/integrations/supabase/client';
import type { Resume, JobDescription, AnalysisResult, Profile } from '@/types/database';

// Resumes
export async function insertResume(resume: Omit<Resume, 'id' | 'created_at' | 'updated_at'>) {
  return supabase.from('resumes').insert(resume);
}

export async function getResumesByUserId(userId: string) {
  return supabase.from('resumes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
}

export async function getResumeById(id: string) {
  return supabase.from('resumes').select('*').eq('id', id).single();
}

// Job Descriptions
export async function insertJobDescription(jobDescription: Omit<JobDescription, 'id' | 'created_at' | 'updated_at'>) {
  return supabase.from('job_descriptions').insert(jobDescription);
}

export async function getJobDescriptionsByUserId(userId: string) {
  return supabase.from('job_descriptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
}

export async function getJobDescriptionById(id: string) {
  return supabase.from('job_descriptions').select('*').eq('id', id).single();
}

// Analysis Results
export async function insertAnalysisResult(
  analysisResult: Omit<AnalysisResult, 'id' | 'created_at'>
) {
  return supabase.from('analysis_results').insert(analysisResult);
}

export async function getAnalysisResultsByUserId(userId: string) {
  return supabase.from('analysis_results')
    .select('*, resumes(*), job_descriptions(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
}

export async function getAnalysisResultById(id: string) {
  return supabase.from('analysis_results')
    .select('*, resumes(*), job_descriptions(*)')
    .eq('id', id)
    .single();
}

// Profiles
export async function getProfileByUserId(userId: string) {
  return supabase.from('profiles').select('*').eq('id', userId).single();
}

export async function updateProfile(
  userId: string,
  profile: Partial<Omit<Profile, 'id' | 'created_at'>>
) {
  return supabase.from('profiles').update({
    ...profile,
    updated_at: new Date().toISOString(),
  }).eq('id', userId);
}
