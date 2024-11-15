import { GameEvent } from '../types/game';

export const GAME_EVENTS: GameEvent[] = [
  {
    id: 'coffee',
    text: '队友带来了特制咖啡! ☕',
    type: 'positive',
    energyEffect: 40,
    progressEffect: 0
  },
  {
    id: 'bug',
    text: '遇到了严重的 bug! 🐛',
    type: 'negative',
    energyEffect: -10,
    progressEffect: -5
  },
  {
    id: 'inspiration',
    text: '灵感爆发! 💡',
    type: 'positive',
    energyEffect: 20,
    progressEffect: 10
  },
  {
    id: 'crash',
    text: '系统崩溃了! 💥',
    type: 'negative',
    energyEffect: -20,
    progressEffect: -10
  },
  {
    id: 'solution',
    text: '找到了完美解决方案! 🎯',
    type: 'positive',
    energyEffect: 10,
    progressEffect: 15
  },
  {
    id: 'pizza',
    text: '有人请客吃披萨! 🍕',
    type: 'positive',
    energyEffect: 30,
    progressEffect: 5
  },
  {
    id: 'nap',
    text: '不小心打了个盹 😴',
    type: 'neutral',
    energyEffect: 25,
    progressEffect: -5
  },
  {
    id: 'mentor',
    text: '导师提供了关键建议! 👨‍💻',
    type: 'positive',
    energyEffect: 0,
    progressEffect: 20
  },
  {
    id: 'redbull',
    text: '喝了一罐红牛! 🥤',
    type: 'positive',
    energyEffect: 50,
    progressEffect: -5
  },
  {
    id: 'github',
    text: 'GitHub 服务器宕机了! 😱',
    type: 'negative',
    energyEffect: -15,
    progressEffect: -15
  },
  {
    id: 'stackoverflow',
    text: '在 Stack Overflow 找到完美答案! 📚',
    type: 'positive',
    energyEffect: 5,
    progressEffect: 25
  },
  {
    id: 'keyboard',
    text: '机械键盘打字上头了! ⌨️',
    type: 'positive',
    energyEffect: -10,
    progressEffect: 30
  }
];

export const ACHIEVEMENTS = [
  {
    id: 'coffee_lover',
    title: '咖啡上瘾',
    description: '连续喝3杯咖啡',
    icon: '☕',
    unlocked: false
  },
  {
    id: 'speed_coder',
    title: '极速开发',
    description: '在10分钟内完成20%的进度',
    icon: '⚡',
    unlocked: false
  },
  {
    id: 'night_owl',
    title: '夜猫子',
    description: '在深夜写代码',
    icon: '🦉',
    unlocked: false
  },
  {
    id: 'bug_hunter',
    title: '捉虫达人',
    description: '连续修复3个bug',
    icon: '🐛',
    unlocked: false
  },
  {
    id: 'combo_master',
    title: '连击大师',
    description: '达成10连击',
    icon: '🔥',
    unlocked: false
  },
  {
    id: 'survivor',
    title: '生存专家',
    description: '能量值低于20%时完成编码',
    icon: '🏆',
    unlocked: false
  }
];