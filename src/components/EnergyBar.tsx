import React from 'react';
import { motion } from 'framer-motion';

interface EnergyBarProps {
  energy: number;
  maxEnergy: number;
}

export function EnergyBar({ energy, maxEnergy }: EnergyBarProps) {
  const progress = (energy / maxEnergy) * 100;

  return (
    <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ width: '100%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
      <div className="absolute top-0 left-0 w-full text-center text-xs font-bold leading-4 text-white">
        精力值: {energy}
      </div>
    </div>
  );
}