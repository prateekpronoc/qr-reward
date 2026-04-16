import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store'
import { apiService } from '../../services/api'
import { QRCode } from '../../types'

export const CampaignManagement: React.FC = () => {
  const navigate = useNavigate()
  const { logout } = useAuthStore()
  const [campaignTitle, setCampaignTitle] = useState('')
  const [rewardAmount, setRewardAmount] = useState('500')
  const [qrCodeCount, setQrCodeCount] = useState('100')
  const [generatedQRs, setGeneratedQRs] = useState<QRCode[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleGenerateQRCodes = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const qrCodes = await apiService.generateQRCodes('camp_001', parseInt(qrCodeCount))
      setGeneratedQRs(qrCodes)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('Failed to generate QR codes')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Campaign Management</h1>
              <p className="text-blue-100 mt-1">Create and manage QR code campaigns</p>
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
              className="px-4 py-3 font-semibold text-blue-600 border-b-2 border-blue-600"
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Campaign Form */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Campaign</h2>
          <form onSubmit={handleGenerateQRCodes} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Title
                </label>
                <input
                  type="text"
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  placeholder="e.g., Summer Sale 2024"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reward Amount (₹)
                </label>
                <input
                  type="number"
                  value={rewardAmount}
                  onChange={(e) => setRewardAmount(e.target.value)}
                  placeholder="500"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of QR Codes
              </label>
              <input
                type="number"
                value={qrCodeCount}
                onChange={(e) => setQrCodeCount(e.target.value)}
                placeholder="100"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                required
              />
              <p className="text-sm text-gray-600 mt-2">
                Total reward cost: ₹{(parseInt(rewardAmount) * parseInt(qrCodeCount)).toLocaleString()}
              </p>
            </div>

            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-green-800 font-semibold">✓ QR codes generated successfully!</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !campaignTitle}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Generating QR Codes...' : 'Generate QR Codes'}
            </button>
          </form>
        </div>

        {/* Generated QR Codes */}
        {generatedQRs.length > 0 && (
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Generated QR Codes</h2>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
                Download All
              </button>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-blue-800">
                <strong>Total Generated:</strong> {generatedQRs.length} QR codes
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">#</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">QR Code Value</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Status</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedQRs.slice(0, 10).map((qr, index) => (
                    <tr key={qr.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                      <td className="px-6 py-4">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-800">
                          {qr.code.substring(0, 20)}...
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                          Unclaimed
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm mr-3">
                          Download
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 font-semibold text-sm">
                          Copy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {generatedQRs.length > 10 && (
              <p className="text-sm text-gray-600 mt-4 text-center">
                Showing 10 of {generatedQRs.length} QR codes
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
