# QR Reward System - Getting Started Guide

## 🎯 Quick Start

The QR Reward System is now fully set up and running! Here's everything you need to know to showcase it to customers.

### Access the Application

**Development Server**: [http://localhost:5173](http://localhost:5173)

The application is running and ready to use.

---

## 👥 Demo Users

### Customer Account
- **Email**: customer@example.com
- **Password**: password
- **Role**: Customer
- **Features**: QR scanning, reward claiming, scratch cards, UPI payments

### Admin Account
- **Email**: admin@example.com
- **Password**: password
- **Role**: Admin
- **Features**: Campaign management, QR generation, analytics, fraud monitoring

---

## 📱 Customer Application Flow

### Step 1: Login
1. Click "Customer" role selector
2. Use demo credentials to login
3. Access the QR Scanner page

### Step 2: Scan QR Code
- Paste any QR code value in the input field
- Click "Scan & Claim Reward"
- Demo: Use code like `QR_CODE_demo123`

### Step 3: Reveal Reward
- View the instant reward page
- Click on 9 scratch cards to reveal rewards
- Each card hides a random reward amount (₹0-₹500)

### Step 4: Get Paid
- Click "Get Paid" button
- Enter your UPI ID (e.g., `yourname@googlepay`)
- Complete payment
- See payment confirmation

---

## 👨‍💼 Admin Dashboard Features

### 1. Dashboard Overview
- **Active Campaigns**: Number of running campaigns
- **Total QR Codes**: Generated QR code count
- **Rewards Distributed**: Claims made so far
- **Total Revenue**: Revenue from all campaigns
- **Campaign Table**: View all campaigns with progress

### 2. Campaign Management
- **Create Campaign**: 
  - Enter campaign title
  - Set reward amount
  - Specify number of QR codes
  - Auto-calculate total cost
- **Generate QR Codes**: One-click QR code generation
- **Download QR Codes**: Download individual or batch QR codes
- **Track Status**: Monitor claimed vs unclaimed codes

### 3. Analytics Dashboard
- **KPI Cards**: 
  - Total Scans
  - Rewards Distributed
  - Conversion Rate
  - Fraud Cases Detected
- **Performance Charts**:
  - Daily activity graphs
  - 30-day trend lines
  - Top metrics display
- **Recent Activity Feed**:
  - Real-time events
  - Fraud alerts
  - Payment transactions

---

## 🔒 Security & Fraud Prevention

### Implemented Mechanisms

1. **Device Fingerprinting**
   - Tracks device characteristics
   - Detects device switching

2. **Rapid Scan Detection**
   - Identifies quick successive scans
   - Configurable thresholds

3. **Location Anomaly Detection**
   - Detects impossible travel
   - Monitors timezone changes

4. **Reward Stacking Prevention**
   - Limits per-user claims
   - Time-windowed tracking

5. **Risk Scoring**
   - Calculates fraud probability (0-100)
   - Dynamic severity levels

### Demo Fraud Alerts
- Admin dashboard shows fraud detection metrics
- 5 fraud cases in demo data
- Monitor in Admin > Analytics

---

## 🎨 Design Features

### Visual Design
- **Modern Gradients**: Purple, blue, and pink color scheme
- **Responsive Layout**: Works on all screen sizes
- **Smooth Animations**: Hover effects and transitions
- **Professional Cards**: Elevated shadow styling
- **Accessible Colors**: WCAG compliant contrast

### Mobile Responsive
- **Portrait Mode**: Optimized for mobile viewing
- **Landscape Mode**: Tablet and desktop layouts
- **Touch-Friendly**: Large tap targets
- **Orientation Detection**: Auto-adapts to screen changes

### Interactive Elements
- Animated scratch cards
- Hover state animations
- Loading spinners
- Toast notifications
- Progress bars
- Gradient buttons

---

## 📊 Key Metrics (Demo Data)

- **Total Scans**: 950
- **Conversion Rate**: 89.5%
- **Rewards Distributed**: 850
- **Total Revenue**: ₹425,000
- **Fraud Cases**: 5

---

## 🚀 Deployment Options

### 1. Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### 2. Netlify
```bash
npm run build
# Drag dist folder to Netlify
```

### 3. GitHub Pages
```bash
npm run build
# Deploy dist folder to GitHub Pages
```

### 4. Self-Hosted
```bash
npm run build
# Copy dist folder to your server
# Serve with nginx, Apache, or Node.js
```

---

## 🔧 Customization

### Change Colors
Edit `src/styles/index.css` or `tailwind.config.js`:
```javascript
colors: {
  primary: '#667eea',    // Change these
  secondary: '#764ba2',
  success: '#48bb78',
}
```

### Modify Campaign Data
Edit `src/services/api.ts`:
- Update `mockCampaigns` array
- Change reward amounts
- Adjust campaign details

### Update UI Text
Find and replace text throughout components:
- `src/pages/` - Page content
- `src/components/` - Component text

---

## 📝 File Structure Quick Reference

```
src/
├── components/ScratchCard.tsx        # Scratch card logic
├── pages/
│   ├── LoginPage.tsx                 # Login UI
│   ├── QRScannerPage.tsx             # QR scanning
│   ├── RewardPage.tsx                # Reward display
│   ├── PaymentPage.tsx               # Payment form
│   └── admin/
│       ├── AdminDashboard.tsx        # Admin overview
│       ├── CampaignManagement.tsx    # Campaign CRUD
│       └── AnalyticsDashboard.tsx    # Analytics & fraud
├── services/api.ts                   # Mock API
├── store/index.ts                    # Auth state
├── types/index.ts                    # TypeScript types
└── utils/fraudDetection.ts           # Fraud logic
```

---

## 🔗 Important URLs

- **Development**: http://localhost:5173
- **Login Page**: http://localhost:5173/
- **Customer Scanner**: http://localhost:5173/scan
- **Admin Dashboard**: http://localhost:5173/admin/dashboard
- **Campaign Mgmt**: http://localhost:5173/admin/campaigns
- **Analytics**: http://localhost:5173/admin/analytics

---

## 🐛 Troubleshooting

### Server Won't Start
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
npm run dev
```

### Module Not Found
```bash
rm -rf node_modules
npm install --legacy-peer-deps
npm run dev
```

### Build Fails
```bash
npm run build -- --force
```

---

## 📱 Browser Compatibility

- **Chrome/Edge**: ✅ Full support
- **Firefox**: ✅ Full support
- **Safari**: ✅ Full support
- **Mobile Safari**: ✅ Full support

---

## 🎓 Next Steps for Customers

1. **Showcase the Prototype**: Use demo flow for presentations
2. **Customize Branding**: Update colors and logos
3. **Integrate Payment**: Connect real payment gateway (Razorpay, PhonePe)
4. **Backend Setup**: Deploy Express/Node backend for data persistence
5. **Database**: Connect MongoDB or PostgreSQL
6. **Production**: Deploy to Vercel/AWS/your infrastructure

---

## 📞 Support

For issues or questions about the prototype:
1. Check README.md for technical details
2. Review code comments in src/
3. Examine demo data in src/services/api.ts
4. Check TypeScript definitions in src/types/

---

## ✨ Features Summary

### ✅ Completed
- React 18 + TypeScript setup
- Responsive design with Tailwind CSS
- Customer app (QR scanner, scratch cards, payment)
- Admin portal (campaigns, QR generation, analytics)
- Fraud detection system
- Mock API with realistic responses
- Beautiful UI with animations
- State management (Zustand)
- Routing (React Router)
- Toast notifications

### 📋 Ready for Integration
- Real payment gateway
- Backend API
- Database
- Email/SMS notifications
- Real QR code camera scanner
- Advanced analytics

---

**Status**: ✅ **READY FOR DEMONSTRATION**

The prototype is fully functional and ready to showcase to customers. All core features are implemented with beautiful UI and realistic demo data.

