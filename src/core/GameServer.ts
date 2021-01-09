import { CompatClient, Stomp } from "@stomp/stompjs";
import { useEffect, useReducer, useState } from "react";
import { Card, Game, GameState, Player } from "../types";
import SockJS from "sockjs-client";

type GameServerResponse = {
  status: string;
  reason: string;
  data: any;
};

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

export class GameServer {
  id: string;
  dispatch: React.Dispatch<{
    type: GameServerActions;
    data: object;
  }>;

  serverURL: string = "http://localhost:8080/ws";
  stompClient: CompatClient | undefined;

  constructor(
    id: string,
    dispatch: React.Dispatch<{
      type: GameServerActions;
      data: object;
    }>
  ) {
    this.id = id;
    this.dispatch = dispatch;
  }

  connect() {
    let socket = new SockJS(this.serverURL);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.dispatch({
        type: GameServerActions.LOADING_DONE,
        data: { loading: false },
      });
      if (this.stompClient !== undefined && this.stompClient.connected) {
        this.stompClient.subscribe("/topic/GameUpdate/123", this.onGameInfo);
        this.stompClient.send(
          "/app/joinGame/123",
          undefined,
          "{playerName: 'adam'}"
        );
      }
    });
  }

  onGameInfo(rawResponse: any) {
    console.log("I got some data from topic");
    let response: GameServerResponse = JSON.parse(rawResponse.body);
    console.log(response);
  }

  playCard(card: Card) {}

  chooseCard(card: Card) {}

  drawCard(currentHand: Card[]) {
    this.dispatch({
      type: GameServerActions.DRAW_CARD,
      data: { userHand: [...currentHand, { text: "mer", id: "qwe" }] },
    });
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
  action: { type: GameServerActions; data: object }
): GameState {
  return { ...state, ...action.data };
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
    loading: true,
  });
  const [server, setServer] = useState(new GameServer(id, dispatch));
  useEffect(() => {
    server.connect();
  }, [server]);

  return [server, gameState];
}
