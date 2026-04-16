import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store'
import { apiService } from '../../services/api'
import { Analytics } from '../../types'

export const AnalyticsDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { logout } = useAuthStore()
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAnalytics = async () => {
      const data = await apiService.getAnalytics('camp_001')
      setAnalytics(data)
      setLoading(false)
    }
    loadAnalytics()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-blue-100 mt-1">Track campaign performance and metrics</p>
            </div>
            <button
              onClick={() => {
                logout()
                navigate('/')
              }}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-4 py-3 font-semibold text-gray-600 hover:text-blue-600 transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/admin/campaigns')}
              className="px-4 py-3 font-semibold text-gray-600 hover:text-blue-600 transition-colors"
            >
              Campaigns
            </button>
            <button
              onClick={() => navigate('/admin/analytics')}
              className="px-4 py-3 font-semibold text-blue-600 border-b-2 border-blue-600"
            >
              Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : analytics ? (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
                <p className="text-gray-600 text-sm font-medium">Total Scans</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{analytics.totalScans.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-2">↑ 12% from last month</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-500">
                <p className="text-gray-600 text-sm font-medium">Rewards Distributed</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {analytics.totalRewardsDistributed.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  ₹{(analytics.totalRewardsDistributed * 500).toLocaleString()}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-t-4 border-purple-500">
                <p className="text-gray-600 text-sm font-medium">Conversion Rate</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{analytics.conversionRate}%</p>
                <p className="text-sm text-gray-500 mt-2">↑ 2.5% improvement</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-t-4 border-red-500">
                <p className="text-gray-600 text-sm font-medium">Fraud Cases</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{analytics.fraudDetectedCount}</p>
                <p className="text-sm text-red-600 mt-2">⚠️ Monitor closely</p>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Daily Performance</h3>
                <div className="flex items-end justify-around h-64 bg-gray-50 rounded-lg p-4">
                  {analytics.byDay.slice(-30).map((day, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="w-2 bg-blue-500 rounded-t transition-all hover:bg-blue-700"
                        style={{
                          height: `${Math.max((day.scans / 150) * 100, 5)}px`,
                        }}
                        title={`${day.date}: ${day.scans} scans`}
                      ></div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 text-center mt-4">Last 30 days</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Top Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-800">₹{(analytics.totalRevenue).toLocaleString()}</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600 mb-1">Avg Reward Value</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ₹{(analytics.totalRevenue / Math.max(analytics.totalRewardsDistributed, 1)).toFixed(0)}
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600 mb-1">Claimed / Total</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {analytics.totalRewardsDistributed} / 1000
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  {
                    action: 'Reward Claimed',
                    details: 'Customer claimed ₹500 reward',
                    time: '2 minutes ago',
                    icon: '🎉',
                  },
                  {
                    action: 'QR Scan',
                    details: 'New QR code scanned',
                    time: '5 minutes ago',
                    icon: '📱',
                  },
                  {
                    action: 'Payment Processed',
                    details: 'UPI payment ₹500 completed',
                    time: '15 minutes ago',
                    icon: '💰',
                  },
                  {
                    action: 'Fraud Alert',
                    details: 'Suspicious activity detected',
                    time: '32 minutes ago',
                    icon: '⚠️',
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border-l-4 border-gray-200 hover:border-blue-500 transition-colors">
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
