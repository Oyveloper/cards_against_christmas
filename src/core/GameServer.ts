import { CompatClient, Stomp } from "@stomp/stompjs";
import { useEffect, useReducer, useState } from "react";
import {
  Card,
  ClientMessage,
  GameServerResponse,
  GameState,
  GameUpdate,
} from "../types";
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
  isJoined: boolean = false;

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
          JSON.stringify(new ClientMessage(this.playerName, ""))
        );
      }
    });
  }

  onGameInfo(rawResponse: any) {
    let response: GameServerResponse = JSON.parse(rawResponse.body);
    console.log(response);

    if (response.status === "OK") {
      let gameUpdate: GameUpdate = response.data;
      console.log(gameUpdate);

      switch (gameUpdate.type) {
        case "join":
          if (!this.isJoined) {
            this.isJoined = true;
            this.drawHand();
          }
          break;

        case "newRound":
          break;

        case "cardPlayed":
        case "cardChosen":
        default:
          break;
      }

      this.dispatch({
        type: GameServerActions.GAME_UPDATE,
        data: gameUpdate,
      });
    }
  }

  playCard(card: Card, currentHand: Card[]) {
    this.stompClient?.send(
      `/app/${this.id}/playCard`,
      undefined,
      JSON.stringify(new ClientMessage(this.playerName, card.id))
    );
    const hand = currentHand.filter((c) => c.id !== card.id);
    this.dispatch({
      type: GameServerActions.CARD_PLAYED,
      data: {
        userHand: [...hand],
      },
    });

    this.drawCard(hand);
  }

  chooseCard(card: Card) {
    this.stompClient?.send(
      `/app/${this.id}/chooseWinnerCard`,
      undefined,
      JSON.stringify(new ClientMessage("", card.id))
    );
  }

  drawCard(currentHand: Card[]) {
    fetch(`http://localhost:8080/drawCard?gameId=${this.id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        let message = response as GameServerResponse;
        let cards = message.data.cards;
        this.dispatch({
          type: GameServerActions.DRAW_CARD,
          data: { userHand: [...currentHand, ...cards] },
        });
      });
  }

  drawHand() {
    fetch(`http://localhost:8080/drawHand?gameId=${this.id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        let message = response as GameServerResponse;
        let cards = message.data.cards;
        this.dispatch({
          type: GameServerActions.DRAW_CARD,
          data: { userHand: cards },
        });
      });
  }

  newRound() {
    console.log("starting a new round");
    this.stompClient?.send(`/app/${this.id}/newRound`);
  }
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
