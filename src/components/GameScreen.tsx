import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStats, GameEvent, GameChoice } from '../types/game';
import { EVENTS, ACHIEVEMENTS } from '../data/entrepreneurData';

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
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [completedEvents, setCompletedEvents] = useState<GameEvent[]>([]);
  const [showingChoices, setShowingChoices] = useState(false);
  const [currentChoices, setCurrentChoices] = useState<GameChoice[]>([]);
  const [recentAchievement, setRecentAchievement] = useState<string | null>(null);

  // 检查是否满足事件的特质要求
  const meetsTraitRequirements = (event: GameEvent) => {
    return event.requiredTraits.some(trait => selectedTraits.includes(trait));
  };

  // 检查成就
  const checkAchievements = (stats: GameStats) => {
    ACHIEVEMENTS.forEach(achievement => {
      if (!stats.achievements.includes(achievement.id) && achievement.condition(stats)) {
        setRecentAchievement(achievement.title);
        setGameStats(prev => ({
          ...prev,
          achievements: [...prev.achievements, achievement.id]
        }));
        setTimeout(() => setRecentAchievement(null), 3000);
      }
    });
  };

  // 处理选择
  const handleChoice = (choice: GameChoice) => {
    setShowingChoices(false);
    setGameStats(prev => ({
      ...prev,
      funding: Math.max(0, prev.funding + choice.outcome.effect.funding),
      userBase: Math.max(0, prev.userBase + choice.outcome.effect.userBase),
      morale: Math.max(0, Math.min(100, prev.morale + choice.outcome.effect.morale)),
      reputation: Math.max(0, Math.min(100, prev.reputation + (choice.outcome.effect.reputation || 0))),
    }));
  };

  // 处理事件
  const handleEvent = (event: GameEvent) => {
    if (event.choices) {
      setCurrentChoices(event.choices);
      setShowingChoices(true);
      return;
    }

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
      checkAchievements(newStats);
      return newStats;
    });
    
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
      {/* 状态栏 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-3 bg-blue-100 rounded-lg text-center">
          <div className="text-sm text-blue-600">资金</div>
          <div className="text-xl font-bold text-blue-800">{gameStats.funding}万</div>
        </div>
        <div className="p-3 bg-green-100 rounded-lg text-center">
          <div className="text-sm text-green-600">用户</div>
          <div className="text-xl font-bold text-green-800">{gameStats.userBase}k</div>
        </div>
        <div className="p-3 bg-yellow-100 rounded-lg text-center">
          <div className="text-sm text-yellow-600">士气</div>
          <div className="text-xl font-bold text-yellow-800">{gameStats.morale}%</div>
        </div>
        <div className="p-3 bg-purple-100 rounded-lg text-center">
          <div className="text-sm text-purple-600">声望</div>
          <div className="text-xl font-bold text-purple-800">{gameStats.reputation}</div>
        </div>
      </div>

      {/* 成就提示 */}
      <AnimatePresence>
        {recentAchievement && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-4 right-4 bg-yellow-100 border-2 border-yellow-400 p-4 rounded-lg shadow-lg"
          >
            <div className="text-yellow-800">
              <div className="font-bold">🏆 解锁成就</div>
              <div>{recentAchievement}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 选择界面 */}
      {showingChoices && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">做出选择:</h3>
          <div className="space-y-3">
            {currentChoices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(choice)}
                className={`w-full p-4 text-left rounded-lg transition-colors ${
                  choice.requiredTraits?.some(trait => selectedTraits.includes(trait))
                    ? 'bg-green-50 hover:bg-green-100'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium mb-1">{choice.text}</div>
                {choice.requiredTraits?.some(trait => selectedTraits.includes(trait)) && (
                  <div className="text-sm text-green-600">✨ 特质加成</div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 事件历史 */}
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