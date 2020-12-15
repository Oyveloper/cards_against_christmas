export interface Game {
  id: string;
  players: Player[];
  rounds: Round[];
  currentRound: Round | undefined;
}

export interface Player {
  name: string;
  score: number;
  isJudge: boolean;
}

export interface Round {
  num: number;
  judge: Player;
  blackCard: BlackCard;
}

export interface Card {
  text: string;
  id: string;
}

export interface BlackCard extends Card {
  numberMissing: number;
}
