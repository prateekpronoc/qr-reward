import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiService } from '../services/api'

export const PaymentPage: React.FC = () => {
  const { rewardId } = useParams<{ rewardId: string }>()
  const navigate = useNavigate()
  const [upiId, setUpiId] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [paymentId, setPaymentId] = useState('')

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payment = await apiService.initiatePayment(
        rewardId || '',
        upiId
      )
      setPaymentId(payment.id)

      // Simulate payment processing
      setTimeout(async () => {
        const status = await apiService.getPaymentStatus(payment.id)
        if (status.status === 'completed') {
          setSuccess(true)
        } else {
          setError('Payment processing failed. Please try again.')
        }
        setLoading(false)
      }, 2000)
    } catch (err) {
      setError('Failed to initiate payment')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Your reward has been transferred to your UPI account
          </p>

          <div className="bg-green-50 p-6 rounded-lg mb-6 border-2 border-green-200">
            <p className="text-sm text-gray-600 mb-2">Transaction ID:</p>
            <p className="font-mono text-lg font-bold text-green-700">{paymentId}</p>
            <p className="text-sm text-gray-600 mt-4">Amount: ₹500</p>
            <p className="text-sm text-gray-600">UPI: {upiId}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/scan')}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Scan More QR Codes
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
            >
              Go Home
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Payment may take 1-2 minutes to reflect in your account
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center text-white mb-8 mt-6">
          <h1 className="text-4xl font-bold mb-2">💰 Get Paid</h1>
          <p className="text-lg opacity-90">Enter your UPI details to receive payment</p>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handlePaymentSubmit} className="space-y-5">
            {/* Amount Display */}
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg p-6 text-center mb-6">
              <p className="text-sm opacity-90">You will receive</p>
              <p className="text-4xl font-bold">₹500</p>
            </div>

            {/* UPI ID Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID
              </label>
              <input
                type="email"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@bankname"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                e.g., yourname@googlepay, yourname@paytm
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the terms and conditions and confirm my UPI details are correct
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !upiId}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Processing Payment...' : 'Receive ₹500 to UPI'}
            </button>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
            >
              Back
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-gray-700">
              <strong>✓ Secure:</strong> Your payment details are encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
