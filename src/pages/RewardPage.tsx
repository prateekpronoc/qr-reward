import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ScratchCardComponent } from '../components/ScratchCard'
import { Reward } from '../types'

export const RewardPage: React.FC = () => {
  const { rewardId } = useParams<{ rewardId: string }>()
  const navigate = useNavigate()
  const [reward, setReward] = useState<Reward | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock reward loading
    const mockReward: Reward = {
      id: rewardId || '',
      qrCodeId: 'qr_001',
      campaignId: 'camp_001',
      userId: 'user_001',
      amount: 500,
      status: 'claimed',
      scratchCardRevealed: false,
      scratchCards: Array.from({ length: 9 }, (_, i) => ({
        id: `sc_${i}`,
        position: i,
        revealed: false,
        value: i === 4 ? 500 : Math.floor(Math.random() * 200),
      })),
      createdAt: new Date().toISOString(),
    }
    setReward(mockReward)
    setLoading(false)
  }, [rewardId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Loading your reward...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4 pb-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center text-white mb-8 mt-6">
          <h1 className="text-4xl font-bold mb-2">🎉 You Won!</h1>
          <p className="text-lg opacity-90">Scratch to reveal your instant reward</p>
        </div>

        {/* Reward Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          {/* Congratulations Message */}
          <div className="text-center mb-8">
            <div className="inline-block bg-green-100 text-green-800 px-6 py-2 rounded-full font-semibold mb-4">
              Reward Claimed! ✓
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              You've earned a reward!
            </h2>
            <p className="text-gray-600">
              Scratch the cards below to reveal your instant reward amount
            </p>
          </div>

          {/* Scratch Card Component */}
          {reward && <ScratchCardComponent rewardId={reward.id} />}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button
              onClick={() => navigate('/scan')}
              className="px-6 py-3 border-2 border-purple-600 text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition-all"
            >
              Scan More
            </button>
            <button
              onClick={() => navigate(`/payment/${rewardId}`)}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
            >
              Get Paid
            </button>
          </div>
        </div>

        {/* Reward Details */}
        <div className="bg-white bg-opacity-95 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Reward Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Reward ID:</span>
              <span className="font-mono text-sm text-gray-800">{rewardId?.slice(0, 12)}...</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Campaign:</span>
              <span className="text-gray-800 font-semibold">Summer Sale 2024</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status:</span>
              <span className="text-green-600 font-semibold">✓ Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Claimed At:</span>
              <span className="text-gray-800">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
