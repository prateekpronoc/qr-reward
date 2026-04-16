import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store'
import { apiService } from '../services/api'

export const QRScannerPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [manualInput, setManualInput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleManualQRInput = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const qrCode = await apiService.validateQRCode(manualInput)
      if (qrCode && !qrCode.claimed) {
        // Check for fraud
        const isFraud = await apiService.detectFraud(user?.id || '', qrCode.id)
        if (isFraud) {
          setError('Suspicious activity detected. Your account has been flagged.')
          return
        }

        const reward = await apiService.claimReward(
          qrCode.id,
          user?.id || ''
        )
        navigate(`/reward/${reward.id}`)
      } else {
        setError('Invalid or already claimed QR code')
      }
    } catch (err) {
      setError('Failed to process QR code')
    } finally {
      setLoading(false)
      setManualInput('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center text-white mb-8 mt-6">
          <h1 className="text-4xl font-bold mb-2">Scan & Win</h1>
          <p className="text-lg opacity-90">Find QR codes and claim instant rewards</p>
        </div>

        {/* QR Scanner Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          {/* Scanner Placeholder */}
          <div className="bg-gray-100 rounded-lg p-8 mb-6 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📱</div>
              <p className="text-gray-600 font-medium">
                Use your camera to scan QR codes
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Or enter the code manually below
              </p>
            </div>
          </div>

          {/* Manual Input */}
          <form onSubmit={handleManualQRInput} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                QR Code Value
              </label>
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Paste QR code here..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !manualInput}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Processing...' : 'Scan & Claim Reward'}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-gray-700">
              <strong>📌 Demo Mode:</strong> Paste any QR code value above to simulate scanning
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="text-white text-center">
          <p className="text-sm opacity-75">Logged in as {user?.name}</p>
        </div>
      </div>
    </div>
  )
}
