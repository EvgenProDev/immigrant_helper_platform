-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create forum categories table
CREATE TABLE public.forum_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on forum categories (readable by everyone)
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone" 
ON public.forum_categories 
FOR SELECT 
USING (true);

-- Create forum posts table
CREATE TABLE public.forum_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.forum_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on forum posts
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts are viewable by everyone" 
ON public.forum_posts 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create posts" 
ON public.forum_posts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" 
ON public.forum_posts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" 
ON public.forum_posts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create forum comments table
CREATE TABLE public.forum_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on forum comments
ALTER TABLE public.forum_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments are viewable by everyone" 
ON public.forum_comments 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create comments" 
ON public.forum_comments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" 
ON public.forum_comments 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" 
ON public.forum_comments 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_forum_posts_updated_at
  BEFORE UPDATE ON public.forum_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_forum_comments_updated_at
  BEFORE UPDATE ON public.forum_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'display_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default forum categories
INSERT INTO public.forum_categories (name, description, icon, color) VALUES
('Express Entry', 'Discussions about Federal Skilled Worker, Canadian Experience Class, and Provincial Nominee Programs', 'Zap', 'hsl(220, 90%, 56%)'),
('Family Sponsorship', 'Questions and experiences about sponsoring family members', 'Heart', 'hsl(280, 100%, 70%)'),
('Student Visas', 'Information about study permits and student experiences', 'GraduationCap', 'hsl(142, 76%, 36%)'),
('Work Permits', 'Temporary work permits, LMIA, and work-related immigration', 'Briefcase', 'hsl(25, 95%, 53%)'),
('Citizenship', 'Canadian citizenship applications and processes', 'Flag', 'hsl(0, 72%, 51%)'),
('General Discussion', 'General immigration topics and community discussions', 'MessageCircle', 'hsl(210, 40%, 60%)');