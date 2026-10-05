export type UserRole = 'student' | 'restaurant' | 'admin';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  college: string;
  collegeCity: string;
  degree: string;
  gradYear: number;
  instagramHandle: string;
  instagramUrl?: string;
  youtubeHandle?: string;
  followersCount: number; // e.g. 4800 (must be >= 2000 for Jiffy)
  engagementRate: number; // e.g. 5.4%
  niches: string[]; // e.g. ['Cafe Aesthetic', 'Budget Street Food', 'Dessert & Bakes']
  upiId: string; // e.g. 'ananya@okhdfcbank'
  phone: string;
  collegeIdVerified: boolean;
  socialVerified: boolean;
  jiffyTier: 'Rookie Foodie' | 'Pro Foodie' | 'Elite Creator';
  jiffyMemberSince: string;
  completedGigsCount: number;
  totalEarnings: number; // in INR ₹
  bio: string;
  sampleReels: {
    title: string;
    views: string;
    url: string;
    thumbnail: string;
  }[];
}

export interface RestaurantProfile {
  id: string;
  name: string;
  email: string;
  brandName: string;
  tagline: string;
  cuisine: string[];
  neighborhood: string; // e.g. 'Koramangala 5th Block', 'Indiranagar 100ft Road'
  city: string; // 'Bengaluru'
  address: string;
  googleMapsUrl?: string;
  logoUrl: string;
  coverUrl: string;
  rating: number; // e.g. 4.7
  reviewCount: number;
  isVerified: boolean;
  totalGigsHosted: number;
  totalCreatorsPaid: number;
  totalSpend: number; // in INR ₹
  contactPerson: string;
  phone: string;
}

export interface Gig {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantLogo: string;
  restaurantCover: string;
  neighborhood: string;
  city: string;
  title: string;
  cuisine: string;
  description: string;
  freeMealValue: number; // e.g. 1500 (Free meal for 2)
  cashReward: number; // e.g. 1000 (Cash via UPI)
  deliverables: string[]; // e.g. ['1 Aesthetic Reel (30-45s)', '2 IG Stories with Tag & Geotag']
  minFollowers: number; // e.g. 2500
  spotsTotal: number;
  spotsLeft: number;
  dietaryTags: string[]; // e.g. ['Pure Veg', 'Must-Try Pizzas', 'Cozy Cafe']
  status: 'active' | 'paused' | 'completed';
  createdAt: string;
  deadline: string;
  guidelines: string[];
}

export type ApplicationStatus =
  | 'applied'
  | 'shortlisted'
  | 'invited'
  | 'visited'
  | 'proof_submitted'
  | 'approved'
  | 'paid'
  | 'rejected';

export interface Application {
  id: string;
  gigId: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentCollege: string;
  studentFollowers: number;
  studentEngagement: number;
  status: ApplicationStatus;
  pitchNote: string;
  appliedAt: string;
  scheduledVisitDate?: string;
  voucherCode?: string; // Generated check-in token for restaurant counter
  proof?: ProofSubmission;
  payout?: PayoutRecord;
  restaurantRating?: number;
  restaurantFeedback?: string;
  studentRating?: number;
  studentFeedback?: string;
}

export interface ProofSubmission {
  id: string;
  applicationId: string;
  postUrl: string;
  platform: 'instagram_reel' | 'instagram_story' | 'youtube_short';
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  screenshotUrl: string;
  creatorNotes: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'revision_requested';
  revisionNote?: string;
}

export interface PayoutRecord {
  id: string;
  applicationId: string;
  gigId: string;
  gigTitle: string;
  studentId: string;
  studentName: string;
  restaurantName: string;
  amount: number; // ₹
  upiId: string;
  status: 'pending' | 'processing' | 'paid';
  utrNumber?: string; // UPI transaction reference
  initiatedAt: string;
  paidAt?: string;
}

export interface MarketplaceStats {
  activeCreators: number;
  verifiedRestaurants: number;
  totalGigsListed: number;
  totalGigsCompleted: number;
  totalPaidOutINR: number;
  totalImpressionsGenerated: number;
}
