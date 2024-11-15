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
      text: '由于技术经验不足，产品开发进度缓慢，多次返��，团队有些沮丧。',
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
  },
  {
    id: 'investor_dinner',
    month: 4,
    title: '投资人晚宴',
    description: '你受邀参加一个高端投资人晚宴，这是一个难得的社交机会',
    requiredTraits: ['social', 'business'],
    choices: [
      {
        text: '主动出击，与关键投资人深入交流',
        requiredTraits: ['social'],
        outcome: {
          text: '你的社交能力让投资人印象深刻，获得了一个重要的投资机会！',
          effect: { morale: 10, funding: 30, userBase: 0, reputation: 15 }
        }
      },
      {
        text: '专注推介项目，展示商业计划',
        requiredTraits: ['business'],
        outcome: {
          text: '你的商业计划获得认可，但投资人希望看到更多进展',
          effect: { morale: 5, funding: 0, userBase: 0, reputation: 5 }
        }
      },
      {
        text: '保持低调，观察学习',
        outcome: {
          text: '你获得了一些有用的行业信息，但错过了直接的投资机会',
          effect: { morale: 0, funding: 0, userBase: 0, reputation: -5 }
        }
      }
    ]
  }
];

export const ENDINGS = [
  {
    id: 'ipo_success',
    title: '成功上市',
    description: '你的公司成功在���斯达克上市，市值超过10亿美元！',
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

export const ACHIEVEMENTS = [
  {
    id: 'fast_growth',
    title: '火箭式增长',
    description: '用户数在一个月内增长超过50k',
    icon: '🚀',
    condition: (stats: GameStats) => stats.userBase >= 50
  },
  {
    id: 'money_master',
    title: '融资达人',
    description: '公司资金达到1000万',
    icon: '💰',
    condition: (stats: GameStats) => stats.funding >= 1000
  },
  {
    id: 'popular_startup',
    title: '创业新星',
    description: '公司声望达到80',
    icon: '⭐',
    condition: (stats: GameStats) => stats.reputation >= 80
  },
  {
    id: 'innovation_leader',
    title: '创新领袖',
    description: '创新指数达到80',
    icon: '🎯',
    condition: (stats: GameStats) => stats.innovation >= 80
  },
  {
    id: 'market_dominator',
    title: '市场领导者',
    description: '市场份额超过40%',
    icon: '👑',
    condition: (stats: GameStats) => stats.marketShare >= 40
  },
  {
    id: 'quality_master',
    title: '质量标杆',
    description: '产品质量达到90',
    icon: '⭐',
    condition: (stats: GameStats) => stats.productQuality >= 90
  },
  {
    id: 'crisis_manager',
    title: '危机管理大师',
    description: '成功处理3次紧急事件',
    icon: '🛡️',
    condition: (stats: GameStats) => stats.emergenciesResolved >= 3
  },
  {
    id: 'team_builder',
    title: '团队打造者',
    description: '团队规模达到50人',
    icon: '👥',
    condition: (stats: GameStats) => stats.team >= 50
  },
  {
    id: 'perfect_product',
    title: '完美主义者',
    description: '产品质量和创新指数都达到90以上',
    icon: '💎',
    condition: (stats: GameStats) => stats.productQuality >= 90 && stats.innovation >= 90
  }
];

export const OPPORTUNITIES = [
  {
    id: 'acquisition_offer',
    title: '收购提案',
    description: '一家大型科技公司对你的创业项目表示了强烈的收购意向',
    requiredStats: {
      userBase: 30,
      reputation: 60
    },
    timeLimit: 3,
    choices: [
      {
        text: '接受收购，实现快速退出',
        requiredTraits: ['negotiation'],
        outcome: {
          text: '经过巧妙谈判，达成了一个令人满意的收购协议！',
          effect: { 
            funding: 500,
            morale: 10,
            reputation: 20,
            marketShare: -10
          }
        }
      },
      {
        text: '婉拒提议，保持独立发展',
        requiredTraits: ['leadership'],
        outcome: {
          text: '团队备受鼓舞，士气高涨，对公司未来充满信心！',
          effect: {
            funding: -10,
            morale: 30,
            reputation: 10,
            innovation: 20
          }
        }
      },
      {
        text: '拖延谈判，同时寻求其他机会',
        requiredTraits: ['business'],
        outcome: {
          text: '巧妙周旋引发了其他公司的兴趣，竞争激烈提升了估值！',
          effect: {
            funding: 200,
            reputation: 15,
            marketShare: 5
          }
        }
      }
    ]
  }
];

export const RANDOM_EVENTS = [
  {
    type: 'stat_high',
    condition: (stats: GameStats) => stats.userBase >= 50,
    event: {
      id: 'viral_growth',
      month: 0,
      title: '病毒式增长',
      description: '你的产品突然在社交媒体上爆火！',
      requiredTraits: ['marketing'],
      positiveOutcome: {
        text: '团队快速响应，完美把握住了增长机会！',
        effect: {
          userBase: 30,
          reputation: 20,
          morale: 15,
          marketShare: 10
        }
      },
      negativeOutcome: {
        text: '服务器不堪重负，错失了大好机会...',
        effect: {
          userBase: 5,
          reputation: -10,
          morale: -10
        }
      }
    }
  },
  {
    type: 'stat_high',
    condition: (stats: GameStats) => stats.funding >= 100,
    event: {
      id: 'talent_attraction',
      month: 0,
      title: '人才青睐',
      description: '公司的发展前景吸引了顶尖人才的关注！',
      requiredTraits: ['leadership'],
      positiveOutcome: {
        text: '成功招募到行业专家加入团队！',
        effect: {
          team: 20,
          morale: 15,
          innovation: 10,
          funding: -20,
          userBase: 0
        }
      },
      negativeOutcome: {
        text: '未能给出有竞争力的待遇，人才流失了...',
        effect: {
          team: -5,
          morale: -10,
          innovation: -5,
          funding: 0,
          userBase: 0
        }
      }
    }
  },
  {
    type: 'stat_low',
    condition: (stats: GameStats) => stats.morale <= 30,
    event: {
      id: 'team_crisis',
      month: 0,
      title: '团队危机',
      description: '核心团队成员对公司前景产生质疑...',
      requiredTraits: ['leadership', 'pressure'],
      positiveOutcome: {
        text: '通过坦诚沟通和有力领导，成功稳定了军心！',
        effect: {
          morale: 30,
          team: 5,
          funding: 0,
          userBase: 0,
          reputation: 10
        }
      },
      negativeOutcome: {
        text: '几位核心成员选择离职，团队士气低落...',
        effect: {
          morale: -20,
          team: -15,
          funding: 0,
          userBase: -5,
          reputation: -15
        }
      }
    }
  },
  {
    type: 'random',
    condition: (stats: GameStats) => true,
    event: {
      id: 'market_opportunity',
      month: 0,
      title: '市场机遇',
      description: '一个新的细分市场突然出现！',
      requiredTraits: ['business', 'execution'],
      positiveOutcome: {
        text: '快速切入新市场，抢占先机！',
        effect: {
          marketShare: 15,
          userBase: 20,
          funding: -10,
          morale: 10,
          innovation: 5
        }
      },
      negativeOutcome: {
        text: '决策不够果断，错失良机...',
        effect: {
          marketShare: -5,
          morale: -5,
          reputation: -5,
          funding: 0,
          userBase: 0
        }
      }
    }
  }
];

export const PRODUCT_UPDATES = [
  {
    id: 'major_update',
    title: '重大版本更新',
    description: '团队准备发布一个重大产品更新',
    choices: [
      {
        text: '专注核心功能优化',
        requiredTraits: ['tech'],
        outcome: {
          text: '产品性能和稳定性大幅提升，用户满意度上升！',
          effect: {
            productQuality: 20,
            userBase: 10,
            reputation: 5
          }
        }
      },
      {
        text: '添加创新功能',
        requiredTraits: ['innovation'],
        outcome: {
          text: '新功能引起行业轰动，产品创新性获得认可！',
          effect: {
            innovation: 30,
            reputation: 15,
            marketShare: 10
          }
        }
      }
    ]
  }
];

export const MILESTONE_EVENTS = [
  {
    id: 'first_million_users',
    condition: (stats: GameStats) => stats.userBase >= 100,
    title: '首个百万用户',
    description: '产品用户数突破100万大关！',
    effect: {
      reputation: 20,
      morale: 20,
      funding: 50,
      marketShare: 10,
      innovation: 5
    }
  },
  {
    id: 'industry_award',
    condition: (stats: GameStats) => stats.innovation >= 60,
    title: '行业大奖',
    description: '公司获得年度最具创新力企业奖！',
    effect: {
      reputation: 30,
      morale: 15,
      funding: 20,
      marketShare: 5,
      innovation: 10
    }
  }
];

export const EMERGENCY_EVENTS = [
  {
    id: 'security_breach',
    title: '安全漏洞',
    description: '系统被发现存在严重的安全漏洞！',
    choices: [
      {
        text: '立即关闭系统进行修复',
        requiredTraits: ['tech'],
        outcome: {
          text: '虽然造成短期损失，但及时控制住了危机！',
          effect: {
            userBase: -10,
            reputation: 5,
            funding: -20,
            productQuality: 10
          }
        }
      },
      {
        text: '边运营边修复',
        requiredTraits: ['pressure'],
        outcome: {
          text: '在压力下完成了修复，但付出了代价...',
          effect: {
            userBase: -5,
            reputation: -10,
            funding: -10,
            productQuality: 5
          }
        }
      },
      {
        text: '公关危机处理',
        requiredTraits: ['social'],
        outcome: {
          text: '成功安抚了用户情绪，为修复赢得了时间',
          effect: {
            reputation: -5,
            funding: -30,
            morale: 5,
            productQuality: -5
          }
        }
      }
    ]
  }
]; 