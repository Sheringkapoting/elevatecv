
export interface AnalysisResultDisplay {
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
