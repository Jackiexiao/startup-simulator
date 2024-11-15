export interface Trait {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface GameEvent {
  id: string;
  month: number;
  title: string;
  description: string;
  requiredTraits: string[];
  positiveOutcome: {
    text: string;
    effect: GameEffect;
  };
  negativeOutcome: {
    text: string;
    effect: GameEffect;
  };
  choices?: GameChoice[];
}

export interface GameChoice {
  text: string;
  requiredTraits?: string[];
  outcome: {
    text: string;
    effect: GameEffect;
  };
}

export interface GameEffect {
  morale: number;
  funding: number;
  userBase: number;
  reputation?: number;
}

export interface GameStats {
  funding: number;
  userBase: number;
  morale: number;
  reputation: number;
  achievements: string[];
  team: number;
  innovation: number;
  marketShare: number;
  productQuality: number;
  emergenciesResolved: number;
  milestonesPassed: string[];
  lastEventTime: number;
  consecutiveGoodDecisions: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (stats: GameStats) => boolean;
}

export interface GameEnding {
  id: string;
  title: string;
  description: string;
  requirements: GameStats;
}

export interface EventTrigger {
  type: 'stat_high' | 'stat_low' | 'random';
  condition: (stats: GameStats) => boolean;
  event: GameEvent;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  requiredStats: Partial<GameStats>;
  choices: GameChoice[];
  timeLimit: number;
}

export interface MilestoneEvent {
  id: string;
  condition: (stats: GameStats) => boolean;
  title: string;
  description: string;
  effect: GameEffect;
}

export interface EmergencyEvent {
  id: string;
  title: string;
  description: string;
  choices: GameChoice[];
}