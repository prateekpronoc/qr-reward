import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store'
import { LoginPage } from './pages/LoginPage'
import { QRScannerPage } from './pages/QRScannerPage'
import { RewardPage } from './pages/RewardPage'
import { PaymentPage } from './pages/PaymentPage'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { CampaignManagement } from './pages/admin/CampaignManagement'
import { AnalyticsDashboard } from './pages/admin/AnalyticsDashboard'
import { Toaster } from 'react-hot-toast'

function App() {
  const { isAuthenticated } = useAuthStore()

  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/" />
  }

  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          {/* Customer Routes */}
          <Route
            path="/scan"
            element={
              <PrivateRoute>
                <QRScannerPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reward/:rewardId"
            element={
              <PrivateRoute>
                <RewardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment/:rewardId"
            element={
              <PrivateRoute>
                <PaymentPage />
              </PrivateRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/campaigns"
            element={
              <PrivateRoute>
                <CampaignManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <PrivateRoute>
                <AnalyticsDashboard />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
