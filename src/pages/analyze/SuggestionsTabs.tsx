
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface SuggestionsTabsProps {
  suggestions: {
    keywords: string[];
    formatting: string[];
    content: string[];
  };
  onAnalyzeAnother: () => void;
  onEnhanceResume: () => void;
  isEnhancing: boolean;
}

const SuggestionsTabs: React.FC<SuggestionsTabsProps> = ({ 
  suggestions, 
  onAnalyzeAnother, 
  onEnhanceResume,
  isEnhancing 
}) => {
  return (
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
              {suggestions.keywords.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="formatting" className="space-y-4 pt-4">
            <ul className="list-disc pl-5 space-y-2">
              {suggestions.formatting.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4 pt-4">
            <ul className="list-disc pl-5 space-y-2">
              {suggestions.content.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onAnalyzeAnother}>
          Analyze Another Resume
        </Button>
        <Button onClick={onEnhanceResume} disabled={isEnhancing}>
          {isEnhancing ? "Enhancing..." : "Enhance Resume (Premium)"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SuggestionsTabs;
