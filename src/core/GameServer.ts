import { useReducer, useState } from "react";
import { Card, Game, GameState, Player } from "../types";

export class GameServer {
  id: string;
  dispatch: React.Dispatch<{
    type: string;
    data: object;
  }>;
  gameState: GameState;

  constructor(
    id: string,
    dispatch: React.Dispatch<{
      type: string;
      data: object;
    }>,
    gameState: GameState
  ) {
    this.id = id;
    this.dispatch = dispatch;
    this.gameState = gameState;
  }

  connect() {}

  playCard(card: Card) {}

  chooseCard(card: Card) {}

  drawCard() {
    this.gameState.userHand.push({ text: "mer", id: "qwe" });
    console.log(this.gameState.userHand);

    this.dispatch({ type: "noe", data: { userHand: this.gameState.userHand } });
  }

  onNewRound() {}

  onPlayersChange() {}

  onRoundWon() {}

  onCardPlayed() {}

  onGameStart() {}

  onGameOver() {}
}

function gameStateReducer(
  state: GameState,
  action: { type: string; data: object }
): GameState {
  return { ...state, ...action.data };
}

export enum GameServerActions {
  DRAW_CARD,
  NEW_ROUND,
  PLAYER_CHANGE,
  ROUND_WON,
  CARD_PLAYED,
  GAME_START,
  GAME_OVER,
  LOADING_DONE,
}

export default function useGameServer(id: string): [GameServer, GameState] {
  const [gameState, dispatch] = useReducer(gameStateReducer, {
    id: id,
    players: [
      { name: "noe", score: 0, isJudge: true },
      { name: "annet", score: 0, isJudge: false },
      { name: "du", score: 0, isJudge: false },
    ],
    userHand: [
      { text: "oisann", id: "123" },
      { text: "oisann", id: "123" },
      { text: "oisann", id: "123" },
      { text: "oisann", id: "123" },
    ],
    rounds: [],
    currentRound: {
      num: 1,
      judge: { name: "noe", score: 0, isJudge: true },
      blackCard: { text: "noe ___", numberMissing: 1, id: "123" },
    },
    loading: false,
  });
  let [server, setServer] = useState(new GameServer(id, dispatch, gameState));

  server.connect();

  return [server, gameState];
}
