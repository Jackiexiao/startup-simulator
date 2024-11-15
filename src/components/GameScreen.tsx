import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStats, GameEvent } from '../types/game';
import { EVENTS } from '../data/entrepreneurData';

interface GameScreenProps {
  selectedTraits: string[];
  onGameEnd: (stats: GameStats) => void;
}

export function GameScreen({ selectedTraits, onGameEnd }: GameScreenProps) {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [gameStats, setGameStats] = useState<GameStats>({
    funding: 10,
    userBase: 0,
    morale: 100,
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [completedEvents, setCompletedEvents] = useState<GameEvent[]>([]);

  // 检查是否满足事件的特质要求
  const meetsTraitRequirements = (event: GameEvent) => {
    return event.requiredTraits.some(trait => selectedTraits.includes(trait));
  };

  // 处理事件
  const handleEvent = (event: GameEvent) => {
    const hasRequiredTrait = meetsTraitRequirements(event);
    const outcome = hasRequiredTrait ? event.positiveOutcome : event.negativeOutcome;
    
    setGameStats(prev => ({
      funding: Math.max(0, prev.funding + outcome.effect.funding),
      userBase: Math.max(0, prev.userBase + outcome.effect.userBase),
      morale: Math.max(0, Math.min(100, prev.morale + outcome.effect.morale)),
    }));
    
    setCompletedEvents(prev => [...prev, event]);
  };

  // 自动播放
  useEffect(() => {
    let timer: number;
    
    if (isPlaying && currentEventIndex < EVENTS.length) {
      timer = window.setInterval(() => {
        const nextEvent = EVENTS[currentEventIndex];
        if (currentMonth >= nextEvent.month) {
          handleEvent(nextEvent);
          setCurrentEventIndex(prev => prev + 1);
        }
        
        if (currentMonth >= 36 || gameStats.morale <= 0) {
          setIsPlaying(false);
          onGameEnd(gameStats);
          return;
        }
        
        setCurrentMonth(prev => prev + 1);
      }, 500);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, currentMonth, currentEventIndex, gameStats.morale]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold">第 {currentMonth} 个月</div>
        <div className="flex space-x-4">
          <div className="px-4 py-2 bg-blue-100 rounded-lg">
            资金: {gameStats.funding}万
          </div>
          <div className="px-4 py-2 bg-green-100 rounded-lg">
            用户: {gameStats.userBase}k
          </div>
          <div className="px-4 py-2 bg-yellow-100 rounded-lg">
            士气: {gameStats.morale}%
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <h3 className="font-bold text-xl">创业历程:</h3>
        <div className="space-y-4">
          {completedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg font-bold">第 {event.month} 个月</span>
                <h3 className="text-xl font-bold">{event.title}</h3>
              </div>
              <p className="mb-2 text-gray-600">{event.description}</p>
              <p className={`font-medium ${
                meetsTraitRequirements(event) ? 'text-green-600' : 'text-red-600'
              }`}>
                {meetsTraitRequirements(event) 
                  ? event.positiveOutcome.text 
                  : event.negativeOutcome.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="mt-6 w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-bold"
      >
        {isPlaying ? '暂停 ⏸' : '继续 ▶'}
      </button>
    </div>
  );
} 