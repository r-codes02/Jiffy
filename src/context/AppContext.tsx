import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserRole,
  StudentProfile,
  RestaurantProfile,
  Gig,
  Application,
  ApplicationStatus,
  ProofSubmission,
  PayoutRecord,
  MarketplaceStats
} from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_RESTAURANTS,
  INITIAL_GIGS,
  INITIAL_APPLICATIONS,
  INITIAL_PAYOUTS,
  INITIAL_STATS
} from '../lib/demoData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentStudent: StudentProfile;
  setCurrentStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  currentRestaurant: RestaurantProfile;
  setCurrentRestaurant: React.Dispatch<React.SetStateAction<RestaurantProfile>>;
  activeCity: string;
  setActiveCity: (city: string) => void;
  
  // Data
  students: StudentProfile[];
  restaurants: RestaurantProfile[];
  gigs: Gig[];
  applications: Application[];
  payouts: PayoutRecord[];
  stats: MarketplaceStats;

  // Actions
  applyToGig: (gigId: string, pitchNote: string) => boolean;
  createGig: (gig: Omit<Gig, 'id' | 'createdAt' | 'spotsLeft' | 'status'>) => void;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus, metadata?: any) => void;
  submitProof: (applicationId: string, proofData: Omit<ProofSubmission, 'id' | 'applicationId' | 'submittedAt' | 'status'>) => void;
  reviewProof: (applicationId: string, decision: 'approved' | 'revision_requested', feedback?: string) => void;
  markPayoutPaid: (payoutId: string, utrNumber?: string) => void;
  verifyStudent: (studentId: string, verified: boolean) => void;
  verifyRestaurant: (restaurantId: string, verified: boolean) => void;
  rateGigExperience: (applicationId: string, rating: number, feedback: string, isStudentRating: boolean) => void;
  updateStudentUPI: (newUpiId: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROLE: 'jiffy_role',
  STUDENT: 'jiffy_current_student',
  STUDENTS: 'jiffy_students',
  RESTAURANT: 'jiffy_current_restaurant',
  RESTAURANTS: 'jiffy_restaurants',
  GIGS: 'jiffy_gigs',
  APPLICATIONS: 'jiffy_applications',
  PAYOUTS: 'jiffy_payouts',
  STATS: 'jiffy_stats',
  CITY: 'jiffy_city',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial from localStorage or fallback
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem(STORAGE_KEYS.ROLE) as UserRole) || 'student';
  });

  const [activeCity, setActiveCityState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.CITY) || 'Bengaluru';
  });

  const [students, setStudents] = useState<StudentProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [currentStudent, setCurrentStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDENT);
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS[0];
  });

  const [restaurants, setRestaurants] = useState<RestaurantProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RESTAURANTS);
    return saved ? JSON.parse(saved) : INITIAL_RESTAURANTS;
  });

  const [currentRestaurant, setCurrentRestaurant] = useState<RestaurantProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RESTAURANT);
    return saved ? JSON.parse(saved) : INITIAL_RESTAURANTS[0];
  });

  const [gigs, setGigs] = useState<Gig[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GIGS);
    return saved ? JSON.parse(saved) : INITIAL_GIGS;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [payouts, setPayouts] = useState<PayoutRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PAYOUTS);
    return saved ? JSON.parse(saved) : INITIAL_PAYOUTS;
  });

  const [stats, setStats] = useState<MarketplaceStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATS);
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CITY, activeCity);
  }, [activeCity]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(currentStudent));
  }, [currentStudent]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESTAURANTS, JSON.stringify(restaurants));
  }, [restaurants]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESTAURANT, JSON.stringify(currentRestaurant));
  }, [currentRestaurant]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GIGS, JSON.stringify(gigs));
  }, [gigs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAYOUTS, JSON.stringify(payouts));
  }, [payouts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  }, [stats]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const setActiveCity = (city: string) => {
    setActiveCityState(city);
  };

  // Student applies to gig
  const applyToGig = (gigId: string, pitchNote: string): boolean => {
    const gig = gigs.find((g) => g.id === gigId);
    if (!gig || gig.spotsLeft <= 0) return false;

    // Check if already applied
    const alreadyApplied = applications.some(
      (a) => a.gigId === gigId && a.studentId === currentStudent.id
    );
    if (alreadyApplied) return false;

    const newApp: Application = {
      id: `app-${Date.now()}`,
      gigId,
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      studentAvatar: currentStudent.avatarUrl,
      studentCollege: currentStudent.college,
      studentFollowers: currentStudent.followersCount,
      studentEngagement: currentStudent.engagementRate,
      status: 'applied',
      pitchNote,
      appliedAt: new Date().toISOString().split('T')[0],
    };

    setApplications((prev) => [newApp, ...prev]);

    // Update gig spots
    setGigs((prev) =>
      prev.map((g) =>
        g.id === gigId ? { ...g, spotsLeft: Math.max(0, g.spotsLeft - 1) } : g
      )
    );

    return true;
  };

  // Restaurant creates a gig
  const createGig = (gigData: Omit<Gig, 'id' | 'createdAt' | 'spotsLeft' | 'status'>) => {
    const newGig: Gig = {
      ...gigData,
      id: `gig-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      spotsLeft: gigData.spotsTotal,
      status: 'active',
    };
    setGigs((prev) => [newGig, ...prev]);
    setStats((prev) => ({
      ...prev,
      totalGigsListed: prev.totalGigsListed + 1,
    }));
  };

  // Generic application status update
  const updateApplicationStatus = (
    applicationId: string,
    status: ApplicationStatus,
    metadata?: any
  ) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === applicationId) {
          let updated = { ...app, status };
          if (status === 'invited') {
            const prefix = 'JIFFY-' + Math.random().toString(36).substring(2, 6).toUpperCase();
            updated.voucherCode = metadata?.voucherCode || prefix;
            updated.scheduledVisitDate = metadata?.visitDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];
          }
          if (status === 'visited') {
            updated.status = 'visited';
          }
          return updated;
        }
        return app;
      })
    );
  };

  // Student submits proof
  const submitProof = (
    applicationId: string,
    proofData: Omit<ProofSubmission, 'id' | 'applicationId' | 'submittedAt' | 'status'>
  ) => {
    const proof: ProofSubmission = {
      ...proofData,
      id: `proof-${Date.now()}`,
      applicationId,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'pending',
    };

    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId
          ? {
              ...app,
              status: 'proof_submitted',
              proof,
            }
          : app
      )
    );
  };

  // Restaurant reviews proof
  const reviewProof = (
    applicationId: string,
    decision: 'approved' | 'revision_requested',
    feedback?: string
  ) => {
    const app = applications.find((a) => a.id === applicationId);
    if (!app) return;

    const gig = gigs.find((g) => g.id === app.gigId);
    const payoutAmount = gig ? gig.cashReward : 1000;

    setApplications((prev) =>
      prev.map((a) => {
        if (a.id === applicationId) {
          if (decision === 'approved') {
            const newPayout: PayoutRecord = {
              id: `pay-${Date.now()}`,
              applicationId: a.id,
              gigId: a.gigId,
              gigTitle: gig ? gig.title : 'Food Review Gig',
              studentId: a.studentId,
              studentName: a.studentName,
              restaurantName: gig ? gig.restaurantName : 'Restaurant Partner',
              amount: payoutAmount,
              upiId: currentStudent.upiId || 'creator@upi',
              status: 'pending',
              initiatedAt: new Date().toISOString().split('T')[0],
            };

            // Add to payouts
            setPayouts((pList) => [newPayout, ...pList]);

            return {
              ...a,
              status: 'approved',
              restaurantFeedback: feedback,
              payout: newPayout,
              proof: a.proof ? { ...a.proof, status: 'approved' } : undefined,
            };
          } else {
            return {
              ...a,
              proof: a.proof
                ? {
                    ...a.proof,
                    status: 'revision_requested',
                    revisionNote: feedback,
                  }
                : undefined,
            };
          }
        }
        return a;
      })
    );

    if (decision === 'approved') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF5722', '#10B981', '#FFB703'],
      });
    }
  };

  // Admin marks payout as paid
  const markPayoutPaid = (payoutId: string, customUtr?: string) => {
    const utr = customUtr || `UTR${Date.now().toString().slice(-8)}${Math.floor(1000 + Math.random() * 9000)}`;
    const nowStr = new Date().toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    let paidAmount = 0;
    let paidStudentId = '';

    setPayouts((prev) =>
      prev.map((p) => {
        if (p.id === payoutId) {
          paidAmount = p.amount;
          paidStudentId = p.studentId;
          return {
            ...p,
            status: 'paid',
            utrNumber: utr,
            paidAt: nowStr,
          };
        }
        return p;
      })
    );

    // Update application status to 'paid'
    setApplications((prev) =>
      prev.map((app) => {
        if (app.payout?.id === payoutId) {
          return {
            ...app,
            status: 'paid',
            payout: {
              ...app.payout,
              status: 'paid',
              utrNumber: utr,
              paidAt: nowStr,
            },
          };
        }
        return app;
      })
    );

    // Update student earnings if matched
    if (paidStudentId === currentStudent.id) {
      setCurrentStudent((prev) => ({
        ...prev,
        totalEarnings: prev.totalEarnings + paidAmount,
        completedGigsCount: prev.completedGigsCount + 1,
      }));
    }

    setStudents((prev) =>
      prev.map((s) =>
        s.id === paidStudentId
          ? {
              ...s,
              totalEarnings: s.totalEarnings + paidAmount,
              completedGigsCount: s.completedGigsCount + 1,
            }
          : s
      )
    );

    // Update marketplace stats
    setStats((prev) => ({
      ...prev,
      totalGigsCompleted: prev.totalGigsCompleted + 1,
      totalPaidOutINR: prev.totalPaidOutINR + paidAmount,
    }));

    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#10B981', '#FF5722', '#F59E0B'],
    });
  };

  // Admin verifies student
  const verifyStudent = (studentId: string, verified: boolean) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, collegeIdVerified: verified, socialVerified: verified }
          : s
      )
    );
    if (currentStudent.id === studentId) {
      setCurrentStudent((prev) => ({
        ...prev,
        collegeIdVerified: verified,
        socialVerified: verified,
      }));
    }
  };

  // Admin verifies restaurant
  const verifyRestaurant = (restaurantId: string, verified: boolean) => {
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === restaurantId ? { ...r, isVerified: verified } : r
      )
    );
    if (currentRestaurant.id === restaurantId) {
      setCurrentRestaurant((prev) => ({
        ...prev,
        isVerified: verified,
      }));
    }
  };

  // Mutual rating
  const rateGigExperience = (
    applicationId: string,
    rating: number,
    feedback: string,
    isStudentRating: boolean
  ) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === applicationId) {
          if (isStudentRating) {
            return { ...app, studentRating: rating, studentFeedback: feedback };
          } else {
            return { ...app, restaurantRating: rating, restaurantFeedback: feedback };
          }
        }
        return app;
      })
    );
  };

  // Student updates UPI ID
  const updateStudentUPI = (newUpiId: string) => {
    setCurrentStudent((prev) => ({ ...prev, upiId: newUpiId }));
    setStudents((prev) =>
      prev.map((s) => (s.id === currentStudent.id ? { ...s, upiId: newUpiId } : s))
    );
  };

  // Reset to initial demo data
  const resetDemoData = () => {
    localStorage.clear();
    setRoleState('student');
    setCurrentStudent(INITIAL_STUDENTS[0]);
    setStudents(INITIAL_STUDENTS);
    setCurrentRestaurant(INITIAL_RESTAURANTS[0]);
    setRestaurants(INITIAL_RESTAURANTS);
    setGigs(INITIAL_GIGS);
    setApplications(INITIAL_APPLICATIONS);
    setPayouts(INITIAL_PAYOUTS);
    setStats(INITIAL_STATS);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentStudent,
        setCurrentStudent,
        currentRestaurant,
        setCurrentRestaurant,
        activeCity,
        setActiveCity,
        students,
        restaurants,
        gigs,
        applications,
        payouts,
        stats,
        applyToGig,
        createGig,
        updateApplicationStatus,
        submitProof,
        reviewProof,
        markPayoutPaid,
        verifyStudent,
        verifyRestaurant,
        rateGigExperience,
        updateStudentUPI,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
