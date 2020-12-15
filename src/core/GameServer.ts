import { useReducer } from "react";
import { Card, GameState } from "../types";

export class GameServer {
  id: string;
  dispatch: React.Dispatch<GameStateAction>;

  constructor(id: string, dispatch: React.Dispatch<GameStateAction>) {
    this.id = id;
    this.dispatch = dispatch;
  }

  connect() {}

  playCard(card: Card) {}

  chooseCard(card: Card) {}

  drawCard(): Card {
    return { text: "hell", id: "12" };
  }

  onNewRound() {}

  onPlayersChange() {}

  onRoundWon() {}

  onCardPlayed() {}

  onGameStart() {}

  onGameOver() {}
}

enum gameStateActionType {
  GAME_START,
  GAME_OVER,
  NEW_ROUND,
  PLAYER_CHNAGE,
  HAND_CHNAGE,
  PLAYED_CARD_CHANGE,
  LOADING_CHANGE,
}

type GameStateAction = {
  type: string;
};

function gameStateReducer(
  state: GameState,
  action: GameStateAction
): GameState {
  switch (action.type) {
    default:
      return state;
  }
}

export default function useGameServer(id: string): [GameServer, GameState] {
  const [gameState, dispatch] = useReducer(gameStateReducer, {
    id: id,
    players: [],
    userHand: [],
    rounds: [],
    currentRound: undefined,
    loading: true,
  });
  let server = new GameServer(id, dispatch);

  server.connect();

  return [server, gameState];
}
