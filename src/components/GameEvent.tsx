import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameEvent as GameEventType } from '../types/game';

interface GameEventProps {
  event: GameEventType | null;
}

export function GameEvent({ event }: GameEventProps) {
  if (!event) return null;

  const bgColor = {
    positive: 'bg-green-100 text-green-700',
    negative: 'bg-red-100 text-red-700',
    neutral: 'bg-blue-100 text-blue-700'
  }[event.type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className={`p-3 rounded-lg mb-4 text-center ${bgColor}`}
      >
        <p className="font-medium">{event.text}</p>
        <div className="text-sm mt-1">
          {event.energyEffect !== 0 && (
            <span className="mr-2">
              精力 {event.energyEffect > 0 ? '+' : ''}{event.energyEffect}
            </span>
          )}
          {event.progressEffect !== 0 && (
            <span>
              进度 {event.progressEffect > 0 ? '+' : ''}{event.progressEffect}%
            </span>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}