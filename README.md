# QR Code Reward System

A comprehensive React-based QR code reward distribution platform enabling customers to scan QR codes, receive instant rewards through scratch cards, and get paid via UPI.

## 🚀 Features

### Customer Application
- **QR Code Scanning**: Scan or manually enter QR codes to claim rewards
- **Scratch Card Interface**: Interactive scratch cards to reveal instant reward amounts
- **OTP Authentication**: Secure customer verification (demo mode ready)
- **UPI Payment Integration**: Direct reward payouts to customer UPI accounts
- **Reward Tracking**: View claimed rewards and payment history
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

### Admin Management Portal
- **Campaign Management**: Create and manage reward campaigns
- **QR Code Generation**: Generate unlimited QR codes for campaigns
- **Real-time Analytics**: Track scans, conversions, and revenue
- **Fraud Detection**: Advanced fraud prevention mechanisms
- **Reward Distribution**: Monitor and manage reward claims
- **Performance Dashboard**: Visual insights into campaign metrics

### Core Features
- **Secure Reward Distribution**: Encrypted reward allocation system
- **Fraud Prevention**:
  - Device fingerprinting
  - Rapid scan detection
  - Location anomaly detection
  - Reward stacking prevention
  - Rate limiting
- **Payment Gateway Ready**: UPI integration framework
- **Analytics & Reporting**: Comprehensive campaign analytics
- **Demo Mode**: Pre-filled test credentials for easy demonstration

## 📋 Tech Stack

- **Frontend**: React 18.2 + TypeScript
- **Routing**: React Router DOM v6
- **State Management**: Zustand
- **Styling**: Tailwind CSS 3.3
- **Build Tool**: Vite 4.2
- **Notifications**: React Hot Toast
- **QR Code**: qrcode.react + html5-qrcode

## 🛠️ Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📖 Usage

### Login
1. Open `http://localhost:5173`
2. Choose "Customer" or "Admin" role
3. Use demo credentials:
   - **Email**: customer@example.com
   - **Password**: password

### Customer Flow
1. **Scan QR Code**: Enter or scan a QR code
2. **Claim Reward**: Get instant reward confirmation
3. **Scratch Card**: Click cards to reveal reward amounts
4. **Get Paid**: Enter UPI ID to receive payment

### Admin Flow
1. **Dashboard**: View campaign performance metrics
2. **Create Campaign**: Generate new QR code campaigns
3. **Manage QR Codes**: Download and distribute QR codes
4. **View Analytics**: Track performance and detect fraud

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   └── ScratchCard.tsx # Interactive scratch card component
├── pages/               # Page components
│   ├── LoginPage.tsx
│   ├── QRScannerPage.tsx
│   ├── RewardPage.tsx
│   ├── PaymentPage.tsx
│   └── admin/           # Admin portal pages
│       ├── AdminDashboard.tsx
│       ├── CampaignManagement.tsx
│       └── AnalyticsDashboard.tsx
├── services/            # API services
│   └── api.ts          # Mock API with realistic responses
├── store/               # Zustand store
│   └── index.ts        # Auth and reward stores
├── types/               # TypeScript types
│   └── index.ts        # Type definitions
├── utils/               # Utility functions
│   └── fraudDetection.ts # Fraud detection service
├── styles/              # Global styles
│   └── index.css       # Tailwind + custom CSS
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## 🔐 Fraud Prevention Mechanisms

### 1. **Device Fingerprinting**
- Tracks device characteristics (user agent, screen resolution)
- Detects device switching attempts

### 2. **Rapid Scan Detection**
- Identifies multiple scans in quick succession
- Configurable time window and threshold

### 3. **Location Anomaly Detection**
- Detects impossible travel patterns
- Identifies timezone changes within unrealistic time frames

### 4. **Reward Stacking Prevention**
- Limits reward claims per user per campaign
- Time-windowed accumulation tracking

### 5. **Risk Scoring**
- Calculates fraud probability (0-100)
- Dynamic severity classification (low/medium/high)

## 🎨 UI/UX Highlights

- **Modern Gradient Design**: Eye-catching purple, blue, and pink gradients
- **Responsive Layouts**: Mobile-first responsive design
- **Interactive Elements**: Smooth animations and transitions
- **Accessibility**: WCAG compliant components
- **Dark Mode Ready**: Tailwind CSS utilities for theme support
- **Loading States**: Skeleton screens and spinners

## 📊 Analytics Features

- **Real-time Metrics**:
  - Total scans and claims
  - Conversion rates
  - Revenue tracking
  - Fraud detection counts

- **Visual Charts**:
  - Daily performance trends
  - Campaign progress bars
  - KPI dashboards

- **Exportable Data**:
  - Campaign reports
  - Customer activity logs
  - Fraud incident reports

## 🔄 API Integration

The system uses a mock API service that mimics real backend responses. To integrate with a real backend:

1. Update endpoints in `src/services/api.ts`
2. Replace mock data with actual API calls
3. Implement authentication tokens
4. Add error handling for network failures

## 🧪 Testing

### Demo Data
- Pre-populated campaigns and QR codes
- Mock user accounts for testing
- Simulated reward claims and payments

### Testing Fraud Detection
1. Rapidly scan multiple QR codes
2. Try changing devices between scans
3. Attempt duplicate claims
4. Check admin fraud alerts

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

```bash
# Build for production
npm run build

# Deploy dist folder to your hosting
# Vercel, Netlify, or any static hosting service
```

## 🛡️ Security Features

- ✅ OTP authentication framework
- ✅ UPI payment encryption ready
- ✅ Fraud detection and prevention
- ✅ Secure token storage
- ✅ HTTPS ready
- ✅ Rate limiting framework

## 📝 Environment Variables

Create `.env.local`:

```env
VITE_API_BASE_URL=https://api.qr-reward.local
VITE_PAYMENT_GATEWAY_KEY=your_key_here
VITE_ENABLE_DEMO_MODE=true
```

## 🤝 Contributing

This is a prototype demonstration. For production use:
1. Add comprehensive error handling
2. Implement real payment gateway
3. Add unit and integration tests
4. Implement proper authentication
5. Add comprehensive logging

## 📄 License

MIT License - feel free to use this prototype for demonstrations and learning.

## 🎯 Future Enhancements

- [ ] Real payment gateway integration (Razorpay, PhonePe)
- [ ] Advanced analytics and ML-based fraud detection
- [ ] Multi-language support
- [ ] Push notifications
- [ ] Referral rewards system
- [ ] Social sharing features
- [ ] Real camera QR scanner
- [ ] Progressive web app (PWA) features
- [ ] Backend API integration
- [ ] Database persistence

## 📞 Support

For demo purposes, all features work with mock data. Customize the API responses in `src/services/api.ts` to match your requirements.

---

**Created**: April 2026  
**Version**: 0.0.1  
**Status**: Prototype / Demonstration Ready
