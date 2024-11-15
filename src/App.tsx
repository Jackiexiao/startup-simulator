import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TRAITS, EVENTS, ENDINGS } from './data/entrepreneurData';
import { GameScreen } from './components/GameScreen';
import { GameStats } from './types/game';

function App() {
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [finalStats, setFinalStats] = useState<GameStats | null>(null);

  const handleTraitSelection = (traitId: string) => {
    if (selectedTraits.includes(traitId)) {
      setSelectedTraits(prev => prev.filter(id => id !== traitId));
    } else if (selectedTraits.length < 3) {
      setSelectedTraits(prev => [...prev, traitId]);
    }
  };

  const startGame = () => {
    if (selectedTraits.length === 3) {
      setGameStarted(true);
    }
  };

  const handleGameEnd = (stats: GameStats) => {
    setGameEnded(true);
    setFinalStats(stats);
  };

  const restartGame = () => {
    setSelectedTraits([]);
    setGameStarted(false);
    setGameEnded(false);
    setFinalStats(null);
  };

  const getEnding = (stats: GameStats) => {
    return ENDINGS.find(ending => 
      stats.funding >= ending.requirements.funding &&
      stats.userBase >= ending.requirements.userBase &&
      stats.morale >= ending.requirements.morale
    ) || {
      id: 'failure',
      title: '创业失败',
      description: '创业路上困难重重，期待下次能够东山再起！',
      requirements: { funding: 0, userBase: 0, morale: 0 }
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          创业模拟器
        </h1>
        
        <AnimatePresence mode="wait">
          {!gameStarted ? (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                选择你的创业者特质 (选择3个)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {TRAITS.map(trait => (
                  <motion.button
                    key={trait.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-lg ${
                      selectedTraits.includes(trait.id)
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => handleTraitSelection(trait.id)}
                  >
                    <div className="text-2xl mb-2">{trait.icon}</div>
                    <div className="font-bold">{trait.name}</div>
                    <div className="text-sm">{trait.description}</div>
                  </motion.button>
                ))}
              </div>
              
              <button
                className={`mt-6 w-full py-3 rounded-lg font-bold ${
                  selectedTraits.length === 3
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={startGame}
                disabled={selectedTraits.length !== 3}
              >
                开始创业之旅
              </button>
            </div>
          ) : gameEnded && finalStats ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                游戏结束
              </h2>
              {finalStats && (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">
                      {getEnding(finalStats).title}
                    </h3>
                    <p className="text-gray-600">
                      {getEnding(finalStats).description}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      最终资金: {finalStats.funding}万
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      最终用户: {finalStats.userBase}k
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      团队士气: {finalStats.morale}%
                    </div>
                  </div>
                  <button
                    onClick={restartGame}
                    className="mt-6 w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-bold"
                  >
                    重新开始
                  </button>
                </>
              )}
            </motion.div>
          ) : (
            <GameScreen
              selectedTraits={selectedTraits}
              onGameEnd={handleGameEnd}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;