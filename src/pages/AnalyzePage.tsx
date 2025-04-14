import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Resume, JobDescription, AnalysisResult } from '@/types/database';

interface AnalysisResultDisplay {
  ats_score: number;
  keyword_score: number;
  formatting_score: number;
  content_score: number;
  suggestions: {
    keywords: string[];
    formatting: string[];
    content: string[];
  };
}

const AnalyzePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultDisplay | null>(null);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [jobDescriptionId, setJobDescriptionId] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Check if file is PDF or DOCX
      if (file.type === 'application/pdf' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setResumeFile(file);
      } else {
        toast.error('Please upload a PDF or DOCX file');
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      toast.error('Please upload a resume file');
      return;
    }

    if (!jobDescription) {
      toast.error('Please enter a job description');
      return;
    }

    if (!user?.id) {
      toast.error('You must be logged in');
      return;
    }

    setIsLoading(true);
    
    try {
      // 1. Upload resume file to Supabase Storage
      const resumeFileName = `${Date.now()}-${resumeFile.name}`;
      const resumePath = `${user.id}/${resumeFileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(resumePath, resumeFile);
        
      if (uploadError) throw uploadError;
      
      // 2. Save resume metadata to database
      const { data: resumeData, error: resumeError } = await supabase
        .from('resumes')
        .insert({
          user_id: user.id,
          name: resumeFile.name,
          file_path: resumePath,
          file_type: resumeFile.type
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
          title: jobTitle || 'Untitled Position',
          company: company || 'Unknown Company',
          description: jobDescription
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
      // In a real app, we would update the UI to show the enhanced resume or provide a download link
      
    } catch (error: any) {
      console.error('Error enhancing resume:', error);
      toast.error(error.message || 'Failed to enhance resume');
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Resume ATS Analyzer</h1>
      
      {!analysisResult ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Analyze Your Resume</CardTitle>
            <CardDescription>
              Upload your resume and paste a job description to get an ATS compatibility score
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="resume">Upload Resume (PDF or DOCX)</Label>
                <Input 
                  id="resume" 
                  type="file" 
                  accept=".pdf,.docx" 
                  onChange={handleFileChange} 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title (Optional)</Label>
                <Input 
                  id="jobTitle" 
                  placeholder="e.g. Software Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company (Optional)</Label>
                <Input 
                  id="company" 
                  placeholder="e.g. Google"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea 
                  id="jobDescription" 
                  placeholder="Paste the job description here..."
                  rows={8}
                  className="min-h-[150px]"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Analyzing..." : "Analyze Resume"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>ATS Compatibility Score</CardTitle>
              <CardDescription>
                How well your resume matches this job description
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Overall ATS Score</span>
                  <span className="font-semibold">{analysisResult.ats_score}%</span>
                </div>
                <Progress value={analysisResult.ats_score} className="h-2" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Keywords</span>
                    <span>{analysisResult.keyword_score}%</span>
                  </div>
                  <Progress value={analysisResult.keyword_score} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Formatting</span>
                    <span>{analysisResult.formatting_score}%</span>
                  </div>
                  <Progress value={analysisResult.formatting_score} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Content</span>
                    <span>{analysisResult.content_score}%</span>
                  </div>
                  <Progress value={analysisResult.content_score} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Improvement Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="keywords">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="keywords">Keywords</TabsTrigger>
                  <TabsTrigger value="formatting">Formatting</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                </TabsList>
                
                <TabsContent value="keywords" className="space-y-4 pt-4">
                  <ul className="list-disc pl-5 space-y-2">
                    {analysisResult.suggestions.keywords.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="formatting" className="space-y-4 pt-4">
                  <ul className="list-disc pl-5 space-y-2">
                    {analysisResult.suggestions.formatting.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="content" className="space-y-4 pt-4">
                  <ul className="list-disc pl-5 space-y-2">
                    {analysisResult.suggestions.content.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setAnalysisResult(null)}>
                Analyze Another Resume
              </Button>
              <Button onClick={handleEnhanceResume} disabled={isEnhancing}>
                {isEnhancing ? "Enhancing..." : "Enhance Resume (Premium)"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AnalyzePage;
