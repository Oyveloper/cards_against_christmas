import { CompatClient, Stomp } from "@stomp/stompjs";
import { useEffect, useReducer, useState } from "react";
import { Card, GameServerResponse, GameState, GameUpdate } from "../types";
import SockJS from "sockjs-client";

export enum GameServerActions {
  DRAW_CARD,
  NEW_ROUND,
  PLAYER_CHANGE,
  ROUND_WON,
  CARD_PLAYED,
  GAME_START,
  GAME_OVER,
  LOADING_DONE,
  GAME_UPDATE,
}

export class GameServer {
  id: string;
  dispatch: React.Dispatch<{
    type: GameServerActions;
    data: object;
  }>;

  serverURL: string = "http://localhost:8080/ws";
  stompClient: CompatClient | undefined;
  playerName: string;

  constructor(
    id: string,
    dispatch: React.Dispatch<{
      type: GameServerActions;
      data: object;
    }>,
    playerName: string
  ) {
    this.id = id;
    this.dispatch = dispatch;
    this.playerName = playerName;
  }

  connect() {
    let socket = new SockJS(this.serverURL);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      if (this.stompClient !== undefined && this.stompClient.connected) {
        this.dispatch({
          type: GameServerActions.LOADING_DONE,
          data: { loading: false },
        });
        this.stompClient.subscribe(
          `/topic/GameUpdate/${this.id}`,
          this.onGameInfo.bind(this)
        );
        this.stompClient.send(
          `/app/joinGame/${this.id}`,
          undefined,
          this.playerName
        );
      }
    });
  }

  onGameInfo(rawResponse: any) {
    let response: GameServerResponse = JSON.parse(rawResponse.body);

    if (response.status === "OK") {
      let gameUpdate: GameUpdate = response.data;
      console.log(gameUpdate);

      this.dispatch({
        type: GameServerActions.GAME_UPDATE,
        data: {
          players: gameUpdate.players,
          userHand: gameUpdate.players.filter(
            (p) => p.name === this.playerName
          ),
          rounds: gameUpdate.rounds,
          currentRound: gameUpdate.currentRound,
        },
      });
    }
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

export default function useGameServer(
  id: string,
  playerName: string
): [GameServer, GameState] {
  const [gameState, dispatch] = useReducer(gameStateReducer, {
    id: id,
    players: [],
    userHand: [],
    rounds: [],
    currentRound: null,
    loading: true,
  });
  const [server] = useState(new GameServer(id, dispatch, playerName));
  useEffect(() => {
    server.connect();
  }, [server]);

  return [server, gameState];
}
