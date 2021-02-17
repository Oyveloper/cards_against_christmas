export interface Game {
  id: string;
  players: Player[];
  rounds: Round[];
  currentRound: Round | undefined;
}

export interface Player {
  name: string;
  score: number;
  isHost: boolean;
}

export interface Round {
  num: number;
  judge: Player;
  blackCard: BlackCard;
  winner: Player;
  winnerCard: Card;
  playedCards: { [playerName: string]: Card };
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
  type: String;
};

export type JoinGameData = {
  gameId: string;
  playerName: string;
};

export class ClientMessage {
  playerName: string;
  cardId: string;

  constructor(playerName: string = "", cardId: string = "") {
    this.playerName = playerName;
    this.cardId = cardId;
  }
}
