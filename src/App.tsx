import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer } from './components/Timer';
import { EnergyBar } from './components/EnergyBar';
import { GameEvent as GameEventDisplay } from './components/GameEvent';
import { Achievements } from './components/Achievements';
import { GameStats } from './components/GameStats';
import { GAME_EVENTS, ACHIEVEMENTS } from './data/gameData';
import { GameEvent, Achievement, GameStats as GameStatsType } from './types/game';

const HACKATHON_TIME = 48 * 60;
const MAX_ENERGY = 100;
const ENERGY_COST = 20;
const COFFEE_RESTORE = 30;

const technologies = [
  "React", "Vue", "Next.js", "Node.js", "Python",
  "AI/ML", "区块链", "AR/VR", "IoT", "云原生"
];

const domains = [
  "教育", "健康", "环保", "社交", "金融",
  "娱乐", "生产力", "远程办公", "智能家居", "数字艺术"
];

const features = [
  "实时协作", "AI助手", "语音控制", "3D可视化",
  "社区互动", "游戏化", "数据分析", "个性化推荐"
];

function App() {
  const [timeLeft, setTimeLeft] = useState(HACKATHON_TIME);
  const [energy, setEnergy] = useState(MAX_ENERGY);
  const [tech, setTech] = useState('');
  const [domain, setDomain] = useState('');
  const [feature, setFeature] = useState('');
  const [progress, setProgress] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [coffeeStreak, setCoffeeStreak] = useState(0);
  const [achievements, setAchievements] = useState(ACHIEVEMENTS);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [combo, setCombo] = useState(0);
  const [stats, setStats] = useState<GameStatsType>({
    bugsFixed: 0,
    coffeesDrunk: 0,
    linesOfCode: 0,
    maxCombo: 0
  });

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        if (Math.random() < 0.05) {
          triggerRandomEvent();
        }
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  useEffect(() => {
    checkAchievements();
  }, [coffeeStreak, progress, timeLeft, combo, energy, stats]);

  const checkAchievements = () => {
    const newAchievements = [...achievements];
    let updated = false;

    if (coffeeStreak >= 3 && !achievements.find(a => a.id === 'coffee_lover')?.unlocked) {
      const index = newAchievements.findIndex(a => a.id === 'coffee_lover');
      if (index !== -1) {
        newAchievements[index] = { ...newAchievements[index], unlocked: true };
        updated = true;
      }
    }

    if (combo >= 10 && !achievements.find(a => a.id === 'combo_master')?.unlocked) {
      const index = newAchievements.findIndex(a => a.id === 'combo_master');
      if (index !== -1) {
        newAchievements[index] = { ...newAchievements[index], unlocked: true };
        updated = true;
      }
    }

    if (stats.bugsFixed >= 3 && !achievements.find(a => a.id === 'bug_hunter')?.unlocked) {
      const index = newAchievements.findIndex(a => a.id === 'bug_hunter');
      if (index !== -1) {
        newAchievements[index] = { ...newAchievements[index], unlocked: true };
        updated = true;
      }
    }

    if (energy < 20 && !achievements.find(a => a.id === 'survivor')?.unlocked) {
      const index = newAchievements.findIndex(a => a.id === 'survivor');
      if (index !== -1) {
        newAchievements[index] = { ...newAchievements[index], unlocked: true };
        updated = true;
      }
    }

    const hour = new Date().getHours();
    if ((hour >= 22 || hour <= 5) && !achievements.find(a => a.id === 'night_owl')?.unlocked) {
      const index = newAchievements.findIndex(a => a.id === 'night_owl');
      if (index !== -1) {
        newAchievements[index] = { ...newAchievements[index], unlocked: true };
        updated = true;
      }
    }

    if (updated) {
      setAchievements(newAchievements);
    }
  };

  const triggerRandomEvent = () => {
    const event = GAME_EVENTS[Math.floor(Math.random() * GAME_EVENTS.length)];
    setCurrentEvent(event);
    
    setEnergy(prev => Math.min(MAX_ENERGY, Math.max(0, prev + event.energyEffect)));
    setProgress(prev => Math.min(100, Math.max(0, prev + event.progressEffect)));

    if (event.id === 'bug') {
      setStats(prev => ({ ...prev, bugsFixed: prev.bugsFixed + 1 }));
    }

    setTimeout(() => setCurrentEvent(null), 3000);
  };

  const drinkCoffee = () => {
    if (energy + COFFEE_RESTORE <= MAX_ENERGY) {
      setEnergy(prev => prev + COFFEE_RESTORE);
      setCoffeeStreak(prev => prev + 1);
      setStats(prev => ({ ...prev, coffeesDrunk: prev.coffeesDrunk + 1 }));
      setCurrentEvent({
        id: 'coffee',
        text: '喝了一杯咖啡，精力恢复了！☕',
        type: 'positive',
        energyEffect: COFFEE_RESTORE,
        progressEffect: 0
      });
      setTimeout(() => setCurrentEvent(null), 2000);
    }
  };

  const generateIdea = () => {
    if (energy < ENERGY_COST) {
      setCurrentEvent({
        id: 'tired',
        text: '精力不足，需要休息一下！😴',
        type: 'negative',
        energyEffect: 0,
        progressEffect: 0
      });
      setTimeout(() => setCurrentEvent(null), 2000);
      return;
    }

    setIsSpinning(true);
    setEnergy(prev => prev - ENERGY_COST);
    
    const randomTech = technologies[Math.floor(Math.random() * technologies.length)];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const randomFeature = features[Math.floor(Math.random() * features.length)];
    
    setTimeout(() => {
      setTech(randomTech);
      setDomain(randomDomain);
      setFeature(randomFeature);
      
      setCombo(prev => prev + 1);
      const comboBonus = Math.floor(combo / 3) * 5;
      const progressGain = Math.min(20 + comboBonus, 100);
      setProgress(prev => Math.min(prev + progressGain, 100));
      
      setStats(prev => ({
        ...prev,
        linesOfCode: prev.linesOfCode + Math.floor(Math.random() * 100) + 50,
        maxCombo: Math.max(prev.maxCombo, combo + 1)
      }));
      
      setIsSpinning(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-purple-600">
            黑客松生存游戏 🚀
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowStats(true)}
              className="text-purple-600 hover:text-purple-700"
            >
              📊
            </button>
            <button
              onClick={() => setShowAchievements(true)}
              className="text-purple-600 hover:text-purple-700"
            >
              🏆
            </button>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <Timer timeLeft={timeLeft} maxTime={HACKATHON_TIME} />
          <EnergyBar energy={energy} maxEnergy={MAX_ENERGY} />
          
          <div className="bg-yellow-50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <h2 className="font-semibold text-yellow-700">项目进度:</h2>
              {combo > 1 && (
                <span className="text-sm font-medium text-yellow-600">
                  {combo} 连击! 🔥
                </span>
              )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div
                className="bg-yellow-400 h-2.5 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        <GameEventDisplay event={currentEvent} />

        <div className="space-y-4">
          <motion.div
            className="bg-purple-50 p-4 rounded-lg"
            animate={{ scale: isSpinning ? 1.05 : 1 }}
          >
            <h2 className="font-semibold text-purple-700 mb-2">技术栈:</h2>
            <p className="text-xl">{tech || '?'}</p>
          </motion.div>

          <motion.div
            className="bg-blue-50 p-4 rounded-lg"
            animate={{ scale: isSpinning ? 1.05 : 1 }}
          >
            <h2 className="font-semibold text-blue-700 mb-2">领域:</h2>
            <p className="text-xl">{domain || '?'}</p>
          </motion.div>

          <motion.div
            className="bg-green-50 p-4 rounded-lg"
            animate={{ scale: isSpinning ? 1.05 : 1 }}
          >
            <h2 className="font-semibold text-green-700 mb-2">特色功能:</h2>
            <p className="text-xl">{feature || '?'}</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={generateIdea}
              disabled={isSpinning || gameOver || energy < ENERGY_COST}
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSpinning ? '编码中...' : '写代码!'}
            </button>
            
            <button
              onClick={drinkCoffee}
              disabled={energy === MAX_ENERGY || gameOver}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              喝咖啡 ☕
            </button>
          </div>
        </div>

        {gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-4 bg-indigo-50 rounded-lg text-center"
          >
            <h3 className="font-bold text-xl text-indigo-700 mb-2">
              {progress >= 100 ? '恭喜完成项目! 🎉' : '时间到! ⏰'}
            </h3>
            <p className="text-indigo-600">
              项目完成度: {progress}%
            </p>
          </motion.div>
        )}

        {tech && domain && feature && !gameOver && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">当前任务:</h3>
            <p className="text-gray-600">
              使用 {tech} 开发一个面向{domain}领域的创新项目，
              主打{feature}特色功能，让用户获得全新的体验！
            </p>
          </div>
        )}

        <AnimatePresence>
          {showAchievements && (
            <Achievements
              achievements={achievements}
              onClose={() => setShowAchievements(false)}
            />
          )}
          {showStats && (
            <GameStats
              stats={stats}
              onClose={() => setShowStats(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;