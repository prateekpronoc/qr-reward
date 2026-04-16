import React, { useState } from 'react'
import { apiService } from '../services/api'

export const ScratchCardComponent: React.FC<{ rewardId: string }> = ({
  rewardId,
}) => {
  const [revealedCards, setRevealedCards] = useState<boolean[]>(
    Array(9).fill(false)
  )
  const [revealedValues, setRevealedValues] = useState<(number | null)[]>(
    Array(9).fill(null)
  )

  const handleScratchCard = async (index: number) => {
    if (revealedCards[index]) return

    const value = await apiService.revealScratchCard(rewardId, index)
    const newRevealed = [...revealedCards]
    newRevealed[index] = true
    setRevealedCards(newRevealed)

    const newValues = [...revealedValues]
    newValues[index] = value
    setRevealedValues(newValues)
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Scratch to Reveal Your Reward!
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {revealedCards.map((revealed, index) => (
            <button
              key={index}
              onClick={() => handleScratchCard(index)}
              className={`w-full aspect-square rounded-lg font-bold text-lg transition-all transform hover:scale-105 ${
                revealed
                  ? 'bg-green-100 text-green-800 border-2 border-green-400'
                  : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:shadow-lg active:scale-95'
              }`}
              disabled={revealed}
            >
              {revealed ? `₹${revealedValues[index]}` : '?'}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600 text-center">
          Click on any card to reveal your instant reward!
        </p>
      </div>

      {revealedValues.some((v) => v !== null) && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-green-800 font-semibold">
            Maximum Revealed: ₹
            {Math.max(...revealedValues.filter((v) => v !== null))}
          </p>
        </div>
      )}
    </div>
  )
}
