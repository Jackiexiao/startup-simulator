import React from 'react';
import { motion } from 'framer-motion';
import { Achievement } from '../types/game';

interface AchievementsProps {
  achievements: Achievement[];
  onClose: () => void;
}

export function Achievements({ achievements, onClose }: AchievementsProps) {
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
        className="bg-white rounded-xl p-6 max-w-md w-full space-y-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-purple-600">成就系统 🏆</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-3">
          {achievements.map(achievement => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg ${
                achievement.unlocked
                  ? 'bg-purple-50 text-purple-700'
                  : 'bg-gray-50 text-gray-500'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-sm">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}