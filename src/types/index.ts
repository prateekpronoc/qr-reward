export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: 'customer' | 'admin' | 'business';
  createdAt: string;
}

export interface Campaign {
  id: string;
  businessId: string;
  title: string;
  description: string;
  rewardType: 'cash' | 'discount' | 'points';
  rewardAmount: number;
  startDate: string;
  endDate: string;
  totalQRCodes: number;
  remainingRewards: number;
  status: 'active' | 'paused' | 'completed';
  createdAt: string;
}

export interface QRCode {
  id: string;
  campaignId: string;
  code: string;
  claimed: boolean;
  claimedBy?: string;
  claimedAt?: string;
  rewardId?: string;
  createdAt: string;
}

export interface Reward {
  id: string;
  qrCodeId: string;
  campaignId: string;
  userId: string;
  amount: number;
  status: 'pending' | 'claimed' | 'distributed' | 'failed';
  scratchCardRevealed: boolean;
  revealedReward?: number;
  scratchCards: ScratchCard[];
  createdAt: string;
  distributedAt?: string;
}

export interface ScratchCard {
  id: string;
  position: number;
  revealed: boolean;
  value: number;
}

export interface Payment {
  id: string;
  rewardId: string;
  userId: string;
  amount: number;
  method: 'upi' | 'wallet' | 'bank_transfer';
  upiId?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  transactionId?: string;
  createdAt: string;
  completedAt?: string;
}

export interface Analytics {
  totalScans: number;
  totalRewardsDistributed: number;
  totalRevenue: number;
  conversionRate: number;
  fraudDetectedCount: number;
  byDay: DailyAnalytics[];
}

export interface DailyAnalytics {
  date: string;
  scans: number;
  rewards: number;
  revenue: number;
  fraudCases: number;
}

export interface FraudFlag {
  id: string;
  userId: string;
  qrCodeId: string;
  reason: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  resolved: boolean;
}
