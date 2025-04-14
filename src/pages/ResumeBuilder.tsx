
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/Navigation';
import { Plus, Trash2, Download, Save, Phone, Mail, MapPin, GraduationCap, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

interface EducationItem {
  id: string;
  school: string;
  degree: string;
  date: string;
  description: string;
}

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  date: string;
  description: string;
}

interface SkillItem {
  id: string;
  name: string;
}

const ResumeBuilder = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  });

  const [education, setEducation] = useState<EducationItem[]>([
    { id: '1', school: '', degree: '', date: '', description: '' }
  ]);

  const [experience, setExperience] = useState<ExperienceItem[]>([
    { id: '1', company: '', position: '', date: '', description: '' }
  ]);

  const [skills, setSkills] = useState<SkillItem[]>([
    { id: '1', name: '' }
  ]);

  // Handle personal info changes
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new education item
  const addEducation = () => {
    setEducation(prev => [
      ...prev,
      { id: Date.now().toString(), school: '', degree: '', date: '', description: '' }
    ]);
  };

  // Update education item
  const updateEducation = (id: string, field: string, value: string) => {
    setEducation(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Remove education item
  const removeEducation = (id: string) => {
    if (education.length === 1) {
      toast.error("You must have at least one education entry");
      return;
    }
    setEducation(prev => prev.filter(item => item.id !== id));
  };

  // Add new experience item
  const addExperience = () => {
    setExperience(prev => [
      ...prev,
      { id: Date.now().toString(), company: '', position: '', date: '', description: '' }
    ]);
  };

  // Update experience item
  const updateExperience = (id: string, field: string, value: string) => {
    setExperience(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Remove experience item
  const removeExperience = (id: string) => {
    if (experience.length === 1) {
      toast.error("You must have at least one experience entry");
      return;
    }
    setExperience(prev => prev.filter(item => item.id !== id));
  };

  // Add new skill
  const addSkill = () => {
    setSkills(prev => [
      ...prev,
      { id: Date.now().toString(), name: '' }
    ]);
  };

  // Update skill
  const updateSkill = (id: string, value: string) => {
    setSkills(prev => prev.map(item => 
      item.id === id ? { ...item, name: value } : item
    ));
  };

  // Remove skill
  const removeSkill = (id: string) => {
    if (skills.length === 1) {
      toast.error("You must have at least one skill");
      return;
    }
    setSkills(prev => prev.filter(item => item.id !== id));
  };

  const saveResume = () => {
    toast.success("Resume saved successfully!");
  };

  const downloadResume = () => {
    toast.success("Resume downloaded as PDF!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Builder</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Build a professional resume tailored to your target job. Our templates are optimized for ATS systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <div className="space-y-6">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Build Your Resume</CardTitle>
                  <CardDescription>
                    Fill out the sections below to create your resume
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="grid grid-cols-4">
                      <TabsTrigger value="personal">Personal</TabsTrigger>
                      <TabsTrigger value="education">Education</TabsTrigger>
                      <TabsTrigger value="experience">Experience</TabsTrigger>
                      <TabsTrigger value="skills">Skills</TabsTrigger>
                    </TabsList>
                    
                    {/* Personal Info Tab */}
                    <TabsContent value="personal" className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            placeholder="John Doe" 
                            value={personalInfo.name} 
                            onChange={handlePersonalInfoChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="title">Professional Title</Label>
                          <Input 
                            id="title" 
                            name="title" 
                            placeholder="Software Engineer" 
                            value={personalInfo.title} 
                            onChange={handlePersonalInfoChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            placeholder="john.doe@example.com" 
                            value={personalInfo.email} 
                            onChange={handlePersonalInfoChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            placeholder="(123) 456-7890" 
                            value={personalInfo.phone} 
                            onChange={handlePersonalInfoChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input 
                            id="location" 
                            name="location" 
                            placeholder="New York, NY" 
                            value={personalInfo.location} 
                            onChange={handlePersonalInfoChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="summary">Professional Summary</Label>
                          <Textarea 
                            id="summary" 
                            name="summary" 
                            placeholder="Briefly describe your background and strengths..." 
                            className="h-32" 
                            value={personalInfo.summary} 
                            onChange={handlePersonalInfoChange}
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    {/* Education Tab */}
                    <TabsContent value="education" className="space-y-6">
                      {education.map((item, index) => (
                        <div key={item.id} className="p-4 border rounded-md space-y-3">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">Education #{index + 1}</h3>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removeEducation(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div>
                            <Label htmlFor={`school-${item.id}`}>School/University</Label>
                            <Input 
                              id={`school-${item.id}`}
                              value={item.school}
                              onChange={(e) => updateEducation(item.id, 'school', e.target.value)}
                              placeholder="University Name"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`degree-${item.id}`}>Degree & Major</Label>
                            <Input 
                              id={`degree-${item.id}`}
                              value={item.degree}
                              onChange={(e) => updateEducation(item.id, 'degree', e.target.value)}
                              placeholder="Bachelor of Science in Computer Science"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`eduDate-${item.id}`}>Dates</Label>
                            <Input 
                              id={`eduDate-${item.id}`}
                              value={item.date}
                              onChange={(e) => updateEducation(item.id, 'date', e.target.value)}
                              placeholder="Aug 2015 - May 2019"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`eduDesc-${item.id}`}>Description/Achievements</Label>
                            <Textarea 
                              id={`eduDesc-${item.id}`}
                              value={item.description}
                              onChange={(e) => updateEducation(item.id, 'description', e.target.value)}
                              placeholder="GPA, honors, relevant coursework, etc."
                            />
                          </div>
                        </div>
                      ))}
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full" 
                        onClick={addEducation}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Education
                      </Button>
                    </TabsContent>
                    
                    {/* Experience Tab */}
                    <TabsContent value="experience" className="space-y-6">
                      {experience.map((item, index) => (
                        <div key={item.id} className="p-4 border rounded-md space-y-3">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">Experience #{index + 1}</h3>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removeExperience(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div>
                            <Label htmlFor={`company-${item.id}`}>Company</Label>
                            <Input 
                              id={`company-${item.id}`}
                              value={item.company}
                              onChange={(e) => updateExperience(item.id, 'company', e.target.value)}
                              placeholder="Company Name"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`position-${item.id}`}>Position</Label>
                            <Input 
                              id={`position-${item.id}`}
                              value={item.position}
                              onChange={(e) => updateExperience(item.id, 'position', e.target.value)}
                              placeholder="Software Engineer"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`expDate-${item.id}`}>Dates</Label>
                            <Input 
                              id={`expDate-${item.id}`}
                              value={item.date}
                              onChange={(e) => updateExperience(item.id, 'date', e.target.value)}
                              placeholder="Jan 2020 - Present"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`expDesc-${item.id}`}>Responsibilities & Achievements</Label>
                            <Textarea 
                              id={`expDesc-${item.id}`}
                              value={item.description}
                              onChange={(e) => updateExperience(item.id, 'description', e.target.value)}
                              placeholder="• Developed features that increased user engagement by 25%..."
                              className="h-32"
                            />
                          </div>
                        </div>
                      ))}
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full" 
                        onClick={addExperience}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Experience
                      </Button>
                    </TabsContent>
                    
                    {/* Skills Tab */}
                    <TabsContent value="skills" className="space-y-4">
                      <p className="text-sm text-gray-500 mb-2">
                        Add skills that are relevant to the position you're applying for.
                      </p>
                      <div className="space-y-3">
                        {skills.map((skill, index) => (
                          <div key={skill.id} className="flex gap-2">
                            <Input
                              value={skill.name}
                              onChange={(e) => updateSkill(skill.id, e.target.value)}
                              placeholder={`Skill ${index + 1} (e.g., React, Project Management)`}
                              className="flex-1"
                            />
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removeSkill(skill.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="w-full" 
                          onClick={addSkill}
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add Skill
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    Reset
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={saveResume}>
                      <Save className="h-4 w-4 mr-2" /> Save
                    </Button>
                    <Button onClick={downloadResume}>
                      <Download className="h-4 w-4 mr-2" /> Download PDF
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          {/* Resume Preview */}
          <div className="lg:col-span-7">
            <h3 className="text-lg font-medium mb-4">Resume Preview</h3>
            <div className="bg-white shadow-md resume-paper overflow-auto p-8 min-h-[1056px] w-full" style={{ maxHeight: '800px' }}>
              <div className="mb-6 pb-4 border-b-2 border-gray-800">
                <h1 className="text-3xl font-bold text-brand-700">
                  {personalInfo.name || 'Your Name'}
                </h1>
                <p className="text-lg text-gray-600">{personalInfo.title || 'Professional Title'}</p>
                <div className="flex flex-wrap mt-2 text-sm text-gray-600">
                  {personalInfo.email && (
                    <div className="flex items-center mr-4 mb-1">
                      <Mail className="h-4 w-4 mr-1" />
                      <span>{personalInfo.email}</span>
                    </div>
                  )}
                  {personalInfo.phone && (
                    <div className="flex items-center mr-4 mb-1">
                      <Phone className="h-4 w-4 mr-1" />
                      <span>{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center mr-4 mb-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{personalInfo.location}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {personalInfo.summary && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-brand-700 mb-2">Summary</h2>
                  <p className="text-gray-700">{personalInfo.summary}</p>
                </div>
              )}
              
              {/* Experience Section */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-brand-700 mb-3 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Professional Experience
                </h2>
                {experience.some(exp => exp.company || exp.position) ? (
                  experience
                    .filter(exp => exp.company || exp.position)
                    .map((exp, index) => (
                      <div key={exp.id} className={`mb-4 ${index !== experience.length - 1 ? 'pb-4 border-b border-gray-200' : ''}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-800">{exp.position || 'Position'}</h3>
                            <p className="text-gray-600">{exp.company || 'Company Name'}</p>
                          </div>
                          <p className="text-sm text-gray-500">{exp.date || 'Date Range'}</p>
                        </div>
                        {exp.description && (
                          <p className="mt-2 text-gray-700 whitespace-pre-line">{exp.description}</p>
                        )}
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500 italic">Add your professional experience</p>
                )}
              </div>
              
              {/* Education Section */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-brand-700 mb-3 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Education
                </h2>
                {education.some(edu => edu.school || edu.degree) ? (
                  education
                    .filter(edu => edu.school || edu.degree)
                    .map((edu, index) => (
                      <div key={edu.id} className={`mb-4 ${index !== education.length - 1 ? 'pb-4 border-b border-gray-200' : ''}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-800">{edu.school || 'School/University'}</h3>
                            <p className="text-gray-600">{edu.degree || 'Degree'}</p>
                          </div>
                          <p className="text-sm text-gray-500">{edu.date || 'Date Range'}</p>
                        </div>
                        {edu.description && (
                          <p className="mt-2 text-gray-700">{edu.description}</p>
                        )}
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500 italic">Add your education</p>
                )}
              </div>
              
              {/* Skills Section */}
              <div>
                <h2 className="text-xl font-semibold text-brand-700 mb-3">Skills</h2>
                {skills.some(skill => skill.name) ? (
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter(skill => skill.name)
                      .map(skill => (
                        <span 
                          key={skill.id} 
                          className="px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-sm"
                        >
                          {skill.name}
                        </span>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Add your skills</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
