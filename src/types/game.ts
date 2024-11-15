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