export const TRAITS = [
  {
    id: 'leadership',
    name: '领导力',
    icon: '👑',
    description: '带领团队向共同目标前进的能力'
  },
  {
    id: 'negotiation',
    name: '谈判能力',
    icon: '🤝',
    description: '在商务谈判中获得有利条件的能力'
  },
  {
    id: 'tech',
    name: '技术专长',
    icon: '💻',
    description: '对技术领域的深刻理解和实践能力'
  },
  {
    id: 'marketing',
    name: '营销能力',
    icon: '📢',
    description: '产品推广和市场开拓的能力'
  },
  {
    id: 'finance',
    name: '财务管理',
    icon: '💰',
    description: '资金规划和财务风险控制能力'
  },
  {
    id: 'pressure',
    name: '抗压能力',
    icon: '🏋️',
    description: '在高压环境下保持清醒决策的能力'
  },
  {
    id: 'social',
    name: '社交能力',
    icon: '🤹',
    description: '建立人脉和维护关系的能力'
  },
  {
    id: 'innovation',
    name: '创新思维',
    icon: '💡',
    description: '突破常规思维提出创新方案的能力'
  },
  {
    id: 'execution',
    name: '执行力',
    icon: '🎯',
    description: '高效完成目标的行动力'
  },
  {
    id: 'business',
    name: '商业嗅觉',
    icon: '👃',
    description: '捕捉商业机会的敏锐度'
  }
];

export const EVENTS = [
  {
    id: 'find_cofounder',
    month: 1,
    title: '寻找联合创始人',
    description: '你在一次创业沙龙上遇到了志同道合的伙伴',
    requiredTraits: ['social'],
    positiveOutcome: {
      text: '你们一拍即合，决定共同创业！这位联合创始人曾在大厂担任技术主管，能力出众。',
      effect: { morale: 15, funding: 0, userBase: 0 }
    },
    negativeOutcome: {
      text: '未能找到合适的联合创始人，只能独自前行。创业的道路上，你感觉有些孤独。',
      effect: { morale: -10, funding: 0, userBase: 0 }
    }
  },
  {
    id: 'mvp_development',
    month: 3,
    title: '最小可行产品开发',
    description: '团队开始开发产品的第一个版本',
    requiredTraits: ['tech', 'execution'],
    positiveOutcome: {
      text: '在技术专长的帮助下，团队快速完成了MVP开发，产品体验获得早期用户好评！',
      effect: { morale: 10, funding: 0, userBase: 5 }
    },
    negativeOutcome: {
      text: '由于技术经验不足，产品开发进度缓慢，多次返工，团队有些沮丧。',
      effect: { morale: -15, funding: -5, userBase: 0 }
    }
  },
  {
    id: 'angel_investment',
    month: 6,
    title: '天使轮融资',
    description: '你开始接触投资人，寻求第一笔外部融资',
    requiredTraits: ['negotiation', 'business'],
    positiveOutcome: {
      text: '通过出色的商业计划书和谈判能力，成功获得500万天使投资！投资人也将为公司带来宝贵的资源。',
      effect: { morale: 20, funding: 50, userBase: 0 }
    },
    negativeOutcome: {
      text: '投资人认为项目还不够成熟，建议继续打磨产品。这次失败的融资尝试打击了团队信心。',
      effect: { morale: -15, funding: 0, userBase: 0 }
    }
  },
  {
    id: 'market_expansion',
    month: 12,
    title: '市场扩张',
    description: '产品初具规模，团队决定开拓新的市场',
    requiredTraits: ['marketing', 'execution'],
    positiveOutcome: {
      text: '营销策略非常成功！产品在新市场获得了极大关注，用户数快速增长。',
      effect: { morale: 15, funding: 20, userBase: 30 }
    },
    negativeOutcome: {
      text: '扩张过于激进，获客成本居高不下，消耗了大量资金。',
      effect: { morale: -10, funding: -30, userBase: 5 }
    }
  },
  {
    id: 'competitor_challenge',
    month: 15,
    title: '竞争对手入场',
    description: '一家实力强劲的公司进入市场，带来了激烈的竞争',
    requiredTraits: ['innovation', 'pressure'],
    positiveOutcome: {
      text: '在压力下团队迸发创新灵感，推出独特功能，成功与竞争对手形成差异化竞争。',
      effect: { morale: 10, funding: 0, userBase: 20 }
    },
    negativeOutcome: {
      text: '竞争对手的强势攻势导致用户流失，团队陷入被动。',
      effect: { morale: -20, funding: -10, userBase: -15 }
    }
  },
  {
    id: 'core_team_recruitment',
    month: 18,
    title: '核心团队组建',
    description: '公司快速发展，需要招募关键岗位人才',
    requiredTraits: ['leadership', 'social'],
    positiveOutcome: {
      text: '成功招募到多位业内专家加入！团队实力大大增强。',
      effect: { morale: 25, funding: -20, userBase: 10 }
    },
    negativeOutcome: {
      text: '理想的候选人都被大公司高薪挖走，招聘陷入困境。',
      effect: { morale: -15, funding: -10, userBase: 0 }
    }
  },
  {
    id: 'series_a',
    month: 24,
    title: 'A轮融资',
    description: '公司进入快速发展期，需要大额融资支持',
    requiredTraits: ['business', 'negotiation'],
    positiveOutcome: {
      text: '成功获得2000万A轮融资！公司估值达到2亿。',
      effect: { morale: 30, funding: 200, userBase: 50 }
    },
    negativeOutcome: {
      text: 'A轮融资失败，公司发展受限，不得不开始控制成本。',
      effect: { morale: -25, funding: -20, userBase: -10 }
    }
  },
  {
    id: 'product_crisis',
    month: 30,
    title: '产品危机',
    description: '核心系统出现重大故障，影响用户使用',
    requiredTraits: ['tech', 'pressure'],
    positiveOutcome: {
      text: '团队连续作战三天三夜，成功解决问题，并优化了系统架构！',
      effect: { morale: 15, funding: 0, userBase: -5 }
    },
    negativeOutcome: {
      text: '故障持续时间过长，大量用户流失，公司声誉受损。',
      effect: { morale: -30, funding: -50, userBase: -40 }
    }
  },
  {
    id: 'strategic_cooperation',
    month: 36,
    title: '战略合作',
    description: '与行业巨头达成合作意向',
    requiredTraits: ['negotiation', 'business'],
    positiveOutcome: {
      text: '成功建立战略合作伙伴关系！公司价值获得资本市场认可。',
      effect: { morale: 20, funding: 100, userBase: 100 }
    },
    negativeOutcome: {
      text: '合作谈判破裂，前期投入的资源付诸东流。',
      effect: { morale: -20, funding: -30, userBase: 0 }
    }
  }
];

export const ENDINGS = [
  {
    id: 'ipo_success',
    title: '成功上市',
    description: '你的公司成功在纳斯达克上市，市值超过10亿美元！',
    requirements: { funding: 1000, userBase: 100, morale: 80 }
  },
  {
    id: 'acquisition',
    title: '并购退出',
    description: '公司被科技巨头收购，创始团队获得丰厚回报',
    requirements: { funding: 500, userBase: 50, morale: 60 }
  },
  {
    id: 'steady_growth',
    title: '持续发展',
    description: '公司保持稳健经营，成为细分领域的隐形冠军',
    requirements: { funding: 200, userBase: 30, morale: 70 }
  }
]; 