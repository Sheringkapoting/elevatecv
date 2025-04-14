
-- Create profiles table to store user information
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT NOT NULL DEFAULT 'free',
  subscription_end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- Create policy for users to update their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Create policy to automatically create profile on signup
CREATE POLICY "New users can create their profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create resumes table
CREATE TABLE public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own resumes
CREATE POLICY "Users can view own resumes" 
ON public.resumes FOR SELECT 
USING (auth.uid() = user_id);

-- Create policy for users to insert their own resumes
CREATE POLICY "Users can create own resumes" 
ON public.resumes FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own resumes
CREATE POLICY "Users can update own resumes" 
ON public.resumes FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policy for users to delete their own resumes
CREATE POLICY "Users can delete own resumes" 
ON public.resumes FOR DELETE 
USING (auth.uid() = user_id);

-- Create job_descriptions table
CREATE TABLE public.job_descriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  company TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.job_descriptions ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own job descriptions
CREATE POLICY "Users can view own job descriptions" 
ON public.job_descriptions FOR SELECT 
USING (auth.uid() = user_id);

-- Create policy for users to insert their own job descriptions
CREATE POLICY "Users can create own job descriptions" 
ON public.job_descriptions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own job descriptions
CREATE POLICY "Users can update own job descriptions" 
ON public.job_descriptions FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policy for users to delete their own job descriptions
CREATE POLICY "Users can delete own job descriptions" 
ON public.job_descriptions FOR DELETE 
USING (auth.uid() = user_id);

-- Create analysis_results table
CREATE TABLE public.analysis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  resume_id UUID REFERENCES public.resumes NOT NULL,
  job_description_id UUID REFERENCES public.job_descriptions NOT NULL,
  ats_score INTEGER NOT NULL,
  keyword_score INTEGER NOT NULL,
  formatting_score INTEGER NOT NULL,
  content_score INTEGER NOT NULL,
  suggestions JSONB,
  enhanced_resume_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own analysis results
CREATE POLICY "Users can view own analysis results" 
ON public.analysis_results FOR SELECT 
USING (auth.uid() = user_id);

-- Create policy for users to insert their own analysis results
CREATE POLICY "Users can create own analysis results" 
ON public.analysis_results FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own analysis results
CREATE POLICY "Users can update own analysis results" 
ON public.analysis_results FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policy for users to delete their own analysis results
CREATE POLICY "Users can delete own analysis results" 
ON public.analysis_results FOR DELETE 
USING (auth.uid() = user_id);

-- Create feedback table
CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comments TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own feedback
CREATE POLICY "Users can view own feedback" 
ON public.feedback FOR SELECT 
USING (auth.uid() = user_id);

-- Create policy for users to insert feedback
CREATE POLICY "Users can create feedback" 
ON public.feedback FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false);

-- Create storage policy to allow users to upload their own resumes
CREATE POLICY "Users can upload their own resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes' AND auth.uid()::TEXT = (storage.foldername(name))[1]);

-- Create storage policy to allow users to read their own resumes
CREATE POLICY "Users can read their own resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes' AND auth.uid()::TEXT = (storage.foldername(name))[1]);

-- Create storage policy to allow users to update their own resumes
CREATE POLICY "Users can update their own resumes"
ON storage.objects FOR UPDATE
USING (bucket_id = 'resumes' AND auth.uid()::TEXT = (storage.foldername(name))[1]);

-- Create storage policy to allow users to delete their own resumes
CREATE POLICY "Users can delete their own resumes"
ON storage.objects FOR DELETE
USING (bucket_id = 'resumes' AND auth.uid()::TEXT = (storage.foldername(name))[1]);

-- Create storage bucket for enhanced resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('enhanced_resumes', 'enhanced_resumes', false);

-- Create storage policy to allow users to read their own enhanced resumes
CREATE POLICY "Users can read their own enhanced resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'enhanced_resumes' AND auth.uid()::TEXT = (storage.foldername(name))[1]);
