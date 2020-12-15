import React, { useState } from "react";
import CardDisplay from "../components/CardDisplay";
import PlayerAvatar from "../components/PlayerAvatar";
import useGameServer from "../core/GameServer";
import { Card, Game } from "../types";

import "./GameScreen.css";

type GameScreenProps = {
  id: string;
  playerName: string;
};

export default function GameScreen({ id, playerName }: GameScreenProps) {
  const [gameServer, gameState] = useGameServer(id);

  if (gameState.loading) {
    return (
      <div className="GameScreen GameScreen-loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  const playerHand = gameState.userHand.map((card, i) => (
    <CardDisplay card={card} key={`hand-card-${i}`} />
  ));

  const oponents = gameState.players.map((player, i) => (
    <PlayerAvatar player={player} key={`oponent-${i}`} />
  ));

  const blackCard =
    gameState.currentRound === undefined ? null : (
      <CardDisplay card={gameState.currentRound.blackCard} />
    );

  return (
    <div className="GameScreen">
      <div id="oponents">{oponents}</div>
      <div id="table">{blackCard}</div>
      <div id="player-hand">
        <div id="player-hand-card-container">{playerHand}</div>
      </div>
    </div>
  );
}
