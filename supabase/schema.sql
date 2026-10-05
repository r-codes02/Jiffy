-- Jiffy Database Schema (Supabase / PostgreSQL)
-- Marketplace connecting Indian college student micro-influencers with local restaurants

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Student Profiles Table
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar_url TEXT,
    college VARCHAR(255) NOT NULL,
    college_city VARCHAR(100) DEFAULT 'Bengaluru',
    degree VARCHAR(100),
    grad_year INT,
    instagram_handle VARCHAR(100) NOT NULL,
    followers_count INT NOT NULL CHECK (followers_count >= 2000),
    engagement_rate NUMERIC(4,2) DEFAULT 4.5,
    niches TEXT[] DEFAULT ARRAY['Cafe Aesthetic', 'Food Review'],
    upi_id VARCHAR(100),
    phone VARCHAR(20),
    college_id_verified BOOLEAN DEFAULT FALSE,
    social_verified BOOLEAN DEFAULT FALSE,
    jiffy_tier VARCHAR(50) DEFAULT 'Rookie Foodie',
    completed_gigs_count INT DEFAULT 0,
    total_earnings NUMERIC(10,2) DEFAULT 0.00,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Restaurant Profiles Table
CREATE TABLE IF NOT EXISTS public.restaurants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    brand_name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255),
    tagline TEXT,
    cuisine TEXT[] NOT NULL,
    neighborhood VARCHAR(150) NOT NULL,
    city VARCHAR(100) DEFAULT 'Bengaluru',
    address TEXT NOT NULL,
    google_maps_url TEXT,
    logo_url TEXT,
    cover_url TEXT,
    rating NUMERIC(3,2) DEFAULT 4.8,
    is_verified BOOLEAN DEFAULT FALSE,
    total_gigs_hosted INT DEFAULT 0,
    total_spend NUMERIC(10,2) DEFAULT 0.00,
    contact_person VARCHAR(150),
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Food Review Gigs Table
CREATE TABLE IF NOT EXISTS public.gigs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    cuisine VARCHAR(100) NOT NULL,
    neighborhood VARCHAR(150) NOT NULL,
    city VARCHAR(100) DEFAULT 'Bengaluru',
    free_meal_value NUMERIC(8,2) NOT NULL,
    cash_reward NUMERIC(8,2) NOT NULL,
    deliverables TEXT[] NOT NULL,
    min_followers INT DEFAULT 2000,
    spots_total INT NOT NULL,
    spots_left INT NOT NULL,
    dietary_tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
    deadline DATE,
    guidelines TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Applications Table
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gig_id UUID REFERENCES public.gigs(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'applied' CHECK (
        status IN ('applied', 'shortlisted', 'invited', 'visited', 'proof_submitted', 'approved', 'paid', 'rejected')
    ),
    pitch_note TEXT,
    voucher_code VARCHAR(50),
    scheduled_visit_date DATE,
    restaurant_rating INT CHECK (restaurant_rating BETWEEN 1 AND 5),
    restaurant_feedback TEXT,
    student_rating INT CHECK (student_rating BETWEEN 1 AND 5),
    student_feedback TEXT,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Proof Submissions Table
CREATE TABLE IF NOT EXISTS public.proof_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
    post_url TEXT NOT NULL,
    platform VARCHAR(50) DEFAULT 'instagram_reel',
    views_count INT DEFAULT 0,
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    screenshot_url TEXT,
    creator_notes TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'revision_requested')),
    revision_note TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Payout Records Table
CREATE TABLE IF NOT EXISTS public.payouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
    amount NUMERIC(8,2) NOT NULL,
    upi_id VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'paid')),
    utr_number VARCHAR(100),
    initiated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    paid_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gigs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proof_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;

-- Public Read Policies (for Discover feed)
CREATE POLICY "Public gigs are viewable by everyone" ON public.gigs FOR SELECT USING (true);
CREATE POLICY "Restaurants are viewable by everyone" ON public.restaurants FOR SELECT USING (true);
CREATE POLICY "Student profiles are viewable by logged in users" ON public.students FOR SELECT USING (true);
