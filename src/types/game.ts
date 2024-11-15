export interface GameEvent {
  id: string;
  text: string;
  type: 'positive' | 'negative' | 'neutral';
  energyEffect: number;
  progressEffect: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface GameStats {
  bugsFixed: number;
  coffeesDrunk: number;
  linesOfCode: number;
  maxCombo: number;
}