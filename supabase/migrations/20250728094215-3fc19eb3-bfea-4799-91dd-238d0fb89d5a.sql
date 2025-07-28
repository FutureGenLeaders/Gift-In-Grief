-- Create the missing update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create system_managers table (admin users with generic naming)
CREATE TABLE public.system_managers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'system_operator',
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create healing_sessions table for video content management
CREATE TABLE public.healing_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL, -- minutes
  emotion TEXT NOT NULL,
  loss_type TEXT NOT NULL,
  tier_level TEXT NOT NULL,
  video_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft', -- draft, published
  order_index INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES public.system_managers(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_sessions table to track user progress
CREATE TABLE public.user_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  session_id UUID REFERENCES public.healing_sessions(id),
  completed_at TIMESTAMP WITH TIME ZONE,
  progress_percentage INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for videos
INSERT INTO storage.buckets (id, name, public) VALUES ('videos', 'videos', false);

-- Enable RLS on all tables
ALTER TABLE public.system_managers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.healing_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check system operator role
CREATE OR REPLACE FUNCTION public.is_system_operator()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.system_managers 
    WHERE email = auth.jwt() ->> 'email' 
    AND role = 'system_operator' 
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- RLS Policies for system_managers (only system operators can access)
CREATE POLICY "System operators can view all managers" 
ON public.system_managers FOR SELECT 
USING (public.is_system_operator());

CREATE POLICY "System operators can manage all managers" 
ON public.system_managers FOR ALL 
USING (public.is_system_operator());

-- RLS Policies for healing_sessions (only system operators can manage)
CREATE POLICY "System operators can view all sessions" 
ON public.healing_sessions FOR SELECT 
USING (public.is_system_operator());

CREATE POLICY "System operators can manage all sessions" 
ON public.healing_sessions FOR ALL 
USING (public.is_system_operator());

-- RLS Policies for user_sessions (system operators can view all, users can view their own)
CREATE POLICY "System operators can view all user sessions" 
ON public.user_sessions FOR SELECT 
USING (public.is_system_operator());

CREATE POLICY "Users can view their own sessions" 
ON public.user_sessions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sessions" 
ON public.user_sessions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" 
ON public.user_sessions FOR UPDATE 
USING (auth.uid() = user_id);

-- Storage policies for videos (only system operators)
CREATE POLICY "System operators can view all videos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'videos' AND public.is_system_operator());

CREATE POLICY "System operators can upload videos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'videos' AND public.is_system_operator());

CREATE POLICY "System operators can update videos" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'videos' AND public.is_system_operator());

CREATE POLICY "System operators can delete videos" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'videos' AND public.is_system_operator());

-- Create triggers for updating timestamps
CREATE TRIGGER update_system_managers_updated_at
BEFORE UPDATE ON public.system_managers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_healing_sessions_updated_at
BEFORE UPDATE ON public.healing_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial system operator (you can change this email)
INSERT INTO public.system_managers (email, name, role) 
VALUES ('admin@futuregen.com', 'System Administrator', 'system_operator');

-- Create indexes for performance
CREATE INDEX idx_healing_sessions_status ON public.healing_sessions(status);
CREATE INDEX idx_healing_sessions_emotion ON public.healing_sessions(emotion);
CREATE INDEX idx_healing_sessions_tier_level ON public.healing_sessions(tier_level);
CREATE INDEX idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX idx_system_managers_email ON public.system_managers(email);