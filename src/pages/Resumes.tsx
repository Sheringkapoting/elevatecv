
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Upload, FileText, Download, Edit, Trash2, Share2, Plus } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Resume {
  id: string;
  name: string;
  lastUpdated: string;
  atsScore: number;
  jobTitle: string;
  thumbnail: string;
}

const dummyResumes: Resume[] = [
  {
    id: '1',
    name: 'Software Engineer Resume',
    lastUpdated: '2 days ago',
    atsScore: 85,
    jobTitle: 'Software Engineer',
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=150&h=200&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Product Manager Resume',
    lastUpdated: '1 week ago',
    atsScore: 72,
    jobTitle: 'Product Manager',
    thumbnail: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?q=80&w=150&h=200&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Data Scientist Resume',
    lastUpdated: '3 weeks ago',
    atsScore: 92,
    jobTitle: 'Data Scientist',
    thumbnail: 'https://images.unsplash.com/photo-1586281380615-76269a47ebf3?q=80&w=150&h=200&auto=format&fit=crop'
  }
];

const Resumes = () => {
  const [resumes, setResumes] = useState<Resume[]>(dummyResumes);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResumes = resumes.filter(resume => 
    resume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resume.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditResume = (id: string) => {
    toast.success("Opening resume editor");
    // We would navigate to the builder with the selected resume ID in a real app
  };

  const handleDeleteResume = (id: string) => {
    setResumes(prev => prev.filter(resume => resume.id !== id));
    toast.success("Resume deleted successfully");
  };

  const handleDownloadResume = (id: string) => {
    toast.success("Resume downloaded as PDF");
  };

  const handleShareResume = (id: string) => {
    toast.success("Resume sharing link copied to clipboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Resumes</h1>
            <p className="text-gray-600">
              Manage, edit and track the performance of your resumes
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex">
            <Button 
              className="flex items-center" 
              onClick={() => toast.success("Navigating to Resume Builder")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Resume
            </Button>
          </div>
        </div>

        <Card className="shadow-md">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Your Resume Collection</CardTitle>
                <CardDescription>
                  {resumes.length} {resumes.length === 1 ? 'resume' : 'resumes'} in your collection
                </CardDescription>
              </div>
              <div className="mt-4 md:mt-0 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search resumes..." 
                  className="pl-9 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="grid" className="w-full">
              <div className="flex justify-end mb-6">
                <TabsList>
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </div>

              {/* Grid View */}
              <TabsContent value="grid">
                {filteredResumes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredResumes.map((resume) => (
                      <div key={resume.id} className="border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow">
                        <div className="h-48 bg-gray-100 relative flex justify-center items-center">
                          {resume.thumbnail ? (
                            <img 
                              src={resume.thumbnail} 
                              alt={resume.name} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <FileText className="h-12 w-12 text-gray-400" />
                          )}
                          <Badge 
                            className={`absolute top-3 right-3 ${
                              resume.atsScore >= 80 ? 'bg-green-500' : 
                              resume.atsScore >= 70 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                          >
                            ATS Score: {resume.atsScore}%
                          </Badge>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900 truncate">{resume.name}</h3>
                          <p className="text-sm text-gray-500 mb-3">
                            For: {resume.jobTitle} • Updated {resume.lastUpdated}
                          </p>
                          <div className="flex justify-between">
                            <Button variant="outline" size="sm" onClick={() => handleEditResume(resume.id)}>
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" onClick={() => handleShareResume(resume.id)}>
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDownloadResume(resume.id)}>
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteResume(resume.id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No resumes found</h3>
                    <p className="text-gray-500">
                      {searchQuery 
                        ? "No resumes match your search criteria" 
                        : "Create your first resume to get started"}
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* List View */}
              <TabsContent value="list">
                {filteredResumes.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b border-gray-200">
                          <th className="pb-2 font-medium text-gray-600">Name</th>
                          <th className="pb-2 font-medium text-gray-600">Job Title</th>
                          <th className="pb-2 font-medium text-gray-600">ATS Score</th>
                          <th className="pb-2 font-medium text-gray-600">Last Updated</th>
                          <th className="pb-2 text-right font-medium text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredResumes.map((resume) => (
                          <tr key={resume.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center mr-3">
                                  {resume.thumbnail ? (
                                    <img 
                                      src={resume.thumbnail} 
                                      alt={resume.name} 
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <FileText className="h-5 w-5 text-gray-400" />
                                  )}
                                </div>
                                <span className="font-medium text-gray-900">{resume.name}</span>
                              </div>
                            </td>
                            <td className="py-3 text-gray-600">{resume.jobTitle}</td>
                            <td className="py-3">
                              <Badge 
                                className={`${
                                  resume.atsScore >= 80 ? 'bg-green-500' : 
                                  resume.atsScore >= 70 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                              >
                                {resume.atsScore}%
                              </Badge>
                            </td>
                            <td className="py-3 text-gray-500">{resume.lastUpdated}</td>
                            <td className="py-3">
                              <div className="flex justify-end space-x-2">
                                <Button variant="ghost" size="sm" onClick={() => handleEditResume(resume.id)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDownloadResume(resume.id)}>
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleShareResume(resume.id)}>
                                  <Share2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteResume(resume.id)}>
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No resumes found</h3>
                    <p className="text-gray-500">
                      {searchQuery 
                        ? "No resumes match your search criteria" 
                        : "Create your first resume to get started"}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resumes;
