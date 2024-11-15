import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStats, GameEvent, GameChoice, Opportunity } from '../types/game';
import { EVENTS, ACHIEVEMENTS, OPPORTUNITIES, RANDOM_EVENTS } from '../data/entrepreneurData';

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
    reputation: 50,
    achievements: [],
    team: 0,
    innovation: 0,
    marketShare: 0,
    productQuality: 0,
    emergenciesResolved: 0,
    milestonesPassed: [],
    lastEventTime: 0,
    consecutiveGoodDecisions: 0
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [completedEvents, setCompletedEvents] = useState<GameEvent[]>([]);
  const [currentMood, setCurrentMood] = useState<'neutral' | 'positive' | 'negative'>('neutral');
  
  // 引用最新事件的DOM元素
  const latestEventRef = useRef<HTMLDivElement>(null);
  const eventsContainerRef = useRef<HTMLDivElement>(null);

  // 自动滚动到最新事件
  useEffect(() => {
    if (latestEventRef.current && eventsContainerRef.current) {
      latestEventRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [completedEvents]);

  // 检查是否满足事件的特质要求
  const meetsTraitRequirements = (event: GameEvent) => {
    return event.requiredTraits.some(trait => selectedTraits.includes(trait));
  };

  // 处理事件
  const handleEvent = (event: GameEvent) => {
    const hasRequiredTrait = meetsTraitRequirements(event);
    const outcome = hasRequiredTrait ? event.positiveOutcome : event.negativeOutcome;
    
    setGameStats(prev => {
      const newStats = {
        ...prev,
        funding: Math.max(0, prev.funding + outcome.effect.funding),
        userBase: Math.max(0, prev.userBase + outcome.effect.userBase),
        morale: Math.max(0, Math.min(100, prev.morale + outcome.effect.morale)),
        reputation: Math.max(0, Math.min(100, prev.reputation + (outcome.effect.reputation || 0))),
      };
      return newStats;
    });
    
    // 更新心情和背景色
    setCurrentMood(hasRequiredTrait ? 'positive' : 'negative');
    setTimeout(() => setCurrentMood('neutral'), 2000);
    
    setCompletedEvents(prev => [...prev, event]);
  };

  // 获取背景颜色
  const getBackgroundColor = () => {
    switch (currentMood) {
      case 'positive':
        return 'from-green-400 via-emerald-500 to-teal-600';
      case 'negative':
        return 'from-red-400 via-rose-500 to-pink-600';
      default:
        return 'from-emerald-400 via-cyan-500 to-blue-500';
    }
  };

  // 自动播放逻辑
  useEffect(() => {
    let timer: number;
    
    if (isPlaying) {
      timer = window.setInterval(() => {
        if (currentMonth >= 36 || gameStats.morale <= 0) {
          setIsPlaying(false);
          onGameEnd(gameStats);
          return;
        }

        if (currentEventIndex < EVENTS.length && currentMonth >= EVENTS[currentEventIndex].month) {
          handleEvent(EVENTS[currentEventIndex]);
          setCurrentEventIndex(prev => prev + 1);
        }
        
        setCurrentMonth(prev => prev + 1);
      }, 500);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, currentMonth, gameStats, currentEventIndex]);

  return (
    <div className={`transition-colors duration-1000 bg-gradient-to-br ${getBackgroundColor()} p-6 rounded-xl shadow-lg`}>
      {/* 固定的状态栏 */}
      <div className="sticky top-0 z-10 bg-white bg-opacity-90 rounded-lg p-4 mb-6 backdrop-blur-sm">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <div className="text-blue-600 font-bold">资金</div>
            <div className="text-2xl font-bold">{gameStats.funding}万</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-green-600 font-bold">用户</div>
            <div className="text-2xl font-bold">{gameStats.userBase}k</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-yellow-600 font-bold">士气</div>
            <div className="text-2xl font-bold">{gameStats.morale}%</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-purple-600 font-bold">声望</div>
            <div className="text-2xl font-bold">{gameStats.reputation}</div>
          </div>
        </div>
        <div className="mt-4 text-center text-xl font-bold">
          第 {currentMonth} 个月
        </div>
      </div>

      {/* 事件历史 */}
      <div 
        ref={eventsContainerRef}
        className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar"
      >
        {completedEvents.map((event, index) => (
          <motion.div
            key={`${event.id}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-4 shadow"
            ref={index === completedEvents.length - 1 ? latestEventRef : null}
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

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="mt-6 w-full py-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg font-bold backdrop-blur-sm transition-colors"
      >
        {isPlaying ? '暂停 ⏸' : '继续 ▶'}
      </button>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
} 