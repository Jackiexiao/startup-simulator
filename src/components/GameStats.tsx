import React from 'react';
import { motion } from 'framer-motion';
import { GameStats as GameStatsType } from '../types/game';

interface GameStatsProps {
  stats: GameStatsType;
  onClose: () => void;
}

export function GameStats({ stats, onClose }: GameStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl p-6 max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-600">游戏统计 📊</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span className="font-medium text-blue-700">代码行数</span>
            <span className="text-blue-600">{stats.linesOfCode}</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <span className="font-medium text-green-700">修复Bug数</span>
            <span className="text-green-600">{stats.bugsFixed}</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
            <span className="font-medium text-yellow-700">喝掉的咖啡</span>
            <span className="text-yellow-600">{stats.coffeesDrunk} ☕</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
            <span className="font-medium text-red-700">最高连击</span>
            <span className="text-red-600">{stats.maxCombo} 🔥</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}