export interface Trait {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface GameEvent {
  id: string;
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
}

export interface GameEffect {
  morale: number;
  funding: number;
  userBase: number;
}

export interface GameStats {
  funding: number;
  userBase: number;
  morale: number;
}

export interface GameEnding {
  id: string;
  title: string;
  description: string;
  requirements: GameStats;
}