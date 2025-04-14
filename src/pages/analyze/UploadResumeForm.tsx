
import React, { useState, FormEvent } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface UploadResumeFormProps {
  isLoading: boolean;
  onSubmit: (formData: {
    resumeFile: File;
    jobTitle: string;
    company: string;
    jobDescription: string;
  }) => void;
}

const UploadResumeForm: React.FC<UploadResumeFormProps> = ({ isLoading, onSubmit }) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      toast.error('Please upload a resume file');
      return;
    }

    if (!jobDescription) {
      toast.error('Please enter a job description');
      return;
    }

    onSubmit({
      resumeFile,
      jobTitle,
      company,
      jobDescription
    });
  };

  return (
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
  );
};

export default UploadResumeForm;
