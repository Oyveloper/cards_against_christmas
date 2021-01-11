export interface Game {
  id: string;
  players: Player[];
  rounds: Round[];
  currentRound: Round | undefined;
}

export interface Player {
  name: string;
  score: number;
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

export interface GameState {
  id: string;
  players: Player[];
  userHand: Card[];
  rounds: Round[];
  currentRound: Round | null;
  loading: boolean;
}

export type GameServerResponse = {
  status: string;
  reason: string;
  data: any;
};

export type GameUpdate = {
  gameId: string;
  players: Player[];
  rounds: Round[];
  currentRound: Round;
};
