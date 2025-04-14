
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Resume, JobDescription, AnalysisResult } from '@/types/database';
import UploadResumeForm from './analyze/UploadResumeForm';
import AnalysisResultCard from './analyze/AnalysisResultCard';
import SuggestionsTabs from './analyze/SuggestionsTabs';
import { AnalysisResultDisplay } from './analyze/types';

const AnalyzePage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultDisplay | null>(null);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [jobDescriptionId, setJobDescriptionId] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleSubmit = async (formData: {
    resumeFile: File;
    jobTitle: string;
    company: string;
    jobDescription: string;
  }) => {
    if (!user?.id) {
      toast.error('You must be logged in');
      return;
    }

    setIsLoading(true);
    
    try {
      // 1. Upload resume file to Supabase Storage
      const resumeFileName = `${Date.now()}-${formData.resumeFile.name}`;
      const resumePath = `${user.id}/${resumeFileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(resumePath, formData.resumeFile);
        
      if (uploadError) throw uploadError;
      
      // 2. Save resume metadata to database
      const { data: resumeData, error: resumeError } = await supabase
        .from('resumes')
        .insert({
          user_id: user.id,
          name: formData.resumeFile.name,
          file_path: resumePath,
          file_type: formData.resumeFile.type
        })
        .select()
        .single();
        
      if (resumeError) throw resumeError;
      if (!resumeData) throw new Error('Failed to create resume record');
      
      setResumeId(resumeData.id);
      
      // 3. Save job description to database
      const { data: jobData, error: jobError } = await supabase
        .from('job_descriptions')
        .insert({
          user_id: user.id,
          title: formData.jobTitle || 'Untitled Position',
          company: formData.company || 'Unknown Company',
          description: formData.jobDescription
        })
        .select()
        .single();
        
      if (jobError) throw jobError;
      if (!jobData) throw new Error('Failed to create job description record');
      
      setJobDescriptionId(jobData.id);
      
      // 4. Call analyze-resume function
      const { data: analysisData, error: analysisError } = await supabase.functions
        .invoke('analyze-resume', {
          body: {
            resumeId: resumeData.id,
            jobDescriptionId: jobData.id
          }
        });
        
      if (analysisError) throw analysisError;
      
      // 5. Save analysis results to database
      if (!analysisData || !analysisData.data) {
        throw new Error('Analysis failed to return results');
      }
      
      const result = analysisData.data;
      setAnalysisResult(result);
      
      await supabase
        .from('analysis_results')
        .insert({
          user_id: user.id,
          resume_id: resumeData.id,
          job_description_id: jobData.id,
          ats_score: result.ats_score,
          keyword_score: result.keyword_score,
          formatting_score: result.formatting_score,
          content_score: result.content_score,
          suggestions: result.suggestions
        });
      
      toast.success('Resume analysis completed!');
      
    } catch (error: any) {
      console.error('Error during analysis:', error);
      toast.error(error.message || 'Failed to analyze resume');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnhanceResume = async () => {
    if (!resumeId || !jobDescriptionId) {
      toast.error('Missing resume or job information');
      return;
    }

    if (!user?.id) {
      toast.error('You must be logged in');
      return;
    }

    setIsEnhancing(true);
    try {
      // Call enhance-resume function
      const { data, error } = await supabase.functions
        .invoke('enhance-resume', {
          body: {
            resumeId,
            jobDescriptionId,
            userId: user.id
          }
        });

      if (error) throw error;
      
      toast.success('Your resume has been enhanced! Check your email for the download link.');
      
    } catch (error: any) {
      console.error('Error enhancing resume:', error);
      toast.error(error.message || 'Failed to enhance resume');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleResetAnalysis = () => {
    setAnalysisResult(null);
    setResumeId(null);
    setJobDescriptionId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Resume ATS Analyzer</h1>
      
      {!analysisResult ? (
        <UploadResumeForm
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          <AnalysisResultCard
            ats_score={analysisResult.ats_score}
            keyword_score={analysisResult.keyword_score}
            formatting_score={analysisResult.formatting_score}
            content_score={analysisResult.content_score}
          />
          
          <SuggestionsTabs
            suggestions={analysisResult.suggestions}
            onAnalyzeAnother={handleResetAnalysis}
            onEnhanceResume={handleEnhanceResume}
            isEnhancing={isEnhancing}
          />
        </div>
      )}
    </div>
  );
};

export default AnalyzePage;
