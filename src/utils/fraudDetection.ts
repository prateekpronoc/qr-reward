import { FraudFlag } from '../types'

interface DeviceFingerprint {
  userAgent: string
  language: string
  timezone: string
  screenResolution: string
  timestamp: number
}

class FraudDetectionService {
  private scanHistory: Map<string, DeviceFingerprint[]> = new Map()
  private suspiciousPatterns: Map<string, number> = new Map()

  /**
   * Generate device fingerprint for fraud detection
   */
  generateDeviceFingerprint(): DeviceFingerprint {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timestamp: Date.now(),
    }
  }

  /**
   * Check for duplicate/rapid scanning
   */
  checkRapidScanning(userId: string, threshold: number = 3, timeWindow: number = 60000): boolean {
    const fingerprint = this.generateDeviceFingerprint()
    const userScans = this.scanHistory.get(userId) || []

    const recentScans = userScans.filter(
      (scan) => Date.now() - scan.timestamp < timeWindow
    )

    if (recentScans.length >= threshold) {
      return true // Fraud detected
    }

    userScans.push(fingerprint)
    this.scanHistory.set(userId, userScans)
    return false
  }

  /**
   * Detect if scan is from same device within short time
   */
  checkDeviceConsistency(userId: string): boolean {
    const userScans = this.scanHistory.get(userId) || []
    if (userScans.length < 2) return false

    const lastScan = userScans[userScans.length - 1]
    const secondLastScan = userScans[userScans.length - 2]

    // Check if device fingerprint is different
    if (lastScan.userAgent !== secondLastScan.userAgent) {
      return true // Different device - potential fraud
    }

    return false
  }

  /**
   * Check for VPN/Proxy usage patterns
   */
  checkLocationAnomaly(userId: string): boolean {
    const userScans = this.scanHistory.get(userId) || []
    if (userScans.length < 2) return false

    // Simple check: if timezone changes too rapidly (impossible travel)
    const timeSinceLast = userScans[userScans.length - 1].timestamp - userScans[userScans.length - 2].timestamp
    const tzChanged = userScans[userScans.length - 1].timezone !== userScans[userScans.length - 2].timezone

    if (tzChanged && timeSinceLast < 1800000) {
      // < 30 minutes
      return true // Suspicious location change
    }

    return false
  }

  /**
   * Check for reward stacking attempts
   */
  checkRewardStacking(userId: string, campaignId: string): boolean {
    const key = `${userId}_${campaignId}`
    const count = (this.suspiciousPatterns.get(key) || 0) + 1

    if (count > 5) {
      return true // Too many attempts in short time
    }

    this.suspiciousPatterns.set(key, count)

    // Reset counter after 1 hour
    setTimeout(() => {
      this.suspiciousPatterns.delete(key)
    }, 3600000)

    return false
  }

  /**
   * Calculate fraud risk score
   */
  calculateRiskScore(
    _userId: string,
    _campaignId: string,
    flags: {
      rapidScanning?: boolean
      deviceAnomaly?: boolean
      locationAnomaly?: boolean
      rewardStacking?: boolean
      newUser?: boolean
    }
  ): number {
    let score = 0

    if (flags.rapidScanning) score += 30
    if (flags.deviceAnomaly) score += 25
    if (flags.locationAnomaly) score += 35
    if (flags.rewardStacking) score += 40
    if (flags.newUser) score += 15

    return Math.min(score, 100)
  }

  /**
   * Generate fraud flag record
   */
  createFraudFlag(
    userId: string,
    qrCodeId: string,
    reason: string,
    riskScore: number
  ): FraudFlag {
    const severity =
      riskScore >= 70 ? 'high' : riskScore >= 40 ? 'medium' : 'low'

    return {
      id: `fraud_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      userId,
      qrCodeId,
      reason,
      severity,
      timestamp: new Date().toISOString(),
      resolved: false,
    }
  }

  /**
   * Clear old scan history
   */
  clearOldHistory(maxAge: number = 86400000): void {
    // Default 24 hours
    const now = Date.now()
    this.scanHistory.forEach((scans, userId) => {
      const filtered = scans.filter((scan) => now - scan.timestamp < maxAge)
      if (filtered.length === 0) {
        this.scanHistory.delete(userId)
      } else {
        this.scanHistory.set(userId, filtered)
      }
    })
  }
}

export const fraudDetectionService = new FraudDetectionService()
