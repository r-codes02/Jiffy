import { StudentProfile, RestaurantProfile, Gig, Application, PayoutRecord, MarketplaceStats } from '../types';

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'stud-1',
    name: 'Ananya Sharma',
    email: 'ananya.s@christuniversity.in',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    college: 'Christ (Deemed to be University)',
    collegeCity: 'Bengaluru',
    degree: 'BBA in Marketing',
    gradYear: 2026,
    instagramHandle: 'ananyaeats.blr',
    instagramUrl: 'https://instagram.com/ananyaeats.blr',
    youtubeHandle: '@AnanyaVlogsFood',
    followersCount: 4850,
    engagementRate: 5.6,
    niches: ['Cozy Cafes', 'Sourdough & Bakes', 'Aesthetic Brunch', 'Budget College Eats'],
    upiId: 'ananya.sharma@okaxis',
    phone: '+91 98450 12345',
    collegeIdVerified: true,
    socialVerified: true,
    jiffyTier: 'Pro Foodie',
    jiffyMemberSince: 'Aug 2025',
    completedGigsCount: 7,
    totalEarnings: 8250,
    bio: 'Finding the cutest corners & cheesiest pizzas in Bengaluru ✨ DU alum -> Christ Bangalore. 100% honest student reviews.',
    sampleReels: [
      {
        title: 'Hidden French bakery in Indiranagar under ₹300',
        views: '24.8K',
        url: 'https://instagram.com/reel/demo1',
        thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop&q=80'
      },
      {
        title: 'Best Sourdough Pizza in Church Street 🍕',
        views: '18.2K',
        url: 'https://instagram.com/reel/demo2',
        thumbnail: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80'
      },
      {
        title: 'Top 5 late night study cafes with fast WiFi ☕',
        views: '32.1K',
        url: 'https://instagram.com/reel/demo3',
        thumbnail: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'stud-2',
    name: 'Rohan Mehta',
    email: 'rohan.m@rvce.edu.in',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    college: 'RV College of Engineering (RVCE)',
    collegeCity: 'Bengaluru',
    degree: 'B.Tech Computer Science',
    gradYear: 2027,
    instagramHandle: 'rohan_foodtrails',
    followersCount: 3200,
    engagementRate: 6.2,
    niches: ['Biryani & Meat', 'Late Night Bites', 'Burgers & Shakes'],
    upiId: 'rohan.mehta@oksbi',
    phone: '+91 97110 88231',
    collegeIdVerified: true,
    socialVerified: true,
    jiffyTier: 'Rookie Foodie',
    jiffyMemberSince: 'Jan 2026',
    completedGigsCount: 3,
    totalEarnings: 3400,
    bio: 'Engineer by day, food content creator by dusk. Obsessed with juicy smash burgers and authentic Donne biryani.',
    sampleReels: [
      {
        title: 'Testing every double patty smash burger in Koramangala',
        views: '15.4K',
        url: 'https://instagram.com/reel/demo4',
        thumbnail: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'stud-3',
    name: 'Tanvi Deshmukh',
    email: 'tanvi.d@sju.edu.in',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
    college: "St. Joseph's University",
    collegeCity: 'Bengaluru',
    degree: 'BA in Media & Journalism',
    gradYear: 2025,
    instagramHandle: 'tanvifooddiaries',
    followersCount: 8900,
    engagementRate: 4.9,
    niches: ['Fine Dining', 'Pan-Asian & Dimsums', 'Boba & Desserts'],
    upiId: 'tanvi.desh@okhdfcbank',
    phone: '+91 99801 64512',
    collegeIdVerified: true,
    socialVerified: true,
    jiffyTier: 'Elite Creator',
    jiffyMemberSince: 'Nov 2024',
    completedGigsCount: 14,
    totalEarnings: 18900,
    bio: 'Storytelling through aesthetics and flavors 🥟 Indiranagar cafe hopper & matcha fanatic.',
    sampleReels: []
  }
];

export const INITIAL_RESTAURANTS: RestaurantProfile[] = [
  {
    id: 'rest-1',
    name: 'Truffles Bistro & Burgers',
    email: 'partners@trufflesblr.com',
    brandName: 'Truffles Bistro',
    tagline: 'Bengaluru’s favorite comfort burger & shake haven since 2007',
    cuisine: ['Burgers', 'American Comfort', 'Shakes & Steaks'],
    neighborhood: 'Koramangala 5th Block',
    city: 'Bengaluru',
    address: '93/A, Ground Floor, 4th B Cross, 5th Block, Koramangala, Bengaluru, Karnataka 560095',
    googleMapsUrl: 'https://maps.google.com',
    logoUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1000&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 3420,
    isVerified: true,
    totalGigsHosted: 12,
    totalCreatorsPaid: 28,
    totalSpend: 36500,
    contactPerson: 'Vikram Joshi (General Manager)',
    phone: '+91 80 4146 6565'
  },
  {
    id: 'rest-2',
    name: 'Third Wave Coffee',
    email: 'collabs@thirdwavecoffee.in',
    brandName: 'Third Wave Coffee Roasters',
    tagline: 'Artisanal single-origin coffee, sourdough toasties & cozy workspace',
    cuisine: ['Specialty Coffee', 'Bakery', 'Healthy Breakfast'],
    neighborhood: 'Indiranagar 100ft Road',
    city: 'Bengaluru',
    address: '12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    googleMapsUrl: 'https://maps.google.com',
    logoUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewCount: 1850,
    isVerified: true,
    totalGigsHosted: 8,
    totalCreatorsPaid: 16,
    totalSpend: 21000,
    contactPerson: 'Pooja Iyer (Marketing Lead)',
    phone: '+91 80 2521 9901'
  },
  {
    id: 'rest-3',
    name: 'Brik Oven',
    email: 'sharan@brikoven.com',
    brandName: 'Brik Oven Neapolitan',
    tagline: 'Authentic wood-fired sourdough pizzas & handmade burrata',
    cuisine: ['Italian', 'Wood-fired Pizza', 'Artisan Desserts'],
    neighborhood: 'Church Street',
    city: 'Bengaluru',
    address: 'Church St, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001',
    googleMapsUrl: 'https://maps.google.com',
    logoUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1000&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 2290,
    isVerified: true,
    totalGigsHosted: 15,
    totalCreatorsPaid: 32,
    totalSpend: 54000,
    contactPerson: 'Sharan Goyal',
    phone: '+91 80 4112 3445'
  }
];

export const INITIAL_GIGS: Gig[] = [
  {
    id: 'gig-1',
    restaurantId: 'rest-1',
    restaurantName: 'Truffles Bistro',
    restaurantLogo: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&auto=format&fit=crop&q=80',
    restaurantCover: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    neighborhood: 'Koramangala 5th Block',
    city: 'Bengaluru',
    title: 'Launch of New Truffle Butter Smash Burger & Thick Shakes',
    cuisine: 'Burgers & Shakes',
    description: 'We have launched our new artisanal brioche smash burgers! Looking for food enthusiasts with energetic vibes to visit our Koramangala flagship branch and shoot a vibrant 30s Reel.',
    freeMealValue: 1600, // ₹1,600 Free Voucher
    cashReward: 1200, // ₹1,200 Cash via UPI
    deliverables: [
      '1 Instagram Reel (30-45s) with high energy hook and cheese pull',
      '2 IG Stories with tag @trufflesblr and location pin'
    ],
    minFollowers: 2500,
    spotsTotal: 5,
    spotsLeft: 2,
    dietaryTags: ['Non-Veg & Veg Options', 'Hero Burger', 'Student Hangout'],
    status: 'active',
    createdAt: '2026-09-12',
    deadline: '2026-09-30',
    guidelines: [
      'Focus on food presentation and high-quality vertical 4K/60fps video',
      'Mention the new Melted Truffle Butter Glaze in voiceover or captions',
      'Tag @trufflesblr as collaborator or main tag',
      'Show your Jiffy Creator ID to the manager on duty upon arrival'
    ]
  },
  {
    id: 'gig-2',
    restaurantId: 'rest-2',
    restaurantName: 'Third Wave Coffee Roasters',
    restaurantLogo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&auto=format&fit=crop&q=80',
    restaurantCover: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
    neighborhood: 'Indiranagar 100ft Road',
    city: 'Bengaluru',
    title: 'Monsoon Pour-Over & Warm Cinnamon Brioche Reel',
    cuisine: 'Specialty Coffee & Bakes',
    description: 'Come experience our manual brew bar and newly introduced warm monsoon cinnamon rolls. Ideal for lifestyle and cafe creators who love aesthetic cinematography and lo-fi audio.',
    freeMealValue: 1200,
    cashReward: 900,
    deliverables: [
      '1 Aesthetic Lo-Fi Reel (20-30s) featuring barista pour-over and ambiance',
      '1 IG Story review with swipe/profile link'
    ],
    minFollowers: 2000,
    spotsTotal: 4,
    spotsLeft: 1,
    dietaryTags: ['Vegetarian Friendly', 'Aesthetic Decor', 'Specialty Coffee'],
    status: 'active',
    createdAt: '2026-09-14',
    deadline: '2026-09-28',
    guidelines: [
      'Natural light preferred (11am - 4pm visit recommended)',
      'Highlight our specialty bean roast from Chikmagalur estate'
    ]
  },
  {
    id: 'gig-3',
    restaurantId: 'rest-3',
    restaurantName: 'Brik Oven Neapolitan',
    restaurantLogo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80',
    restaurantCover: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    neighborhood: 'Church Street',
    city: 'Bengaluru',
    title: 'Wood-Fired Neapolitan Pizza Experience & Fresh Burrata Bowl',
    cuisine: 'Italian & Wood-Fired Pizza',
    description: 'Looking for creators who appreciate authentic crust fermentation and fresh artisanal cheeses. Enjoy our famous Diavola or Quattro Formaggi plus our signature Nutella Waffle.',
    freeMealValue: 2200,
    cashReward: 1500,
    deliverables: [
      '1 High-production Reel showcasing pizza oven fire and crust bubbling',
      '2 IG Stories with poll sticker ("Would you try this crust?")'
    ],
    minFollowers: 3500,
    spotsTotal: 6,
    spotsLeft: 3,
    dietaryTags: ['Authentic Neapolitan', 'Date Night Vibe', 'Church Street Iconic'],
    status: 'active',
    createdAt: '2026-09-10',
    deadline: '2026-10-05',
    guidelines: [
      'Show the firewood oven and crisp leoparding on pizza crust',
      'Honest tasting reaction on camera'
    ]
  },
  {
    id: 'gig-4',
    restaurantId: 'rest-1',
    restaurantName: 'Meghana Foods',
    restaurantLogo: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=80',
    restaurantCover: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    neighborhood: 'Residency Road',
    city: 'Bengaluru',
    title: 'Spicy Andhra Boneless Biryani & Chilli Paneer Feast',
    cuisine: 'Andhra & Biryani',
    description: 'The legendary taste of Bangalore that every college student swears by. We want honest food creators to capture the unadulterated spicy goodness of our special Boneless Chicken Biryani or Paneer Biryani.',
    freeMealValue: 1400,
    cashReward: 1000,
    deliverables: [
      '1 Reel on "Why Bangalore Students love Meghana Biryani"',
      '1 Story highlighting the salan & raita pairing'
    ],
    minFollowers: 2000,
    spotsTotal: 8,
    spotsLeft: 4,
    dietaryTags: ['Spicy Andhra', 'Student Cult Classic', 'High Protein'],
    status: 'active',
    createdAt: '2026-09-15',
    deadline: '2026-10-08',
    guidelines: [
      'Genuine student experience, mention hearty portion sizes'
    ]
  },
  {
    id: 'gig-5',
    restaurantId: 'rest-2',
    restaurantName: 'Glen’s Bakehouse',
    restaurantLogo: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&auto=format&fit=crop&q=80',
    restaurantCover: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
    neighborhood: 'Lavelle Road',
    city: 'Bengaluru',
    title: 'Mini Red Velvet Cupcakes & Signature Quiche Showcase',
    cuisine: 'European Bakery & Desserts',
    description: 'Capture the cozy cottage vibe of Glen’s Bakehouse. Creators will receive a dessert platter featuring our famous mini red velvet cupcakes plus hot savory quiche of their choice.',
    freeMealValue: 1100,
    cashReward: 750,
    deliverables: [
      '1 Aesthetic Reel featuring cupcake frosting close-up + outdoor garden seating',
      '1 Story with Jiffy watermark/sticker'
    ],
    minFollowers: 2000,
    spotsTotal: 4,
    spotsLeft: 0,
    dietaryTags: ['Dessert Heaven', 'Vintage Cottage Vibe', 'Under ₹500 Treats'],
    status: 'completed',
    createdAt: '2026-09-01',
    deadline: '2026-09-15',
    guidelines: []
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    gigId: 'gig-3', // Brik Oven
    studentId: 'stud-1', // Ananya
    studentName: 'Ananya Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    studentCollege: 'Christ (Deemed to be University)',
    studentFollowers: 4850,
    studentEngagement: 5.6,
    status: 'paid',
    pitchNote: 'Church street is my go-to weekend haunt! My audience loves Italian and aesthetic cheese pulls. I have a 24k view reel on pizza in Indiranagar.',
    appliedAt: '2026-09-11',
    scheduledVisitDate: '2026-09-13',
    voucherCode: 'JIFFY-BRIK-8492',
    proof: {
      id: 'proof-1',
      applicationId: 'app-1',
      postUrl: 'https://www.instagram.com/reel/Cx94KLaBqY2/',
      platform: 'instagram_reel',
      viewsCount: 19400,
      likesCount: 1620,
      commentsCount: 84,
      screenshotUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80',
      creatorNotes: 'Posted on Friday 7pm peak slot. Reached 19k views in 48 hours! Mentioned the hot honey pepperoni.',
      submittedAt: '2026-09-15',
      status: 'approved'
    },
    payout: {
      id: 'pay-1',
      applicationId: 'app-1',
      gigId: 'gig-3',
      gigTitle: 'Wood-Fired Neapolitan Pizza Experience',
      studentId: 'stud-1',
      studentName: 'Ananya Sharma',
      restaurantName: 'Brik Oven Neapolitan',
      amount: 1500,
      upiId: 'ananya.sharma@okaxis',
      status: 'paid',
      utrNumber: 'UTR481923018249',
      initiatedAt: '2026-09-16',
      paidAt: '2026-09-16'
    },
    restaurantRating: 5,
    restaurantFeedback: 'Outstanding reel quality and very punctual creator! Sent us customers the next day.',
    studentRating: 5,
    studentFeedback: 'Best Neapolitan pizza in Bangalore. Staff treated us like VIPs.'
  },
  {
    id: 'app-2',
    gigId: 'gig-2', // Third Wave Coffee
    studentId: 'stud-1', // Ananya
    studentName: 'Ananya Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    studentCollege: 'Christ (Deemed to be University)',
    studentFollowers: 4850,
    studentEngagement: 5.6,
    status: 'proof_submitted',
    pitchNote: 'I do regular coffee spot reviews and frequently study at Third Wave. Would love to feature the pour-over station!',
    appliedAt: '2026-09-14',
    scheduledVisitDate: '2026-09-16',
    voucherCode: 'JIFFY-TWC-3391',
    proof: {
      id: 'proof-2',
      applicationId: 'app-2',
      postUrl: 'https://www.instagram.com/reel/Cz11ABcPx99/',
      platform: 'instagram_reel',
      viewsCount: 14200,
      likesCount: 980,
      commentsCount: 42,
      screenshotUrl: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&auto=format&fit=crop&q=80',
      creatorNotes: 'Cinematic reel shot on iPhone 15 Pro with lofi background beat. Highlighted the cinnamon roll pairing!',
      submittedAt: '2026-09-17',
      status: 'pending'
    }
  },
  {
    id: 'app-3',
    gigId: 'gig-1', // Truffles
    studentId: 'stud-1', // Ananya
    studentName: 'Ananya Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    studentCollege: 'Christ (Deemed to be University)',
    studentFollowers: 4850,
    studentEngagement: 5.6,
    status: 'invited',
    pitchNote: 'Truffles is holy ground for Christ students! I have created burger reels that have hit 30k+ views.',
    appliedAt: '2026-09-13',
    scheduledVisitDate: '2026-09-20',
    voucherCode: 'JIFFY-TRUF-7721'
  },
  {
    id: 'app-4',
    gigId: 'gig-1', // Truffles
    studentId: 'stud-2', // Rohan
    studentName: 'Rohan Mehta',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    studentCollege: 'RV College of Engineering (RVCE)',
    studentFollowers: 3200,
    studentEngagement: 6.2,
    status: 'applied',
    pitchNote: 'Huge burger fan with an engaged engineering campus audience. Can showcase the double patty size and value.',
    appliedAt: '2026-09-15'
  },
  {
    id: 'app-5',
    gigId: 'gig-4', // Meghana
    studentId: 'stud-3', // Tanvi
    studentName: 'Tanvi Deshmukh',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
    studentCollege: "St. Joseph's University",
    studentFollowers: 8900,
    studentEngagement: 4.9,
    status: 'approved',
    pitchNote: 'Biryani is comfort food. My followers always ask for the best biryani spots in CBD.',
    appliedAt: '2026-09-15',
    scheduledVisitDate: '2026-09-16',
    voucherCode: 'JIFFY-MEGH-1109',
    proof: {
      id: 'proof-5',
      applicationId: 'app-5',
      postUrl: 'https://www.instagram.com/reel/Cy88QWeMn00/',
      platform: 'instagram_reel',
      viewsCount: 28400,
      likesCount: 2450,
      commentsCount: 112,
      screenshotUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80',
      creatorNotes: 'Crossed 28k views in 36 hours. Great engagement in comments section!',
      submittedAt: '2026-09-17',
      status: 'approved'
    },
    payout: {
      id: 'pay-2',
      applicationId: 'app-5',
      gigId: 'gig-4',
      gigTitle: 'Spicy Andhra Boneless Biryani Feast',
      studentId: 'stud-3',
      studentName: 'Tanvi Deshmukh',
      restaurantName: 'Meghana Foods',
      amount: 1000,
      upiId: 'tanvi.desh@okhdfcbank',
      status: 'pending',
      initiatedAt: '2026-09-17'
    }
  }
];

export const INITIAL_PAYOUTS: PayoutRecord[] = [
  {
    id: 'pay-1',
    applicationId: 'app-1',
    gigId: 'gig-3',
    gigTitle: 'Wood-Fired Neapolitan Pizza Experience',
    studentId: 'stud-1',
    studentName: 'Ananya Sharma',
    restaurantName: 'Brik Oven Neapolitan',
    amount: 1500,
    upiId: 'ananya.sharma@okaxis',
    status: 'paid',
    utrNumber: 'UTR481923018249',
    initiatedAt: '2026-09-16',
    paidAt: '2026-09-16 14:30'
  },
  {
    id: 'pay-2',
    applicationId: 'app-5',
    gigId: 'gig-4',
    gigTitle: 'Spicy Andhra Boneless Biryani Feast',
    studentId: 'stud-3',
    studentName: 'Tanvi Deshmukh',
    restaurantName: 'Meghana Foods',
    amount: 1000,
    upiId: 'tanvi.desh@okhdfcbank',
    status: 'pending',
    initiatedAt: '2026-09-17'
  }
];

export const INITIAL_STATS: MarketplaceStats = {
  activeCreators: 142,
  verifiedRestaurants: 38,
  totalGigsListed: 86,
  totalGigsCompleted: 214,
  totalPaidOutINR: 284500,
  totalImpressionsGenerated: 3420000
};
