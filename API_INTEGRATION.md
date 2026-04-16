# QR Reward System - API Integration Guide

## Overview

This document outlines the API endpoints and data structures needed to integrate the QR Reward System with a backend server.

---

## Base Configuration

```typescript
// Environment setup
VITE_API_BASE_URL=https://your-api.com
VITE_PAYMENT_GATEWAY_KEY=your_payment_key
```

---

## Authentication APIs

### Login
```
POST /api/auth/login
Content-Type: application/json

Request:
{
  "email": "customer@example.com",
  "password": "password",
  "role": "customer" | "admin"
}

Response:
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_001",
      "email": "customer@example.com",
      "name": "John Doe",
      "role": "customer"
    }
  }
}
```

### OTP Verification (For customer registration)
```
POST /api/auth/send-otp
{
  "phone": "+91-9876543210"
}

POST /api/auth/verify-otp
{
  "phone": "+91-9876543210",
  "otp": "123456"
}
```

---

## Campaign APIs

### Get All Campaigns
```
GET /api/campaigns
Headers: Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": [
    {
      "id": "camp_001",
      "title": "Summer Sale 2024",
      "description": "Get exciting rewards",
      "rewardType": "cash",
      "rewardAmount": 500,
      "startDate": "2024-04-16T00:00:00Z",
      "endDate": "2024-05-16T00:00:00Z",
      "totalQRCodes": 1000,
      "remainingRewards": 850,
      "status": "active"
    }
  ]
}
```

### Get Campaign Details
```
GET /api/campaigns/{campaignId}
Headers: Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": { ... campaign object ... }
}
```

### Create Campaign (Admin Only)
```
POST /api/campaigns
Headers: Authorization: Bearer {admin_token}
Content-Type: application/json

Request:
{
  "title": "New Campaign",
  "description": "Description here",
  "rewardType": "cash",
  "rewardAmount": 500,
  "startDate": "2024-04-16T00:00:00Z",
  "endDate": "2024-05-16T00:00:00Z",
  "totalQRCodes": 1000
}

Response:
{
  "success": true,
  "data": { ... new campaign ... }
}
```

---

## QR Code APIs

### Generate QR Codes
```
POST /api/campaigns/{campaignId}/qr-codes/generate
Headers: Authorization: Bearer {admin_token}
Content-Type: application/json

Request:
{
  "count": 100,
  "format": "png" | "svg" | "pdf"
}

Response:
{
  "success": true,
  "data": {
    "campaignId": "camp_001",
    "generatedCount": 100,
    "qrCodes": [
      {
        "id": "qr_001",
        "code": "QR_CODE_VALUE_HERE",
        "downloadUrl": "https://api.example.com/files/qr_001.png"
      }
    ]
  }
}
```

### Validate QR Code
```
POST /api/qr-codes/validate
Headers: Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "code": "QR_CODE_VALUE_HERE"
}

Response:
{
  "success": true,
  "data": {
    "id": "qr_001",
    "campaignId": "camp_001",
    "claimed": false,
    "rewardAmount": 500,
    "valid": true
  }
}
```

### Get QR Code Details
```
GET /api/qr-codes/{qrCodeId}
Headers: Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": "qr_001",
    "code": "QR_CODE_VALUE",
    "campaignId": "camp_001",
    "claimed": false,
    "createdAt": "2024-04-16T00:00:00Z"
  }
}
```

---

## Reward APIs

### Claim Reward
```
POST /api/rewards/claim
Headers: Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "qrCodeId": "qr_001",
  "userId": "user_001"
}

Response:
{
  "success": true,
  "data": {
    "id": "reward_001",
    "qrCodeId": "qr_001",
    "userId": "user_001",
    "amount": 500,
    "status": "claimed",
    "scratchCards": [
      { "id": "sc_0", "position": 0, "revealed": false, "value": 100 },
      { "id": "sc_1", "position": 1, "revealed": false, "value": 250 },
      ...
    ]
  }
}
```

### Reveal Scratch Card
```
POST /api/rewards/{rewardId}/scratch-card/reveal
Headers: Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "cardPosition": 0
}

Response:
{
  "success": true,
  "data": {
    "rewardId": "reward_001",
    "cardPosition": 0,
    "revealedValue": 250,
    "totalRevealed": 1
  }
}
```

### Get Reward Details
```
GET /api/rewards/{rewardId}
Headers: Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": { ... reward object ... }
}
```

---

## Payment APIs

### Initiate Payment
```
POST /api/payments/initiate
Headers: Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "rewardId": "reward_001",
  "method": "upi",
  "upiId": "customer@googlepay"
}

Response:
{
  "success": true,
  "data": {
    "id": "pay_001",
    "rewardId": "reward_001",
    "amount": 500,
    "method": "upi",
    "status": "pending",
    "transactionId": "TXN_123456",
    "createdAt": "2024-04-16T10:30:00Z"
  }
}
```

### Check Payment Status
```
GET /api/payments/{paymentId}/status
Headers: Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": "pay_001",
    "status": "completed" | "pending" | "failed",
    "amount": 500,
    "transactionId": "TXN_123456",
    "completedAt": "2024-04-16T10:35:00Z"
  }
}
```

### Get Payment History
```
GET /api/payments
Headers: Authorization: Bearer {token}

Query Params:
- userId (optional)
- status (optional): pending, completed, failed
- limit: 10 (default)
- offset: 0 (default)

Response:
{
  "success": true,
  "data": {
    "payments": [ ... ],
    "total": 25,
    "limit": 10,
    "offset": 0
  }
}
```

---

## Analytics APIs

### Get Campaign Analytics
```
GET /api/campaigns/{campaignId}/analytics
Headers: Authorization: Bearer {token}

Query Params:
- startDate: ISO 8601 date
- endDate: ISO 8601 date
- granularity: day | week | month

Response:
{
  "success": true,
  "data": {
    "campaignId": "camp_001",
    "totalScans": 950,
    "totalRewardsDistributed": 850,
    "totalRevenue": 425000,
    "conversionRate": 89.5,
    "fraudDetectedCount": 5,
    "byDay": [
      {
        "date": "2024-04-16",
        "scans": 45,
        "rewards": 40,
        "revenue": 20000,
        "fraudCases": 0
      }
    ]
  }
}
```

### Get Dashboard Analytics (Admin)
```
GET /api/admin/analytics
Headers: Authorization: Bearer {admin_token}

Response:
{
  "success": true,
  "data": {
    "totalCampaigns": 5,
    "activeCampaigns": 2,
    "totalScans": 5000,
    "totalRewards": 4500,
    "totalRevenue": 2250000,
    "fraudCases": 25,
    "topCampaigns": [ ... ]
  }
}
```

---

## Fraud Detection APIs

### Report Suspicious Activity
```
POST /api/fraud/report
Headers: Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "userId": "user_001",
  "qrCodeId": "qr_001",
  "reason": "Multiple scans in short time",
  "evidence": { ... }
}

Response:
{
  "success": true,
  "data": {
    "id": "fraud_001",
    "status": "pending",
    "severity": "medium"
  }
}
```

### Get Fraud Flags (Admin)
```
GET /api/admin/fraud-flags
Headers: Authorization: Bearer {admin_token}

Query Params:
- status: pending | resolved
- severity: low | medium | high
- limit: 50
- offset: 0

Response:
{
  "success": true,
  "data": {
    "flags": [ ... fraud flag objects ... ],
    "total": 25,
    "pendingCount": 5
  }
}
```

### Resolve Fraud Flag (Admin)
```
PATCH /api/admin/fraud-flags/{flagId}
Headers: Authorization: Bearer {admin_token}
Content-Type: application/json

Request:
{
  "action": "approve" | "reject",
  "notes": "Investigation notes"
}

Response:
{
  "success": true,
  "data": { ... updated fraud flag ... }
}
```

---

## Error Handling

All endpoints follow this error response format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": { ... additional context ... }
  }
}
```

### Common Error Codes
- `INVALID_TOKEN`: Authentication failed
- `INSUFFICIENT_PERMISSIONS`: Not authorized for action
- `RESOURCE_NOT_FOUND`: QR code or reward not found
- `INVALID_QR_CODE`: QR code validation failed
- `ALREADY_CLAIMED`: Reward already claimed
- `FRAUD_DETECTED`: Suspicious activity detected
- `PAYMENT_FAILED`: Payment processing failed
- `INVALID_UPI_ID`: UPI ID format invalid

---

## Rate Limiting

```
Rate Limit Headers:
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1713350400

Limits:
- Scan endpoint: 10 requests per minute per user
- Payment endpoint: 5 requests per minute per user
- General endpoints: 100 requests per minute per user
```

---

## Webhook Events

### Reward Claimed
```json
{
  "event": "reward.claimed",
  "timestamp": "2024-04-16T10:30:00Z",
  "data": {
    "rewardId": "reward_001",
    "userId": "user_001",
    "amount": 500
  }
}
```

### Payment Completed
```json
{
  "event": "payment.completed",
  "timestamp": "2024-04-16T10:35:00Z",
  "data": {
    "paymentId": "pay_001",
    "amount": 500,
    "transactionId": "TXN_123456"
  }
}
```

### Fraud Detected
```json
{
  "event": "fraud.detected",
  "timestamp": "2024-04-16T10:32:00Z",
  "data": {
    "userId": "user_001",
    "severity": "high",
    "reason": "Multiple scans detected"
  }
}
```

---

## Integration Checklist

- [ ] Set up backend API server
- [ ] Implement authentication endpoints
- [ ] Create campaign management endpoints
- [ ] Build QR code validation system
- [ ] Create reward claiming system
- [ ] Integrate payment gateway (Razorpay/PhonePe)
- [ ] Implement fraud detection logic
- [ ] Set up database (MongoDB/PostgreSQL)
- [ ] Add logging and monitoring
- [ ] Implement rate limiting
- [ ] Set up webhooks
- [ ] Add email/SMS notifications
- [ ] Deploy to production
- [ ] Monitor and optimize

---

## Sample Backend Implementation (Node.js/Express)

```javascript
// backend/routes/api.js
import express from 'express'
import { authenticate } from './middleware/auth'

const router = express.Router()

// Campaign routes
router.get('/campaigns', authenticate, getCampaigns)
router.post('/campaigns', authenticate, adminOnly, createCampaign)
router.get('/campaigns/:id', authenticate, getCampaignById)

// QR Code routes
router.post('/qr-codes/validate', authenticate, validateQRCode)
router.post('/campaigns/:id/qr-codes/generate', authenticate, adminOnly, generateQRCodes)

// Reward routes
router.post('/rewards/claim', authenticate, claimReward)
router.post('/rewards/:id/scratch-card/reveal', authenticate, revealScratchCard)
router.get('/rewards/:id', authenticate, getRewardDetails)

// Payment routes
router.post('/payments/initiate', authenticate, initiatePayment)
router.get('/payments/:id/status', authenticate, getPaymentStatus)

// Analytics routes
router.get('/campaigns/:id/analytics', authenticate, getAnalytics)
router.get('/admin/analytics', authenticate, adminOnly, getDashboardAnalytics)

export default router
```

---

## Testing APIs

Use Postman, Insomnia, or curl:

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@example.com","password":"password","role":"customer"}'

# Validate QR Code
curl -X POST http://localhost:3000/api/qr-codes/validate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"code":"QR_CODE_VALUE"}'

# Claim Reward
curl -X POST http://localhost:3000/api/rewards/claim \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"qrCodeId":"qr_001","userId":"user_001"}'
```

---

This API specification provides a complete integration framework for building a production-ready QR Reward System.

