
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface AnalysisResultCardProps {
  ats_score: number;
  keyword_score: number;
  formatting_score: number;
  content_score: number;
}

const AnalysisResultCard: React.FC<AnalysisResultCardProps> = ({ 
  ats_score, 
  keyword_score, 
  formatting_score, 
  content_score 
}) => {
  return (
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
            <span className="font-semibold">{ats_score}%</span>
          </div>
          <Progress value={ats_score} className="h-2" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Keywords</span>
              <span>{keyword_score}%</span>
            </div>
            <Progress value={keyword_score} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Formatting</span>
              <span>{formatting_score}%</span>
            </div>
            <Progress value={formatting_score} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Content</span>
              <span>{content_score}%</span>
            </div>
            <Progress value={content_score} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisResultCard;
