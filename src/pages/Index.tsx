import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Briefcase, AlertCircle, CheckCircle, User, BarChart2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Index = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [atsScore, setAtsScore] = useState(0);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' || file.type.includes('word')) {
        setResumeFile(file);
        toast.success('Resume uploaded successfully');
      } else {
        toast.error('Please upload a PDF or Word document');
      }
    }
  };

  const handleAnalyze = () => {
    if (!resumeFile) {
      toast.error('Please upload your resume first');
      return;
    }

    if (!jobDescription) {
      toast.error('Please enter a job description');
      return;
    }

    setAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisComplete(true);
      // Random score between 60 and 95
      setAtsScore(Math.floor(Math.random() * 36) + 60);
    }, 3000);
  };

  // Suggestions based on mock analysis
  const suggestions = [
    { 
      type: 'keyword', 
      title: 'Missing Keywords', 
      details: 'Your resume is missing key terms: "React", "TypeScript", and "API Development"',
      icon: <AlertCircle className="text-amber-500" />
    },
    { 
      type: 'format', 
      title: 'Improve Formatting', 
      details: 'Use bullet points for achievements and quantify results with numbers',
      icon: <FileText className="text-blue-500" />
    },
    { 
      type: 'content', 
      title: 'Add Certifications', 
      details: 'Consider adding relevant certifications to strengthen your profile',
      icon: <User className="text-indigo-500" />
    },
    { 
      type: 'match', 
      title: 'Strong Skills Match', 
      details: 'Your "project management" and "agile" skills align well with requirements',
      icon: <CheckCircle className="text-green-500" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Analyzer</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Optimize your resume for Applicant Tracking Systems (ATS) and increase your chances of getting an interview.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Analyze Your Resume</CardTitle>
                <CardDescription>
                  Upload your resume and provide a job description to analyze compatibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upload">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload Resume</TabsTrigger>
                    <TabsTrigger value="job-desc">Job Description</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="space-y-4">
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-10 h-10 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PDF or DOCX up to 10MB</p>
                        </div>
                        {resumeFile && (
                          <div className="flex items-center space-x-2 text-gray-700 mt-2">
                            <FileText className="w-5 h-5" />
                            <span className="text-sm">{resumeFile.name}</span>
                          </div>
                        )}
                        <input id="dropzone-file" type="file" className="hidden" onChange={handleResumeUpload} accept=".pdf,.doc,.docx" />
                      </label>
                    </div>
                  </TabsContent>
                  <TabsContent value="job-desc" className="space-y-4">
                    <div>
                      <label htmlFor="job-description" className="block text-sm font-medium text-gray-700">
                        Paste the Job Description
                      </label>
                      <Textarea
                        id="job-description"
                        placeholder="Paste the job posting here..."
                        className="mt-1 h-72"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => {
                  setResumeFile(null);
                  setJobDescription('');
                  setAnalysisComplete(false);
                }}>
                  Reset
                </Button>
                <Button disabled={!resumeFile || !jobDescription || analyzing} onClick={handleAnalyze}>
                  {analyzing ? 'Analyzing...' : 'Analyze Resume'}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-md h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5" />
                  ATS Compatibility Score
                </CardTitle>
                <CardDescription>
                  See how well your resume matches the job requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {analysisComplete ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="relative inline-flex justify-center items-center w-32 h-32 rounded-full bg-gray-100 mb-3">
                        <svg className="w-32 h-32 -rotate-90">
                          <circle
                            className="text-gray-200"
                            strokeWidth="12"
                            stroke="currentColor"
                            fill="transparent"
                            r="56"
                            cx="64"
                            cy="64"
                          />
                          <circle
                            className={`${atsScore >= 80 ? 'text-green-500' : atsScore >= 65 ? 'text-amber-500' : 'text-red-500'}`}
                            strokeWidth="12"
                            strokeDasharray={56 * 2 * Math.PI}
                            strokeDashoffset={56 * 2 * Math.PI * (1 - atsScore / 100)}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="56"
                            cx="64"
                            cy="64"
                          />
                        </svg>
                        <span className="absolute text-2xl font-bold">{atsScore}%</span>
                      </div>
                      <p className={`font-semibold ${
                        atsScore >= 80 
                          ? 'text-green-600' 
                          : atsScore >= 65 
                            ? 'text-amber-600' 
                            : 'text-red-600'
                      }`}>
                        {atsScore >= 80 
                          ? 'Excellent Match!' 
                          : atsScore >= 65 
                            ? 'Good Match' 
                            : 'Needs Improvement'}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Briefcase className="mr-2 h-4 w-4" />
                        Key Suggestions
                      </h3>
                      <div className="space-y-3">
                        {suggestions.map((suggestion, index) => (
                          <div key={index} className="flex p-3 bg-white rounded-md border">
                            <div className="mr-3 mt-0.5">
                              {suggestion.icon}
                            </div>
                            <div>
                              <h4 className="font-medium text-sm text-gray-900">{suggestion.title}</h4>
                              <p className="text-xs text-gray-600">{suggestion.details}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center space-y-4 text-gray-500">
                    {analyzing ? (
                      <>
                        <div className="w-full space-y-2">
                          <div className="text-center mb-2">Analyzing your resume...</div>
                          <Progress value={45} className="h-2" />
                        </div>
                      </>
                    ) : (
                      <>
                        <BarChart2 className="h-12 w-12 text-gray-400" />
                        <p>Upload your resume and job description to see your ATS compatibility score.</p>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
