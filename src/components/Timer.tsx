import React from 'react';
import { motion } from 'framer-motion';

interface TimerProps {
  timeLeft: number;
  maxTime: number;
}

export function Timer({ timeLeft, maxTime }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / maxTime) * 100;

  return (
    <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-orange-500"
        initial={{ width: '100%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute top-0 left-0 w-full text-center text-xs font-bold leading-4 text-white">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
}