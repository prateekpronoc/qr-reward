import { Campaign, QRCode, Reward, Payment, Analytics } from '../types'

// Mock API responses
const mockCampaigns: Campaign[] = [
  {
    id: 'camp_001',
    businessId: 'biz_001',
    title: 'Summer Sale 2024',
    description: 'Get exciting rewards on every purchase!',
    rewardType: 'cash',
    rewardAmount: 500,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    totalQRCodes: 1000,
    remainingRewards: 850,
    status: 'active',
    createdAt: new Date().toISOString(),
  },
]

const mockQRCodes: QRCode[] = Array.from({ length: 100 }, (_, i) => ({
  id: `qr_${i}`,
  campaignId: 'camp_001',
  code: `QR_CODE_${Math.random().toString(36).substring(7)}`,
  claimed: Math.random() > 0.7,
  createdAt: new Date().toISOString(),
}))

export const apiService = {
  // Campaign APIs
  async getCampaigns(): Promise<Campaign[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCampaigns), 300)
    })
  },

  async getCampaignById(_id: string): Promise<Campaign> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCampaigns[0]), 300)
    })
  },

  // QR Code APIs
  async generateQRCodes(campaignId: string, count: number): Promise<QRCode[]> {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve(
            Array.from({ length: count }, (_, i) => ({
              id: `qr_${Date.now()}_${i}`,
              campaignId,
              code: `QR_CODE_${Math.random().toString(36).substring(7)}`,
              claimed: false,
              createdAt: new Date().toISOString(),
            }))
          ),
        300
      )
    })
  },

  async validateQRCode(code: string): Promise<QRCode | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const qr = mockQRCodes.find((q) => q.code === code)
        resolve(qr || null)
      }, 300)
    })
  },

  // Reward APIs
  async claimReward(qrCodeId: string, userId: string): Promise<Reward> {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            id: `reward_${Date.now()}`,
            qrCodeId,
            campaignId: 'camp_001',
            userId,
            amount: Math.floor(Math.random() * 5 + 1) * 100,
            status: 'claimed',
            scratchCardRevealed: false,
            scratchCards: Array.from({ length: 9 }, (_, i) => ({
              id: `sc_${i}`,
              position: i,
              revealed: false,
              value: i === 4 ? 500 : Math.floor(Math.random() * 200),
            })),
            createdAt: new Date().toISOString(),
          }),
        500
      )
    })
  },

  async revealScratchCard(_rewardId: string, _cardPosition: number): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(Math.floor(Math.random() * 500 + 50)), 200)
    })
  },

  // Payment APIs
  async initiatePayment(rewardId: string, upiId: string): Promise<Payment> {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            id: `pay_${Date.now()}`,
            rewardId,
            userId: 'user_001',
            amount: 500,
            method: 'upi',
            upiId,
            status: 'processing',
            transactionId: `TXN_${Date.now()}`,
            createdAt: new Date().toISOString(),
          }),
        1000
      )
    })
  },

  async getPaymentStatus(paymentId: string): Promise<Payment> {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            id: paymentId,
            rewardId: 'reward_001',
            userId: 'user_001',
            amount: 500,
            method: 'upi',
            upiId: 'user@upi',
            status: 'completed',
            transactionId: `TXN_${Date.now()}`,
            createdAt: new Date().toISOString(),
            completedAt: new Date().toISOString(),
          }),
        300
      )
    })
  },

  // Analytics APIs
  async getAnalytics(_campaignId: string): Promise<Analytics> {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            totalScans: 950,
            totalRewardsDistributed: 850,
            totalRevenue: 425000,
            conversionRate: 89.5,
            fraudDetectedCount: 5,
            byDay: Array.from({ length: 30 }, (_, i) => {
              const date = new Date()
              date.setDate(date.getDate() - i)
              return {
                date: date.toISOString().split('T')[0],
                scans: Math.floor(Math.random() * 100 + 10),
                rewards: Math.floor(Math.random() * 80 + 5),
                revenue: Math.floor(Math.random() * 50000 + 5000),
                fraudCases: Math.floor(Math.random() * 3),
              }
            }),
          }),
        400
      )
    })
  },

  // Fraud Detection APIs
  async detectFraud(_userId: string, _qrCodeId: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple mock fraud detection
        resolve(Math.random() < 0.05) // 5% chance of fraud
      }, 200)
    })
  },
}
