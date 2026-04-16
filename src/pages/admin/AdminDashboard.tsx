import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store'
import { apiService } from '../../services/api'
import { Campaign } from '../../types'

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { logout } = useAuthStore()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCampaigns = async () => {
      const data = await apiService.getCampaigns()
      setCampaigns(data)
      setLoading(false)
    }
    loadCampaigns()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-blue-100 mt-1">Manage your QR reward campaigns</p>
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
              className="px-4 py-3 font-semibold text-blue-600 border-b-2 border-blue-600"
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
              className="px-4 py-3 font-semibold text-gray-600 hover:text-blue-600 transition-colors"
            >
              Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Active Campaigns</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {campaigns.filter((c) => c.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total QR Codes</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {campaigns.reduce((sum, c) => sum + c.totalQRCodes, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Rewards Distributed</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {campaigns.reduce((sum, c) => sum + (c.totalQRCodes - c.remainingRewards), 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              ₹{campaigns.reduce((sum, c) => sum + c.rewardAmount * (c.totalQRCodes - c.remainingRewards), 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Active Campaigns</h2>
            <button
              onClick={() => navigate('/admin/campaigns')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              + New Campaign
            </button>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Campaign</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Progress</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">End Date</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => {
                    const progress = (
                      ((campaign.totalQRCodes - campaign.remainingRewards) /
                        campaign.totalQRCodes) *
                      100
                    ).toFixed(1)
                    return (
                      <tr key={campaign.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-800">{campaign.title}</p>
                            <p className="text-sm text-gray-600">{campaign.description}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                            {campaign.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{progress}% claimed</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(campaign.endDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                            View
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
